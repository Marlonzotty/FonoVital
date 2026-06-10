type ProductActionStripProps = {
  buyHref: string;
  buyLabel?: string;
  whatsappHref: string;
  soldOut?: boolean;
};

export default function ProductActionStrip({
  buyHref,
  buyLabel = 'Comprar agora',
  whatsappHref,
  soldOut = false,
}: ProductActionStripProps) {
  return (
    <section className="rounded-[32px] border border-[#8be4ea] bg-gradient-to-r from-[#003b49] via-[#005f6e] to-[#00a8b5] p-7 text-white shadow-[0_22px_60px_rgba(0,95,110,0.28)] sm:p-9 lg:p-10">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl lg:flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8ef7ff]">
            Oferta Fonovital
          </p>
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Garanta o seu aparelho com suporte completo
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
            Compra segura, acompanhamento no pos-venda e ajuda na adaptacao desde o primeiro uso.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[420px]">
          <a
            href={buyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#8ef7ff] px-6 py-4 text-sm font-bold text-[#003b49] transition hover:bg-white lg:min-h-16 lg:text-base"
          >
            {soldOut ? 'Me avise quando chegar' : buyLabel}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border-2 border-white/70 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10 lg:min-h-16 lg:text-base"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
