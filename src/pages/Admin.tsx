import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProducts from "../components/AdminProducts";
import FinancialAnalysis from "../components/FinancialAnalysis";
import logo from "../assets/logomarca.png";
import {
  CaretRight,
  ChartLineUp,
  ClipboardText,
  CurrencyDollar,
  House,
  SignOut,
  UsersThree,
} from "@phosphor-icons/react";

type Customer = Record<string, string | undefined>;
type Order = {
  id: number;
  product: string;
  amount: number | string;
  status: string;
  status_detail?: string;
  created_at?: string;
  external_reference?: string;
  payment_id?: string;
  customer?: Customer;
};
type Metrics = {
  total_orders: number;
  approved_count: number;
  approved_amount: number | string;
  pending_count: number;
  pending_amount: number | string;
  failed_count: number;
  failed_amount: number | string;
  cancelled_count: number;
  top_product?: { product: string; quantity: number } | null;
  monthly?: Array<{ month: string; count: number; amount: number | string; site_count: number; whatsapp_count: number }>;
  origins?: Array<{ origin: string; count: number; amount: number | string }>;
  payment_methods?: Array<{ method: string; count: number; amount: number | string }>;
};
type FinancialClient = {
  amount?: number | string;
  origin?: string;
  payment_method?: string;
};
type FinancialRow = {
  month: string;
  total_count: number;
  total_amount: number | string;
  clients?: FinancialClient[];
};
const labels: Record<string, string> = {
  created: "Pendente",
  pending: "Pendente",
  in_process: "Em análise",
  approved: "Aprovado",
  authorized: "Autorizado (aguardando captura)",
  in_mediation: "Em mediação",
  charged_back: "Contestado",
  rejected: "Recusado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
  error: "Erro",
};
const tones: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-800",
  authorized: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  created: "bg-amber-100 text-amber-800",
  in_process: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  error: "bg-red-100 text-red-800",
  cancelled: "bg-slate-200 text-slate-700",
  refunded: "bg-slate-200 text-slate-700",
};
const money = (v: number | string | undefined) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(v || 0));
const value = (v: string | undefined) => v || "—";
const address = (c: Customer | undefined) => {
  const x = c || {};
  return `${value(x.street)}, ${value(x.number)}${x.complement ? ", " + x.complement : ""}, ${value(x.neighborhood)}`;
};
const customerText = (o: Order) => {
  const c = o.customer || {};
  return [
    value(c.name),
    "Brazil",
    value(c.state),
    value(c.city),
    address(c),
    value(c.phone),
    value(c.email),
    value(c.zipCode),
    value(c.cpf),
  ].join("\t");
};
const chartColors = ["#2857c5", "#008b91", "#f59e0b", "#e85d75", "#7c3aed", "#64748b"];
const chartNumber = (v: number | string | undefined) => Number(v || 0);

export default function Admin() {
  const nav = useNavigate();
  const [key, setKey] = useState("");
  const [auth, setAuth] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [financialRows, setFinancialRows] = useState<FinancialRow[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("Visão geral");
  const [month, setMonth] = useState("");
  const [refresh, setRefresh] = useState(0);
  const requestId = useRef(0);
  const api = useCallback(async (url: string, init: RequestInit = {}) => {
    const r = await fetch(url, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { requestId.current++; setAuth(false); setSelected(null); setOrders([]); setMetrics(null); setFinancialRows([]); }
    if (!r.ok)
      throw new Error(d.error || "Não foi possível concluir a operação.");
    return d;
  }, []);
  const onUnauthorized = useCallback(() => { requestId.current++; setAuth(false); setSelected(null); setOrders([]); setMetrics(null); setFinancialRows([]); setError('Sessão expirada. Entre novamente.'); }, []);
  const load = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setBusy(true);
    try {
      const [o, m, f] = await Promise.all([
        api(
          `/api/admin/orders?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&month=${encodeURIComponent(month)}`,
        ),
        api(`/api/admin/metrics?month=${encodeURIComponent(month)}`),
        api("/api/admin/financial-analysis"),
      ]);
      if (currentRequest !== requestId.current) return;
      setOrders(o);
      setMetrics(m);
      setFinancialRows(f);
      setError("");
    } catch (e) {
      if (currentRequest === requestId.current) setError(e instanceof Error ? e.message : "Erro ao carregar.");
    } finally {
      if (currentRequest === requestId.current) setBusy(false);
    }
  }, [api, search, status, month]);
  useEffect(() => {
    api("/api/admin/session")
      .then(() => setAuth(true))
      .catch(() => {});
  }, [api]);
  useEffect(() => {
    if (!auth) return;
    const requests = requestId;
    const timer = setTimeout(() => void load(), 200);
    return () => { clearTimeout(timer); requests.current++; };
  }, [auth, load]);
  async function login(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ key }),
      });
      setKey("");
      setAuth(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chave inválida.");
    }
  }
  async function logout() {
    try {
      await api("/api/admin/logout", { method: "POST" });
      requestId.current++; setAuth(false); setOrders([]); setSelected(null);
      nav("/");
    } catch { setError("Não foi possível encerrar a sessão. Tente novamente."); }
  }
  async function copy(o: Order) {
    try {
      await navigator.clipboard.writeText(customerText(o));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { setError("Não foi possível copiar os dados."); }
  }
  if (!auth)
    return (
      <main className="min-h-screen bg-slate-100 p-4 py-12">
        <form
          onSubmit={login}
          className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl"
        >
          <h1 className="text-3xl font-bold">Admin Fonovital</h1>
          <label
            className="mt-8 block text-sm font-semibold"
            htmlFor="admin-key"
          >
            Chave administrativa
          </label>
          <input
            id="admin-key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          />
          <button className="mt-4 rounded-xl bg-[#008B91] px-5 py-3 font-bold text-white">
            Entrar
          </button>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </form>
      </main>
    );
  const monthly = financialRows;
  const financialClients = financialRows.flatMap(row => row.clients || []);
  const origins = Object.entries(financialClients.reduce<Record<string, { count: number; amount: number }>>((groups, item) => {
    const origin = item.origin === "pedido atual" ? "site" : "whatsapp";
    const group = groups[origin] || { count: 0, amount: 0 };
    group.count += 1;
    group.amount += chartNumber(item.amount);
    groups[origin] = group;
    return groups;
  }, {})).map(([origin, data]) => ({ origin, ...data }));
  const paymentMethods = Object.entries(financialClients.reduce<Record<string, { count: number; amount: number }>>((groups, item) => {
    const method = item.payment_method?.trim() || "Não informado";
    const group = groups[method] || { count: 0, amount: 0 };
    group.count += 1;
    group.amount += chartNumber(item.amount);
    groups[method] = group;
    return groups;
  }, {})).map(([method, data]) => ({ method, ...data }));
  const financialCount = financialRows.reduce((sum, item) => sum + item.total_count, 0);
  const financialAmount = financialRows.reduce((sum, item) => sum + chartNumber(item.total_amount), 0);
  const cards = metrics
    ? [
        ["Vendas totais", financialCount, money(financialAmount)],
        ["Valor total", "", money(financialAmount)],
        ["Pedidos", metrics.total_orders, ""],
        ["Aprovados", metrics.approved_count, money(metrics.approved_amount)],
        ["Pendentes", metrics.pending_count, money(metrics.pending_amount)],
        ["Recusados/erros", metrics.failed_count, money(metrics.failed_amount)],
        ["Cancelados", metrics.cancelled_count, ""],
      ]
    : [];
  const maxMonthlyAmount = Math.max(...monthly.map(item => chartNumber(item.total_amount)), 1);
  const originTotal = origins.reduce((sum, item) => sum + chartNumber(item.amount), 0);
  let originOffset = 0;
  const originGradient = origins.length && originTotal > 0
    ? `conic-gradient(${origins.map((item, index) => {
        const start = originOffset;
        originOffset += (chartNumber(item.amount) / originTotal) * 100;
        return `${chartColors[index % chartColors.length]} ${start}% ${originOffset}%`;
      }).join(", ")})`
    : "#e2e8f0";
  const menu = [
    { label: "Visão geral", icon: House, target: "overview" },
    { label: "Financeiro", icon: CurrencyDollar, target: "financial" },
    { label: "Métricas", icon: ChartLineUp, target: "metrics" },
    { label: "Clientes", icon: UsersThree, target: "customers" },
    { label: "Produtos", icon: ClipboardText, target: "products" },
  ];
  const goTo = (label: string) => {
    setActiveSection(label);
  };
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-3 sm:p-6">
      <div className="mx-auto flex max-w-[1440px] gap-5">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-[224px] shrink-0 flex-col rounded-[22px] border border-[#e3e8f3] bg-white p-4 shadow-[0_12px_35px_rgba(30,58,138,0.06)] lg:flex">
          <div className="flex items-center justify-between px-2 py-2">
            <img src={logo} alt="Fonovital" className="h-10 w-auto max-w-[150px] object-contain object-left" />
            <CaretRight size={16} className="text-[#91a4d2]" />
          </div>
          <div className="my-5 h-px bg-slate-100" />
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Navegação</p>
          <nav className="mt-3 space-y-1">
            {menu.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => goTo(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeSection === label ? "bg-[#edf3ff] text-[#2857c5] shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-[#2857c5]"}`}
              >
                <Icon size={20} weight={activeSection === label ? "fill" : "regular"} />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-1 border-t border-slate-100 pt-3">
            <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600"><SignOut size={20} /> Sair</button>
          </div>
        </aside>
        <section className="min-w-0 flex-1 rounded-[22px] bg-white p-4 shadow-[0_12px_35px_rgba(30,58,138,0.06)] sm:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#2857c5]">Painel administrativo</p>
            <h1 className="text-3xl font-bold text-slate-900">{activeSection}</h1>
            <p className="text-sm text-slate-500">
              Operação, pagamentos e catálogo
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { void load(); setRefresh(v => v + 1); }} className="rounded-xl border px-4 py-2">
              Atualizar
            </button>
            <button onClick={logout} className="rounded-xl border px-4 py-2">
              Sair
            </button>
          </div>
        </header>
        <nav aria-label="Navegação administrativa" className="mt-5 flex flex-wrap gap-2 lg:hidden">{menu.map(item => <button key={item.label} type="button" onClick={() => goTo(item.label)} className={`rounded-lg px-3 py-2 text-sm ${activeSection === item.label ? 'bg-[#008B91] text-white' : 'border'}`}>{item.label}</button>)}</nav>
        <label className="mt-5 flex flex-wrap items-center gap-3 text-sm">Mês de análise <input aria-label="Mês de análise" type="month" value={month} onChange={event => setMonth(event.target.value)} className="rounded-lg border p-2" /><button type="button" className="text-[#008B91]" onClick={() => setMonth('')}>Todos os meses</button></label>
        {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
        {activeSection === "Visão geral" && (
          <>
            <div><AdminProducts key={refresh} onUnauthorized={onUnauthorized} /></div>
            <div><FinancialAnalysis key={refresh} month={month} onUnauthorized={onUnauthorized} /></div>
          </>
        )}
        {activeSection === "Produtos" && <AdminProducts key={refresh} onUnauthorized={onUnauthorized} />}
        {activeSection === "Financeiro" && <FinancialAnalysis key={refresh} month={month} onUnauthorized={onUnauthorized} />}
        {metrics && (activeSection === "Visão geral" || activeSection === "Métricas") && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map((c) => (
              <div key={c[0]} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {c[0]}
                </p>
                <p className="text-2xl font-bold">{c[1]}</p>
                <p className="text-xs text-slate-500">{c[2]}</p>
              </div>
            ))}
          </div>
        )}
        {metrics && activeSection === "Métricas" && (
          <section className="mt-6 space-y-5" aria-label="Métricas financeiras completas">
            <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
              <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h2 className="text-lg font-bold text-slate-900">Origem das movimentações</h2>
                <p className="mt-1 text-xs text-slate-500">Site e lançamentos via WhatsApp, todos os meses.</p>
                <div className="mx-auto mt-5 h-40 w-40 rounded-full" style={{ background: originGradient }} aria-label="Gráfico pizza por origem" />
                <div className="mt-5 space-y-2 text-sm">
                  {origins.map((item, index) => <div key={item.origin} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />{item.origin === "site" ? "Site" : "WhatsApp"}</span><span className="font-semibold">{money(item.amount)}</span></div>)}
                </div>
              </article>
              <article className="rounded-2xl border border-slate-100 bg-white p-5">
                <h2 className="text-lg font-bold text-slate-900">Evolução mensal</h2>
                <p className="mt-1 text-xs text-slate-500">Pedidos do site + valores importados, por mês.</p>
                {!monthly.length ? <p className="mt-8 text-sm text-slate-500">Nenhum lançamento financeiro.</p> : <div className="mt-6 flex min-h-56 items-end gap-2 overflow-x-auto border-b border-slate-200 pb-1 sm:gap-4">
                  {monthly.map(item => <div key={item.month} className="flex min-w-14 flex-1 flex-col items-center justify-end gap-2"><span className="text-[10px] font-semibold text-slate-500">{money(item.total_amount)}</span><div className="w-full rounded-t-lg bg-[#2857c5]" style={{ height: `${Math.max((chartNumber(item.total_amount) / maxMonthlyAmount) * 170, 8)}px` }} title={`${item.month}: ${money(item.total_amount)}`} /><span className="text-[10px] text-slate-500">{item.month.slice(5)}/{item.month.slice(2, 4)}</span></div>)}
                </div>}
              </article>
            </div>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">Métodos de pagamento</h2>
              <p className="mt-1 text-xs text-slate-500">Todos os pedidos do site e lançamentos recebidos pelo WhatsApp.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {paymentMethods.map(item => <div key={item.method} className="rounded-xl bg-white p-4"><p className="text-xs font-semibold uppercase text-slate-500">{item.method}</p><p className="mt-1 text-xl font-bold text-slate-900">{money(item.amount)}</p><p className="text-xs text-slate-500">{item.count} lançamento(s)</p></div>)}
              </div>
            </article>
          </section>
        )}
        {(activeSection === "Clientes" || activeSection === "Visão geral") && <>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px]">
          <input
            aria-label="Buscar pedidos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nome, e-mail, telefone, código, SKU ou referência"
            className="rounded-xl border p-3"
          />
          <select
            aria-label="Filtrar status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">Todos os status</option>
            {Object.entries(labels).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
        {busy && <p className="mt-4 text-sm text-slate-500">Atualizando…</p>}
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {!busy && !error && !orders.length && (
          <p className="mt-6 rounded-xl bg-slate-50 p-6 text-center">
            {search || status
              ? "Nenhum resultado."
              : "Nenhum pedido registrado."}
          </p>
        )}
        {orders.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="p-3">Data</th>
                  <th className="p-3">Produto</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Valor</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">IDs</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b align-top">
                    <td className="p-3">
                      {o.created_at
                        ? new Date(o.created_at).toLocaleString("pt-BR")
                        : "—"}
                    </td>
                    <td className="p-3 font-semibold">{o.product}</td>
                    <td className="p-3">
                      {value(o.customer?.name)}
                      <br />
                      <span className="text-slate-500">
                        {value(o.customer?.email)}
                      </span>
                    </td>
                    <td className="p-3">{money(o.amount)}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${tones[o.status] || "bg-slate-100"}`}
                      >
                        {labels[o.status] || o.status}
                      </span>
                      {o.status_detail && (
                        <p className="mt-1 text-xs text-slate-500">
                          {o.status_detail}
                        </p>
                      )}
                    </td>
                    <td className="p-3 text-xs">
                      #{o.id}
                      <br />
                      {o.external_reference || "—"}
                      <br />
                      {o.payment_id || "—"}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => setSelected(o)}
                        className="rounded-lg border border-[#008B91] px-3 py-2 text-xs font-semibold text-[#008B91]"
                      >
                        Ver cliente
                      </button>
                      {o.customer?.phone && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 rounded-lg bg-[#25D366] px-3 py-2 text-xs text-white"
                          href={`https://wa.me/${(() => { const digits = o.customer!.phone!.replace(/\D/g, ""); return digits.length <= 11 ? `55${digits}` : digits; })()}?text=${encodeURIComponent(`Olá! Sobre o pedido #${o.id} (${o.product}).`)}`}
                        >
                          WhatsApp
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </>}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="max-h-[90vh] overflow-y-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Dados do cliente</h2>
                  <p className="text-sm text-slate-500">
                    Pedido #{selected.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg border px-3 py-2"
                >
                  Fechar
                </button>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <p>
                  <b>Nome:</b> {value(selected.customer?.name)}
                </p>
                <p>
                  <b>País:</b> Brazil
                </p>
                <p>
                  <b>Estado:</b> {value(selected.customer?.state)}
                </p>
                <p>
                  <b>Cidade:</b> {value(selected.customer?.city)}
                </p>
                <p>
                  <b>Endereço:</b> {address(selected.customer)}
                </p>
                <p>
                  <b>Telefone:</b> {value(selected.customer?.phone)}
                </p>
                <p>
                  <b>E-mail:</b> {value(selected.customer?.email)}
                </p>
                <p>
                  <b>CEP:</b> {value(selected.customer?.zipCode)}
                </p>
                <p>
                  <b>CPF:</b> {value(selected.customer?.cpf)}
                </p>
              </div>
              <button
                onClick={() => copy(selected)}
                className="mt-6 rounded-xl bg-[#008B91] px-4 py-3 font-semibold text-white"
              >
                Copiar dados na sequência
              </button>
              {copied && (
                <span className="ml-3 text-sm text-emerald-700">Copiado</span>
              )}
            </div>
          </div>
        )}
        </section>
      </div>
    </main>
  );
}
