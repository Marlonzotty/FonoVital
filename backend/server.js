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
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true); // permite obter o IP real atrÃ¡s de proxy/CDN

const PORT = process.env.PORT || 3001;
const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || ""; // opcional p/ testar no Events Manager
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const BACKEND_PUBLIC_URL = process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 3001}`;
const ADMIN_KEY = process.env.ADMIN_KEY;
const db = process.env.DATABASE_URL ? new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }) : null;

async function initDatabase() {
  if (!db) return;
  await db.query('CREATE TABLE IF NOT EXISTS orders (id BIGSERIAL PRIMARY KEY, external_reference TEXT UNIQUE, product TEXT NOT NULL, customer JSONB NOT NULL, amount NUMERIC NOT NULL, status TEXT NOT NULL DEFAULT \'created\', payment_id TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
  await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS status_detail TEXT');
  await db.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS webhook_received_at TIMESTAMPTZ');
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
    if (db) await db.query('INSERT INTO orders (external_reference, product, customer, amount) VALUES ($1,$2,$3,$4) ON CONFLICT (external_reference) DO NOTHING', [data.external_reference, product.sku, JSON.stringify({ name, email, cpf, phone, zipCode, street, number, complement, neighborhood, city, state }), product.price]);
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

app.get('/api/admin/orders', async (req, res) => {
  if (!ADMIN_KEY || req.get('x-admin-key') !== ADMIN_KEY) return res.status(401).json({ error: 'NÃ£o autorizado' });
  if (!db) return res.status(503).json({ error: 'DATABASE_URL nÃ£o configurada' });
  const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 200');
  res.json(result.rows);
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
