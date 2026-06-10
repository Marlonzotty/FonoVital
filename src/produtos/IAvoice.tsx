import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import {
  HiOutlineCreditCard,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineClock
} from 'react-icons/hi2'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import ProductActionStrip from '../components/ProductActionStrip'
import ProductGallery from '../components/ProductGallery'
import ProductRating from '../components/ProductRating'
import SocialProofVideos from '../components/SocialProofVideos'

import img1 from '../assets/iavoice/iavoice-produto-completo.jpg'
import img2 from '../assets/iavoice/iavoice-bateria-autonomia.jpg'
import img3 from '../assets/iavoice/iavoice-chip-inteligente.jpg'
import img4 from '../assets/iavoice/iavoice-som-soundcore.jpg'
import img5 from '../assets/iavoice/iavoice-comparacao-marcas.jpg'
import img6 from '../assets/iavoice/iavoice-itens-na-caixa.jpg'
import iaVoiceCase from '../assets/iavoice/iavoice-caixa-produto.jpg'
import iaVoiceAparelho from '../assets/iavoice/Iavoiceaparelho.jpg'
import iaVoiceNaMao from '../assets/iavoice/Iavoicdedo.jpg'
import certificadosImg from '../assets/iavoice/certificados.png'
import iaVoiceBanner from '../assets/iavoice/IAvoiceBanner.jpg'
import iaVoiceBeneficio from '../assets/iavoice/IaVoiceBeneficio.jpg'
import iaVoiceLed from '../assets/iavoice/IavoiceLed.png'

export const iaVoiceGallery = [
  { src: iaVoiceAparelho, alt: 'Close do IAvoice com acabamento clean' },
  { src: iaVoiceNaMao, alt: 'IAvoice em destaque na mão' },
  { src: img1, alt: 'Produto completo IAvoice' },
  { src: img6, alt: 'Itens inclusos na caixa' },
  { src: iaVoiceCase, alt: 'Case inteligente do IAvoice' },
  { src: iaVoiceLed, alt: 'Display LED no estojo IAvoice' },
  { src: img2, alt: 'Bateria e autonomia IAvoice' },
  { src: img3, alt: 'Chip inteligente IAvoice' },
  { src: img4, alt: 'Som SoundCore IAvoice' },
  { src: img5, alt: 'Comparação com outras marcas' },
  { src: certificadosImg, alt: 'Certificados IAvoice' }
]

export const iaVoiceHeroImage = iaVoiceGallery[0]

export default function IAvoice() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const imagensGaleria = iaVoiceGallery

  const dados = {
    sigla: 'IAvoice | Fonovital',
    nome: 'IAvoice Inteligência Auditiva | Fonovital',
    descricao:
      'Aparelho auditivo BTE (Behind-The-Ear) de alto desempenho, leve e discreto, equipado com chip digital de 16 canais, tecnologia de redução de ruído em três modos e display LED inteligente no estojo de recarga. Ideal para quem busca clareza sonora, conforto e durabilidade em apenas 2,1g por unidade.',
    precoOriginal: 1990.9,
    precoAtual: 1699.9,
    parcelas: 12,
    avaliacoes: 51,
    nota: 4.6,
    link: 'https://fonovitalltda.pay.yampi.com.br/r/ECWQAEC09P'
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(imagensGaleria[0].src)
  const economia = (dados.precoOriginal - dados.precoAtual).toFixed(2).replace('.', ',')

  const whatsappLink =
    'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital'

  const destaquesRapidos = [
    {
      icon: HiOutlineCpuChip,
      titulo: 'Chip digital 16 canais',
      descricao: 'Processamento preciso com memórias personalizadas.'
    },
    {
      icon: HiOutlineDevicePhoneMobile,
      titulo: 'Ajuste via app',
      descricao: 'Controle em segundos, sem audiometria obrigatória.'
    },
    {
      icon: HiOutlineClock,
      titulo: 'Até 60h com estojo',
      descricao: 'Bateria estendida com recargas magnéticas rápidas.'
    }
  ]

  const caracteristicasPrincipais = [
    {
      funcao: '16-Channel Digital Chip',
      descricao:
        'Processador multicanal que analisa sons em tempo real com multiprocessamento, garantindo som limpo e natural.'
    },
    {
      funcao: 'Balanced Armature Speaker',
      descricao:
        'Alto-falante de alta fidelidade com resposta balanceada entre graves e agudos, mantendo a nitidez da fala.'
    },
    {
      funcao: 'Memory Function',
      descricao:
        'Memria inteligente que mantm o último volume e modo utilizados ao reiniciar o aparelho.'
    },
    {
      funcao: '5 Volume Levels',
      descricao:
        'Cinco nveis de volume ajustveis com precisão para diferentes graus de perda auditiva.'
    },
    {
      funcao: '3 Noise Reduction Modes',
      descricao:
        'Modos automticos:  Outdoor minimiza vento  Meeting realça vozes  Universal equilibra o uso dirio.'
    },
    {
      funcao: 'Digital Display Charging Case',
      descricao:
        'Estojo magntico com tela LED que mostra a carga individual de cada fone em tempo real.'
    },
    {
      funcao: 'Delayed Start Design',
      descricao:
        'Início retardado de 15 segundos após ligar, permitindo vestir sem microfonia.'
    },
    {
      funcao: 'Compact & Lightweight',
      descricao:
        'Estrutura ultraleve de 2,1g, proporcionando conforto absoluto durante todo o dia.'
    },
    {
      funcao: 'Water-Drop Shape Design',
      descricao:
        'Formato em gota d’água que se adapta naturalmente  orelha, reduzindo pressão no pavilho.'
    },
    {
      funcao: 'Auto Magnetic Charging',
      descricao:
        'Recarga automtica por induo: basta posicionar no estojo para carregar.'
    },
    {
      funcao: 'Extra Long Battery Life',
      descricao:
        'Uso contnuo por 12 horas e at 60 horas com o estojo porttil.'
    },
    {
      funcao: 'High-Endurance Build',
      descricao:
        'Polmero ABS reforado e silicone mdico hipoalergnico para uso dirio resistente.'
    }
  ]

  const bateriaCarregamento = [
    { titulo: 'Tempo de uso contnuo (sem estojo)', valor: '12 horas' },
    { titulo: 'Tempo de carregamento', valor: '70 minutos' },
    { titulo: 'Recargas pelo estojo', valor: '4 a 5 vezes' },
    { titulo: 'Autonomia total', valor: 'Até 60 horas com o estojo' },
    { titulo: 'Tipo de recarga', valor: 'Magntica via estojo com display digital' },
    { titulo: 'Tenso nominal', valor: '3,7 V' },
    { titulo: 'Consumo médio', valor: '= 2,5 mA' }
  ]

  const parametrosTecnicos = [
    { parametro: 'Peso individual', valor: '2,1 g' },
    { parametro: 'Peso total com estojo', valor: '46 g' },
    { parametro: 'Dimenses do aparelho', valor: '35 mm x 32 mm x 0,8 mm' },
    { parametro: 'Dimenses do estojo', valor: '68 mm x 55 mm x 25 mm' },
    { parametro: 'Mximo OSPL90', valor: '= 125  3 dB' },
    { parametro: 'Mdia alta frequência OSPL90', valor: '110  4 dB' },
    { parametro: 'Ganho acústico total', valor: '= 34  5 dB' },
    { parametro: 'Faixa de frequência', valor: '200 Hz  5000 Hz' },
    { parametro: 'Distorção harmônica total', valor: '= 3%' },
    { parametro: 'Ruído de entrada equivalente', valor: '= 11  3 dB' }
  ]

  const tecnologiaCentral = [
    'Chip digital 16-Channel: processamento simultneo de mltiplos fluxos sonoros.',
    'DSP (Digital Signal Processing): equalização automtica e amplificação seletiva por faixa.',
    'Reduo de Ruído Dinmica: ajustes inteligentes conforme o ambiente e o nvel de som.'
  ]

  const designConforto = [
    'Peso ultraleve de 2,1 g por unidade  praticamente imperceptvel.',
    'Formato ergonmico gota d’água que abraa o contorno da orelha.',
    'Design anti-feedback super silencioso, sem assobios.',
    'Material em polmero ABS e silicone mdico hipoalergnico.'
  ]

  const conteudoEmbalagem = [
    '2 aparelhos auditivos (L/R).',
    '1 estojo de carregamento com display LED.',
    '1 cabo USB de carregamento.',
    '3 pares de ponteiras de silicone (P, M, G).',
    'Manual de instrues multilngue.'
  ]

  const certificacoes = [
    'CE  Conformidade Europeia.',
    'FCC  Federal Communications Commission.',
    'RoHS  Restrição de Substncias Perigosas.',
    'FDA  Dispositivo mdico de uso pessoal.'
  ]

  const beneficiosResumo = [
    '? Chip digital de 16 canais com DSP.',
    '? Modos automticos para diferentes ambientes.',
    '? Início retardado sem apitos.',
    '? Estojo magntico com display digital.',
    '? Duração de at 60 horas com recarga rápida.',
    '? Ultraleve e ergonmico (2,1 g).' 
  ]

  const videos = [
    {
      id: 'iavoice-empresa',
      titulo: 'Conheça a Fonovital',
      descricao: 'Descubra como desenvolvemos solues auditivas modernas e confiveis.',
      src: 'https://www.youtube.com/embed/Z4-1AfiPFQ0?si=whNYxJH7XTz78_Et',
      title: 'Conheça a Fonovital'
    },
    {
      id: 'iavoice-relatos',
      titulo: 'Relatos reais de clientes',
      descricao: 'Depoimentos de quem j recuperou a audio com a Fonovital.',
      src: 'https://www.youtube.com/embed/nVyYJ0NnZP8?si=xKLGXPbA3zey0YW2',
      title: 'Relatos de clientes Fonovital'
    }
  ]

  return (
    <section className="pt-20 md:pt-24 min-h-screen hero-bg grid-bg font-body text-white">
      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{dados.nome}</h1>
            <p className="text-[#7de8ff] font-semibold text-sm sm:text-base">
              Não precisa de audiometria: ajuste guiado, modos automticos e conforto ultraleve.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10 lg:mt-12">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
              <ProductGallery
                images={imagensGaleria}
                selected={imagemSelecionada}
                onChange={setImagemSelecionada}
                className="w-full"
              />
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                {dados.descricao}
              </p>
              <div className="w-full max-w-md self-center">
                <div className="flex flex-col gap-5 card-3d p-6 sm:p-8">
                <ProductRating
                  rating={dados.nota}
                  count={dados.avaliacoes}
                  className="justify-center lg:justify-start"
                />

                <div className="space-y-1 text-center lg:text-left">
                  <p className="line-through text-xs sm:text-sm text-gray-400">
                    R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-white text-2xl sm:text-3xl font-bold">
                    R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-gray-300">Economize R$ {economia}</p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-[#028794]/10 py-3 font-semibold text-base text-[#7de8ff] lg:justify-start">
                  <HiOutlineCreditCard className="text-xl" />
                  12x R$ 216,36
                </p>

                <div className="grid gap-3 rounded-2xl border border-[#028794]/10 bg-white/5 p-4 sm:grid-cols-3">
                  {destaquesRapidos.map(item => (
                    <div key={item.titulo} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                      <item.icon className="text-[#7de8ff] text-2xl mb-2" />
                      <p className="font-semibold text-sm text-white">{item.titulo}</p>
                      <p className="text-xs text-gray-300">{item.descricao}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={dados.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#008B91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005f6e] sm:w-auto sm:self-start"
                >
                  COMPRAR AGORA
                </a>
              </div>
              </div>
              <SocialProofVideos />
              <ProductActionStrip buyHref={dados.link} whatsappHref={whatsappLink} />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src={iaVoiceLed}
            alt="Estojo com display LED do IAvoice"
            className="w-full rounded-3xl shadow-lg object-cover"
          />
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-lg">
            <div className="relative pb-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/pyWwBqY5FMQ?rel=0&modestbranding=1&playsinline=1"
                title="IAvoice em uso"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Características Principais</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/15 rounded-xl overflow-hidden">
              <thead className="section-gradient text-white text-left">
                <tr>
                  <th className="px-4 py-3 text-sm sm:text-base">Função</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Descrição detalhada</th>
                </tr>
              </thead>
              <tbody className="bg-white/5">
                {caracteristicasPrincipais.map((item, index) => (
                  <tr key={item.funcao} className={index % 2 === 0 ? 'bg-white/5' : 'bg-white/5'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{item.funcao}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm sm:text-base">{item.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#047857]">Bateria e Carregamento</h3>
            <ul className="space-y-3 text-gray-300">
              {bateriaCarregamento.map(item => (
                <li key={item.titulo} className="flex gap-2">
                  <FaCheckCircle className="text-[#047857] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{item.titulo}</p>
                    <p className="text-sm">{item.valor}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#4338ca]">Tecnologia Central</h3>
            <ul className="space-y-3 text-gray-300">
              {tecnologiaCentral.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#4338ca] mt-1 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Parâmetros Técnicos do Produto</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/15 rounded-xl overflow-hidden">
              <thead className="section-gradient text-white text-left">
                <tr>
                  <th className="px-4 py-3 text-sm sm:text-base">Parâmetro</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Valor</th>
                </tr>
              </thead>
              <tbody className="bg-white/5">
                {parametrosTecnicos.map((item, index) => (
                  <tr key={item.parametro} className={index % 2 === 0 ? 'bg-white/5' : 'bg-white/5'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{item.parametro}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm sm:text-base">{item.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#028794]/20 bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#7de8ff]">Design e Conforto</h3>
            <ul className="space-y-3 text-gray-300">
              {designConforto.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#7de8ff] mt-1 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#028794]/20 bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#7de8ff]">Conteúdo da Embalagem</h3>
            <ul className="space-y-3 text-gray-300">
              {conteudoEmbalagem.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#7de8ff] mt-1 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1fr_0.9fr] items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#7de8ff]">Certificações e Segurança</h3>
            <p className="text-gray-300">
              O IAvoice segue normas internacionais para garantir segurança, eficiência e qualidade auditiva.
            </p>
            <ul className="space-y-2 text-gray-200">
              {certificacoes.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#7de8ff] mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={certificadosImg}
              alt="Certificações IAvoice"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      <section className="w-full section-gradient py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#7de8ff]">Resumo de Benefícios</h2>
          <ul className="space-y-3 text-gray-200">
            {beneficiosResumo.map(item => (
              <li key={item} className="flex gap-2">
                <FaCheckCircle className="text-[#7de8ff] mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full section-gradient py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={iaVoiceBanner}
            alt="Banner IAvoice"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
          <img
            src={iaVoiceBeneficio}
            alt="Benefícios IAvoice"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      <section className="w-full section-gradient py-12 px-4 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-[#7de8ff] mb-4">
            Veja o IAvoice em ação
          </h2>
          <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
            Conheça nossa estrutura e oua relatos reais de quem j transformou a audio com a Fonovital.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {videos.map(video => (
              <article key={video.id} className="space-y-4">
                <div className="relative w-full overflow-hidden rounded-3xl border border-[#028794]/20 pb-[56.25%] shadow-lg">
                  <iframe
                    src={video.src}
                    title={video.title}
                    className="absolute inset-0 h-full w-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="space-y-1 text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-[#7de8ff]">{video.titulo}</h3>
                  <p className="text-sm text-gray-300">{video.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#028794] to-[#006d7e] py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Dê o prximo passo com o IAvoice</h3>
            <p className="text-sm sm:text-base text-white/90">
              Dispensa audiometria presencial. Conte com nossos especialistas para configurar tudo pelo WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={dados.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-[#7de8ff] shadow hover:bg-white/10 transition"
            >
              Comprar agora
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-3xl mx-auto border border-green-300 rounded-2xl text-center p-6">
          <p className="text-lg font-semibold text-green-700 mb-2">
            Garantia de 1 ano de fbrica Fonovital
          </p>
          <p className="text-gray-300">
            Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
          </p>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-6">Perguntas Frequentes</h3>
          <div className="space-y-4">
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#7de8ff]">
                Preciso de audiometria para usar o IAvoice?
              </summary>
              <p className="mt-2 text-gray-300">
                Não  obrigatrio. O IAvoice conta com ajustes automticos e suporte especializado para configurar conforme a sua necessidade.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#7de8ff]">
                Os modos realmente ajudam em ambientes diferentes?
              </summary>
              <p className="mt-2 text-gray-300">
                Sim! Outdoor reduz vento, Meeting realça vozes e Universal mantm uma equalização neutra para o dia a dia.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#7de8ff]">
                 confortvel para idosos?
              </summary>
              <p className="mt-2 text-gray-300">
                Totalmente. O design anatmico pesa 2,1 g e vem com ponteiras macias, garantindo adaptação rápida e segura.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">
          Inteligência auditiva leve e poderosa.
        </p>
        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#008B91] hover:bg-[#005f6e] text-white py-4 px-8 rounded-full font-bold text-lg transition"
        >
          GARANTA O SEU AGORA
        </a>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <Comments />
        </div>
      </section>

      <Footer />
    </section>
  )
}


















