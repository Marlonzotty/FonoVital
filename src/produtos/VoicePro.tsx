import { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import {
  HiOutlineCreditCard,
  HiOutlineClipboardDocumentCheck,
  HiOutlineUserGroup,
  HiOutlineArrowPath
} from 'react-icons/hi2'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import ProductActionStrip from '../components/ProductActionStrip'
import ProductGallery from '../components/ProductGallery'
import ProductRating from '../components/ProductRating'
import SocialProofVideos from '../components/SocialProofVideos'

import frenteVoicePro from '../assets/voicepro/frenteVoicePro.jpg'
import img1 from '../assets/voicepro/voicepro-caixa-produto.jpg'
import img2 from '../assets/voicepro/voicepro-bateria-autonomia.jpg'
import img3 from '../assets/voicepro/voicepro-itens-na-caixa.jpg'
import img4 from '../assets/voicepro/voicepro-modelo-cic.jpg'
import img5 from '../assets/voicepro/voicepro-som-soundcore.jpg'
import img6 from '../assets/voicepro/voicepro-comparacao-marcas.jpg'
import voiceProEsterilizacao from '../assets/voicepro/VoiceProgermes.jpg'
import voiceProBanner from '../assets/voicepro/VoiceProBanner.jpg'
import voiceProBeneficios from '../assets/voicepro/VoiceProBenficios.jpg'
import certificadosImg from '../assets/voicepro/certificados.png'
import garantiaImg from '../assets/2anos.png'

export const voiceProGallery = [
  { src: voiceProEsterilizacao, alt: 'VoicePro em estojo com esterilização UV' },
  { src: frenteVoicePro, alt: 'Vista frontal do VoicePro' },
  { src: img1, alt: 'Caixa e estojo do VoicePro' },
  { src: img3, alt: 'Itens na caixa do VoicePro' },
  { src: img4, alt: 'Modelo CIC invisível VoicePro' },
  { src: img2, alt: 'Autonomia da bateria VoicePro' },
  { src: img5, alt: 'Chip SoundCore do VoicePro' },
  { src: img6, alt: 'Comparação com outras marcas' },
  { src: certificadosImg, alt: 'Certificados de qualidade do VoicePro' }
]

export const voiceProHeroImage = voiceProGallery[0]

export default function VoicePro() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const imagensGaleria = voiceProGallery

  const dados = {
    sigla: 'VoicePro | Fonovital',
    nome: 'VoicePro Profissional Digital | Fonovital',
    descricao:
      'Aparelho auditivo recarregável com design CIC (Completely-in-Canal), que combina tecnologia inteligente, conforto auditivo e esterilização UV integrada. Desenvolvido para oferecer clareza sonora natural e segura em diversos ambientes, com recarga magnética e display digital LED de alta definição.',
    precoOriginal: 2099,
    precoAtual: 1499.0,
    parcelas: 12,
    avaliacoes: 47,
    nota: 4.5,
    link: 'https://clkdmg.site/pay/voicepro-digital'
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(imagensGaleria[0].src)
  const economia = (dados.precoOriginal - dados.precoAtual).toFixed(2).replace('.', ',')

  const whatsappLink =
    'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital'

  const destaquesRapidos = [
    {
      icon: HiOutlineClipboardDocumentCheck,
      titulo: 'Não precisa de audiometria',
      descricao: 'Versátil para diferentes perfis auditivos, com suporte remoto.'
    },
    {
      icon: HiOutlineUserGroup,
      titulo: '50 mil clientes satisfeitos',
      descricao: 'Comunidade Fonovital aprovando o VoicePro em todo o país.'
    },
    {
      icon: HiOutlineArrowPath,
      titulo: 'Devolvemos seu dinheiro em 7 dias',
      descricao: 'Teste sem medo: devolução rápida e sem burocracia.'
    }
  ]

  const caracteristicasPrincipais = [
    {
      funcao: 'Smart Chip',
      descricao:
        'Chip de processamento inteligente que ajusta automaticamente os níveis de som para diferentes ambientes, garantindo compensação precisa para perdas auditivas leves, moderadas ou severas.'
    },
    {
      funcao: 'Noise Reduction',
      descricao:
        'Sistema avançado de redução de ruído que minimiza sons de fundo e melhora a inteligibilidade da fala.'
    },
    {
      funcao: 'Clear Sound',
      descricao:
        'Amplificação balanceada que preserva a naturalidade dos tons vocais e musicais.'
    },
    {
      funcao: 'Wear Comfort',
      descricao:
        'Design ergonômico com formato anatômico CIC, proporcionando conforto durante longos períodos de uso.'
    },
    {
      funcao: 'Left and Right Identification',
      descricao:
        'Indicação clara (L/R) para diferenciação entre os canais esquerdo e direito.'
    },
    {
      funcao: 'Digital Display',
      descricao:
        'Display digital LED de alta definição que exibe o nível de carga de cada fone e do estojo.'
    },
    {
      funcao: 'Simple Operation',
      descricao:
        'Controles simplificados de volume e modo, com resposta imediata ao toque.'
    },
    {
      funcao: 'UV Sterilization Lamp',
      descricao:
        'Lâmpada ultravioleta integrada no estojo, que esteriliza os aparelhos durante o carregamento.'
    },
    {
      funcao: 'Portable Charging',
      descricao:
        'Estojo de carregamento portátil com display de nível de bateria e conector magnético.'
    }
  ]

  const bateriaCarregamento = [
    { titulo: 'Tipo de carregamento', descricao: 'magnético via estojo portátil.' },
    {
      titulo: 'Indicação digital',
      descricao: 'LED de alta definição mostra a carga individual de cada fone (L/R) e do estojo.'
    },
    { titulo: 'Duração estimada', descricao: 'Até 24h de uso com recarga completa.' },
    { titulo: 'Carregamento rápido', descricao: 'Aproximadamente 2 horas para carga total.' },
    { titulo: 'Proteção contra falta de energia', descricao: 'Display alerta quando a bateria está baixa.' }
  ]

  const controleSom = [
    {
      titulo: '4 níveis de volume',
      descricao: 'Ajustes graduais (1 a 4) para adaptar a intensidade sonora sem distorções.'
    },
    {
      titulo: 'Personalização imediata',
      descricao: 'Troque rapidamente entre ambientes ruidosos ou silenciosos com toques simples.'
    },
    {
      titulo: 'Resposta de frequência ampla',
      descricao: 'Mantém fidelidade sonora para voz, música e sons ambientes essenciais.'
    }
  ]

  const higieneSeguranca = [
    'Desinfecção UV automática a cada ciclo de carga, eliminando germes e bactérias.',
    'Estojo fechado Mantém os aparelhos protegidos de poeira e umidade enquanto recarregam.'
  ]

  const certificacoes = [
    'CE (Conformité Européenne)',
    'RoHS (Restriction of Hazardous Substances)',
    'FCC (Federal Communications Commission (EUA))',
    'FDA (Food and Drug Administration (EUA))',
    'UKCA (United Kingdom Conformity Assessed)',
    'ISO / Licença de Produção de Dispositivos Médicos (China)'
  ]

  const designColaboracoes = [
    'Design moderno, compacto e resistente para uso discreto.',
    'Parcerias globais com especialistas em saúde auditiva.',
    'Controle de qualidade premium: cada unidade é testada em som, durabilidade e esterilização.'
  ]

  const conteudoEmbalagem = [
    '2 aparelhos auditivos (L/R)',
    '1 estojo de carregamento magnético com display LED',
    '1 cabo de carregamento USB',
    '1 manual do Usuário (multilíngue)',
    '3 pares de pontas de silicone em diferentes tamanhos'
  ]

  const videos = [
    {
      id: 'voicepro-empresa',
      titulo: 'Conheça a Fonovital',
      descricao:
        'Descubra nossa estrutura e acompanhe o processo de fabricação do VoicePro com foco em tecnologia e segurança.',
      src: 'https://www.youtube.com/embed/Z4-1AfiPFQ0?si=whNYxJH7XTz78_Et',
      title: 'Conheça a Fonovital'
    },
    {
      id: 'voicepro-relatos',
      titulo: 'Relatos de clientes',
      descricao:
        'Veja depoimentos reais de quem já recuperou a confiança para ouvir com o VoicePro todos os dias.',
      src: 'https://www.youtube.com/embed/nVyYJ0NnZP8?si=xKLGXPbA3zey0YW2',
      title: 'Relatos de clientes Fonovital'
    }
  ]

  return (
    <section className="pt-20 md:pt-24 min-h-screen hero-bg grid-bg font-body text-slate-900">
      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:mb-6 sm:text-4xl">
              {dados.nome}
            </h1>
            <p className="text-sm font-semibold text-slate-600 sm:text-base">
              Inteligência sonora com supressão de feedback, redução de ruído de vento e recarga magnética UV.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10 lg:mt-12">
            <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col gap-5">
              <ProductGallery
                images={imagensGaleria}
                selected={imagemSelecionada}
                onChange={setImagemSelecionada}
                className="w-full"
              />
              <p className="text-center text-sm leading-relaxed text-slate-600 sm:text-base lg:text-left">
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
                  <p className="text-xs text-slate-400 sm:text-sm">
                    R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-slate-600">Economize R$ {economia}</p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-[#028794]/10 py-3 text-base font-semibold text-[#0f6f7a] lg:justify-start">
                  <HiOutlineCreditCard className="text-xl" />
                  12x R$ 152,63
                </p>

                <div className="grid gap-3 rounded-2xl border border-[#028794]/10 bg-white/5 p-4 sm:grid-cols-3">
                  {destaquesRapidos.map(item => (
                    <div key={item.titulo} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                      <item.icon className="mb-2 text-2xl text-[#0f6f7a]" />
                      <p className="text-sm font-semibold text-slate-900">{item.titulo}</p>
                      <p className="text-xs text-slate-600">{item.descricao}</p>
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
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-lg">
            <div className="relative pb-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/NARbCngvVD0?rel=0&modestbranding=1&playsinline=1"
                title="VoicePro em uso"
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

      <section className="w-full section-gradient py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Por que escolher o VoicePro?</h2>
          <ul className="grid gap-3 text-white md:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Design CIC discreto com ajuste anatômico para conforto duradouro.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Recarga magnética com esterilização UV automática durante o armazenamento.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Display LED HD indica os níveis de bateria de cada canal e do estojo em tempo real.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Smart Chip ajusta automaticamente o ganho, evitando feedback e protegendo sua audição.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={garantiaImg}
            alt="Selo de garantia de 1 ano com promoção por tempo limitado"
            className="mx-auto w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="bg-[#f9fafb] border border-white/15 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#7de8ff]">Controle de Som</h3>
            <ul className="space-y-3 text-gray-300">
              {controleSom.map(item => (
                <li key={item.titulo} className="flex gap-2">
                  <FaCheckCircle className="text-[#7de8ff] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{item.titulo}</p>
                    <p className="text-sm">{item.descricao}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#047857]">Higiene e segurança</h3>
            <ul className="space-y-3 text-gray-300">
              {higieneSeguranca.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#047857] mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Bateria e Carregamento
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/15 rounded-xl overflow-hidden">
              <tbody className="bg-white/5">
                {bateriaCarregamento.map((item, index) => (
                  <tr key={item.titulo} className={index % 2 === 0 ? 'bg-white/5' : 'bg-white/5'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{item.titulo}</td>
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
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#7de8ff] flex items-center gap-2">
              Certificações de Qualidade
            </h3>
            <p className="text-gray-300">
              Estes certificados asseguram que o VoicePro cumpre normas internacionais de segurança, eficiência e biocompatibilidade.
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
          <div className="flex justify-center items-center">
            <img
              src={certificadosImg}
              alt="Certificados de qualidade VoicePro"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Design e Colaborações</h2>
          <ul className="space-y-3 text-gray-300">
            {designColaboracoes.map(item => (
              <li key={item} className="flex items-start gap-2">
                <FaCheckCircle className="text-[#7de8ff] mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Conteúdo da Embalagem</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {conteudoEmbalagem.map(item => (
              <div
                key={item}
                className="rounded-2xl border border-[#028794]/20 bg-white/5 px-5 py-4 text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full section-gradient py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={voiceProBanner}
            alt="Banner VoicePro"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
          <img
            src={voiceProBeneficios}
            alt="Benefícios do VoicePro"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      <section className="w-full section-gradient py-12 px-4 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-[#7de8ff] mb-4">
            Conheça o VoicePro em ação
          </h2>
          <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
            Assista aos vídeos e descubra como o VoicePro transforma rotinas com confiança, conforto e tecnologia avançada.
          </p>

          <div className="grid gap-10 xl:grid-cols-2">
            {videos.map(video => (
              <article key={video.id} className="space-y-5">
                <div className="relative w-full overflow-hidden rounded-3xl border border-[#028794]/20 pb-[56.25%] shadow-[0_28px_80px_rgba(2,135,148,0.18)] ring-1 ring-[#028794]/10">
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
                <div className="space-y-2 text-center xl:text-left">
                  <h3 className="text-2xl font-semibold text-[#0f6f7a]">{video.titulo}</h3>
                  <p className="mx-auto max-w-2xl text-base text-gray-300 xl:mx-0">{video.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#028794] to-[#006d7e] py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Pronto para elevar sua audição com o VoicePro?</h3>
            <p className="text-sm sm:text-base text-white/90">
              Não precisa de audiometria presencial. Ajuste guiado pela nossa equipe e tecnologia antifeedback integrada.
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
            Garantia de 1 ano de fábrica Fonovital
          </p>
          <p className="text-gray-300">
            Troca imediata em caso de defeito de fabricação. Atendimento dedicado via WhatsApp com especialistas audiológicos.
          </p>
        </div>
      </section>

      <section className="w-full bg-white/5 py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">
          Clareza profissional para todas as conversas.
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





















