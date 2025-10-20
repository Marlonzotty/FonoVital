import { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import {
  HiOutlineCreditCard,
  HiOutlineDevicePhoneMobile,
  HiOutlineSignal,
  HiOutlineSparkles
} from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import ProductGallery from '../components/ProductGallery'
import ProductRating from '../components/ProductRating'

import vitalAirfundo from '../assets/vitalair/vitalairfundo.jpg'
import vitalAirBanner from '../assets/vitalair/VitalAirBanner.jpg'
import vitalAirBeneficios from '../assets/vitalair/VitalAirBeneficios.jpg'
import vitalAirFono from '../assets/vitalair/VitalAirFono.jpg'
import img1 from '../assets/vitalair/produto-completo.jpg'
import img2 from '../assets/vitalair/tws-bluetooth.jpg'
import img3 from '../assets/vitalair/32-canais.jpg'
import img4 from '../assets/vitalair/bateria-autonomia.jpg'
import img5 from '../assets/vitalair/comparacao-fonovital.jpg'
import img6 from '../assets/vitalair/VitalAir-oqueinclui.jpg'
import vitalAirCel from '../assets/vitalair/vitalairCel.jpg'
import vitalAirIdoso from '../assets/vitalair/vitalairidoso.jpg'
import certificadosImg from '../assets/certificados.png'

export default function VitalAir() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const imagensGaleria = [
    { src: vitalAirfundo, alt: 'Vital Air em destaque' },
    { src: vitalAirCel, alt: 'Vital Air com destaque clean' },
    { src: vitalAirIdoso, alt: 'Uso real do Vital Air' },
    { src: img1, alt: 'Imagem principal do Vital Air' },
    { src: img2, alt: 'Fones Bluetooth Vital Air' },
    { src: img3, alt: 'Processamento multi-canal Vital Air' },
    { src: img4, alt: 'Autonomia de bateria Vital Air' },
    { src: img6, alt: 'Itens inclusos no Vital Air' },
    { src: img5, alt: 'Comparação do Vital Air com outros modelos' },
    { src: certificadosImg, alt: 'Certificados do Vital Air' }
  ]

  const dados = {
    sigla: 'Vital Air | Fonovital',
    nome: 'Vital Air Bluetooth Inteligente | Fonovital',
    descricao:
      'Aparelho auditivo inteligente com conectividade Bluetooth, design moderno e leve, controle total via aplicativo e desempenho otimizado para chamadas, música e amplificação sonora. Desenvolvido para proporcionar clareza cristalina e praticidade para usuários de todas as idades — especialmente idosos.',
    precoOriginal: 2899,
    precoAtual: 1999.0,
    parcelas: 12,
    avaliacoes: 42,
    nota: 4.8,
    link: 'https://fonovitaloficial.carrinho.app/one-checkout/ocmtb/28068594'
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(imagensGaleria[0].src)

  const whatsappLink = `https://wa.me/55329999069763?text=${encodeURIComponent(
    `Olá, quero saber mais sobre o ${dados.nome}`
  )}`

  const economia = (dados.precoOriginal - dados.precoAtual).toFixed(2).replace('.', ',')

  const destaquesRapidos = [
    {
      icon: HiOutlineDevicePhoneMobile,
      titulo: 'Controle via app',
      descricao: 'Ajustes completos de volume, modos e equalização direto no smartphone.'
    },
    {
      icon: HiOutlineSignal,
      titulo: 'Bluetooth estável',
      descricao: 'Chamadas, músicas e vídeos sem interrupções com reconexão automática.'
    },
    {
      icon: HiOutlineSparkles,
      titulo: 'Conforto ultra leve',
      descricao: 'Design TWS discreto, anatômico e sem distinção de lado.'
    }
  ]

  const caracteristicasPrincipais = [
    {
      funcao: 'Som Cristalino e Leveza',
      descricao:
        'Ultra leve e ergonômico, com som de alta definição e mínima distorção, ideal para uso prolongado sem desconforto.'
    },
    {
      funcao: 'Bluetooth Connection',
      descricao:
        'Conexão Bluetooth estável para chamadas, vídeos e controle direto via aplicativo dedicado.'
    },
    {
      funcao: 'App com Monitoramento em Tempo Real',
      descricao:
        'Ajuste volume, modos de audição e acompanhe status de bateria e performance em tempo real.'
    },
    {
      funcao: 'Intelligent Noise Reduction',
      descricao:
        'Redução de ruído de alta precisão, filtrando sons de fundo e realçando vozes importantes.'
    },
    {
      funcao: 'Multi-Channel DSP',
      descricao:
        'Processamento digital em múltiplos canais, com amplificação independente e balanceada em cada faixa de frequência.'
    },
    {
      funcao: 'Long Battery Life',
      descricao:
        'Até 12 horas de uso contínuo por carga com recarga rápida no estojo portátil.'
    },
    {
      funcao: 'Auto Reconnect & Memory Pairing',
      descricao:
        'Reconexão automática com o último dispositivo pareado assim que sai do estojo.'
    },
    {
      funcao: 'Not Distinguishing Left and Right',
      descricao:
        'Ambos os fones funcionam bilateralmente, garantindo encaixe adaptável sem diferenciação L/R.'
    },
    {
      funcao: 'Long Wearing Comfort',
      descricao:
        'Encaixe ergonômico sem pressão, pensado para uso prolongado sem fadiga.'
    },
    {
      funcao: 'Multi-Mode Operation',
      descricao:
        'Alternância de modos com um toque: Geral, Reunião e Externo para adaptar-se a qualquer ambiente.'
    },
    {
      funcao: 'Digital LED Display',
      descricao:
        'Display no estojo mostra o nível exato de bateria de cada lado (L/R).'
    },
    {
      funcao: 'Quick Connect',
      descricao:
        'Emparelhamento instantâneo com smartphones Android e iOS.'
    },
    {
      funcao: 'Stylish Minimalist Design',
      descricao:
        'Estilo moderno e discreto, perfeito para acompanhar a rotina e combina com qualquer look.'
    }
  ]

  const bateriaCarregamento = [
    { titulo: 'Tempo de uso por carga', descricao: 'Até 12 horas de funcionamento contínuo.' },
    { titulo: 'Tempo de carregamento', descricao: 'Aproximadamente 70 minutos para carga completa.' },
    { titulo: 'Tipo de recarga', descricao: 'Estojo magnético portátil com display LED.' },
    {
      titulo: 'Tipo de bateria',
      descricao: 'Íon-lítio de alta densidade com proteção contra sobrecarga.'
    },
    { titulo: 'Autonomia total', descricao: 'Até 3–4 ciclos completos de recarga com o estojo.' }
  ]

  const conectividadeApp = [
    {
      titulo: 'Conexão Bluetooth',
      descricao: 'Versão 5.0 ou superior, estável para chamadas e streaming.'
    },
    {
      titulo: 'Compatibilidade',
      descricao: 'Funciona com Android e iOS sem necessidade de acessórios extras.'
    },
    {
      titulo: 'Emparelhamento automático',
      descricao: 'Reconecta ao último dispositivo assim que sai do estojo.'
    }
  ]

  const funcoesApp = [
    'Ajuste de volume, equalização e modos (Geral, Reunião, Externo).',
    'Monitoramento de bateria em tempo real para fones e estojo.',
    'Teste auditivo personalizado para calibrar o som com precisão.'
  ]

  const modosAudicao = [
    {
      modo: 'General Mode',
      finalidade: 'Uso diário',
      descricao: 'Equalização balanceada e natural para conversas e entretenimento.'
    },
    {
      modo: 'Meeting Mode',
      finalidade: 'Ambientes internos',
      descricao: 'Realce de vozes e cancelamento de ruído intenso em reuniões e eventos.'
    },
    {
      modo: 'Outdoor Mode',
      finalidade: 'Ambientes externos',
      descricao: 'Supressão de vento e ruídos de tráfego mantendo a clareza vocal.'
    }
  ]

  const processamentoAudio = [
    'Tecnologia Multi-Channel DSP que processa graves, médios e agudos de forma independente.',
    'Redução de ruído dinâmica que ajusta automaticamente de acordo com o ambiente.',
    'Resposta de frequência ampla para preservar timbres naturais de voz e música.'
  ]

  const designErgonomia = [
    'Formato inspirado em fones TWS intra-auriculares com encaixe anatômico.',
    'Peso inferior a 5g por unidade para uso ultraleve.',
    'Cor preto brilhante com estojo digital de acabamento premium.',
    'Material em polímero ABS e silicone médico hipoalergênico.'
  ]

  const conteudoEmbalagem = [
    '2 aparelhos auditivos Bluetooth (funcionamento bilateral).',
    '1 estojo de carregamento com display LED.',
    '1 cabo USB de carregamento.',
    '3 pares de ponteiras de silicone (P, M, G).',
    'Manual do usuário multilíngue.'
  ]

  const certificacoes = [
    'CE – Conformidade Europeia.',
    'FCC – Federal Communications Commission (EUA).',
    'RoHS – Restrição de Substâncias Perigosas.',
    'FDA – Registro de dispositivo médico de uso pessoal.'
  ]

  const beneficiosResumo = [
    '✅ Som cristalino com tecnologia DSP multi-canal.',
    '✅ Controle total via aplicativo e Bluetooth.',
    '✅ Redução de ruído inteligente para qualquer ambiente.',
    '✅ Modos automáticos: Geral, Reunião e Externo.',
    '✅ Design moderno, confortável e sem diferenciação de lados.',
    '✅ Longa duração de bateria com recarga rápida no estojo.'
  ]

  const videos = [
    {
      id: 'vitalair-empresa',
      titulo: 'Conheça a Fonovital',
      descricao:
        'Veja como desenvolvemos soluções auditivas inteligentes e os bastidores da Fonovital.',
      src: 'https://www.youtube.com/embed/Z4-1AfiPFQ0?si=whNYxJH7XTz78_Et',
      title: 'Conheça a Fonovital'
    },
    {
      id: 'vitalair-relatos',
      titulo: 'Relatos reais de clientes',
      descricao:
        'Depoimentos de usuários que transformaram a audição com nossos aparelhos.',
      src: 'https://www.youtube.com/embed/nVyYJ0NnZP8?si=xKLGXPbA3zey0YW2',
      title: 'Relatos de clientes Fonovital'
    }
  ]

  return (
    <section className="pt-32 bg-white font-[Montserrat] text-[#213547]">
      <Navbar />

      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{dados.nome}</h1>
            <p className="text-[#028794] font-semibold text-sm sm:text-base">
              Bluetooth de última geração, app exclusivo e som cristalino com DSP multi-canal.
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
                  <p className="text-sm text-gray-500">Economize R$ {economia}</p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-[#028794]/10 py-3 font-semibold text-base text-[#028794] lg:justify-start">
                  <HiOutlineCreditCard className="text-xl" />
                  12x R$ 216,36
                </p>

                <div className="grid gap-3 rounded-2xl border border-[#028794]/10 bg-[#f0f9fb] p-4 sm:grid-cols-3">
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

      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src={vitalAirFono}
            alt="Audiologista apresentando o Vital Air"
            className="w-full rounded-3xl shadow-lg object-cover"
          />
        </div>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">⚙️ Características Principais</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-[#028794] text-white text-left">
                <tr>
                  <th className="px-4 py-3 text-sm sm:text-base">Função</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Descrição detalhada</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {caracteristicasPrincipais.map((item, index) => (
                  <tr key={item.funcao} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f3f9fb]'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{item.funcao}</td>
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
          <h2 className="text-2xl font-semibold text-white mb-6">Por que escolher o Vital Air?</h2>
          <ul className="grid gap-3 text-white md:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Bluetooth 5.0 para chamadas, músicas e vídeos com clareza cristalina.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Controle completo no app com monitoramento em tempo real de bateria e desempenho.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Design leve, discreto e sem diferenciação entre os lados: adaptável para qualquer ouvido.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Modos automáticos para ambientes diferentes, com redução inteligente de ruídos.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="bg-[#ecfdf5] border border-green-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#047857]">🔋 Bateria e Carregamento</h3>
            <ul className="space-y-3 text-gray-600">
              {bateriaCarregamento.map(item => (
                <li key={item.titulo} className="flex gap-2">
                  <FaCheckCircle className="text-[#047857] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#213547]">{item.titulo}</p>
                    <p className="text-sm">{item.descricao}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#f5f7ff] border border-[#c7d2fe] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#4338ca]">📱 Conectividade e App</h3>
            <ul className="space-y-3 text-gray-600">
              {conectividadeApp.map(item => (
                <li key={item.titulo} className="flex gap-2">
                  <FaCheckCircle className="text-[#4338ca] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#213547]">{item.titulo}</p>
                    <p className="text-sm">{item.descricao}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-white/70 border border-[#c7d2fe] p-4">
              <p className="font-semibold text-[#4338ca] mb-2">Funções do aplicativo:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {funcoesApp.map(funcao => (
                  <li key={funcao}>{funcao}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">🎚️ Modos de Audição Inteligentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-[#028794] text-white text-left">
                <tr>
                  <th className="px-4 py-3 text-sm sm:text-base">Modo</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Finalidade</th>
                  <th className="px-4 py-3 text-sm sm:text-base">Descrição</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {modosAudicao.map((item, index) => (
                  <tr key={item.modo} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f3f9fb]'}>
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base">{item.modo}</td>
                    <td className="px-4 py-3 text-sm sm:text-base text-gray-700">{item.finalidade}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm sm:text-base">{item.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#028794]/20 bg-[#f0f9fb] p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#028794]">🎵 Processamento de Áudio</h3>
            <ul className="space-y-3 text-gray-600">
              {processamentoAudio.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#028794] mt-1 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#028794]/20 bg-[#f0f9fb] p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#028794]">🧩 Design e Ergonomia</h3>
            <ul className="space-y-3 text-gray-600">
              {designErgonomia.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#028794] mt-1 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">📦 Conteúdo da Embalagem</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {conteudoEmbalagem.map(item => (
              <div
                key={item}
                className="rounded-2xl border border-[#028794]/20 bg-[#f0f9fb] px-5 py-4 text-[#213547]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1fr_0.9fr] items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#028794]">🧾 Certificações de Segurança e Qualidade</h3>
            <p className="text-gray-600">
              O Vital Air segue padrões internacionais para oferecer segurança, eficiência e biocompatibilidade.
            </p>
            <ul className="space-y-2 text-gray-700">
              {certificacoes.map(item => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="text-[#028794] mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={certificadosImg}
              alt="Certificações do Vital Air"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-[#ecfeff] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#028794]">🖤 Resumo de Benefícios</h2>
          <ul className="space-y-3 text-gray-700">
            {beneficiosResumo.map(item => (
              <li key={item} className="flex gap-2">
                <FaCheckCircle className="text-[#028794] mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={vitalAirBanner}
            alt="Banner Vital Air"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
          <img
            src={vitalAirBeneficios}
            alt="Benefícios do Vital Air"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      <section className="w-full bg-[#ecfeff] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-[#028794] mb-4">
            Veja o Vital Air na prática
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Assista aos vídeos para conhecer nossa estrutura e ouvir relatos reais de quem já transformou a audição com a Fonovital.
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

      <section className="w-full bg-gradient-to-r from-[#028794] to-[#006d7e] py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Transforme sua audição com o Vital Air</h3>
            <p className="text-sm sm:text-base text-white/90">
              Não precisa de audiometria presencial. Controle via app e suporte especializado pelo WhatsApp.
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

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-6">Perguntas Frequentes</h3>
          <div className="space-y-4">
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                Precisa de exames para usar o Vital Air?
              </summary>
              <p className="mt-2 text-gray-600">
                Não. Ele é pronto para uso, e nossas dicas no app ajudam a personalizar o ajuste ideal.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                Posso controlar tudo pelo celular?
              </summary>
              <p className="mt-2 text-gray-600">
                Sim! O Vital Air possui app intuitivo com todos os ajustes em tempo real.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                Serve para idosos?
              </summary>
              <p className="mt-2 text-gray-600">
                Totalmente. O design leve e o app guiado tornam a adaptação simples para qualquer idade.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">
          Controle sua audição com o Vital Air.
        </p>
        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#007c91] hover:bg-[#005f6e] text-white py-4 px-8 rounded-full font-bold text-lg transition"
        >
          GARANTA O SEU AGORA
        </a>
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
