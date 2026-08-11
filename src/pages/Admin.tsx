import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_SESSION_KEY = 'fonovital_admin_key';

type Order = {
  id: number;
  product: string;
  amount: number | string;
  status: string;
  status_detail?: string;
  purchased_at?: string;
  created_at?: string;
  external_reference?: string;
  payment_id?: string;
  customer?: {
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    zipCode?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
  };
};

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

function getStoredAdminKey() {
  if (typeof window === 'undefined') return '';
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) || '';
}

function formatOrderDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export default function Admin() {
  const navigate = useNavigate();
  const [key, setKey] = useState(getStoredAdminKey);
  const [authorized, setAuthorized] = useState(() => Boolean(getStoredAdminKey()));
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [testError, setTestError] = useState('');

  useEffect(() => {
    if (!authorized || !key) return undefined;

    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch('/api/admin/orders', {
      headers: { 'x-admin-key': key },
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Não foi possível carregar os pedidos');
        return data;
      })
      .then(setOrders)
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') return;
        setOrders([]);
        setError(fetchError instanceof Error ? fetchError.message : 'Não foi possível carregar os pedidos');
        if (fetchError instanceof Error && fetchError.message.includes('autorizado')) {
          window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
          setKey('');
          setAuthorized(false);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [authorized, key]);

  function enterAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedKey = key.trim();
    if (!normalizedKey) return;
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, normalizedKey);
    setKey(normalizedKey);
    setAuthorized(true);
  }

  function leaveAdmin() {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setKey('');
    setAuthorized(false);
    setOrders([]);
    navigate('/');
  }

  async function createTestOrder() {
    setTestError('');
    const response = await fetch('/api/admin/test-order', {
      method: 'POST',
      headers: { 'x-admin-key': key },
    });
    const data = await response.json();
    if (!response.ok) {
      setTestError(data.error || 'Erro');
      return;
    }
    setTestUrl(data.checkoutUrl);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <section className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Pedidos Fonovital</h1>
          {authorized && <button type="button" onClick={leaveAdmin} className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50">Sair do admin</button>}
        </div>
        {!authorized ? (
          <form onSubmit={enterAdmin} className="mt-8 max-w-md">
            <label className="block text-sm font-semibold text-slate-700">Chave administrativa</label>
            <input type="password" value={key} onChange={(event) => setKey(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
            <button className="mt-4 rounded-xl bg-[#008B91] px-5 py-3 font-bold text-white">Entrar</button>
          </form>
        ) : (
          <>
            <div className="mt-6 rounded-2xl bg-amber-50 p-4">
              <button onClick={createTestOrder} className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white">Criar produto de teste — R$ 1,00</button>
              {testUrl && <a href={testUrl} target="_blank" rel="noreferrer" className="ml-4 font-semibold text-[#008B91]">Abrir pagamento</a>}
              {testError && <p className="mt-2 text-sm text-red-600">{testError}</p>}
            </div>
            <div className="mt-8 overflow-x-auto">
              {loading && <p className="mb-4 text-sm text-slate-500">Atualizando pedidos...</p>}
              {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b"><th className="p-3">Data da compra</th><th className="p-3">Produto</th><th className="p-3">Cliente</th><th className="p-3">Valor</th><th className="p-3">Status</th><th className="p-3">Dados</th></tr></thead>
                <tbody>{orders.map((order) => <tr key={order.id} className="border-b align-top">
                  <td className="whitespace-nowrap p-3">{formatOrderDate(order.purchased_at || order.created_at)}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">{order.customer?.name}<br />{order.customer?.email}</td>
                  <td className="p-3">R$ {Number(order.amount).toFixed(2).replace('.', ',')}</td>
                  <td className="p-3"><span className="font-semibold">{statusLabels[order.status] || order.status}</span>{order.status_detail && <><br /><small className="text-slate-500">{order.status_detail}</small></>}</td>
                  <td className="p-3"><details><summary className="cursor-pointer font-semibold text-[#008B91]">Abrir cliente</summary><div className="mt-3 min-w-64 space-y-1 text-xs text-slate-700"><p><b>CPF:</b> {order.customer?.cpf || '—'}</p><p><b>Telefone:</b> {order.customer?.phone || '—'}</p><p><b>CEP:</b> {order.customer?.zipCode || '—'}</p><p><b>Endereço:</b> {order.customer?.street || '—'}, {order.customer?.number || 's/n'}</p><p><b>Complemento:</b> {order.customer?.complement || '—'}</p><p><b>Bairro:</b> {order.customer?.neighborhood || '—'}</p><p><b>Cidade/UF:</b> {order.customer?.city || '—'} / {order.customer?.state || '—'}</p><hr className="my-2" /><p><b>Referência externa:</b> {order.external_reference}</p><p><b>ID pagamento:</b> {order.payment_id || 'Ainda não disponível'}</p></div></details></td>
                </tr>)}</tbody>
              </table>
              {orders.length === 0 && !loading && <p className="mt-5 text-slate-600">Nenhum pedido registrado ainda.</p>}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
