import { useEffect, useState } from 'react';

export default function Admin() {
  const [key, setKey] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
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
          <div className="mt-8 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="p-3">Produto</th><th className="p-3">Cliente</th><th className="p-3">Valor</th><th className="p-3">Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-b"><td className="p-3">{order.product}</td><td className="p-3">{order.customer?.name}<br />{order.customer?.email}</td><td className="p-3">R$ {Number(order.amount).toFixed(2).replace('.', ',')}</td><td className="p-3">{order.status}</td></tr>)}</tbody></table>{orders.length === 0 && <p className="mt-5 text-slate-600">Nenhum pedido registrado ainda.</p>}</div>
        )}
      </section>
    </main>
  );
}
