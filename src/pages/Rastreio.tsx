import { useEffect } from "react";

const TRACKING_URL = "https://www.17track.net/pt";

export default function Rastreio() {
  useEffect(() => {
    window.location.replace(TRACKING_URL);
  }, []);

  return (
    <main className="min-h-screen bg-[#f3fbfc] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-[#d7eef1] shadow-lg p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#008b91] mb-2">
          Redirecionamento de rastreio
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Estamos te levando para o 17TRACK
        </h1>
        <p className="text-gray-600 mb-6">
          Se nao abrir automaticamente, clique no botao abaixo.
        </p>
        <a
          href={TRACKING_URL}
          className="inline-flex items-center justify-center bg-[#008b91] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006d73] transition"
        >
          Ir para o rastreio
        </a>
      </div>
    </main>
  );
}

