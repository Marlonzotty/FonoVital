import { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import {
  HiOutlineCreditCard,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineShieldCheck
} from 'react-icons/hi2'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import ProductGallery from '../components/ProductGallery'
import ProductRating from '../components/ProductRating'

import imagemVoxton1 from '../assets/voxton/imagemVoxton1.jpg'
import voxton from '../assets/voxton/voxton.png'
import voxtonPacote from '../assets/voxton/VoxtonPacote.jpg'
import voxtonOque from '../assets/voxton/voxtonOque.jpg'
import comparacao from '../assets/comparacao.jpg'
import certificadosImg from '../assets/certificados.png'
import caixaVoxton from '../assets/voxton/caixaVoxton.jpg'
import caixinhaVox from '../assets/voxton/caixinhaVox.jpg'
import voxtoTamanho from '../assets/voxton/VoxtoTamanho.jpg'
import explicando from '../assets/explicando.jpg'
import bannerVoxton from '../assets/voxton/BannerVoxton.jpg'
import voxtonCustoBeneficio from '../assets/voxton/voxtonCustoBeneficio.jpg'

export const voxtonGallery = [
  { src: voxtoTamanho, alt: 'Dimensões e escala do Voxton' },
  { src: imagemVoxton1, alt: 'Foto frontal do Voxton' },
  { src: voxton, alt: 'Foto principal do Voxton' },
  { src: caixinhaVox, alt: 'Estojo compacto do Voxton' },
  { src: voxtonPacote, alt: 'Pacote completo do Voxton' },
  { src: caixaVoxton, alt: 'Caixa e estojo do Voxton' },
  { src: voxtonOque, alt: 'Detalhes do corpo do Voxton' },
  { src: comparacao, alt: 'Comparação do Voxton com outros modelos' },
  { src: voxtonCustoBeneficio, alt: 'Custo-benefício do Voxton' },
  { src: certificadosImg, alt: 'Certificações de qualidade Voxton' },
  { src: explicando, alt: 'Explicação geral sobre o Voxton' }
]

export const voxtonHeroImage = voxtonGallery[0]

export default function Voxton() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const imagensGaleria = voxtonGallery

  const dados = {
    sigla: 'Voxton | Fonovital',
    nome: 'Voxton Mini CIC | Fonovital',
    descricao:
      'Voxton é um aparelho auditivo CIC bicolor (vermelho e azul) com chip digital avançado, som natural e estrutura ultraleve para uso discreto em qualquer idade.',
    lados: {
      par: {
        label: 'PAR COMPLETO',
        imagem: voxton,
        precoOriginal: 1399,
        precoAtual: 599.9,
        link: 'https://fonovitalltda.pay.yampi.com.br/r/VYHUUSPWP8'
      },
      direito: {
        label: 'LADO DIREITO',
        imagem: voxton,
        precoOriginal: 499,
        precoAtual: 399.9,
        link: 'https://fonovitalltda.pay.yampi.com.br/r/3KZ6HFML6R'
      },
      esquerdo: {
        label: 'LADO ESQUERDO',
        imagem: voxton,
        precoOriginal: 499,
        precoAtual: 399.9,
        link: 'https://fonovitalltda.pay.yampi.com.br/r/3PRHSVWLTX'
      }
    },
    avaliacoes: 21,
    parcelas: 12,
    nota: 4.3
  }

  const [opcao, setOpcao] = useState<'par' | 'direito' | 'esquerdo'>('par')
  const [imagemSelecionada, setImagemSelecionada] = useState<string>(imagensGaleria[0].src)

  const ladoAtual = dados.lados[opcao]
  const economia = (ladoAtual.precoOriginal - ladoAtual.precoAtual).toFixed(2).replace('.', ',')

  const whatsappLink =
    'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital'

  const destaquesRapidos = [
    {
      icon: HiOutlineCpuChip,
      titulo: 'Chip digital avançado',
      descricao: 'Otimiza ganho e cancela ruído automaticamente, sem necessidade de audiometria.'
    },
    {
      icon: HiOutlineDevicePhoneMobile,
      titulo: 'Operação simples',
      descricao: 'Regule o volume girando o botão — sem palheta ou ferramentas.'
    },
    {
      icon: HiOutlineShieldCheck,
      titulo: 'Resiste a suor e umidade',
      descricao: 'Ideal para uso diário, inclusive atividades físicas e regiões úmidas.'
    }
  ]

  const caracteristicasPrincipais = [
    {
      funcao: 'Autenticidade Sonora',
      descricao:
        'Reproduz sons naturais e suaves, entregando experiência fiel em conversas, músicas e ambientes.'
    },
    {
      funcao: 'Chip Digital Avançado',
      descricao:
        'Processador que ajusta ganho e cancelamento de ruído automaticamente para clareza constante.'
    },
    {
      funcao: 'Design Confortável',
      descricao:
        'Estrutura mini e ergonômica, leve e discreta, indicada inclusive para dormir com o aparelho.'
    },
    {
      funcao: 'Operação Simples',
      descricao: 'Ajuste o volume girando o botão suavemente — sem ferramentas extras.'
    },
    {
      funcao: 'À Prova de Suor e Umidade',
      descricao:
        'Resistência a suor e respingos para uso diário e atividades ao ar livre.'
    },
    {
      funcao: 'Portátil e Prático',
      descricao: 'Estojo liso de 7,5 cm × 2,8 cm que cabe no bolso e protege o aparelho.'
    },
    {
      funcao: 'Design Bicolor (Red-Blue)',
      descricao: 'Identificação rápida: vermelho (direito) e azul (esquerdo).' 
    },
    {
      funcao: 'Alta Durabilidade',
      descricao: 'Componentes de precisão resistentes a quedas leves e uso prolongado.'
    },
    {
      funcao: 'Alimentação Simples',
      descricao: 'Utiliza bateria A10 Zinc-Air de fácil substituição e longa autonomia.'
    }
  ]

  const bateriaDesempenho = [
    { titulo: 'Tipo de bateria', valor: 'A10 Zinc-Air' },
    { titulo: 'Duração por bateria', valor: 'Até 60 horas contínuas' },
    { titulo: 'Autonomia média', valor: '7 – 8 dias de uso normal' },
    { titulo: 'Substituição', valor: 'Manual, sem ferramentas' },
    { titulo: 'Modo de economia', valor: 'Desligamento manual por botão integrado' }
  ]

  const parametrosTecnicos = [
    { parametro: 'OSPL90 máximo', valor: '115 ± 3 dB' },
    { parametro: 'Média alta frequência OSPL90', valor: '106 ± 4 dB' },
    { parametro: 'Ganho acústico total', valor: '32 ± 5 dB' },
    { parametro: 'Faixa de frequência', valor: '300 – 4500 Hz' },
    { parametro: 'Ruído de entrada equivalente', valor: '≤ 29 ± 3 dB' },
    { parametro: 'Distorção harmônica total', valor: '≤ 7% ± 3%' }
  ]

  const confortoErgonomia = [
    'Encaixe CIC totalmente no canal auditivo para máxima discrição.',
    'Peso ultraleve, quase imperceptível durante o uso prolongado.',
    'Conforto suficiente para dormir com o dispositivo.',
    'Ponteiras em silicone médico hipoalergênico.'
  ]

  const conteudoEmbalagem = [
    '2 aparelhos auditivos Voxton (L/R).',
    '1 estojo de transporte compacto (7,5 cm × 2,8 cm).',
    '6 baterias A10 Zinc-Air.',
    '3 pares de ponteiras de silicone (P, M, G).',
    '1 escova de limpeza com ferramenta de remoção de cera.',
    'Manual multilíngue de instruções.'
  ]

  const certificacoes = [
    'CE – Conformidade Europeia.',
    'RoHS – Restrição de Substâncias Perigosas.',
    'FCC – Federal Communications Commission (EUA).',
    'FDA – Dispositivo médico de uso pessoal.'
  ]

  const beneficiosResumo = [
    '✅ Som natural e cristalino.',
    '✅ Operação simples e sem palheta.',
    '✅ Ultraleve e confortável (pode dormir com ele).',
    '✅ Resistente à umidade e suor.',
    '✅ Bateria de longa duração (até 60h).',
    '✅ Chip digital de alta performance.'
  ]

  const videos = [
    {
      id: 'voxton-demonstracao',
      titulo: 'Veja o Voxton em ação',
      descricao: 'Demonstração completa do ajuste e da experiência sonora do Voxton.',
      src: 'https://www.youtube.com/embed/HK2MSo0sIjc?si=JGG598yJedx3W2Bg',
      title: 'Voxton em ação'
    }
  ]

  return (
    <section className="pt-20 md:pt-24 min-h-screen hero-bg grid-bg font-body text-white">
      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{dados.nome}</h1>
            <p className="text-[#7de8ff] font-semibold text-sm sm:text-base">
              Não precisa de audiometria: ajuste o volume no próprio aparelho e conte com suporte Fonovital.
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
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                {dados.descricao}
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="flex flex-col gap-5 card-3d p-6 sm:p-8">
                <ProductRating
                  rating={dados.nota}
                  count={dados.avaliacoes}
                  className="justify-center lg:justify-start"
                />

                <div className="inline-flex items-center gap-2 self-center rounded-full bg-[#f0f4ff] px-3 py-1 text-xs font-semibold text-[#7de8ff] lg:self-start">
                  <span>Opção selecionada:</span>
                  <span>{ladoAtual.label}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['esquerdo', 'par', 'direito'] as const).map(lado => (
                    <button
                      key={lado}
                      onClick={() => {
                        setOpcao(lado)
                        setImagemSelecionada(dados.lados[lado].imagem)
                      }}
                      className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                        opcao === lado
                          ? 'section-gradient text-white border-[#028794]'
                          : 'bg-white/5 text-white border-gray-300 hover:border-[#028794]'
                      }`}
                    >
                      {dados.lados[lado].label}
                    </button>
                  ))}
                </div>

                <div className="space-y-1 text-center lg:text-left">
                  <p className="line-through text-xs sm:text-sm text-gray-400">
                    R$ {ladoAtual.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-white text-2xl sm:text-3xl font-bold">
                    R$ {ladoAtual.precoAtual.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-gray-300">Economize R$ {economia}</p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-[#028794]/10 py-3 font-semibold text-base text-[#7de8ff] lg:justify-start">
                  <HiOutlineCreditCard className="text-xl" />
                  12x R$ 61,04
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
                  href={ladoAtual.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#008B91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005f6e] sm:w-auto sm:self-start"
                >
                  Comprar {opcao === 'par' ? 'o par' : `lado ${opcao}`}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src={voxtonPacote}
            alt="Conteúdo completo do Voxton"
            className="w-full rounded-3xl shadow-lg object-cover"
          />
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">⚙️ Características Principais</h2>
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
            <h3 className="text-xl font-semibold mb-4 text-[#047857]">🔋 Bateria e Desempenho</h3>
            <ul className="space-y-3 text-gray-300">
              {bateriaDesempenho.map(item => (
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
            <h3 className="text-xl font-semibold mb-4 text-[#4338ca]">🎚️ Parâmetros Técnicos</h3>
            <ul className="space-y-3 text-gray-300">
              {parametrosTecnicos.map(item => (
                <li key={item.parametro} className="flex gap-2">
                  <FaCheckCircle className="text-[#4338ca] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{item.parametro}</p>
                    <p className="text-sm">{item.valor}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">🎧 Conforto e Ergonomia</h2>
          <ul className="space-y-3 text-gray-300">
            {confortoErgonomia.map(item => (
              <li key={item} className="flex gap-2">
                <FaCheckCircle className="text-[#7de8ff] mt-1 shrink-0" />
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">📦 Conteúdo da Embalagem</h2>
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

      <section className="w-full section-dark py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1fr_0.9fr] items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#7de8ff]">🧾 Certificações e Segurança</h3>
            <p className="text-gray-300">
              O Voxton segue normas internacionais garantindo segurança, eficiência e confiabilidade.
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
              alt="Certificações Voxton"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      <section className="w-full section-gradient py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#7de8ff]">🖤 Resumo de Benefícios</h2>
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

      <section className="w-full section-gradient py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#7de8ff]">🎥 Conheça o Voxton de perto</h2>
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

      <section className="w-full section-gradient py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={bannerVoxton}
            alt="Banner Voxton"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
          <img
            src={voxtonCustoBeneficio}
            alt="Voxton custo benefício"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#028794] to-[#006d7e] py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Garanta o Voxton com suporte imediato</h3>
            <p className="text-sm sm:text-base text-white/90">
              Não precisa de audiometria. Nossa equipe ajuda você a ajustar o aparelho pelo WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={ladoAtual.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-[#7de8ff] shadow hover:bg-white/10 transition"
            >
              Comprar {opcao === 'par' ? 'o par' : `lado ${opcao}`}
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
                O Voxton é indicado para qualquer idade?
              </summary>
              <p className="mt-2 text-gray-300">
                Sim! Ele é discreto, confortável e fácil de usar, ideal para adultos e idosos.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#7de8ff]">
                Preciso de audiometria antes de usar?
              </summary>
              <p className="mt-2 text-gray-300">
                Não obrigatoriamente. O Voxton vem pronto para uso, e oferecemos teste auditivo online gratuito para orientar o ajuste.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#7de8ff]">
                Quanto tempo dura a bateria A10?
              </summary>
              <p className="mt-2 text-gray-300">
                Cada bateria dura até 60 horas de uso continuo, rendendo cerca de uma semana em uso normal.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">Pronto para ouvir melhor todos os dias?</p>
        <a
          href={ladoAtual.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-4 px-8 rounded-full font-bold text-lg transition"
        >
          GARANTIR O MEU
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



















