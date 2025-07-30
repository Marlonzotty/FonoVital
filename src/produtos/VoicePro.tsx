import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'

import img1 from '../assets/voicepro/voicepro-caixa-produto.jpg'
import img2 from '../assets/voicepro/voicepro-bateria-autonomia.jpg'
import img3 from '../assets/voicepro/voicepro-itens-na-caixa.jpg'
import img4 from '../assets/voicepro/voicepro-modelo-cic.jpg'
import img5 from '../assets/voicepro/voicepro-som-soundcore.jpg'
import img6 from '../assets/voicepro/voicepro-comparacao-marcas.jpg'
import voiceProBanner from '../assets/voicepro/VoiceProBanner.jpg'
import voiceProBeneficios from '../assets/voicepro/VoiceProBenficios.jpg'
import certificados from '../assets/voicepro/certificados.png'

export default function VoicePro() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(img1)

  const dados = {
    sigla: 'VoicePro | Fonovital',
    nome: 'VoicePro Profissional Digital | Fonovital',
    descricao:
      'Sofisticação invisível com alto desempenho. O VoicePro reúne conforto, potência e proteção UV em um modelo moderno e profissional.',
    precoOriginal: 2099,
    precoAtual: 1499.0,
    parcelas: 12,
    avaliacoes: 47,
    link: 'https://fonovital.pay.yampi.com.br/r/SSDXCJ1N2B'
  }

  const miniaturas = [
    { src: img1, alt: 'Caixa e estojo do VoicePro' },
    { src: img2, alt: 'Autonomia da bateria VoicePro' },
    { src: img3, alt: 'Itens na caixa do VoicePro' },
    { src: img4, alt: 'Modelo CIC invisível VoicePro' },
    { src: img5, alt: 'Chip SoundCore do VoicePro' },
    { src: img6, alt: 'Comparação com outras marcas' },
    { src: certificados, alt: 'Certificados de qualidade VoicePro' }
  ]

  return (
    <section className="pt-32 bg-white font-[Montserrat] text-[#213547]">
      <Navbar />

      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">{dados.nome}</h1>

          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do VoicePro"
              className="w-full max-w-lg object-contain rounded-xl border border-[#4A90E2] mb-4"
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

          <div className="flex items-center gap-1 text-sm mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#213547]" />
            ))}
            <span className="ml-1 text-gray-500">({dados.avaliacoes})</span>
          </div>

          <p className="line-through text-sm text-gray-400 mb-0">
            R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-[#213547] text-sm font-semibold mb-1">
            R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
          </p>

          <p className="flex items-center gap-2 font-bold text-xl mb-6">
            <HiOutlineCreditCard className="text-lg" />
            12x R$ 145,90
          </p>

          <a
            href={dados.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#007c91] hover:bg-[#005f6e] text-white text-sm px-6 py-3 rounded-lg font-medium transition"
          >
            COMPRAR AGORA
          </a>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Por que escolher o VoicePro?
          </h2>
          <ul className="space-y-4 text-white">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Invisível e poderoso: A tecnologia CIC mais discreta para máxima autoconfiança.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Higienização UV automática: Seu aparelho sempre limpo e protegido sem esforço.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Carregamento premium: Estojo moderno com luz UV e bateria de alta autonomia.
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-10 px-4">
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
          Potência profissional com o VoicePro.
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
