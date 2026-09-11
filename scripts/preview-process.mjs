// Prévia local com dados descartáveis e provedor simulado. Não lê backend/.env.
import express from 'express';
import { harness, customer } from '../tests/helpers/commerce.mjs';

const h = await harness();
h.app.use(express.static('dist'));
const response = await h.request('/api/checkout/voicepro', { method: 'POST', body: customer });
const { externalReference } = await response.json();
h.payments.set('demo', { id: 'demo', status: 'approved', external_reference: externalReference, transaction_amount: 1499, currency_id: 'BRL', date_last_updated: new Date().toISOString() });
await h.request('/api/mercadopago/webhook', { method: 'POST', body: { type: 'payment', data: { id: 'demo' } } });
console.log(`Prévia isolada: ${h.base}/#/admin`);
console.log(`Comprovante: ${h.base}/#/pagamento/sucesso?reference=${externalReference}`);
console.log('Chave fictícia: test-admin-key');
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await h.close(); process.exit(0); });
