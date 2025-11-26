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
import ProductGallery from '../components/ProductGallery'
import ProductRating from '../components/ProductRating'

import vitalvoice from '../assets/vitalVoice.jpg'
import comparacao from '../assets/comparacao.jpg'
import explicando from '../assets/explicando.jpg'
import vitalVoicePacote from '../assets/vitalVoice/vitalVoicePacote.jpg'
import vitalvoiceExplica from '../assets/vitalVoice/vitalvoiceExplica.jpg'
import vitalVoiceCaixa from '../assets/vitalVoice/vitalVoiceCaixa.jpg'
import vitalVoiceBanner from '../assets/vitalVoice/VitalVoiceBanner.jpg'
import vitalVoiceBeneficios from '../assets/vitalVoice/VitalVoiceBeneficios.jpg'
import certificado from '../assets/certificados.png'
import garantiaImg from '../assets/garantia.png'

export default function Vitalvoice() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const imagensGaleria = [
    { src: vitalvoice, alt: 'Imagem principal do Vitalvoice' },
    { src: vitalVoiceCaixa, alt: 'Caixa do Vitalvoice' },
    { src: vitalVoicePacote, alt: 'Pacote completo do Vitalvoice' },
    { src: vitalvoiceExplica, alt: 'Detalhes técnicos do Vitalvoice' },
    { src: comparacao, alt: 'Comparação de modelos' },
    { src: explicando, alt: 'Explicação geral sobre aparelhos auditivos' },
    { src: certificado, alt: 'Certificado' }
  ]

  const dados = {
    sigla: 'Vitalvoice | Fonovital',
    nome: 'Vitalvoice CIC Digital Recarregável | Fonovital',
    descricao:
      'Descubra o poder da audição nítida e natural com o VitalVoice CIC Digital Recarregável — um aparelho auditivo que combina tecnologia avançada, design discreto e facilidade de uso em um único dispositivo.',
    precoOriginal: 1990,
    precoAtual: 1399.9,
    parcelas: 12,
    avaliacoes: 12,
    nota: 4.4,
    link: 'https://fonovitaloficial.carrinho.app/one-checkout/ocmtb/28068435'
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(imagensGaleria[0].src)

  const whatsappLink = `https://wa.me/55329999069763?text=${encodeURIComponent(
    `Olá, quero saber mais sobre o ${dados.nome}`
  )}`

  const motivosTabela = [
    {
      recurso: '16 canais DSP',
      descricao:
        'Proporciona processamento digital de som de alta precisão, melhorando a clareza e naturalidade da audição.'
    },
    {
      recurso: 'Redução inteligente de ruído',
      descricao:
        'Ajusta automaticamente para minimizar sons indesejados do ambiente, como vento e ruído de fundo.'
    },
    {
      recurso: 'Pequeno e invisível',
      descricao: 'Design intra-auricular (CIC), quase imperceptível ao uso.'
    },
    {
      recurso: 'Tela digital HD',
      descricao: 'Exibe informações de carga e funcionamento com clareza.'
    },
    {
      recurso: 'Design moderno',
      descricao: 'Aparência elegante e ergonômica.'
    },
    {
      recurso: 'Som de alta qualidade',
      descricao: 'Transmissão sonora nítida e natural, sem distorções.'
    },
    {
      recurso: 'Confortável para uso prolongado',
      descricao: 'Leve e anatômico, evita desconforto mesmo após horas de uso.'
    },
    {
      recurso: 'Fácil de operar',
      descricao: 'Simples de ligar, ajustar e carregar.'
    },
    {
      recurso: 'Alta durabilidade',
      descricao: 'Bateria de longa duração e case recarregável de alta capacidade.'
    }
  ]

  const comparativoTecnologia = {
    tradicionais: [
      'Amplificam excessivamente o volume, ultrapassando a faixa segura para o ouvido humano.',
      'Produzem sons ásperos e desagradáveis.',
      'Podem causar tontura e agravar a perda auditiva.',
      'Ao serem ligados, emitem apitos ou assobios incômodos.'
    ],
    digital: [
      'Chip de 16 canais que transmite o som dentro do limite natural do ouvido humano.',
      'Modo inteligente de proteção auricular com início suave (10 segundos de atraso) para evitar picos de som ao ligar.',
      'Evita ruídos agudos e assobios ao inserir o aparelho.',
      'Protege a audição residual e melhora a experiência de uso a longo prazo.'
    ]
  }

  const especificacoesCarregamento = [
    { titulo: 'Tempo de carga', descricao: '2 horas' },
    { titulo: 'Tempo de uso contínuo', descricao: '12 a 15 horas' },
    { titulo: 'Capacidade do estojo', descricao: 'Pode recarregar os aparelhos de 3 a 5 vezes' },
    { titulo: 'Portabilidade', descricao: 'O case fornece proteção e energia em qualquer lugar' },
    { titulo: 'Display digital', descricao: 'Mostra o nível de carga de cada lado (L/R)' }
  ]

  const modosInteligentes = [
    {
      nome: 'Modo diário',
      descricao: 'Ideal para conversas e sons domésticos com equalização equilibrada.'
    },
    {
      nome: 'Modo reunião',
      descricao: 'Vozes claras e foco em fala para encontros e apresentações.'
    },
    {
      nome: 'Modo externo',
      descricao: 'Compensa ruídos de vento e fundo em ambientes abertos.'
    }
  ]

  const comparativoConforto = [
    {
      caracteristica: 'Design',
      cic: 'Semi-invisível, se mistura à cor da pele.',
      outros: 'Visível e difícil de esconder.'
    },
    {
      caracteristica: 'Conforto',
      cic: 'Leve e com dupla proteção auricular, sem bloqueio.',
      outros: 'Pode causar desconforto após uso prolongado.'
    },
    {
      caracteristica: 'Ajuste',
      cic: 'Encaixa-se de forma firme e natural no canal auditivo.',
      outros: 'Pode escorregar ou causar pressão excessiva.'
    }
  ]

  const videos = [
    {
      id: 'fonovital-empresa',
      titulo: 'Conheça a Fonovital',
      descricao:
        'Entenda como nasce cada produto Fonovital, nosso padrão de fabricação e o cuidado em todas as etapas.',
      src: 'https://www.youtube.com/embed/Z4-1AfiPFQ0?si=whNYxJH7XTz78_Et',
      title: 'Conheça a Fonovital'
    },
    {
      id: 'fonovital-relatos',
      titulo: 'Relatos reais de clientes',
      descricao:
        'Assista aos depoimentos de pessoas que transformaram a audição com o Vitalvoice.',
      src: 'https://www.youtube.com/embed/nVyYJ0NnZP8?si=xKLGXPbA3zey0YW2',
      title: 'Relatos de clientes Fonovital'
    }
  ]

  return (
    <section className="pt-32 bg-white font-[Montserrat] text-[#213547]">
      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{dados.nome}</h1>
            <p className="text-[#028794] font-semibold text-sm sm:text-base">
              Com 16 canais de DSP, algoritmo exclusivo, supressão de feedback e redução de ruído do vento.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-5 lg:flex-1">
              <ProductGallery
                images={imagensGaleria}
                selected={imagemSelecionada}
                onChange={setImagemSelecionada}
                className="w-full"
              />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                {dados.descricao}
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="flex flex-col gap-5 rounded-2xl border border-[#4A90E2]/20 bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                <ProductRating
                  rating={dados.nota}
                  count={dados.avaliacoes}
                  className="justify-center lg:justify-start"
                />

                <div className="space-y-1 text-center lg:text-left">
                  <p className="line-through text-xs sm:text-sm text-gray-400">
                    R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-[#213547] text-2xl sm:text-3xl font-bold">
                    R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Economize R$ {(dados.precoOriginal - dados.precoAtual).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-[#028794]/10 py-3 font-semibold text-base text-[#028794] lg:justify-start">
                  <HiOutlineCreditCard className="text-xl" />
                  12x R$ 151,42
                </p>

                <div className="grid gap-3 rounded-2xl border border-[#028794]/10 bg-[#f5fbfc] p-4 sm:grid-cols-3">
                  {destaquesRapidos.map(item => (
                    <div key={item.titulo} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                      <item.icon className="text-[#028794] text-2xl mb-2" />
                      <p className="font-semibold text-sm text-[#213547]">{item.titulo}</p>
                      <p className="text-xs text-gray-500">{item.descricao}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={dados.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#007c91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005f6e] sm:w-auto sm:self-start"
                >
                  COMPRAR AGORA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Motivos para Escolher Este Aparelho Auditivo
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-[#028794] text-white text-left">
                <tr>
                  <th className="px-4 py-3 text-sm sm:text-base">Recurso</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Descrição</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {motivosTabela.map((item, index) => (
                  <tr key={item.recurso} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f3f9fb]'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{item.recurso}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm sm:text-base">{item.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Por que escolher o Vitalvoice?
          </h2>
          <ul className="grid gap-3 text-white md:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Digital e inteligente: Ajusta-se automaticamente aos diferentes ambientes sonoros.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Carregamento rápido, uso prolongado: Diga adeus às pilhas, com bateria de longa duração.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Clareza em qualquer situação: Redução de ruídos múltiplos para ouvir apenas o que importa.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Mais liberdade, zero preocupações: Ideal para quem quer praticidade e desempenho.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Indicado para perdas auditivas leves a severas (86%): Potência confiável para todas as necessidades.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Tecnologia acessível com alto desempenho e excelente custo-benefício.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={garantiaImg}
            alt="Selo de garantia de 1 ano com promoção por tempo limitado"
            className="mx-auto w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="bg-[#f9fafb] border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#d97706]">
              🔸 Aparelhos Auditivos Tradicionais
            </h3>
            <ul className="space-y-3 text-gray-600">
              {comparativoTecnologia.tradicionais.map(item => (
                <li key={item} className="flex gap-2">
                  <span className="font-bold text-[#d97706]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#ecfeff] border border-[#028794] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#028794]">
              🔹 Novo Aparelho Auditivo Digital (CIC)
            </h3>
            <ul className="space-y-3 text-gray-700">
              {comparativoTecnologia.digital.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#028794] mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={vitalVoiceBanner}
            alt="Banner VitalVoice"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
          <img
            src={vitalVoiceBeneficios}
            alt="Benefícios do VitalVoice"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            🔋 Estojo de Carregamento Premium e Bateria de Longa Duração
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <tbody className="bg-white">
                {especificacoesCarregamento.map((item, index) => (
                  <tr key={item.titulo} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f3f9fb]'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{item.titulo}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm sm:text-base">{item.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">🌍 Modos de Uso Inteligentes</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {modosInteligentes.map(modo => (
              <div
                key={modo.nome}
                className="border border-[#028794] rounded-2xl p-5 bg-[#f0f9fb] text-center"
              >
                <h3 className="text-lg font-semibold text-[#028794] mb-2">{modo.nome}</h3>
                <p className="text-sm text-gray-600">{modo.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#ecfeff] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-[#028794] mb-4">
            Conheça a Fonovital em ação
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Veja de perto a nossa estrutura e ouça relatos reais de quem já recuperou a confiança para aproveitar cada conversa.
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
                  <h3 className="text-xl font-semibold text-[#028794]">{video.titulo}</h3>
                  <p className="text-sm text-gray-600">{video.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">👂 Conforto e Discrição</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-[#028794] text-white text-left">
                <tr>
                  <th className="px-4 py-3 text-sm sm:text-base">Característica</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Aparelho CIC (este modelo)</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Outros aparelhos de ouvido</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {comparativoConforto.map((linha, index) => (
                  <tr key={linha.caracteristica} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f3f9fb]'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{linha.caracteristica}</td>
                    <td className="px-4 py-3 text-gray-700 text-sm sm:text-base">{linha.cic}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm sm:text-base">{linha.outros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#028794] to-[#006d7e] py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Pronto para ouvir melhor com o Vitalvoice?</h3>
            <p className="text-sm sm:text-base text-white/90">
              Não precisa de audiometria presencial. Nossa equipe ajuda você a ajustar tudo pelo WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={dados.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#028794] shadow hover:bg-white/90 transition"
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

      <section className="w-full bg-[#f0fdf4] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-3xl mx-auto border border-green-300 rounded-2xl text-center p-6">
          <p className="text-lg font-semibold text-green-700 mb-2">
            Garantia de 1 ano de fábrica Fonovital
          </p>
          <p className="text-gray-600">
            Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">
          Garanta seu Vitalvoice agora mesmo
        </p>
        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#007c91] hover:bg-[#005f6e] text-white py-4 px-8 rounded-full font-bold text-lg transition"
        >
          GARANTIR O MEU
        </a>
      </section>

      <section className="w-full bg-white py-10 px-4 text-base lg:text-lg">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-semibold text-[#028794]">
            “Não deixe aparelhos auditivos inferiores agravarem a perda auditiva.”
          </p>
        </div>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <Comments />
        </div>
      </section>

      <Footer />
    </section>
  )
}
  const destaquesRapidos = [
    {
      icon: HiOutlineClipboardDocumentCheck,
      titulo: 'Não precisa de audiometria',
      descricao: 'Pronto para usar: ajuste guiado com nossos especialistas.'
    },
    {
      icon: HiOutlineUserGroup,
      titulo: '5 mil clientes satisfeitos',
      descricao: 'Comunidade crescente em todo o Brasil recomendando a Fonovital.'
    },
    {
      icon: HiOutlineArrowPath,
      titulo: 'Devolvemos seu dinheiro em 7 dias',
      descricao: 'Sem burocracia: não gostou, estornamos 100% do valor.'
    }
  ]
