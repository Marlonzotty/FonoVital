import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const backend = fs.readFileSync(new URL('../backend/server.js', import.meta.url), 'utf8');
const admin = fs.readFileSync(new URL('../src/pages/Admin.tsx', import.meta.url), 'utf8');
const product = fs.readFileSync(new URL('../src/components/AdminProducts.tsx', import.meta.url), 'utf8');
const publicPage = fs.readFileSync(new URL('../src/pages/PublicProduct.tsx', import.meta.url), 'utf8');

test('vendas exibem dados completos do cliente e cópia na sequência solicitada', () => {
  assert.match(admin, /Ver cliente/);
  assert.match(admin, /Copiar dados na sequência/);
  assert.match(admin, /Brazil/);
  assert.match(admin, /selected\.customer\?\.zipCode/);
  assert.match(admin, /selected\.customer\?\.cpf/);
  assert.match(admin, /join\(["']\\t["']\)/);
});

test('backend protege sessão e operações administrativas', () => {
  assert.match(backend, /app\.post\('\/api\/admin\/login'/);
  assert.match(backend, /httpOnly: true/);
  assert.match(backend, /requireAdmin/);
  assert.match(backend, /app\.get\('\/api\/admin\/metrics'/);
});

test('catálogo valida checkout e preserva snapshot', () => {
  assert.match(backend, /resolveCheckoutProduct/);
  assert.match(backend, /publicProductAvailable/);
  assert.match(backend, /product_snapshot/);
  assert.match(backend, /payment_events/);
  assert.match(backend, /app\.get\('\/api\/checkout\/:product'/);
  assert.match(backend, /Number\(product\.promotional_price \|\| product\.price\)/);
  assert.match(backend, /publicProductAvailable\(product, quantity\)/);
  assert.match(backend, /crypto\.randomUUID\(\)/);
});

test('webhook persiste uma transição por evento e não duplica histórico', () => {
  assert.match(backend, /ON CONFLICT \(event_key\) DO NOTHING/);
  assert.match(backend, /payment_history = COALESCE\(payment_history/);
  assert.match(backend, /SELECT \* FROM orders WHERE external_reference = \$1 FOR UPDATE/);
});

test('interfaces administrativas e pública estão conectadas', () => {
  assert.match(admin, /AdminProducts/);
  assert.match(product, /api\/admin\/products/);
  assert.match(product, /Copiar link/);
  assert.match(publicPage, /api\/products/);
  assert.match(publicPage, /finalizar/);
  assert.match(publicPage, /SocialProofVideos/);
});

test('cadastro rápido usa modelo e não altera produto original', () => {
  assert.match(backend, /app\.post\('\/api\/admin\/products\/quick'/);
  assert.match(backend, /source_product_id/);
  assert.match(backend, /product_kind.*offer/);
  assert.match(product, /Cadastro rápido/);
  assert.match(product, /Selecionar modelo existente/);
  assert.match(product, /Criar rapidamente/);
  assert.match(backend, /seedLegacyProducts/);
  assert.match(backend, /ON CONFLICT \(sku\) DO UPDATE/);
});

test('pedido começa pendente e aprovação só vem do webhook', () => {
  assert.match(backend, /status TEXT NOT NULL DEFAULT \\'created\\'/);
  assert.match(backend, /payment_events/);
  assert.match(backend, /nextStatus = payment\.status/);
  assert.doesNotMatch(backend.slice(backend.indexOf("app.post('/api/checkout/:product'"), backend.indexOf("app.post('/api/mercadopago/webhook'")), /status\s*[:=]\s*['"]approved/);
});
