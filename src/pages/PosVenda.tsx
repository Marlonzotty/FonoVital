import {
  AlertTriangle,
  BadgeCheck,
  CircleHelp,
  Headphones,
  MessageCircle,
  ShieldCheck,
  Ticket
} from "lucide-react";
import { Link } from "react-router-dom";

const whatsappHref =
  "https://wa.me/5532999069763?text=Ol%C3%A1%2C%20comprei%20um%20aparelho%20original%20com%20a%20Fonovital%20e%20preciso%20de%20ajuda";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Produto original",
    description:
      "Ao adquirir um aparelho original, voce leva tecnologia confiavel, desempenho real e um produto pensado para oferecer seguranca no uso diario."
  },
  {
    icon: ShieldCheck,
    title: "Garantia de verdade",
    description:
      "A garantia protege sua compra contra defeitos de fabricacao e garante atendimento correto caso voce precise de orientacao ou suporte."
  },
  {
    icon: Headphones,
    title: "Suporte pos-venda",
    description:
      "Nosso acompanhamento continua apos a entrega. Estamos disponiveis para auxiliar com duvidas sobre adaptacao, uso e cuidados com o aparelho."
  }
];

const supportTopics = [
  "Ajuda para adaptacao ao aparelho no dia a dia",
  "Orientacoes de uso, conservacao e carregamento",
  "Duvidas sobre garantia e funcionamento",
  "Atendimento rapido pelo WhatsApp com a equipe Fonovital"
];

const scamAlerts = [
  "Jamais cobramos taxas extras apos a finalizacao da compra sem confirmacao oficial da nossa equipe.",
  "Nao enviamos cobrancas por outro numero pedindo Pix, deposito ou qualquer valor adicional.",
  "Se receber uma mensagem suspeita, nao realize pagamento antes de falar com a Fonovital pelo WhatsApp oficial."
];

export default function PosVenda() {
  return (
    <main className="min-h-screen section-gradient py-16 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="card-3d overflow-hidden">
          <div className="bg-gradient-to-r from-[#008B91] via-[#0b7f86] to-[#006d73] px-6 py-10 md:px-10 md:py-14">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                Pos-venda Fonovital
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Voce deu um grande passo para recuperar qualidade de vida, seguranca e bem-estar.
              </h1>
              <p className="mt-4 max-w-3xl text-base md:text-lg text-white/90 leading-relaxed">
                Ao adquirir um aparelho auditivo original, voce investiu em mais autonomia, mais tranquilidade para
                conversar, mais confianca para viver o dia a dia e mais proximidade com quem voce ama. A garantia
                reforca essa seguranca e mostra que voce pode contar com suporte real sempre que precisar.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#006d73] shadow-lg transition hover:scale-[1.01]"
                >
                  <MessageCircle size={18} />
                  Falar no WhatsApp
                </a>
                <Link
                  to="/garantia"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  <ShieldCheck size={18} />
                  Ver garantia
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {benefits.map((item) => (
            <article key={item.title} className="card-3d p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#008B91]/20 bg-[#008B91]/10">
                <item.icon className="text-[#008B91]" size={24} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <article className="card-3d p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#3ac28b]/25 bg-[#3ac28b]/10">
                <Ticket className="text-[#2f9f73]" size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#008B91]">Importancia da garantia</p>
                <h2 className="text-2xl font-bold text-slate-900">Protecao que valoriza sua compra</h2>
              </div>
            </div>

            <p className="mt-5 text-slate-600 leading-relaxed">
              Quando o aparelho e original e possui garantia, voce evita riscos comuns de produtos sem procedencia,
              como falhas recorrentes, baixa durabilidade e ausencia de suporte. Isso traz mais tranquilidade para o
              uso e mais confianca no resultado do tratamento auditivo.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Nossa equipe esta pronta para orientar voce em qualquer etapa do pos-venda, sempre com atendimento
              humano e direto no WhatsApp.
            </p>
          </article>

          <aside className="card-3d p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#008B91]/20 bg-[#008B91]/10">
                <CircleHelp className="text-[#008B91]" size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#008B91]">Podemos te ajudar com</p>
                <h2 className="text-2xl font-bold text-slate-900">Suporte rapido</h2>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {supportTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-3 text-slate-600">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#3ac28b]" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl btn-3d"
            >
              <MessageCircle size={18} />
              Acionar suporte no WhatsApp
            </a>
          </aside>
        </section>

        <section className="card-3d overflow-hidden border border-[#f59e0b]/20">
          <div className="bg-gradient-to-r from-[#fff8e8] via-[#fff4d8] to-[#ffefc2] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-white/70">
                <AlertTriangle className="text-[#d97706]" size={28} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#b45309]">
                  Nao caia em golpes
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
                  A Fonovital nao solicita valores extras por numeros desconhecidos.
                </h2>
                <p className="mt-3 max-w-3xl text-slate-700 leading-relaxed">
                  Para sua seguranca, desconfie de mensagens informando cobrancas adicionais, liberacao de pedido,
                  taxas de envio ou qualquer outro valor fora do atendimento oficial. Em caso de duvida, confirme
                  diretamente conosco antes de fazer qualquer pagamento.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {scamAlerts.map((item) => (
                <article key={item} className="rounded-2xl border border-[#f59e0b]/20 bg-white/80 p-5 shadow-sm">
                  <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#f59e0b]/20 bg-white/75 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#b45309]">Canal oficial de suporte</p>
                <p className="text-slate-700">
                  Se surgir qualquer duvida, fale somente pelo WhatsApp oficial da Fonovital.
                </p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl btn-3d"
              >
                <MessageCircle size={18} />
                Confirmar com a equipe oficial
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
