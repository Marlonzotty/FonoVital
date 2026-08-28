import { useState, type FormEvent } from "react";
import { LoaderCircle, PackageCheck, Search, Truck } from "lucide-react";

type TrackingEvent = { time: string | null; description: string };
type TrackingResult = { number: string; carrier: string | null; status: string; statusDetail: string | null; latestEvent: TrackingEvent | null; events: TrackingEvent[] };

const statusLabels: Record<string, string> = {
  NotFound: "Aguardando atualização", InfoReceived: "Envio confirmado", InTransit: "Em trânsito",
  Expired: "Prazo de trânsito estendido", AvailableForPickup: "Disponível para retirada",
  OutForDelivery: "Saiu para entrega", DeliveryFailure: "Tentativa de entrega",
  Delivered: "Entregue", Exception: "Atenção ao envio",
};

function formatDate(value: string | null) {
  if (!value) return "Data não informada";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default function Rastreio() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = number.trim().toUpperCase();
    if (!code) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/tracking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ number: code }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível consultar o rastreio.");
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível consultar o rastreio.");
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#f3fbfc] px-4 py-12">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-[#d7eef1] bg-white p-6 shadow-lg md:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e4f7f8] text-[#008b91]"><Truck size={24} aria-hidden="true" /></div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#008b91]">Rastreie seu pedido</p>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Acompanhe a entrega</h1>
            <p className="mt-2 text-gray-600">Digite o código enviado para você após o despacho.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="tracking-number">Código de rastreio</label>
            <input id="tracking-number" value={number} onChange={(event) => setNumber(event.target.value.toUpperCase())} placeholder="Ex.: LB123456789SG" autoComplete="off" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 font-medium uppercase text-slate-900 outline-none transition focus:border-[#008b91] focus:ring-2 focus:ring-[#b9ebee]" />
            <button type="submit" disabled={loading || !number.trim()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#008b91] px-5 py-3 font-semibold text-white transition hover:bg-[#006d73] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <LoaderCircle className="animate-spin" size={19} /> : <Search size={19} />}{loading ? "Consultando" : "Rastrear"}
            </button>
          </form>

          {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
          {result && <div className="mt-7 border-t border-slate-100 pt-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm text-slate-500">Código {result.number}</p><h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-slate-900"><PackageCheck size={21} className="text-[#008b91]" />{statusLabels[result.status] || result.status}</h2>{result.statusDetail && <p className="mt-1 text-sm text-slate-600">{result.statusDetail}</p>}</div>{result.carrier && <span className="rounded-full bg-[#e4f7f8] px-3 py-1 text-sm font-semibold text-[#006d73]">{result.carrier}</span>}</div>
            {result.latestEvent && <div className="mt-5 rounded-xl bg-[#f3fbfc] p-4"><p className="text-xs font-semibold uppercase tracking-wide text-[#008b91]">Última atualização</p><p className="mt-1 font-semibold text-slate-900">{result.latestEvent.description}</p><p className="mt-1 text-sm text-slate-600">{formatDate(result.latestEvent.time)}</p></div>}
            {result.events.length > 0 && <ol className="mt-6 space-y-4 border-l-2 border-[#b9ebee] pl-5">{result.events.map((trackingEvent, index) => <li key={`${trackingEvent.time}-${index}`} className="relative"><span className="absolute -left-[1.88rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#008b91]" /><p className="font-medium text-slate-900">{trackingEvent.description}</p><p className="text-sm text-slate-600">{formatDate(trackingEvent.time)}</p></li>)}</ol>}
          </div>}
        </div>
      </section>
    </main>
  );
}

