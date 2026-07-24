import { useEffect, useState } from 'react';

const statusLabels: Record<string, string> = {
  created: 'Aguardando pagamento',
  pending: 'Pagamento pendente',
  approved: 'Pago',
  authorized: 'Autorizado',
  in_process: 'Em análise',
  rejected: 'Pagamento recusado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
};

export default function Admin() {
  const [key, setKey] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [testUrl, setTestUrl] = useState('');
  const [testError, setTestError] = useState('');
  useEffect(() => { if (authorized) fetch('/api/admin/orders', { headers: { 'x-admin-key': key } }).then((response) => response.ok ? response.json() : Promise.reject()).then(setOrders).catch(() => setOrders([])); }, [authorized, key]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">Pedidos Fonovital</h1>
        {!authorized ? (
          <form onSubmit={(event) => { event.preventDefault(); setAuthorized(Boolean(key)); }} className="mt-8 max-w-md">
            <label className="block text-sm font-semibold text-slate-700">Chave administrativa</label>
            <input type="password" value={key} onChange={(event) => setKey(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
            <button className="mt-4 rounded-xl bg-[#008B91] px-5 py-3 font-bold text-white">Entrar</button>
          </form>
        ) : (
          <>
          <div className="mt-6 rounded-2xl bg-amber-50 p-4"><button onClick={async () => { setTestError(''); const response = await fetch('/api/admin/test-order', { method: 'POST', headers: { 'x-admin-key': key } }); const data = await response.json(); if (!response.ok) return setTestError(data.error || 'Erro'); setTestUrl(data.checkoutUrl); }} className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white">Criar produto de teste — R$ 1,00</button>{testUrl && <a href={testUrl} target="_blank" rel="noreferrer" className="ml-4 font-semibold text-[#008B91]">Abrir pagamento</a>}{testError && <p className="mt-2 text-sm text-red-600">{testError}</p>}</div>
          <div className="mt-8 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="p-3">Produto</th><th className="p-3">Cliente</th><th className="p-3">Valor</th><th className="p-3">Status</th><th className="p-3">Dados</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-b align-top"><td className="p-3">{order.product}</td><td className="p-3">{order.customer?.name}<br />{order.customer?.email}</td><td className="p-3">R$ {Number(order.amount).toFixed(2).replace('.', ',')}</td><td className="p-3"><span className="font-semibold">{statusLabels[order.status] || order.status}</span>{order.status_detail && <><br /><small className="text-slate-500">{order.status_detail}</small></>}</td><td className="p-3"><details><summary className="cursor-pointer font-semibold text-[#008B91]">Abrir cliente</summary><div className="mt-3 min-w-64 space-y-1 text-xs text-slate-700"><p><b>CPF:</b> {order.customer?.cpf || '—'}</p><p><b>Telefone:</b> {order.customer?.phone || '—'}</p><p><b>CEP:</b> {order.customer?.zipCode || '—'}</p><p><b>Endereço:</b> {order.customer?.street || '—'}, {order.customer?.number || 's/n'}</p><p><b>Complemento:</b> {order.customer?.complement || '—'}</p><p><b>Bairro:</b> {order.customer?.neighborhood || '—'}</p><p><b>Cidade/UF:</b> {order.customer?.city || '—'} / {order.customer?.state || '—'}</p><hr className="my-2" /><p><b>Referência externa:</b> {order.external_reference}</p><p><b>ID pagamento:</b> {order.payment_id || 'Ainda não disponível'}</p></div></details></td></tr>)}</tbody></table>{orders.length === 0 && <p className="mt-5 text-slate-600">Nenhum pedido registrado ainda.</p>}</div>
          </>
        )}
      </section>
    </main>
  );
}
