import { PGlite } from '@electric-sql/pglite';
import { createApp } from '../../backend/server.js';

export async function harness() {
  const postgres = await PGlite.create();
  let queue = Promise.resolve();
  async function acquire() {
    const previous = queue;
    let release;
    queue = new Promise(resolve => { release = resolve; });
    await previous;
    return release;
  }
  async function query(sql, params) {
    if (!params && sql.includes(';')) { await postgres.exec(sql); return { rows: [], rowCount: 0 }; }
    const result = await postgres.query(sql, params);
    return { ...result, rowCount: result.affectedRows || result.rows.length };
  }
  const database = {
    async query(sql, params) { const release = await acquire(); try { return await query(sql, params); } finally { release(); } },
    async connect() { const release = await acquire(); return { query, release }; },
  };
  const payments = new Map();
  const preferences = [];
  let failProvider = false;
  const fetchProvider = async (url, options) => {
    if (failProvider) return { ok: false, json: async () => ({ error: 'Unavailable' }) };
    if (url.endsWith('/checkout/preferences')) {
      const body = JSON.parse(options.body);
      preferences.push(body);
      return { ok: true, json: async () => ({ id: `pref-${preferences.length}`, sandbox_init_point: 'https://sandbox.mercadopago.com.br/checkout/test' }) };
    }
    const payment = payments.get(url.split('/').pop());
    return { ok: Boolean(payment), json: async () => payment || {} };
  };
  const { app, initDatabase } = createApp({ database, fetch: fetchProvider, env: { ADMIN_KEY: 'test-admin-key', MP_ACCESS_TOKEN: 'TEST-fixture', FRONTEND_URL: 'http://localhost:5173' } });
  await initDatabase();
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = (path, { body, admin = false, headers = {}, ...options } = {}) => fetch(`${base}${path}`, {
    redirect: 'manual', ...options,
    headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(admin ? { 'x-admin-key': 'test-admin-key' } : {}), ...headers },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  return { app, base, database, request, payments, preferences, failProvider: value => { failProvider = value; },
    async close() { await new Promise(resolve => server.close(resolve)); await postgres.close(); } };
}

export const customer = { name: 'Cliente Teste', email: 'cliente@example.com', cpf: '12345678909', phone: '32999999999', zipCode: '36300000', street: 'Rua Teste', number: '10', neighborhood: 'Centro', city: 'São João del-Rei', state: 'MG' };
