import { ShieldCheck, RefreshCcw, CreditCard } from "lucide-react";
import mpLogo from "../assets/mercadoPago.png";
import mpPayments from "../assets/mercadoPago.png";

export default function Garantia() {
  return (
    <section className="min-h-screen section-gradient py-16 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#7de8ff] mb-2">Garantia e prazos</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Compre com total segurança</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Pagamentos processados pelo Mercado Pago e cobertura completa de garantia: satisfação em 7 dias ou seu
            dinheiro de volta, mais 1 ano de proteção contra defeitos de fabricação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: cards */}
          <div className="space-y-4">
            <div className="card-3d p-5 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#008B91]/20 border border-[#008B91]/30 flex items-center justify-center">
                <ShieldCheck className="text-[#3ac28b]" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#7de8ff] font-semibold">Garantia de satisfação</p>
                <h3 className="text-xl font-bold text-white">7 dias para testar</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Não gostou? Solicite devolução em até 7 dias corridos após o recebimento e devolvemos 100% do valor.
                </p>
              </div>
            </div>

            <div className="card-3d p-5 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#3ac28b]/15 border border-[#3ac28b]/30 flex items-center justify-center">
                <RefreshCcw className="text-[#3ac28b]" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#7de8ff] font-semibold">Garantia de fábrica</p>
                <h3 className="text-xl font-bold text-white">1 ano de cobertura</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Proteção contra defeitos de fabricação com troca ou reparo sem custo dentro do prazo de 12 meses.
                </p>
              </div>
            </div>

            <div className="card-3d p-5 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#008B91]/20 border border-[#008B91]/30 flex items-center justify-center">
                <CreditCard className="text-[#7de8ff]" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#7de8ff] font-semibold">Pagamento seguro</p>
                <h3 className="text-xl font-bold text-white">Processado pelo Mercado Pago</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A maior plataforma de pagamentos da América Latina, com criptografia ponta a ponta e monitoramento
                  antifraude em tempo real.
                </p>
              </div>
            </div>
          </div>

          {/* Right: visual stack */}
          <div className="space-y-4">
            <div className="card-3d overflow-hidden">
              <div className="bg-gradient-to-br from-[#0f1f33] via-[#0b1626] to-[#0a1120] p-6">
                <div className="flex items-center gap-4">
                  <img src={mpLogo} alt="Mercado Pago" className="h-10 w-auto" />
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-gray-400 uppercase tracking-[0.15em]">segurança</span>
                </div>
                <p className="text-white font-semibold text-lg mt-4">
                  Pagamentos verificados, com proteção contra fraudes e cobertura de estorno.
                </p>
                <div className="mt-6 rounded-xl bg-[#0e1a2b] border border-white/5 p-4 flex items-center gap-4">
                  <div className="rounded-full bg-[#008B91]/20 border border-[#008B91]/40 px-3 py-1 text-[#7de8ff] text-sm font-semibold">
                    Checkout protegido
                  </div>
                  <div className="rounded-full bg-[#3ac28b]/15 border border-[#3ac28b]/30 px-3 py-1 text-[#3ac28b] text-sm font-semibold">
                    Antifraude
                  </div>
                </div>
              </div>
            </div>

            <div className="card-3d p-0 overflow-hidden">
              <div className="bg-white flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="px-6 pt-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#3ac28b] animate-pulse" />
                  <p className="text-sm text-[#008B91] font-semibold">Plataforma oficial Mercado Pago</p>
                </div>
                <div className="w-full px-4 pb-4">
                  <img
                    src={mpPayments}
                    alt="Pagamentos Mercado Pago"
                    className="w-full max-h-64 sm:max-h-80 object-contain rounded-lg mx-auto"
                  />
                </div>
              </div>
              <div className="px-6 pb-6 text-gray-600 text-sm">
                Aceitamos cartões de crédito, débito, Pix e boleto. Aprovação instantânea e acompanhamento do pedido em tempo real.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






