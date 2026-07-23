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
import ProductActionStrip from '../components/ProductActionStrip'
import ProductGallery from '../components/ProductGallery'
import ProductRating from '../components/ProductRating'
import SocialProofVideos from '../components/SocialProofVideos'

import img1 from '../assets/SoftVoice/33932420-4eab-44c9-92dd-9f25b46f2e86.jpg'
import img2 from '../assets/SoftVoice/989f7eb1-01ac-4e83-90b8-b4acc51f0a26.jpg'
import img3 from '../assets/SoftVoice/abfb3e2d-6706-46d6-8462-e3ed9043058e.jpg'
import img4 from '../assets/SoftVoice/b9bd004b-570b-4c22-ba51-132e46646abe.jpg'
import img5 from '../assets/SoftVoice/e35497c0-8711-41e0-aa04-f23efb62a9eb.jpg'
import garantia2AnosImg from '../assets/2anos.png'

export const softVoiceGallery = [
  { src: img1, alt: 'SoftVoice vista frontal' },
  { src: img2, alt: 'SoftVoice em caixa' },
  { src: img3, alt: 'SoftVoice perfil' },
  { src: img4, alt: 'SoftVoice detalhes' },
  { src: img5, alt: 'SoftVoice conjunto' }
]

export const softVoiceHeroImage = softVoiceGallery[0]

const compraLink = '/api/checkout/softvoice'

export default function SoftVoice() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dados = {
    sigla: 'SoftVoice | Fonovital',
    nome: 'SoftVoice Recarregável 16 Canais | Fonovital',
    descricao:
      'Imagine cada som cristalino: o SoftVoice une chip importado de redução inteligente de ruído, 16 canais digitais, estojo com lâmpada UV e autonomia total de até 20h.',
    precoOriginal: 4499,
    precoAtual: 2699.9,
    parcelas: 12,
    avaliacoes: 15,
    nota: 4.4,
    link: compraLink
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(softVoiceGallery[0].src)

  const economia = (dados.precoOriginal - dados.precoAtual).toFixed(2).replace('.', ',')

  const destaquesRapidos = [
    {
      icon: HiOutlineClipboardDocumentCheck,
      titulo: '16 canais digitais',
      descricao: 'Chip importado com redução inteligente de ruído para fala cristalina.'
    },
    {
      icon: HiOutlineUserGroup,
      titulo: 'Modos de ambiente',
      descricao: 'Perfis de ruído urbano, silêncio e reuniões para cada situação.'
    },
    {
      icon: HiOutlineArrowPath,
      titulo: 'Estojo UV + LED',
      descricao: 'Display mostra a carga e a lâmpada UV higieniza a cada recarga.'
    }
  ]

  const caracteristicasPrincipais = [
    { funcao: 'Redução inteligente de ruído', descricao: 'Chip avançado filtra chiados e destaca vozes.' },
    { funcao: '16 canais digitais', descricao: 'Ajuste fino para diferentes níveis de perda auditiva.' },
    { funcao: 'Múltiplos modos', descricao: 'Perfis dedicados para rua, silêncio e reuniões.' },
    { funcao: 'Lâmpada UV no estojo', descricao: 'Desinfecção ultravioleta durante o carregamento.' },
    { funcao: 'Disponível em cores', descricao: 'Opções de cores para combinar com seu estilo.' },
    { funcao: 'PCBA nanorrevestida', descricao: 'Resistência à corrosão e maior vida útil.' }
  ]

  const bateriaCarregamento = [
    { titulo: 'Tipo de carregamento', descricao: 'Case magnético com display LED e lâmpada UV.' },
    { titulo: 'Autonomia', descricao: 'Até 20h somando as recargas no estojo.' },
    { titulo: 'Carga dos fones', descricao: '~80 minutos para recarga completa de cada lado.' },
    { titulo: 'Carga do estojo', descricao: '~120 minutos para 100% do case.' },
    { titulo: 'Recargas extras', descricao: 'O estojo garante 2-3 recargas completas dos fones.' }
  ]

  const controleSom = [
    { titulo: 'Perfis rápidos', descricao: 'Silêncio, reuniões e rua com troca instantânea.' },
    { titulo: 'Ajuste de 16 canais', descricao: 'Equalização detalhada para clareza vocal.' },
    { titulo: 'Anti-feedback', descricao: 'Minimiza assovios ao ajustar volume.' }
  ]

  const higieneSeguranca = [
    'Lâmpada UV no estojo para higienização a cada recarga.',
    'Ponteiras de silicone macias e hipoalergênicas em 3 tamanhos.'
  ]

  const conteudoEmbalagem = [
    '2 aparelhos SoftVoice (L/R)',
    'Estojo de carregamento com UV e display LED',
    'Cabo USB de carga',
    '3 pares de ponteiras de silicone (S, M, L)',
    'Manual do usuário'
  ]

  const whatsappLink =
    'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital'

  return (
    <section className="pt-20 md:pt-24 min-h-screen hero-bg grid-bg font-body text-white">
      <section className="w-full px-4 py-10 text-base lg:text-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#008b91]">CIC discreto</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">{dados.nome}</h1>
            <p className="text-white/85 text-sm sm:text-base">
              Aparelho auditivo intra canal ultradiscreto, recarregável e projetado para conforto total no uso prolongado.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm">
              Não precisa de audiometria: ajuste o volume no próprio aparelho e conte com suporte Fonovital.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10 lg:mt-12">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
              <ProductGallery
                images={softVoiceGallery}
                selected={imagemSelecionada}
                onChange={setImagemSelecionada}
                className="w-full rounded-2xl border border-[#dbe5ec] bg-white p-3 shadow-lg"
              />
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                {dados.descricao}
              </p>
              <div className="w-full max-w-md self-center">
                <div className="flex flex-col gap-5 rounded-3xl bg-white border border-[#dbe5ec] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-start">
                  <ProductRating
                    rating={dados.nota}
                    count={dados.avaliacoes}
                    className="justify-start text-slate-800"
                  />
                </div>

                <div className="space-y-1 text-center lg:text-left">
                  <p className="line-through text-xs sm:text-sm text-slate-400">
                    R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-slate-900 text-3xl sm:text-4xl font-bold">
                    R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-[#008b91] font-semibold">Economize R$ {economia}</p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-[#e6f6f8] py-3 font-semibold text-base text-[#006d7e] lg:justify-start border border-[#c3e7eb]">
                  <HiOutlineCreditCard className="text-xl" />
                  12x R$ {(dados.precoAtual / dados.parcelas).toFixed(2).replace('.', ',')}
                </p>

                <div className="grid gap-3 rounded-2xl border border-[#dbe5ec] bg-[#f8fbfd] p-4 sm:grid-cols-3">
                  {destaquesRapidos.map(item => (
                    <div
                      key={item.titulo}
                      className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-1"
                    >
                      <item.icon className="text-[#008b91] text-2xl" />
                      <p className="font-semibold text-sm text-slate-900">{item.titulo}</p>
                      <p className="text-xs text-slate-600 leading-snug">{item.descricao}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={compraLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#008B91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#006d7e] shadow-lg"
                  >
                    Comprar agora
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#008B91] px-6 py-3 text-sm font-semibold text-[#008B91] hover:bg-[#e6f6f8] transition"
                  >
                    Falar com especialista
                  </a>
                </div>
              </div>
              </div>
              <SocialProofVideos />
              <ProductActionStrip buyHref={compraLink} whatsappHref={whatsappLink} />
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
                src="https://www.youtube.com/embed/SjbnMoJ7u0M?rel=0&modestbranding=1&playsinline=1"
                title="SoftVoice em uso"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
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
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base text-white">{item.funcao}</td>
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
          <h2 className="text-2xl font-semibold text-white mb-6">Por que escolher o SoftVoice?</h2>
          <ul className="grid gap-3 text-white md:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Chip inteligente de redução de ruído que deixa a fala cristalina.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Até 20h de uso com 2-3 recargas extras no estojo LED.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>Lâmpada UV integrada no estojo para proteger sua saúde auditiva.</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
              <span>PCBA com nanorrevestimento contra corrosão e maior durabilidade.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="bg-[#f9fafb]/10 border border-white/15 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#7de8ff]">🔊 Controle de Som</h3>
            <ul className="space-y-3 text-gray-200">
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
            <h3 className="text-xl font-semibold mb-4 text-[#047857]">🧼 Higiene e Segurança</h3>
            <ul className="space-y-3 text-gray-200">
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
                    <td className="px-4 py-3 font-semibold text-sm sm:text-base text-white">{item.titulo}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm sm:text-base">{item.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-12 px-4 text-base lg:text-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">📦 Conteúdo da Embalagem</h2>
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
            <h3 className="text-2xl font-bold">Pronto para ouvir mais com o SoftVoice?</h3>
            <p className="text-sm sm:text-base text-white/90">
              Redução inteligente de ruído, estojo UV/LED e autonomia de até 20h para o dia todo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={dados.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#7de8ff] shadow hover:bg-white/10 transition"
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
        <div className="max-w-3xl mx-auto border border-green-300/70 rounded-2xl text-center p-6 bg-white/5">
          <p className="text-lg font-semibold text-green-300 mb-2">Garantia de 2 anos de fábrica Fonovital</p>
          <p className="text-gray-200">
            Troca imediata em caso de defeito de fabricação. Atendimento dedicado via WhatsApp com especialistas audiológicos.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src={garantia2AnosImg}
              alt="Selo adicional de 2 anos Fonovital"
              className="w-40 h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white/5 py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4 text-white">Som cristalino e seguro em cada conversa.</p>
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






























