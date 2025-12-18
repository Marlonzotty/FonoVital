import { useEffect } from "react";

const ORDERTRACKER_SCRIPT_ID = "ordertracker-sdk";

export default function Rastreio() {
  useEffect(() => {
    const containerId = "ordertracker-widget";

    const renderWidget = () => {
      const ordertracker = (window as any).Ordertracker;
      if (typeof ordertracker !== "function") return;

      const selector = `#${containerId}`;
      const target = document.querySelector(selector);
      if (!target) return;

      target.innerHTML = "";
      ordertracker({
        id: "693021b80b762b36da320cd9",
      }).render(selector);
    };

    let script = document.getElementById(
      ORDERTRACKER_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = ORDERTRACKER_SCRIPT_ID;
      script.src = "https://www.ordertracker.com/sdk.js";
      script.async = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    } else if ((window as any).Ordertracker) {
      renderWidget();
    } else {
      script.addEventListener("load", renderWidget);
    }

    return () => {
      if (script) {
        script.removeEventListener("load", renderWidget);
      }
      const target = document.getElementById(containerId);
      if (target) target.innerHTML = "";
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f3fbfc]">
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#008b91]">
            Acompanhe seu pedido
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Rastreie sua compra
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use o código que enviamos por e-mail ou WhatsApp para acompanhar o
            envio do seu produto em tempo real.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-[#d7eef1] p-6 md:p-10">
          <div id="ordertracker-widget" className="min-h-[320px]" />
          <div className="text-sm text-gray-500 text-center mt-6">
            Em caso de dúvidas, fale com nosso time pelo WhatsApp{" "}
            <a
              href="https://wa.me/55329999069763"
              target="_blank"
              rel="noreferrer"
              className="text-[#008b91] font-semibold hover:underline"
            >
              (32) 99990-69763
            </a>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
