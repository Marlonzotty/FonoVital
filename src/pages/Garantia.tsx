import { CreditCard, RefreshCcw, ShieldCheck } from 'lucide-react';
import mercadoPagoSeal from '../assets/MERCADOPAGOSELODEQUALIDADEONG.webp';

const benefits = [
  {
    icon: ShieldCheck,
    label: 'Garantia de satisfação',
    title: '7 dias para testar',
    description: 'Não gostou? Solicite devolução em até 7 dias corridos após o recebimento e devolvemos 100% do valor.',
  },
  {
    icon: RefreshCcw,
    label: 'Garantia de fábrica',
    title: '1 ano de cobertura',
    description: 'Proteção contra defeitos de fabricação com troca ou reparo sem custo dentro do prazo de 12 meses.',
  },
  {
    icon: CreditCard,
    label: 'Pagamento seguro',
    title: 'Processado pelo Mercado Pago',
    description: 'Criptografia ponta a ponta e monitoramento antifraude em tempo real para proteger sua compra.',
  },
];

export default function Garantia() {
  return (
    <main className="min-h-screen bg-[#f3f8fc] px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00747a]">Garantia e prazos</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#071c3b] sm:text-5xl">Compre com total segurança</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
            Pagamentos processados pelo Mercado Pago e cobertura completa de garantia: satisfação em 7 dias ou seu dinheiro de volta, mais 1 ano de proteção contra defeitos de fabricação.
          </p>
        </header>

        <div className="mt-9 grid items-start gap-6 lg:grid-cols-2 lg:gap-7">
          <section className="space-y-4" aria-label="Garantias da Fonovital">
            {benefits.map(({ icon: Icon, label, title, description }) => (
              <article key={title} className="flex gap-4 rounded-2xl border border-[#dbe7ee] bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.07)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#8be4d3] bg-[#e7fbf4]">
                  <Icon className="text-[#2ac68b]" size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00747a]">{label}</p>
                  <h2 className="text-2xl font-bold text-[#101b31]">{title}</h2>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="space-y-4" aria-label="Segurança do pagamento">
            <article className="rounded-2xl bg-[#0b192c] p-5 text-white shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:p-6">
              <div className="flex items-center gap-4">
                <img src={mercadoPagoSeal} alt="Mercado Pago" className="h-10 w-28 object-contain object-left" />
                <div className="h-px flex-1 bg-white/15" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Segurança</span>
              </div>
              <p className="mt-6 text-2xl font-semibold leading-snug text-white/90">Pagamentos verificados, com proteção contra fraudes e cobertura de estorno.</p>
              <div className="mt-6 border-t border-white/15 pt-4 text-base text-slate-300">
                Pagamento processado com segurança pelo Mercado Pago.
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-[#dbe7ee] bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-5 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#2ac68b]" />
                  <p className="text-base font-semibold text-[#00747a]">Plataforma oficial Mercado Pago</p>
                </div>
                <img src={mercadoPagoSeal} alt="Processamos pagamentos com Mercado Pago" className="w-full rounded-lg object-contain" />
                <p className="text-base leading-relaxed text-slate-600">Aceitamos cartões de crédito, débito, Pix e boleto. Aprovação instantânea e acompanhamento do pedido em tempo real.</p>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
