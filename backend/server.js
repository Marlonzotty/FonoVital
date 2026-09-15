// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodeFetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readFile } from 'node:fs/promises';

const backendDir = dirname(fileURLToPath(import.meta.url));
export function createApp({ env = process.env, database, fetch: fetchImpl = nodeFetch } = {}) {
const fetch = (url, options = {}) => fetchImpl(url, { signal: AbortSignal.timeout(15000), ...options });

const app = express();
app.use(cors({ origin: env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '2mb', verify: (req, _, buffer) => { req.rawBody = buffer.toString('utf8'); } }));
app.set('trust proxy', true); // permite obter o IP real atrÃ¡s de proxy/CDN

const PORT = env.PORT || 3001;
const PIXEL_ID = env.META_PIXEL_ID;
const ACCESS_TOKEN = env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = env.META_TEST_EVENT_CODE || ""; // opcional p/ testar no Events Manager
const MP_ACCESS_TOKEN = env.MP_ACCESS_TOKEN;
// Mantenha esta chave somente no ambiente do backend (Render/cloud). Nunca a
// exponha como VITE_ no frontend.
const TRACK17_TOKEN = env.TRACK17_TOKEN;
const FRONTEND_URL = env.FRONTEND_URL || 'http://localhost:5173';
const BACKEND_PUBLIC_URL = env.BACKEND_PUBLIC_URL || `http://localhost:${env.PORT || 3001}`;
const ADMIN_KEY = env.ADMIN_KEY;
app.use(cookieParser(ADMIN_KEY || env.COOKIE_SECRET || 'fonovital-cookie-secret-change-me'));
const ADMIN_SESSION_TTL = 8 * 60 * 60 * 1000;
const adminSessions = new Map();
const DATABASE_URL = env.DATABASE_URL;
const DATABASE_SSL = env.DATABASE_SSL === 'true'
  || (env.DATABASE_SSL !== 'false' && DATABASE_URL && !/localhost|127\.0\.0\.1/.test(DATABASE_URL));
const db = database !== undefined ? database : DATABASE_URL
  ? new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_SSL ? { rejectUnauthorized: false } : false,
    })
  : null;
let databaseReady = false;

async function initDatabase() {
  if (!db) return;
  try {
    await db.query('CREATE TABLE IF NOT EXISTS orders (id BIGSERIAL PRIMARY KEY, external_reference TEXT UNIQUE, product TEXT NOT NULL, customer JSONB NOT NULL, amount NUMERIC NOT NULL, status TEXT NOT NULL DEFAULT \'created\', payment_id TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS status_detail TEXT');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS webhook_received_at TIMESTAMPTZ');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS purchased_at TIMESTAMPTZ');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_carrier INTEGER');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_status TEXT');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_data JSONB');
    await db.query('CREATE UNIQUE INDEX IF NOT EXISTS orders_tracking_number_unique ON orders (tracking_number) WHERE tracking_number IS NOT NULL');
    await db.query(`CREATE TABLE IF NOT EXISTS products (
      id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', image TEXT,
      sku TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE, price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
      promotional_price NUMERIC(12,2), category TEXT, stock INTEGER, active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS source_product_id BIGINT REFERENCES products(id)');
    await db.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS product_kind TEXT NOT NULL DEFAULT 'independent'");
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_snapshot JSONB');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS preference_id TEXT');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_history JSONB NOT NULL DEFAULT \'[]\'::jsonb');
    await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT');
    await db.query('CREATE TABLE IF NOT EXISTS payment_events (id BIGSERIAL PRIMARY KEY, order_id BIGINT REFERENCES orders(id), payment_id TEXT, status TEXT, status_detail TEXT, payload JSONB, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(payment_id, status, status_detail))');
    await db.query(`CREATE TABLE IF NOT EXISTS financial_legacy_sales (
      id BIGSERIAL PRIMARY KEY, source_sheet TEXT NOT NULL, source_row INTEGER NOT NULL,
      sale_date DATE, product TEXT NOT NULL, customer JSONB NOT NULL DEFAULT '{}'::jsonb,
      amount NUMERIC(12,2) NOT NULL DEFAULT 0, commission NUMERIC(12,2), paid BOOLEAN,
      payment_method TEXT,
      imported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(source_sheet, source_row)
    )`);
    await db.query('ALTER TABLE financial_legacy_sales ADD COLUMN IF NOT EXISTS payment_method TEXT');
    await db.query(await readFile(join(backendDir, 'migrations/002_process_integrity.sql'), 'utf8'));
    await seedLegacyProducts();
    databaseReady = true;
  } catch (error) {
    databaseReady = false;
    console.error('[DB] indisponível; checkout bloqueado:', error.code || error.message);
  }
}

function issueAdminSession() {
  for (const [session, expires] of adminSessions) if (expires <= Date.now()) adminSessions.delete(session);
  const token = crypto.randomBytes(32).toString('hex');
  adminSessions.set(token, Date.now() + ADMIN_SESSION_TTL);
  return token;
}
function adminAuthorized(req) {
  const token = req.signedCookies?.fonovital_admin_session;
  if (token && adminSessions.get(token) > Date.now()) return true;
  if (token) adminSessions.delete(token);
  return Boolean(ADMIN_KEY && req.get('x-admin-key') === ADMIN_KEY);
}
function requireAdmin(req, res, next) {
  if (!adminAuthorized(req)) return res.status(401).json({ error: 'Sessão administrativa inválida ou expirada.' });
  if (req.path !== '/api/admin/session' && (!db || !databaseReady)) return res.status(503).json({ error: 'Banco de dados indisponível.' });
  return next();
}

app.post('/api/admin/login', (req, res) => {
  if (!ADMIN_KEY || req.body?.key !== ADMIN_KEY) return res.status(401).json({ error: 'Chave administrativa inválida.' });
  const token = issueAdminSession();
  res.cookie('fonovital_admin_session', token, { httpOnly: true, signed: true, sameSite: 'lax', secure: env.NODE_ENV === 'production', maxAge: ADMIN_SESSION_TTL, path: '/' });
  return res.json({ ok: true, expiresIn: ADMIN_SESSION_TTL });
});
app.post('/api/admin/logout', (req, res) => {
  const token = req.signedCookies?.fonovital_admin_session;
  if (token) adminSessions.delete(token);
  res.clearCookie('fonovital_admin_session', { path: '/' });
  return res.json({ ok: true });
});
app.get('/api/admin/session', requireAdmin, (_req, res) => res.json({ authenticated: true }));

// PreÃ§os e produtos ficam no servidor para impedir que o navegador altere o valor cobrado.
const checkoutProducts = {
  voicepro: { title: 'VoicePro Profissional Digital | Fonovital', price: 1499.0, sku: 'voicepro' },
  voxton: { title: 'Voxton Mini CIC | Fonovital', price: 599.9, sku: 'voxton' },
  'voxton-direito': { title: 'Voxton Mini CIC - Lado Direito | Fonovital', price: 399.9, sku: 'voxton-direito' },
  'voxton-esquerdo': { title: 'Voxton Mini CIC - Lado Esquerdo | Fonovital', price: 399.9, sku: 'voxton-esquerdo' },
  iavoice: { title: 'IAvoice Inteligência Auditiva | Fonovital', price: 1699.9, sku: 'iavoice' },
  smartvoice: { title: 'SmartVoice CIC Bluetooth Magnético | Fonovital', price: 1399.9, sku: 'smartvoice' },
  softvoice: { title: 'SoftVoice Recarregável 16 Canais | Fonovital', price: 2699.9, sku: 'softvoice' },
  vitalair: { title: 'Vital Air Bluetooth Inteligente | Fonovital', price: 1999.0, sku: 'vitalair' },
  vitalvoice: { title: 'VitalVoice | Fonovital', price: 1399.9, sku: 'vitalvoice' },
  'vital-wellness': { title: 'Vital Wellness | Fonovital', price: 350.0, sku: 'vital-wellness' },
  'galinha-pintadinha': { title: 'Galinha Pintadinha | Fonovital', price: 1.0, sku: 'galinha-pintadinha' },
};

async function seedLegacyProducts() {
  if (!db) return;
  const legacyImages = {
    voicepro: '/src/assets/voicepro/frenteVoicePro.jpg',
    voxton: '/src/assets/voxton/voxton.png',
    iavoice: '/src/assets/iavoice/iavoice-produto-completo.jpg',
    smartvoice: '/src/assets/SmartVoice/cfa9f496-2eb4-4978-a4a7-2b0fcae23ba9.jpg',
    softvoice: '/src/assets/SoftVoice/e35497c0-8711-41e0-aa04-f23efb62a9eb.jpg',
    vitalair: '/src/assets/vitalair/vitalairCel.jpg',
    'voxcharge': '/src/assets/voxcharge/voxcharge (5) (1).png',
    vitalvoice: '/src/assets/vitalVoice/vitalVoice.jpg',
    'vital-wellness': '/src/assets/Vitalwellness/ChatGPT Image 11 de set. de 2026, 22_16_26.png',
  };
  for (const product of Object.values(checkoutProducts)) {
    await db.query(
      `INSERT INTO products (name, description, image, sku, slug, price, active, product_kind)
       VALUES ($1, $2, $3, $4, $5, $6, TRUE, 'model')
       ON CONFLICT (sku) DO UPDATE SET image = COALESCE(products.image, EXCLUDED.image), product_kind = COALESCE(products.product_kind, 'model')`,
      [product.title, 'Modelo tradicional Fonovital', legacyImages[product.sku] || null, product.sku, product.sku, product.price],
    );
  }
}

async function resolveCheckoutProduct(slug, connection = db, lock = false) {
  if (!db || !databaseReady) return null;
  const result = await connection.query(`SELECT * FROM products WHERE slug = $1 OR sku = $1 ORDER BY (sku = $1) DESC LIMIT 1${lock ? ' FOR UPDATE' : ''}`, [slug]);
  return result.rows[0] || null;
}

function publicProductAvailable(product, quantity = 1) {
  return Boolean(product?.active && Number.isInteger(quantity) && quantity > 0 && (product.stock == null || Number(product.stock) >= quantity));
}

function productSnapshot(product, quantity) {
  return { product_id: product.id || null, name: product.name || product.title, description: product.description || '', image: product.image || null, sku: product.sku, slug: product.slug, price: Number(product.promotional_price || product.price), list_price: Number(product.price), category: product.category || null, quantity };
}

/* ----------------------- Middleware: setar cookie _fbc --------------------- */
// Se a requisiÃ§Ã£o vier com ?fbclid=..., definimos/atualizamos _fbc com:
// fb.<subdomainIndex=1>.<creationTime_ms>.<fbclid>
app.use((req, res, next) => {
  try {
    const fbclid = req.query?.fbclid;
    if (!fbclid) return next();

    const nowMs = Date.now();
    const nextFbc = `fb.1.${nowMs}.${fbclid}`;

    // Se jÃ¡ existe _fbc e for o mesmo fbclid, nÃ£o precisa atualizar
    const cur = req.cookies?._fbc ? decodeURIComponent(req.cookies._fbc) : null;
    const curFbclid = cur ? cur.split('.').pop() : null;

    if (!cur || curFbclid !== fbclid) {
      res.cookie('_fbc', encodeURIComponent(nextFbc), {
        path: '/',
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 dias
        sameSite: 'Lax',
        // secure: true,             // habilite em produÃ§Ã£o (HTTPS)
        // httpOnly: true,           // deixe false se vocÃª quer ler no front; true aumenta seguranÃ§a
      });
    }
  } catch (e) {
    // silencioso
  }
  next();
});

/* ------------------------- Mercado Pago Checkout Pro ---------------------- */
// Links antigos passam pelo mesmo formulário para não criar pedidos sem endereço.
app.get('/api/checkout/:product', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!db || !databaseReady) return res.status(503).json({ error: 'Checkout temporariamente indisponível.' });
  const product = await resolveCheckoutProduct(req.params.product);
  if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
  const quantity = Number(req.query.quantity ?? 1);
  if (!Number.isSafeInteger(quantity) || quantity < 1) return res.status(400).json({ error: 'Quantidade inválida.' });
  if (!publicProductAvailable(product, quantity)) return res.status(409).json({ error: 'Produto indisponível ou estoque insuficiente.' });
  return res.redirect(303, `${FRONTEND_URL}/#/finalizar/${encodeURIComponent(product.sku)}?quantity=${quantity}`);
});

app.post('/api/checkout/:product', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!db || !databaseReady || !MP_ACCESS_TOKEN) return res.status(503).json({ error: 'Checkout temporariamente indisponível.' });
  const quantity = Number(req.body?.quantity ?? 1);
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100) return res.status(400).json({ error: 'Quantidade inválida.' });
  const required = ['name', 'email', 'cpf', 'phone', 'zipCode', 'street', 'number', 'neighborhood', 'city', 'state'];
  const customer = Object.fromEntries([...required, 'complement'].map(key => [key, typeof req.body?.[key] === 'string' ? req.body[key].trim() : '']));
  if (required.some(key => !customer[key] || customer[key].length > 250)
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
    || !/^\d{11}$/.test(customer.cpf.replace(/\D/g, ''))
    || !/^\d{10,13}$/.test(customer.phone.replace(/\D/g, ''))
    || !/^\d{8}$/.test(customer.zipCode.replace(/\D/g, ''))
    || !/^[A-Za-z]{2}$/.test(customer.state)) return res.status(400).json({ error: 'Confira os dados obrigatórios, CPF, telefone, CEP e UF.' });
  const requestId = req.body?.request_id || crypto.randomUUID();
  if (typeof requestId !== 'string' || !/^[0-9a-f-]{36}$/i.test(requestId)) return res.status(400).json({ error: 'Identificador da compra inválido.' });
  const requestHash = crypto.createHash('sha256').update(JSON.stringify([req.params.product, quantity, customer])).digest('hex');
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    // Serializa retentativas da mesma compra, mesmo para produtos diferentes.
    await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [requestId]);
    const previous = await client.query('SELECT external_reference, checkout_url, checkout_request_hash FROM orders WHERE checkout_request_id=$1', [requestId]);
    if (previous.rowCount) {
      await client.query('COMMIT');
      if (previous.rows[0].checkout_request_hash !== requestHash) return res.status(409).json({ error: 'A solicitação já foi usada com outros dados. Recarregue a página para uma nova compra.' });
      return res.json({ checkoutUrl: previous.rows[0].checkout_url, externalReference: previous.rows[0].external_reference });
    }
    const product = await resolveCheckoutProduct(req.params.product, client, true);
    if (!product || !publicProductAvailable(product, quantity)) {
      await client.query('ROLLBACK');
      return res.status(product ? 409 : 404).json({ error: 'Produto indisponível ou estoque insuficiente.' });
    }
    const snapshot = productSnapshot(product, quantity);
    const externalReference = `${product.sku}-${crypto.randomUUID()}`;
    const amount = Math.round(snapshot.price * quantity * 100) / 100;
    const reserved = product.stock != null;
    if (reserved) await client.query('UPDATE products SET stock = stock - $1, updated_at = NOW() WHERE id = $2', [quantity, product.id]);
    await client.query('INSERT INTO orders (external_reference, product, product_snapshot, quantity, customer, amount, stock_reserved) VALUES ($1,$2,$3,$4,$5,$6,$7)', [externalReference, product.sku, JSON.stringify(snapshot), quantity, JSON.stringify(customer), amount, reserved]);
    const returnUrl = outcome => `${FRONTEND_URL}/#/pagamento/${outcome}?reference=${encodeURIComponent(externalReference)}`;
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ id: product.sku, title: product.name, quantity, currency_id: 'BRL', unit_price: snapshot.price }],
        payment_methods: { installments: 5 },
        back_urls: { success: returnUrl('sucesso'), pending: returnUrl('pendente'), failure: returnUrl('falha') },
        external_reference: externalReference,
        notification_url: `${BACKEND_PUBLIC_URL}/api/mercadopago/webhook`,
      }),
    });
    const data = await response.json();
    const checkoutUrl = MP_ACCESS_TOKEN.startsWith('TEST-') ? data.sandbox_init_point : data.init_point;
    if (!response.ok || !checkoutUrl || !data.id) {
      await client.query('ROLLBACK');
      return res.status(502).json({ error: 'Não foi possível criar o checkout. Tente novamente.' });
    }
    await client.query('UPDATE orders SET preference_id = $1, checkout_url=$3, checkout_request_id=$4, checkout_request_hash=$5 WHERE external_reference = $2', [data.id, externalReference, checkoutUrl, requestId, requestHash]);
    await client.query('COMMIT');
    return res.json({ checkoutUrl, externalReference });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[Checkout] falha:', error.code || error.message);
    return res.status(502).json({ error: 'Não foi possível iniciar o pagamento. Tente novamente.' });
  } finally { client.release(); }
});

// Referência aleatória funciona como comprovante de consulta, sem expor dados pessoais.
app.get('/api/orders/:reference/status', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!db || !databaseReady) return res.status(503).json({ error: 'Consulta temporariamente indisponível.' });
  if (!/-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.reference)) return res.status(404).json({ error: 'Pedido não encontrado.' });
  const result = await db.query('SELECT status, amount, payment_id, product FROM orders WHERE external_reference = $1', [req.params.reference]);
  if (!result.rowCount) return res.status(404).json({ error: 'Pedido não encontrado.' });
  return res.json(result.rows[0]);
});

app.post('/api/mercadopago/webhook', async (req, res) => {
  const payload = req.body || {};
  const eventType = payload.type || payload.topic || req.query.type || req.query.topic || String(payload.action || '').split('.')[0];
  const paymentId = req.query['data.id'] || payload.data?.id || payload['data.id'] || (eventType === 'payment' ? payload.id || req.query.id : null);
  if (eventType !== 'payment' || !paymentId) return res.sendStatus(200);
  if (env.MP_WEBHOOK_SECRET) {
    const signature = Object.fromEntries(String(req.get('x-signature') || '').split(',').map(part => part.trim().split('=')));
    const dataId = req.query['data.id'];
    const requestId = req.get('x-request-id');
    const manifest = `${dataId ? `id:${String(dataId).toLowerCase()};` : ''}${requestId ? `request-id:${requestId};` : ''}${signature.ts ? `ts:${signature.ts};` : ''}`;
    const expected = crypto.createHmac('sha256', env.MP_WEBHOOK_SECRET).update(manifest).digest('hex');
    if (!signature.ts || !/^[a-f0-9]{64}$/i.test(signature.v1 || '') || !crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature.v1, 'hex'))) return res.sendStatus(401);
  }
  if (!MP_ACCESS_TOKEN || !db || !databaseReady) return res.sendStatus(503);
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    if (!response.ok) return res.sendStatus(502);
    const payment = await response.json();
    if (!payment.external_reference) return res.sendStatus(200);
    if (String(payment.id) !== String(paymentId) || !payment.status) return res.sendStatus(502);
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      const orderResult = await client.query('SELECT * FROM orders WHERE external_reference = $1 FOR UPDATE', [payment.external_reference]);
      if (!orderResult.rowCount) {
        await client.query('ROLLBACK');
        return res.sendStatus(503);
      }
      const order = orderResult.rows[0];
      if (payment.currency_id !== 'BRL' || Math.round(Number(payment.transaction_amount) * 100) !== Math.round(Number(order.amount) * 100)) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'Pagamento não corresponde ao valor do pedido.' });
      }
      const nextStatus = payment.status;
      const updatedAt = payment.date_last_updated || payment.date_created;
      if (!updatedAt || !Number.isFinite(Date.parse(updatedAt))) {
        await client.query('ROLLBACK');
        return res.sendStatus(502);
      }
      const eventKey = crypto.createHash('sha256').update(JSON.stringify([String(payment.id), nextStatus, payment.status_detail || '', updatedAt])).digest('hex');
      const eventResult = await client.query(
        'INSERT INTO payment_events (order_id, payment_id, status, status_detail, payload, event_key) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (event_key) DO NOTHING RETURNING id',
        [order.id, String(payment.id), nextStatus, payment.status_detail || '', JSON.stringify(payment), eventKey],
      );
      const samePayment = !order.payment_id || String(order.payment_id) === String(payment.id);
      const stale = samePayment && order.payment_updated_at && Date.parse(updatedAt) < new Date(order.payment_updated_at).getTime();
      const protectedStatus = ['approved', 'refunded', 'charged_back'].includes(order.status);
      const regression = protectedStatus && (!samePayment || ['created', 'pending', 'in_process', 'authorized', 'rejected', 'cancelled'].includes(nextStatus) || (['refunded', 'charged_back'].includes(order.status) && nextStatus === 'approved'));
      if (eventResult.rowCount && !stale && !regression) {
        // Reserva permanece em recusas: o comprador pode tentar outro cartão na mesma preferência.
        const releaseStock = order.stock_reserved && ['cancelled', 'refunded', 'charged_back'].includes(nextStatus);
        if (releaseStock) await client.query('UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2 AND stock IS NOT NULL', [order.quantity, order.product_snapshot?.product_id]);
        let reserved = order.stock_reserved && !releaseStock;
        if (!reserved && nextStatus === 'approved' && order.product_snapshot?.product_id) {
          const stockResult = await client.query('UPDATE products SET stock = stock - $1, updated_at = NOW() WHERE id = $2 AND stock >= $1 RETURNING id', [order.quantity, order.product_snapshot.product_id]);
          reserved = stockResult.rowCount > 0;
        }
        await client.query(
          `UPDATE orders SET status = $1, status_detail = $2, payment_id = $3,
             purchased_at = CASE WHEN $1 = 'approved' THEN COALESCE(purchased_at, $5::timestamptz) ELSE purchased_at END,
             payment_method = COALESCE($7, payment_method), webhook_received_at = NOW(), updated_at = NOW(), payment_updated_at = $5, stock_reserved = $6,
             payment_history = COALESCE(payment_history, '[]'::jsonb) || jsonb_build_array(jsonb_build_object('payment_id',$3::text,'previous_status',status,'status',$1::text,'status_detail',$2::text,'updated_at',$5::text))
           WHERE id = $4`,
          [nextStatus, payment.status_detail || null, String(payment.id), order.id, updatedAt, reserved, payment.payment_method_id || payment.payment_type_id || payment.payment_method?.name || null],
        );
      }
      await client.query('COMMIT');
    } catch (error) { await client.query('ROLLBACK'); throw error; }
    finally { client.release(); }
    return res.sendStatus(200);
  } catch (error) {
    console.error('[Mercado Pago] falha no webhook:', error.code || error.message);
    return res.sendStatus(503);
  }
});

/* ------------------------------ 17TRACK v2.4 ----------------------------- */
function isTrackingNumber(number) {
  return /^[A-Z0-9-]{5,50}$/.test(number);
}

function publicTrackingData(number, tracking) {
  const trackInfo = tracking?.track_info || {};
  const events = (trackInfo.tracking?.providers || [])
    .flatMap((provider) => provider.events || [])
    .map((event) => ({
      time: event.time_iso || event.time_utc || event.time_raw?.date || null,
      description: event.description_translation?.description || event.description || 'Atualização de rastreio',
    }))
    .sort((a, b) => String(b.time || '').localeCompare(String(a.time || '')));

  return {
    number,
    carrier: trackInfo.tracking?.providers?.[0]?.provider?.name || null,
    status: trackInfo.latest_status?.status || 'InfoReceived',
    statusDetail: trackInfo.latest_status?.sub_status_descr || trackInfo.latest_status?.sub_status || null,
    latestEvent: trackInfo.latest_event
      ? {
          time: trackInfo.latest_event.time_iso || trackInfo.latest_event.time_utc || trackInfo.latest_event.time_raw?.date || null,
          description: trackInfo.latest_event.description_translation?.description || trackInfo.latest_event.description,
        }
      : null,
    events,
  };
}

app.post('/api/tracking', async (req, res) => {
  const number = String(req.body?.number || '').trim().toUpperCase();
  if (!isTrackingNumber(number)) {
    return res.status(400).json({ error: 'Informe um código de rastreio válido.' });
  }
  if (!TRACK17_TOKEN) return res.status(503).json({ error: 'Rastreio temporariamente indisponível.' });

  try {
    // Consulta pública dos códigos já cadastrados na 17TRACK, sem depender
    // do banco local. O cadastro é feito uma vez no painel da 17TRACK.
    const response = await fetch('https://api.17track.net/track/v2.4/gettrackinfo', {
      method: 'POST',
      headers: { '17token': TRACK17_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ number, lang: 'pt' }]),
    });
    const data = await response.json();
    const rejected = data?.data?.rejected?.[0];
    const tracking = data?.data?.accepted?.[0];

    if (!response.ok || !tracking) {
      const errorCode = rejected?.error?.code || data?.code;
      const message = errorCode === -18019902
        ? 'Este código ainda não foi cadastrado para rastreio.'
        : errorCode === -18019903
          ? 'Não foi possível identificar a transportadora deste código.'
          : rejected?.error?.message;
      console.error('[17TRACK] erro na consulta:', response.status, rejected?.error?.code || data?.code);
      return res.status(response.status === 429 ? 429 : errorCode === -18019912 ? 403 : 502).json({ error: message || 'Não foi possível consultar o rastreio agora.' });
    }

    res.set('Cache-Control', 'no-store');
    return res.json(publicTrackingData(number, tracking));
  } catch (error) {
    console.error('[17TRACK] erro na consulta:', error);
    return res.status(502).json({ error: 'Não foi possível consultar o rastreio agora.' });
  }
});

app.post('/api/17track/webhook', async (req, res) => {
  const signature = req.get('sign');
  const expected = TRACK17_TOKEN && crypto.createHash('sha256').update(`${req.rawBody}/${TRACK17_TOKEN}`, 'utf8').digest('hex');
  if (!signature || !expected || Buffer.byteLength(signature) !== Buffer.byteLength(expected) || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    console.warn('[17TRACK] webhook com assinatura inválida.');
    return res.sendStatus(401);
  }
  if (!db || !databaseReady) return res.sendStatus(503);

  const payload = req.body || {};
  const updates = Array.isArray(payload.data?.accepted) ? payload.data.accepted : [payload.data];
  try {
    for (const update of updates) {
      if (!update?.number) continue;
      const status = update.track_info?.latest_status?.status || (payload.event === 'TRACKING_STOPPED' ? 'Stopped' : 'InfoReceived');
      await db.query(
        'UPDATE orders SET tracking_status = $1, tracking_data = $2, updated_at = NOW() WHERE tracking_number = $3 AND ($4::INTEGER IS NULL OR tracking_carrier = $4)',
        [status, JSON.stringify(update), String(update.number).toUpperCase(), Number.isInteger(update.carrier) ? update.carrier : null],
      );
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error('[17TRACK] erro ao salvar webhook:', error);
    return res.sendStatus(500);
  }
});

function monthFilter(month, column = 'created_at') {
  if (!month) return { clause: '', values: [] };
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw Object.assign(new Error('Mês inválido.'), { status: 400 });
  return { clause: `${column} >= ($1::date::timestamp AT TIME ZONE 'America/Sao_Paulo') AND ${column} < (($1::date + INTERVAL '1 month')::timestamp AT TIME ZONE 'America/Sao_Paulo')`, values: [`${month}-01`] };
}

app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const filter = monthFilter(req.query.month);
  const values = [...filter.values];
  const where = filter.clause ? [filter.clause] : [];
  const search = String(req.query.search || '').trim();
  const status = String(req.query.status || '').trim();
  if (status) { values.push(status); where.push(`status = $${values.length}`); }
  if (search) { values.push(`%${search}%`); where.push(`(id::text ILIKE $${values.length} OR tracking_number ILIKE $${values.length} OR product_snapshot->>'name' ILIKE $${values.length} OR product ILIKE $${values.length} OR external_reference ILIKE $${values.length} OR payment_id ILIKE $${values.length} OR customer->>'name' ILIKE $${values.length} OR customer->>'email' ILIKE $${values.length} OR customer->>'phone' ILIKE $${values.length})`); }
  const result = await db.query(`SELECT * FROM orders ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at DESC LIMIT 500`, values);
  res.json(result.rows);
});

app.get('/api/admin/metrics', requireAdmin, async (req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const filter = monthFilter(req.query.month);
  const result = await db.query(`SELECT
    COUNT(*)::int AS total_orders,
    COUNT(*) FILTER (WHERE status = 'approved')::int AS approved_count,
    COALESCE(SUM(amount) FILTER (WHERE status = 'approved'), 0)::numeric AS approved_amount,
    COUNT(*) FILTER (WHERE status IN ('created','pending','in_process','authorized','in_mediation'))::int AS pending_count,
    COALESCE(SUM(amount) FILTER (WHERE status IN ('created','pending','in_process','authorized','in_mediation')), 0)::numeric AS pending_amount,
    COUNT(*) FILTER (WHERE status IN ('rejected','error','charged_back'))::int AS failed_count,
    COALESCE(SUM(amount) FILTER (WHERE status IN ('rejected','error','charged_back')), 0)::numeric AS failed_amount,
    COUNT(*) FILTER (WHERE status IN ('cancelled','refunded'))::int AS cancelled_count
    FROM orders ${filter.clause ? `WHERE ${filter.clause}` : ''}`, filter.values);
  const top = await db.query(`SELECT product, SUM(quantity)::int AS quantity FROM orders WHERE status = 'approved' ${filter.clause ? `AND ${filter.clause}` : ''} GROUP BY product ORDER BY quantity DESC LIMIT 1`, filter.values);
  const monthly = await db.query(`SELECT month, COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::numeric AS amount,
      COUNT(*) FILTER (WHERE origin = 'site')::int AS site_count,
      COUNT(*) FILTER (WHERE origin = 'whatsapp')::int AS whatsapp_count
    FROM (
      SELECT TO_CHAR(date_trunc('month', COALESCE(purchased_at, created_at) AT TIME ZONE 'America/Sao_Paulo'), 'YYYY-MM') AS month, amount, 'site' AS origin
      FROM orders
      UNION ALL
      SELECT TO_CHAR(date_trunc('month', sale_date), 'YYYY-MM'), amount, 'whatsapp'
      FROM financial_legacy_sales WHERE sale_date IS NOT NULL
    ) entries GROUP BY month ORDER BY month`);
  const origins = await db.query(`SELECT origin, COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::numeric AS amount
    FROM (
      SELECT amount, 'site' AS origin FROM orders
      UNION ALL
      SELECT amount, 'whatsapp' FROM financial_legacy_sales WHERE sale_date IS NOT NULL
    ) entries GROUP BY origin ORDER BY origin`);
  const paymentMethods = await db.query(`SELECT COALESCE(NULLIF(payment_method, ''), 'Não informado') AS method,
      COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::numeric AS amount
    FROM (
      SELECT payment_method, amount FROM orders
      UNION ALL
      SELECT payment_method, amount FROM financial_legacy_sales WHERE sale_date IS NOT NULL
    ) entries GROUP BY 1 ORDER BY amount DESC`);
  return res.json({
    ...result.rows[0],
    top_product: top.rows[0] || null,
    monthly: monthly.rows,
    origins: origins.rows,
    payment_methods: paymentMethods.rows,
  });
});

app.get('/api/admin/financial-analysis', requireAdmin, async (_req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const result = await db.query(`SELECT TO_CHAR(month, 'YYYY-MM') AS month, SUM(orders_count)::int AS orders_count, SUM(orders_amount)::numeric AS orders_amount, SUM(legacy_count)::int AS legacy_count, SUM(legacy_amount)::numeric AS legacy_amount,
    SUM(orders_count + legacy_count)::int AS total_count, SUM(orders_amount + legacy_amount)::numeric AS total_amount
    FROM (SELECT date_trunc('month', COALESCE(o.purchased_at, o.created_at) AT TIME ZONE 'America/Sao_Paulo') AS month,
      COUNT(*)::int AS orders_count, COALESCE(SUM(o.amount),0)::numeric AS orders_amount,
      0::int AS legacy_count, 0::numeric AS legacy_amount FROM orders o WHERE o.status = 'approved' GROUP BY 1
      UNION ALL SELECT date_trunc('month', sale_date), 0, 0, COUNT(*)::int, COALESCE(SUM(amount),0)::numeric
      FROM financial_legacy_sales WHERE sale_date IS NOT NULL GROUP BY 1) grouped
    GROUP BY month ORDER BY month DESC`);
  const clients = await db.query(`SELECT month, jsonb_agg(client ORDER BY name) AS clients FROM (
    SELECT TO_CHAR(date_trunc('month', sale_date), 'YYYY-MM') AS month,
      customer || jsonb_build_object('product', product, 'amount', amount, 'origin', 'importado', 'payment_method', payment_method, 'record_id', id, 'record_type', 'legacy', 'sale_date', TO_CHAR(sale_date, 'YYYY-MM-DD')) AS client,
      COALESCE(customer->>'name','') AS name FROM financial_legacy_sales WHERE sale_date IS NOT NULL
    UNION ALL
    SELECT TO_CHAR(date_trunc('month', COALESCE(purchased_at, created_at) AT TIME ZONE 'America/Sao_Paulo'), 'YYYY-MM') AS month,
      customer || jsonb_build_object('product', product, 'amount', amount, 'origin', 'pedido atual', 'payment_method', payment_method, 'record_id', id, 'record_type', 'order', 'sale_date', TO_CHAR(COALESCE(purchased_at, created_at) AT TIME ZONE 'America/Sao_Paulo', 'YYYY-MM-DD')) AS client,
      COALESCE(customer->>'name','') AS name FROM orders WHERE status = 'approved'
  ) grouped_clients GROUP BY month`);
  const clientsByMonth = Object.fromEntries(
    clients.rows.map(row => [String(row.month), Array.isArray(row.clients) ? row.clients.filter(Boolean) : []]),
  );
  return res.json(result.rows.map(row => ({
    ...row,
    clients: clientsByMonth[String(row.month)] || [],
  })));
});

app.put('/api/admin/financial-analysis/:type/:id', requireAdmin, async (req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const type = String(req.params.type);
  const id = Number(req.params.id);
  const product = typeof req.body?.product === 'string' ? req.body.product.trim() : '';
  const amount = Number(req.body?.amount);
  const saleDate = String(req.body?.sale_date || '');
  const customer = req.body?.customer;
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(saleDate) && Number.isFinite(Date.parse(saleDate)) && new Date(saleDate).toISOString().slice(0, 10) === saleDate;
  if (!['legacy', 'order'].includes(type) || !Number.isInteger(id) || id < 1 || !product || !Number.isFinite(amount) || amount < 0 || !validDate || !customer || typeof customer !== 'object' || Array.isArray(customer)) {
    return res.status(400).json({ error: 'Dados financeiros inválidos.' });
  }
  const table = type === 'legacy' ? 'financial_legacy_sales' : 'orders';
  const result = type === 'legacy'
    ? await db.query(`UPDATE ${table} SET sale_date = $1, product = $2, customer = $3, amount = $4 WHERE id = $5 RETURNING id`, [saleDate, product, JSON.stringify(customer), amount, id])
    : await db.query(`UPDATE ${table} SET purchased_at = $1::date, product = $2, customer = $3, amount = $4, updated_at = NOW() WHERE id = $5 AND status = 'approved' RETURNING id`, [saleDate, product, JSON.stringify(customer), amount, id]);
  if (!result.rowCount) return res.status(404).json({ error: 'Lançamento financeiro não encontrado.' });
  return res.json({ ok: true });
});

app.delete('/api/admin/financial-analysis/:type/:id', requireAdmin, async (req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const type = String(req.params.type);
  const id = Number(req.params.id);
  if (!['legacy', 'order'].includes(type) || !Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Lançamento financeiro inválido.' });
  }
  const table = type === 'legacy' ? 'financial_legacy_sales' : 'orders';
  const result = type === 'legacy'
    ? await db.query(`DELETE FROM ${table} WHERE id = $1 RETURNING id`, [id])
    : await db.query(`DELETE FROM ${table} WHERE id = $1 AND status = 'approved' RETURNING id`, [id]);
  if (!result.rowCount) return res.status(404).json({ error: 'Lançamento financeiro não encontrado.' });
  return res.json({ ok: true });
});

app.post('/api/admin/financial-analysis/import', requireAdmin, async (req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const rows = Array.isArray(req.body?.rows) ? req.body.rows : [];
  if (!rows.length || rows.length > 5000) return res.status(400).json({ error: 'Envie entre 1 e 5000 registros.' });
  const keys = new Set();
  for (const row of rows) {
    if (!row || typeof row.source_sheet !== 'string' || !row.source_sheet.trim()
      || !Number.isInteger(row.source_row) || row.source_row < 1
      || typeof row.product !== 'string' || !row.product.trim()
      || typeof row.amount !== 'number' || !Number.isFinite(row.amount) || row.amount < 0
      || (row.commission != null && (typeof row.commission !== 'number' || !Number.isFinite(row.commission) || row.commission < 0))
      || (row.paid != null && typeof row.paid !== 'boolean')
      || (row.payment_method != null && (typeof row.payment_method !== 'string' || row.payment_method.length > 120))
      || (row.customer != null && (typeof row.customer !== 'object' || Array.isArray(row.customer)))
      || (row.sale_date != null && (!/^\d{4}-\d{2}-\d{2}$/.test(row.sale_date) || !Number.isFinite(Date.parse(row.sale_date)) || new Date(row.sale_date).toISOString().slice(0, 10) !== row.sale_date))) return res.status(400).json({ error: 'Registro financeiro inválido. Nenhuma alteração foi aplicada.' });
    const key = JSON.stringify([row.source_sheet.trim(), row.source_row]);
    if (keys.has(key)) return res.status(400).json({ error: 'Origem e linha duplicadas no lote.' });
    keys.add(key);
  }
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    if (req.body?.replace === true) await client.query('DELETE FROM financial_legacy_sales');
    if (req.body?.replace_source_sheet && req.body.replace !== true) await client.query('DELETE FROM financial_legacy_sales WHERE source_sheet = $1', [String(req.body.replace_source_sheet)]);
    if (req.body?.replace_month && req.body.replace !== true) await client.query("DELETE FROM financial_legacy_sales WHERE sale_date >= ($1 || '-01')::date AND sale_date < (($1 || '-01')::date + INTERVAL '1 month')", [String(req.body.replace_month)]);
    for (const row of rows) {
      await client.query(`INSERT INTO financial_legacy_sales (source_sheet, source_row, sale_date, product, customer, amount, commission, paid, payment_method)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (source_sheet, source_row) DO UPDATE SET sale_date=EXCLUDED.sale_date, product=EXCLUDED.product, customer=EXCLUDED.customer, amount=EXCLUDED.amount, commission=EXCLUDED.commission, paid=EXCLUDED.paid, payment_method=EXCLUDED.payment_method`,
        [row.source_sheet.trim(), row.source_row, row.sale_date || null, row.product, JSON.stringify(row.customer || {}), row.amount, row.commission ?? null, row.paid ?? null, row.payment_method?.trim() || null]);
    }
    await client.query('COMMIT');
  } catch (error) { await client.query('ROLLBACK'); throw error; }
  finally { client.release(); }
  return res.json({ imported: rows.length });
});

app.post('/api/admin/orders/:id/tracking', requireAdmin, async (req, res) => {
  if (!db || !databaseReady || !TRACK17_TOKEN) return res.status(503).json({ error: 'Banco ou 17TRACK não configurado' });

  const number = String(req.body?.number || '').trim().toUpperCase();
  const carrier = Number(req.body?.carrier);
  if (!isTrackingNumber(number)) return res.status(400).json({ error: 'Informe um código de rastreio válido.' });
  if (!Number.isInteger(carrier) || carrier <= 0) return res.status(400).json({ error: 'Informe o código numérico da transportadora.' });

  const order = await db.query('SELECT id FROM orders WHERE id = $1', [req.params.id]);
  if (order.rowCount === 0) return res.status(404).json({ error: 'Pedido não encontrado.' });

  try {
    const response = await fetch('https://api.17track.net/track/v2.4/register', {
      method: 'POST',
      headers: { '17token': TRACK17_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ number, carrier, lang: 'pt', tag: String(req.params.id) }]),
    });
    const data = await response.json();
    const rejected = data?.data?.rejected?.[0];
    const accepted = data?.data?.accepted?.[0];
    // Código já registrado ainda pode ser associado ao pedido local.
    if (!response.ok || (!accepted && rejected?.error?.code !== -18019901)) {
      return res.status(502).json({ error: rejected?.error?.message || 'A 17TRACK não aceitou o código.' });
    }
    await db.query(
      'UPDATE orders SET tracking_number = $1, tracking_carrier = $2, tracking_status = $3, tracking_data = NULL, updated_at = NOW() WHERE id = $4',
      [number, carrier, 'InfoReceived', req.params.id],
    );
    return res.json({ ok: true });
  } catch (error) {
    console.error('[17TRACK] erro ao registrar:', error);
    return res.status(502).json({ error: 'Não foi possível registrar o rastreio.' });
  }
});

function productInput(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const sku = String(body?.sku || '').trim().toLowerCase();
  const slug = String(body?.slug || sku).trim().toLowerCase();
  const price = Number(body?.price);
  const promotionalPrice = body?.promotional_price === '' || body?.promotional_price == null ? null : Number(body.promotional_price);
  const stock = body?.stock == null || body.stock === '' ? null : Number(body.stock);
  const validKey = key => /^[a-z0-9][a-z0-9_-]{2,120}$/.test(key);
  if (!name || !validKey(sku) || !validKey(slug) || !Number.isFinite(price) || price <= 0 || price > 9999999999.99
    || (promotionalPrice != null && (!Number.isFinite(promotionalPrice) || promotionalPrice <= 0 || promotionalPrice > price))
    || (stock != null && (!Number.isInteger(stock) || stock < 0 || stock > 2147483647))
    || (body.active != null && typeof body.active !== 'boolean')) return null;
  return { name, description: String(body.description || ''), image: body.image ? String(body.image) : null, sku, slug, price, promotionalPrice, category: body.category ? String(body.category) : null, stock, active: body.active !== false };
}
app.get('/api/admin/products', requireAdmin, async (_req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const result = await db.query('SELECT * FROM products ORDER BY updated_at DESC');
  return res.json(result.rows);
});
app.post('/api/admin/products', requireAdmin, async (req, res) => {
  const p = productInput(req.body);
  if (!p) return res.status(400).json({ error: 'Produto inválido: nome, SKU e preço são obrigatórios; promoção deve ser menor que o preço.' });
  try { const result = await db.query('INSERT INTO products (name,description,image,sku,slug,price,promotional_price,category,stock,active) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [p.name,p.description,p.image,p.sku,p.slug,p.price,p.promotionalPrice,p.category,p.stock,p.active]); return res.status(201).json(result.rows[0]); } catch (error) { if (error.code === '23505') return res.status(409).json({ error: 'SKU ou link público já existe.' }); throw error; }
});
app.post('/api/admin/products/quick', requireAdmin, async (req, res) => {
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const modelId = Number(req.body?.model_id);
  const price = Number(req.body?.price);
  const promo = req.body?.promotional_price === '' || req.body?.promotional_price == null ? null : Number(req.body.promotional_price);
  const stock = req.body?.stock == null || req.body.stock === '' ? null : Number(req.body.stock);
  if (!Number.isInteger(modelId) || modelId <= 0 || !Number.isFinite(price) || price <= 0 || (promo != null && (!Number.isFinite(promo) || promo <= 0 || promo > price)) || (stock != null && (!Number.isInteger(stock) || stock < 0))) return res.status(400).json({ error: 'Modelo, preço, promoção ou estoque inválidos.' });
  const model = await db.query('SELECT * FROM products WHERE id=$1 AND source_product_id IS NULL', [modelId]);
  if (!model.rowCount) return res.status(404).json({ error: 'Modelo original não encontrado.' });
  const source = model.rows[0];
  const suffix = crypto.randomUUID().slice(0, 8);
  const sku = String(req.body?.sku || `${source.sku}-oferta-${suffix}`).trim().toLowerCase();
  const slug = String(req.body?.slug || `${source.slug}-oferta-${suffix}`).trim().toLowerCase();
  if (!productInput({ ...source, ...req.body, promotional_price: promo, stock, sku, slug })) return res.status(400).json({ error: 'Dados da oferta inválidos.' });
  try {
    const result = await db.query(`INSERT INTO products (name,description,image,sku,slug,price,promotional_price,category,stock,active,source_product_id,product_kind) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'offer') RETURNING *`, [source.name, source.description, source.image, sku, slug, price, promo, source.category, stock, req.body?.active !== false, source.id]);
    return res.status(201).json(result.rows[0]);
  } catch (error) { if (error.code === '23505') return res.status(409).json({ error: 'SKU ou link público já existe.' }); throw error; }
});
app.put('/api/admin/products/:id', requireAdmin, async (req, res) => {
  const p = productInput(req.body); if (!p) return res.status(400).json({ error: 'Dados do produto inválidos.' });
  const existing = await db.query('SELECT sku, slug FROM products WHERE id=$1', [req.params.id]);
  if (!existing.rowCount) return res.status(404).json({ error: 'Produto não encontrado.' });
  if (existing.rows[0].sku !== p.sku || existing.rows[0].slug !== p.slug) return res.status(409).json({ error: 'SKU e link público são estáveis. Crie uma oferta para gerar outro link.' });
  try { const result = await db.query('UPDATE products SET name=$1,description=$2,image=$3,sku=$4,slug=$5,price=$6,promotional_price=$7,category=$8,stock=$9,active=$10,updated_at=NOW() WHERE id=$11 AND sku=$4 AND slug=$5 RETURNING *', [p.name,p.description,p.image,p.sku,p.slug,p.price,p.promotionalPrice,p.category,p.stock,p.active,req.params.id]); if (!result.rowCount) return res.status(404).json({ error: 'Produto não encontrado.' }); return res.json(result.rows[0]); } catch (error) { if (error.code === '23505') return res.status(409).json({ error: 'SKU ou link público já existe.' }); throw error; }
});
app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const product = await client.query('SELECT id, sku FROM products WHERE id=$1 FOR UPDATE', [req.params.id]);
    if (!product.rowCount) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'Produto não encontrado.' }); }
    const used = await client.query("SELECT 1 FROM orders WHERE product_snapshot->>'product_id' = $1 OR product = $2 LIMIT 1", [String(req.params.id), product.rows[0].sku]);
    const offers = await client.query('SELECT 1 FROM products WHERE source_product_id=$1 LIMIT 1', [req.params.id]);
    if (used.rowCount || offers.rowCount) { await client.query('ROLLBACK'); return res.status(409).json({ error: 'Produto possui pedidos ou ofertas vinculadas; desative-o para preservar os dados.' }); }
    await client.query('DELETE FROM products WHERE id=$1', [req.params.id]);
    await client.query('COMMIT');
    return res.json({ ok: true });
  } catch (error) { await client.query('ROLLBACK'); throw error; }
  finally { client.release(); }
});
app.get('/api/products/:slug', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!db || !databaseReady) return res.status(503).json({ error: 'Catálogo temporariamente indisponível.' });
  const p = await resolveCheckoutProduct(req.params.slug);
  if (!p) return res.status(404).json({ error: 'Produto não encontrado.' });
  return res.json({ ...p, available: publicProductAvailable(p) });
});

app.post('/api/admin/test-order', requireAdmin, async (req, res) => {
  if (!MP_ACCESS_TOKEN || !db || !databaseReady) return res.status(503).json({ error: 'Mercado Pago ou banco não configurado' });
  if (!MP_ACCESS_TOKEN.startsWith('TEST-')) return res.status(403).json({ error: 'Pedido de teste disponível somente com credenciais de teste.' });
  return res.json({ checkoutUrl: `${FRONTEND_URL}/#/finalizar/galinha-pintadinha` });
});

/* ----------------------- Helpers: normalizaÃ§Ã£o/hash ------------------------ */
function sha256Hex(str) {
  return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}
function normEmail(e) {
  return e?.trim().toLowerCase();
}
function normPhoneBR(p) {
  // exemplo simples: keep digits; ajuste conforme seu pÃºblico
  return (p || '').replace(/\D+/g, '');
}

/* -------------------- Endpoint: disparo de Purchase (CAPI) ----------------- */
app.post('/api/meta/capi/purchase', async (req, res) => {
  const {
    event_source_url,
    user_data = {}, // esperado: { fbc, fbp, em?, ph?, external_id? }
  } = req.body || {};

  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível.' });
  const reference = req.body?.external_reference;
  if (typeof reference !== 'string' || !/-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(reference)) return res.status(400).json({ error: 'Informe a referência do pedido confirmado.' });
  const orderResult = await db.query("SELECT amount, product, quantity, payment_id FROM orders WHERE external_reference=$1 AND status='approved'", [reference]);
  if (!orderResult.rowCount) return res.status(409).json({ error: 'Pagamento ainda não aprovado.' });
  const order = orderResult.rows[0];
  const value = Number(order.amount);
  const currency = 'BRL';
  const contents = [{ id: order.product, quantity: order.quantity }];
  const event_id = `purchase-${order.payment_id}`;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: 'META_PIXEL_ID ou META_ACCESS_TOKEN nÃ£o configurados' });
  }

  // Monte user_data conforme boas prÃ¡ticas
  const ud = {
    // NÃƒO hashear fbc/fbp
    fbc: user_data.fbc || req.cookies?._fbc && decodeURIComponent(req.cookies._fbc),
    fbp: user_data.fbp, // normalmente vem do Pixel (_fbp)

    // Melhora de match server-side:
    client_user_agent: req.headers['user-agent'],
    client_ip_address: req.ip,

    // Identificadores opcionais com consentimento â€” envie hasheados:
    // (se vierem em claro do front, normalize e hasheie aqui)
    ...(user_data.em
      ? { em: Array.isArray(user_data.em) ? user_data.em.map(e => sha256Hex(normEmail(e))) : [sha256Hex(normEmail(user_data.em))] }
      : {}),
    ...(user_data.ph
      ? { ph: Array.isArray(user_data.ph) ? user_data.ph.map(p => sha256Hex(normPhoneBR(p))) : [sha256Hex(normPhoneBR(user_data.ph))] }
      : {}),
    ...(user_data.external_id ? { external_id: user_data.external_id } : {}),
  };

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000), // segundos UNIX
        event_id,                                   // dedupe com o Pixel
        event_source_url,
        action_source: 'website',
        user_data: ud,
        custom_data: {
          value,                 // number
          currency,              // 'BRL'
          contents,              // ideal incluir content_ids e content_type
          // content_ids: ['sku-123'],
          // content_type: 'product',
        },
      },
    ],
    // Para testar no Events Manager sem impactar produÃ§Ã£o
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  try {
    const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const fbRes = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    const result = await fbRes.json();

    // log Ãºtil de debug
    if (result.fbtrace_id) {
      console.log('[Meta CAPI] fbtrace_id:', result.fbtrace_id);
    }
    if (result.messages?.length) {
      console.log('[Meta CAPI] messages:', result.messages);
    }

    res.status(fbRes.ok ? 200 : 400).json(result);
  } catch (err) {
    console.error('Erro ao enviar para Meta:', err);
    res.status(500).json({ error: 'Erro no envio ao Facebook' });
  }
});

/* ------------------------------ Endpoints debug ---------------------------- */
// Ver cookies que o servidor enxerga (_fbc)
app.get('/debug/cookies', requireAdmin, (req, res) => {
  res.json({ cookies: req.cookies, note: 'Se usar HashRouter, o fbclid nÃ£o vem; o front deve setar _fbc.' });
});

// Healthcheck
app.get('/health', (_, res) => res.send('OK'));
app.get('/ready', async (_req, res) => {
  if (!db || !databaseReady) return res.sendStatus(503);
  try { await db.query('SELECT 1'); return res.sendStatus(200); }
  catch { return res.sendStatus(503); }
});

/* --------------------------------- Start ---------------------------------- */
app.use((error, _req, res, _next) => {
  console.error('[API] falha:', error.code || error.message);
  return res.status(error.status === 400 || error.type === 'entity.parse.failed' ? 400 : 500).json({ error: error.type === 'entity.parse.failed' ? 'JSON inválido.' : 'Não foi possível concluir a operação.' });
});
return { app, initDatabase, close: () => db?.end?.() };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  dotenv.config({ path: join(backendDir, '.env') });
  const { app, initDatabase } = createApp();
  await initDatabase();
  app.listen(process.env.PORT || 3001, () => console.log('Backend Fonovital iniciado.'));
}
