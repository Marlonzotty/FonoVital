const socialProofVideos = [
  {
    title: 'Cliente Solange',
    subtitle: 'Cliente Fonovital',
    embedUrl: 'https://www.youtube.com/embed/hgUDpTJisjo?si=KD6g8frYJXcyWepC',
  },
  {
    title: 'Cliente Marta',
    subtitle: 'Angra dos Reis',
    embedUrl: 'https://www.youtube.com/embed/B1_VCiPhYi0?si=gXegA553jVWX0MGu',
  },
  {
    title: 'Cliente Miriam',
    subtitle: 'Canoas, Rio Grande do Sul',
    embedUrl: 'https://www.youtube.com/embed/nVyYJ0NnZP8?si=uRfky2r3hHhi5VgM',
  },
];

export default function SocialProofVideos() {
  return (
    <section className="mx-auto mt-10 w-full max-w-[1120px] rounded-[36px] border border-[#d7eef1] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
      <div className="mb-8 mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00747a]">
          Imagens autorizadas
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
          Veja quem ja comprou com a gente
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
          Estamos aqui para oferecer seguranca, transparencia e acompanhamento em todo o
          processo, desde a compra ate a adaptacao com o aparelho.
        </p>
      </div>

      <div className="mx-auto grid max-w-[980px] justify-items-center gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {socialProofVideos.map(video => (
          <article
            key={video.embedUrl}
            className="w-full max-w-[300px] overflow-hidden rounded-[30px] border border-[#dbe7ee] bg-white shadow-[0_22px_50px_rgba(15,23,42,0.10)] transition duration-300 lg:hover:-translate-y-1"
          >
            <div className="w-full bg-black">
              <iframe
                className="aspect-[9/16] w-full lg:aspect-[10/16]"
                src={video.embedUrl}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="space-y-1 p-6 text-center lg:p-7">
              <h3 className="text-xl font-semibold text-slate-950 lg:text-2xl">{video.title}</h3>
              <p className="text-sm font-semibold text-[#006d73] lg:text-base">{video.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
