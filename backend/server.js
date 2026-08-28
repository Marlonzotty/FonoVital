// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const backendDir = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(backendDir, '.env') });

const app = express();
app.use(cors());
app.use(express.json({ verify: (req, _, buffer) => { req.rawBody = buffer.toString('utf8'); } }));
app.use(cookieParser());
app.set('trust proxy', true); // permite obter o IP real atrÃ¡s de proxy/CDN

const PORT = process.env.PORT || 3001;
const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || ""; // opcional p/ testar no Events Manager
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
// Mantenha esta chave somente no ambiente do backend (Render/cloud). Nunca a
// exponha como VITE_ no frontend.
const TRACK17_TOKEN = process.env.TRACK17_TOKEN;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const BACKEND_PUBLIC_URL = process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 3001}`;
const ADMIN_KEY = process.env.ADMIN_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_SSL = process.env.DATABASE_SSL === 'true'
  || (process.env.DATABASE_SSL !== 'false' && DATABASE_URL && !/localhost|127\.0\.0\.1/.test(DATABASE_URL));
const db = DATABASE_URL
  ? new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_SSL ? { rejectUnauthorized: false } : false,
    })
  : null;
let databaseReady = !db;

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
    databaseReady = true;
  } catch (error) {
    databaseReady = false;
    console.error('[DB] indisponível; checkout continuará sem registrar pedidos:', error);
  }
}

// PreÃ§os e produtos ficam no servidor para impedir que o navegador altere o valor cobrado.
const checkoutProducts = {
  voicepro: { title: 'VoicePro Profissional Digital | Fonovital', price: 1499.0, sku: 'voicepro' },
  voxton: { title: 'Voxton Mini CIC | Fonovital', price: 599.9, sku: 'voxton' },
  'voxton-direito': { title: 'Voxton Mini CIC - Lado Direito | Fonovital', price: 399.9, sku: 'voxton-direito' },
  'voxton-esquerdo': { title: 'Voxton Mini CIC - Lado Esquerdo | Fonovital', price: 399.9, sku: 'voxton-esquerdo' },
  iavoice: { title: 'IAvoice InteligÃªncia Auditiva | Fonovital', price: 1699.9, sku: 'iavoice' },
  smartvoice: { title: 'SmartVoice CIC Bluetooth MagnÃ©tico | Fonovital', price: 1399.9, sku: 'smartvoice' },
  softvoice: { title: 'SoftVoice RecarregÃ¡vel 16 Canais | Fonovital', price: 2699.9, sku: 'softvoice' },
  vitalair: { title: 'Vital Air Bluetooth Inteligente | Fonovital', price: 1999.0, sku: 'vitalair' },
  vitalvoice: { title: 'VitalVoice | Fonovital', price: 1399.9, sku: 'vitalvoice' },
  'galinha-pintadinha': { title: 'Galinha Pintadinha | Fonovital', price: 1.0, sku: 'galinha-pintadinha' },
};

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
app.get('/api/checkout/:product', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const product = checkoutProducts[req.params.product];
  if (!product) return res.status(404).json({ error: 'Produto nÃ£o encontrado' });
  if (!MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: 'MP_ACCESS_TOKEN nÃ£o configurado no backend' });
  }

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{
          id: product.sku,
          title: product.title,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: product.price,
        }],
        // Produtos fÃ­sicos: o Checkout Pro coleta o endereÃ§o do comprador.
        shipments: {
          local_pickup: false,
          free_shipping: true,
        },
        back_urls: {
          success: `${FRONTEND_URL}/#/pagamento/sucesso`,
          pending: `${FRONTEND_URL}/#/pagamento/pendente`,
          failure: `${FRONTEND_URL}/#/pagamento/falha`,
        },
        external_reference: `${product.sku}-${Date.now()}`,
        notification_url: `${BACKEND_PUBLIC_URL}/api/mercadopago/webhook`,
      }),
    });
    const data = await response.json();
    const checkoutUrl = MP_ACCESS_TOKEN.startsWith('TEST-') ? data.sandbox_init_point : data.init_point;
    if (!response.ok || !checkoutUrl) {
      console.error('[Mercado Pago] erro ao criar preferÃªncia:', data);
      return res.status(502).json({ error: 'NÃ£o foi possÃ­vel criar o checkout' });
    }
    if (db && databaseReady && product.sku === 'galinha-pintadinha') {
      await db.query(
        'INSERT INTO orders (external_reference, product, customer, amount) VALUES ($1,$2,$3,$4) ON CONFLICT (external_reference) DO NOTHING',
        [data.external_reference, product.sku, JSON.stringify({ name: 'Teste Webhook', email: 'teste@fonovital.com.br', cpf: '', phone: '', zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' }), product.price],
      );
    }
    return res.redirect(303, checkoutUrl);
  } catch (error) {
    console.error('[Mercado Pago] erro:', error);
    return res.status(500).json({ error: 'Erro ao iniciar o checkout' });
  }
});

app.post('/api/checkout/:product', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const product = checkoutProducts[req.params.product];
  if (!product) return res.status(404).json({ error: 'Produto nÃ£o encontrado' });
  if (!MP_ACCESS_TOKEN) return res.status(503).json({ error: 'MP_ACCESS_TOKEN nÃ£o configurado no backend' });
  const { name, email, cpf, phone, zipCode, street, number, complement, neighborhood, city, state } = req.body || {};
  if (!name || !email || !cpf || !phone || !zipCode || !street || !number || !neighborhood || !city || !state) {
    return res.status(400).json({ error: 'Preencha todos os dados obrigatÃ³rios' });
  }
  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ id: product.sku, title: product.title, quantity: 1, currency_id: 'BRL', unit_price: product.price }],
        // O endereÃ§o Ã© coletado no formulÃ¡rio da Fonovital. Mantemos a
        // preferÃªncia simples para evitar a indisponibilidade do Checkout Pro
        // causada por dados de payer/shipments incompatÃ­veis com a conta.
        back_urls: { success: `${FRONTEND_URL}/#/pagamento/sucesso`, pending: `${FRONTEND_URL}/#/pagamento/pendente`, failure: `${FRONTEND_URL}/#/pagamento/falha` },
        external_reference: `${product.sku}-${Date.now()}`,
        notification_url: `${BACKEND_PUBLIC_URL}/api/mercadopago/webhook`,
      }),
    });
    const data = await response.json();
    const checkoutUrl = MP_ACCESS_TOKEN.startsWith('TEST-') ? data.sandbox_init_point : data.init_point;
    if (!response.ok || !checkoutUrl) return res.status(502).json({ error: 'NÃ£o foi possÃ­vel criar o checkout', details: data });
    if (db && databaseReady) {
      try {
        await db.query('INSERT INTO orders (external_reference, product, customer, amount) VALUES ($1,$2,$3,$4) ON CONFLICT (external_reference) DO NOTHING', [data.external_reference, product.sku, JSON.stringify({ name, email, cpf, phone, zipCode, street, number, complement, neighborhood, city, state }), product.price]);
      } catch (dbError) {
        console.warn('[DB] pedido não registrado; checkout continuará normalmente:', dbError?.code || dbError?.message || dbError);
      }
    }
    return res.json({ checkoutUrl });
  } catch (error) {
    console.error('[Mercado Pago] erro:', error);
    return res.status(500).json({ error: 'Erro ao iniciar o checkout' });
  }
});

app.post('/api/mercadopago/webhook', async (req, res) => {
  const payload = req.body || {};
  const eventType = payload.type || payload.topic || payload.action;
  const paymentId = payload.data?.id || payload['data.id'] || (payload.type === 'payment' ? payload.id : null);

  console.log('[Mercado Pago] webhook recebido:', JSON.stringify({ eventType, paymentId }));

  // O Mercado Pago pode enviar outros eventos. Eles devem receber 200 para
  // evitar retentativas desnecessárias; apenas eventos de pagamento seguem adiante.
  if (eventType !== 'payment' || !paymentId) return res.sendStatus(200);
  if (!MP_ACCESS_TOKEN) return res.sendStatus(200);

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    const payment = await response.json();
    if (!response.ok) {
      console.error('[Mercado Pago] não foi possível consultar pagamento:', payment);
      return res.sendStatus(200);
    }

    const externalReference = payment.external_reference;
    if (!db || !externalReference) {
      console.warn('[Mercado Pago] pagamento sem external_reference:', paymentId);
      return res.sendStatus(200);
    }

    const result = await db.query(
      `UPDATE orders
       SET status = $1, status_detail = $2, payment_id = $3,
           purchased_at = CASE WHEN $1 IN ('approved', 'authorized') THEN COALESCE(purchased_at, NOW()) ELSE purchased_at END,
           webhook_received_at = NOW(), updated_at = NOW()
       WHERE external_reference = $4
       RETURNING id, external_reference, status`,
      [payment.status || 'unknown', payment.status_detail || null, String(payment.id), externalReference],
    );

    if (result.rowCount === 0) {
      console.warn('[Mercado Pago] pedido não encontrado:', externalReference);
    } else {
      console.log('[Mercado Pago] pedido atualizado:', result.rows[0]);
    }
  } catch (error) {
    console.error('[Mercado Pago] erro ao processar webhook:', error);
  }

  // A notificação foi recebida. O processamento é idempotente e pode ser
  // repetido caso o Mercado Pago envie a mesma notificação novamente.
  res.sendStatus(200);
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

app.get('/api/admin/orders', async (req, res) => {
  if (!ADMIN_KEY || req.get('x-admin-key') !== ADMIN_KEY) return res.status(401).json({ error: 'NÃ£o autorizado' });
  if (!db || !databaseReady) return res.status(503).json({ error: 'Banco de dados indisponível' });
  const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 200');
  res.json(result.rows);
});

app.post('/api/admin/orders/:id/tracking', async (req, res) => {
  if (!ADMIN_KEY || req.get('x-admin-key') !== ADMIN_KEY) return res.status(401).json({ error: 'Não autorizado' });
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

app.post('/api/admin/test-order', async (req, res) => {
  if (!ADMIN_KEY || req.get('x-admin-key') !== ADMIN_KEY) return res.status(401).json({ error: 'Não autorizado' });
  if (!MP_ACCESS_TOKEN || !db || !databaseReady) return res.status(503).json({ error: 'Mercado Pago ou banco não configurado' });
  const product = checkoutProducts['teste-webhook'];
  const externalReference = `${product.sku}-${Date.now()}`;
  const customer = { name: 'Teste Webhook', email: 'teste@fonovital.com.br', cpf: '', phone: '', zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' };
  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', { method: 'POST', headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: product.sku, title: product.title, quantity: 1, currency_id: 'BRL', unit_price: product.price }], back_urls: { success: `${FRONTEND_URL}/#/pagamento/sucesso`, pending: `${FRONTEND_URL}/#/pagamento/pendente`, failure: `${FRONTEND_URL}/#/pagamento/falha` }, external_reference: externalReference, notification_url: `${BACKEND_PUBLIC_URL}/api/mercadopago/webhook` }) });
    const data = await response.json();
    const checkoutUrl = MP_ACCESS_TOKEN.startsWith('TEST-') ? data.sandbox_init_point : data.init_point;
    if (!response.ok || !checkoutUrl) return res.status(502).json({ error: 'Não foi possível criar o produto de teste' });
    await db.query('INSERT INTO orders (external_reference, product, customer, amount) VALUES ($1,$2,$3,$4)', [externalReference, product.sku, JSON.stringify(customer), product.price]);
    res.json({ checkoutUrl });
  } catch (error) { console.error('[Admin] erro ao criar teste:', error); res.status(500).json({ error: 'Erro ao criar pedido de teste' }); }
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
    value,
    currency,
    contents,
    event_id,
    event_source_url,
    user_data = {}, // esperado: { fbc, fbp, em?, ph?, external_id? }
  } = req.body || {};

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
app.get('/debug/cookies', (req, res) => {
  res.json({ cookies: req.cookies, note: 'Se usar HashRouter, o fbclid nÃ£o vem; o front deve setar _fbc.' });
});

// Healthcheck
app.get('/health', (_, res) => res.send('OK'));

/* --------------------------------- Start ---------------------------------- */
app.listen(PORT, () => {
  console.log(`ðŸš€ Backend rodando em http://localhost:${PORT}`);
  initDatabase().catch((error) => console.error('[DB] erro ao inicializar:', error));
});
