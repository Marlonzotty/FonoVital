import { useEffect, useState } from 'react'
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

import img2 from '../assets/SmartVoice/43546b41-aa51-46c9-909d-4151c5edd32d.jpg'
import img1 from '../assets/SmartVoice/60c0c290-5641-42d2-8e68-59b360b8db11.jpg'
import img3 from '../assets/SmartVoice/b1d9bc02-c5bf-49e3-aca3-4f2124051700.jpg'
import img4 from '../assets/SmartVoice/cfa9f496-2eb4-4978-a4a7-2b0fcae23ba9.jpg'
import certificadosImg from '../assets/certificados.png'
import garantiaImg from '../assets/2anos.png'

export const smartVoiceGallery = [
  { src: img1, alt: 'SmartVoice no estojo de carga' },
  { src: img2, alt: 'SmartVoice ângulo lateral' },
  { src: img3, alt: 'SmartVoice e display LED' },
  { src: img4, alt: 'SmartVoice detalhe do fone' }
]

export const smartVoiceHeroImage = smartVoiceGallery[0]

export default function SmartVoice() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dados = {
    sigla: 'SmartVoice | Fonovital',
    nome: 'SmartVoice Bluetooth Inteligente | Fonovital',
    descricao:
      'Fones auditivos TWS com cancelamento de ruído, app de ajuste fino e estojo de recarga com display LED para 24h de autonomia.',
    precoOriginal: 1899,
    precoAtual: 1399.9,
    parcelas: 12,
    avaliacoes: 18,
    nota: 4.5,
    link: 'https://wa.me/55329999069763?text=Ol%C3%A1%2C%20quero%20comprar%20o%20SmartVoice'
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(smartVoiceGallery[0].src)

  const economia = (dados.precoOriginal - dados.precoAtual).toFixed(2).replace('.', ',')

  const destaquesRapidos = [
    {
      icon: HiOutlineClipboardDocumentCheck,
      titulo: 'Configuração guiada',
      descricao: 'App de controle com perfis prontos e suporte remoto.'
    },
    {
      icon: HiOutlineUserGroup,
      titulo: 'Bluetooth 5.2',
      descricao: 'Chamadas claras e streaming direto do seu celular.'
    },
    {
      icon: HiOutlineArrowPath,
      titulo: '24h com o estojo',
      descricao: 'Display LED mostra a carga de cada lado e do case.'
    }
  ]

  const caracteristicasPrincipais = [
    { funcao: 'Bluetooth 5.2', descricao: 'Latência baixa para chamadas e músicas, mantendo clareza vocal.' },
    { funcao: 'App dedicado', descricao: 'Equalizador simples, ajuste de ganho e perfis de ambiente.' },
    { funcao: 'Noise Reduction', descricao: 'Supressão de ruído de fundo para diálogos mais nítidos.' },
    { funcao: 'Estojo LED', descricao: 'Display digital indica o nível individual de cada fone e do estojo.' },
    { funcao: 'Modo Transparência', descricao: 'Permite ouvir o ambiente sem remover os fones.' },
    { funcao: 'Ergonomia TWS', descricao: 'Formato anatômico para uso prolongado com conforto.' }
  ]

  const bateriaCarregamento = [
    { titulo: 'Tipo de carregamento', descricao: 'Via estojo com contatos magnéticos.' },
    { titulo: 'Autonomia', descricao: 'Até 24h totais com recargas do estojo.' },
    { titulo: 'Tempo de carga', descricao: '~2h para estojo completo.' },
    { titulo: 'Indicador', descricao: 'Display LED com porcentagem individual L/R.' }
  ]

  const controleSom = [
    { titulo: 'Perfis rápidos', descricao: 'Silencioso, urbano e música pelo app.' },
    { titulo: 'Ajuste fino', descricao: 'Equalizador de agudos/médios/graves direto no celular.' },
    { titulo: 'Anti-feedback', descricao: 'Reduz assovios ao ajustar volume.' }
  ]

  const higieneSeguranca = [
    'Ponteiras de silicone macias e hipoalergênicas.',
    'Estojo fechado protege contra poeira e umidade durante a carga.'
  ]

  const certificacoes = [
    'CE (Conformité Européenne)',
    'RoHS (Restriction of Hazardous Substances)',
    'FCC (Federal Communications Commission)',
    'ISO / Licença de produção de dispositivos médicos'
  ]

  const conteudoEmbalagem = [
    '2 fones SmartVoice (L/R)',
    'Estojo de carregamento com display LED',
    'Cabo USB de carga',
    '3 pares de pontas de silicone (S, M, L)',
    'Manual do usuário'
  ]

  const whatsappLink = `https://wa.me/55329999069763?text=${encodeURIComponent(
    `Olá, quero saber mais sobre o ${dados.nome}`
  )}`

  return (
    <section className="pt-32 min-h-screen hero-bg grid-bg font-body text-white">
      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{dados.nome}</h1>
            <p className="text-[#7de8ff] font-semibold text-sm sm:text-base">
              Conectividade avançada, app dedicado e estojo inteligente com display LED.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-5 lg:flex-1">
              <ProductGallery
                images={smartVoiceGallery}
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
                  12x R$ {(dados.precoAtual / dados.parcelas).toFixed(2).replace('.', ',')}
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
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#008B91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005f6e] sm:w-auto sm:self-start"
                >
                  COMPRAR AGORA
                </a>
              </div>
            </div>
          </div>
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

      <section className="w-full section-gradient py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Por que escolher o SmartVoice?</h2>
          <ul className="grid gap-3 text-white md:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Streaming direto do celular com latência reduzida.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>App com ajuste fino e perfis rápidos para diferentes ambientes.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Estojo compacto com display LED de carga individual.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Design TWS discreto para uso prolongado com conforto.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={garantiaImg}
            alt="Selo de garantia de 2 ano"
            className="mx-auto w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="bg-[#f9fafb] border border-white/15 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#7de8ff]">🔈 Controle de Som</h3>
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
            <h3 className="text-xl font-semibold mb-4 text-[#047857]">🧴 Higiene e Segurança</h3>
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
          <h2 className="text-2xl font-semibold mb-6 text-center">🔋 Bateria e Carregamento</h2>
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
            <h3 className="text-2xl font-semibold text-[#7de8ff] flex items-center gap-2">📑 Certificações de Qualidade</h3>
            <p className="text-gray-300">
              Estes certificados asseguram que o SmartVoice cumpre normas internacionais de segurança, eficiência e biocompatibilidade.
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
            <img src={certificadosImg} alt="Certificados SmartVoice" className="w-full max-w-md object-contain" />
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">📦 Conteúdo da Embalagem</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {conteudoEmbalagem.map(item => (
              <div key={item} className="rounded-2xl border border-[#028794]/20 bg-white/5 px-5 py-4 text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#028794] to-[#006d7e] py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Pronto para elevar sua audição com o SmartVoice?</h3>
            <p className="text-sm sm:text-base text-white/90">
              Ajuste guiado pelo app, conforto TWS e autonomia para o dia todo.
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
          <p className="text-lg font-semibold text-green-700 mb-2">Garantia de 1 ano de fábrica Fonovital</p>
          <p className="text-gray-300">
            Troca imediata em caso de defeito de fabricação. Atendimento dedicado via WhatsApp com especialistas audiológicos.
          </p>
        </div>
      </section>

      <section className="w-full bg-white/5 py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">Clareza profissional para todas as conversas.</p>
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
