import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import { MdStarHalf } from 'react-icons/md'
import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'

import img1 from '../assets/iavoice/iavoice-produto-completo.jpg'
import img2 from '../assets/iavoice/iavoice-bateria-autonomia.jpg'
import img3 from '../assets/iavoice/iavoice-chip-inteligente.jpg'
import img4 from '../assets/iavoice/iavoice-som-soundcore.jpg'
import img5 from '../assets/iavoice/iavoice-comparacao-marcas.jpg'
import img6 from '../assets/iavoice/iavoice-itens-na-caixa.jpg'
import certificados from '../assets/iavoice/certificados.png'
import iaVoiceBanner from '../assets/iavoice/IAvoiceBanner.jpg'
import iaVoiceBeneficio from '../assets/iavoice/IaVoiceBeneficio.jpg'
import sound from '../assets/imagemPro.png'

export default function IAvoice() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(img1)

  const dados = {
    sigla: 'IAvoice | Fonovital',
    nome: 'IAvoice Inteligência Auditiva | Fonovital',
    descricao:
      'O IA Voice combina inteligência artificial e design ergonômico para oferecer uma experiência auditiva clara, adaptável e confortável em qualquer ambiente.',
    precoOriginal: 2099,
    precoAtual: 1699.9,
    parcelas: 12,
    avaliacoes: 51,
    link: 'https://fonovital.pay.yampi.com.br/r/6HSMEGGHGI'
  }

  const parcela = (dados.precoAtual / dados.parcelas).toFixed(2)

  const miniaturas = [
    { src: img1, alt: 'Produto completo IAvoice' },
    { src: img2, alt: 'Bateria e autonomia IAvoice' },
    { src: img3, alt: 'Chip inteligente IAvoice' },
    { src: img4, alt: 'Som SoundCore IAvoice' },
    { src: img5, alt: 'Comparação com outras marcas' },
    { src: img6, alt: 'Itens inclusos na caixa' },
    { src: certificados, alt: 'Certificados de qualidade IAvoice' },
    { src: sound, alt: 'sound ' }
  ]

  return (
    <section className="pt-32 bg-white">
      <Navbar />

      {/* SECTION - CABEÇALHO E GALERIA */}
      <section className="w-full px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#213547] mb-4">{dados.sigla}</h1>

          {/* Galeria */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do IAvoice"
              className="w-full max-w-lg object-contain rounded-lg border- border-[#] mb-4 opacity-0 animate-fadeIn"
            />
            <div className="flex gap-3 flex-wrap justify-center">
              {miniaturas.map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  title={item.alt}
                  className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${imagemSelecionada === item.src
                      ? 'border-[#4A90E2] scale-105'
                      : 'border-gray-300 hover:border-[#4A90E2] hover:scale-105'
                    }`}
                  onClick={() => setImagemSelecionada(item.src)}
                />
              ))}
            </div>
          </div>

          {/* Avaliações e preço */}
          <div className="flex items-center mb-4">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
            <MdStarHalf className="text-yellow-500 text-lg" />
            <span className="text-sm text-gray-500 ml-2">({dados.avaliacoes})</span>
          </div>
          <p className="text-lg text-gray-600 mb-2">{dados.descricao}</p>
          <p className="text-gray-400 line-through">R$ {dados.precoOriginal.toFixed(2)}</p>
          <p className="text-3xl font-bold text-[#4A90E2]">R$ {dados.precoAtual.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-4">ou 12x de R$ {parcela}</p>

          <a
            href={dados.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-3 rounded-full font-bold hover:scale-105 hover:brightness-110 transition animate-pulse"
          >
            COMPRAR AGORA
          </a>
        </div>
      </section>

      {/* SECTION - BENEFÍCIOS */}
      <section className="w-full bg-[#f9f9f9] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#213547] mb-4">
            Por que escolher o IA Voice?
          </h2>
          <ul className="space-y-3 text-gray-700 text-base">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Poder IA no seu ouvido: Inteligência sonora que analisa e adapta em tempo real.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Som equilibrado e limpo: 16 canais digitais para máxima precisão auditiva.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Conforto e segurança: Design BTE ergonômico para uso prolongado sem incômodo.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Perfeito para todas as situações: Desde reuniões até momentos ao ar livre, sempre nítido.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Indicado para perdas auditivas leves a severas (86%): Tecnologia robusta para quem precisa de alta performance.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION - BANNER E BENEFÍCIOS VISUAIS */}
      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={iaVoiceBanner}
            alt="Banner IAvoice"
            className="block object-cover w-full rounded-lg lg:max-w-3xl mx-auto"
          />
          <img
            src={iaVoiceBeneficio}
            alt="Benefícios IAvoice"
            className="block object-cover w-full rounded-lg lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* SECTION - GARANTIA */}
      <section className="w-full bg-[#f0fdf4] py-12 px-4">
        <div className="max-w-3xl mx-auto border border-green-300 rounded-lg p-6 text-center">
          <p className="text-lg font-semibold text-green-700 mb-2">
            Garantia de 1 ano de fábrica Fonovital
          </p>
          <p className="text-gray-600">
            Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
          </p>
        </div>
      </section>

      {/* SECTION - CHAMADA FINAL */}
      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl font-bold text-[#213547] mb-4">
            Descubra a inteligência auditiva com IAvoice.
          </p>
          <a
            href={dados.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white bg-gradient-to-r from-[#4A90E2] to-[#00979c] py-4 px-8 rounded-full font-bold text-lg hover:scale-105 hover:brightness-110 transition animate-pulse"
          >
            GARANTA O SEU AGORA
          </a>
        </div>
      </section>

      {/* SECTION - COMENTÁRIOS */}
      <section className="w-full bg-[#f9f9f9] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Comments />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </section>
  )
}
