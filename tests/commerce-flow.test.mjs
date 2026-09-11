import test from 'node:test';
import assert from 'node:assert/strict';
import { harness, customer } from './helpers/commerce.mjs';

test('processo comercial integrado em PostgreSQL isolado', async t => {
  const h = await harness();
  t.after(() => h.close());
  let product;
  let reference;
  await t.test('sessão: acesso negado, login, cookie, logout e revogação', async () => {
    for (const path of ['/orders', '/metrics', '/products', '/financial-analysis']) assert.equal((await h.request(`/api/admin${path}`)).status, 401);
    assert.equal((await h.request('/api/admin/login', { method: 'POST', body: { key: 'invalid' } })).status, 401);
    const login = await h.request('/api/admin/login', { method: 'POST', body: { key: 'test-admin-key' } });
    assert.equal(login.status, 200);
    const cookie = login.headers.get('set-cookie');
    assert.match(cookie, /HttpOnly/);
    const headers = { Cookie: cookie.split(';')[0] };
    assert.equal((await h.request('/api/admin/session', { headers })).status, 200);
    assert.equal((await h.request('/api/admin/logout', { method: 'POST', headers })).status, 200);
    assert.equal((await h.request('/api/admin/session', { headers })).status, 401);
  });
  await t.test('valida catálogo, cria oferta e bloqueia exclusão de modelo vinculado', async () => {
    for (const overrides of [{ stock: -1 }, { stock: 1.5 }, { stock: 'abc' }, { slug: 'rota/quebrada' }, { promotional_price: 101 }]) {
      const r = await h.request('/api/admin/products', { method: 'POST', admin: true, body: { name: 'Modelo', sku: 'modelo-test', price: 100, ...overrides } });
      assert.equal(r.status, 400);
    }
    const created = await h.request('/api/admin/products', { method: 'POST', admin: true, body: { name: 'Modelo', sku: 'modelo-test', price: 100, promotional_price: 80, stock: 1 } });
    assert.equal(created.status, 201);
    product = await created.json();
    const offer = await h.request('/api/admin/products/quick', { method: 'POST', admin: true, body: { model_id: product.id, price: 70, stock: 2 } });
    assert.equal(offer.status, 201);
    assert.equal((await offer.json()).source_product_id, product.id);
    assert.equal((await h.request(`/api/admin/products/${product.id}`, { method: 'DELETE', admin: true })).status, 409);
    const original = await (await h.request('/api/products/modelo-test')).json();
    assert.equal(Number(original.price), 100);
  });
  await t.test('GET antigo leva ao formulário sem gerar preferência', async () => {
    const r = await h.request('/api/checkout/modelo-test');
    assert.equal(r.status, 303);
    assert.match(r.headers.get('location'), /#\/finalizar\/modelo-test/);
    assert.equal(h.preferences.length, 0);
  });
  await t.test('quantidade e endereço inválidos não iniciam cobrança', async () => {
    for (const quantity of [0, -1, 1.5, 101]) assert.equal((await h.request('/api/checkout/modelo-test', { method: 'POST', body: { ...customer, quantity } })).status, 400);
    assert.equal((await h.request('/api/checkout/modelo-test', { method: 'POST', body: { ...customer, street: '  ' } })).status, 400);
    assert.equal(h.preferences.length, 0);
  });
  await t.test('falha do provedor desfaz pedido e reserva', async () => {
    h.failProvider(true);
    assert.equal((await h.request('/api/checkout/modelo-test', { method: 'POST', body: customer })).status, 502);
    h.failProvider(false);
    assert.equal((await h.database.query('SELECT * FROM orders')).rowCount, 0);
    assert.equal((await h.database.query('SELECT stock FROM products WHERE id=$1', [product.id])).rows[0].stock, 1);
  });
  await t.test('checkouts concorrentes disputam estoque; preço vem do banco', async () => {
    const responses = await Promise.all([1, 2].map(() => h.request('/api/checkout/modelo-test', { method: 'POST', body: { ...customer, price: 1 } })));
    assert.deepEqual(responses.map(r => r.status).sort(), [200, 409]);
    reference = (await responses.find(r => r.status === 200).json()).externalReference;
    assert.equal(h.preferences[0].items[0].unit_price, 80);
    assert.equal(h.preferences[0].external_reference, reference);
    const order = (await h.database.query('SELECT * FROM orders')).rows[0];
    assert.equal(order.status, 'created');
    assert.equal(order.product_snapshot.price, 80);
    assert.equal(order.preference_id, 'pref-1');
    assert.equal(order.stock_reserved, true);
  });
  const notify = () => h.request('/api/mercadopago/webhook?type=payment&data.id=123', { method: 'POST', body: { type: 'payment', data: { id: '123' } } });
  await t.test('falha na consulta do webhook pede reenvio', async () => {
    h.failProvider(true);
    assert.equal((await notify()).status, 502);
    h.failProvider(false);
  });
  await t.test('pagamento adulterado não aprova pedido', async () => {
    h.payments.set('123', { id: 123, external_reference: reference, currency_id: 'BRL', transaction_amount: 1, status: 'approved', date_last_updated: '2026-09-10T12:00:00Z' });
    assert.equal((await notify()).status, 409);
    assert.equal((await h.database.query('SELECT status FROM orders')).rows[0].status, 'created');
  });
  await t.test('autorização permanece pendente e fora da receita', async () => {
    h.payments.set('123', { ...h.payments.get('123'), transaction_amount: 80, status: 'authorized' });
    assert.equal((await notify()).status, 200);
    const metrics = await (await h.request('/api/admin/metrics', { admin: true })).json();
    assert.equal(metrics.approved_count, 0);
    assert.equal(metrics.pending_count, 1);
  });
  await t.test('aprovação repetida dez vezes gera uma transição, inclusive detalhe nulo', async () => {
    h.payments.set('123', { ...h.payments.get('123'), status: 'approved', date_last_updated: '2026-09-10T12:01:00Z' });
    for (let i = 0; i < 10; i++) assert.equal((await notify()).status, 200);
    const order = (await h.database.query('SELECT * FROM orders')).rows[0];
    assert.equal(order.status, 'approved');
    assert.equal(order.payment_history.length, 2);
    assert.equal((await h.database.query('SELECT * FROM payment_events')).rowCount, 2);
    assert.equal((await h.database.query('SELECT stock FROM products WHERE id=$1', [product.id])).rows[0].stock, 0);
    const receipt = await (await h.request(`/api/orders/${reference}/status`)).json();
    assert.equal(receipt.status, 'approved');
    assert.equal(receipt.customer, undefined);
  });
  await t.test('evento antigo não regride aprovação e refund devolve estoque uma vez', async () => {
    h.payments.set('123', { ...h.payments.get('123'), status: 'pending', date_last_updated: '2026-09-10T11:00:00Z' });
    assert.equal((await notify()).status, 200);
    assert.equal((await h.database.query('SELECT status FROM orders')).rows[0].status, 'approved');
    h.payments.set('123', { ...h.payments.get('123'), status: 'refunded', date_last_updated: '2026-09-10T12:02:00Z' });
    assert.equal((await notify()).status, 200);
    assert.equal((await notify()).status, 200);
    assert.equal((await h.database.query('SELECT stock FROM products WHERE id=$1', [product.id])).rows[0].stock, 1);
  });
  await t.test('retentativa da mesma compra devolve o mesmo link sem reservar duas vezes', async () => {
    const body = { ...customer, request_id: '00000000-0000-4000-8000-000000000001' };
    const before = h.preferences.length;
    const results = await Promise.all([1, 2].map(() => h.request('/api/checkout/modelo-test', { method: 'POST', body })));
    assert.deepEqual(results.map(r => r.status), [200, 200]);
    assert.deepEqual(await results[0].json(), await results[1].json());
    assert.equal(h.preferences.length, before + 1);
    assert.equal((await h.request('/api/checkout/modelo-test', { method: 'POST', body: { ...body, number: '20' } })).status, 409);
  });
  await t.test('edição preserva snapshot e não muda links/SKU', async () => {
    const body = { ...product, price: 200, promotional_price: null };
    assert.equal((await h.request(`/api/admin/products/${product.id}`, { method: 'PUT', admin: true, body })).status, 200);
    assert.equal((await h.database.query('SELECT product_snapshot FROM orders')).rows[0].product_snapshot.price, 80);
    assert.equal((await h.request(`/api/admin/products/${product.id}`, { method: 'PUT', admin: true, body: { ...body, slug: 'novo-link' } })).status, 409);
  });
  await t.test('busca por ID e filtro de mês funcionam', async () => {
    const order = (await h.database.query('SELECT id FROM orders')).rows[0];
    assert.ok((await (await h.request(`/api/admin/orders?search=${order.id}`, { admin: true })).json()).some(row => row.id === order.id));
    assert.deepEqual(await (await h.request('/api/admin/orders?month=2000-01', { admin: true })).json(), []);
    assert.equal((await h.request('/api/admin/metrics?month=2026-99', { admin: true })).status, 400);
    assert.equal((await (await h.request('/api/admin/metrics?month=2000-01', { admin: true })).json()).total_orders, 0);
  });
  await t.test('importação é idempotente e lote inválido não apaga histórico', async () => {
    const row = { source_sheet: 'Teste', source_row: 1, product: 'Modelo', amount: 90, sale_date: '2026-09-01', paid: true };
    for (let i = 0; i < 2; i++) assert.equal((await h.request('/api/admin/financial-analysis/import', { method: 'POST', admin: true, body: { rows: [row] } })).status, 200);
    assert.equal((await h.database.query('SELECT * FROM financial_legacy_sales')).rowCount, 1);
    assert.equal((await h.request('/api/admin/financial-analysis/import', { method: 'POST', admin: true, body: { replace: true, rows: [{ ...row, sale_date: '2026-02-30' }] } })).status, 400);
    assert.equal((await h.database.query('SELECT * FROM financial_legacy_sales')).rowCount, 1);
    const analysis = await (await h.request('/api/admin/financial-analysis', { admin: true })).json();
    assert.equal(Number(analysis[0].total_amount), 90);
  });
});
