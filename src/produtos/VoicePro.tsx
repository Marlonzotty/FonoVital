import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'

// Importações das imagens reais
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
    precoAtual: 1350.0,
    parcelas: 12,
    avaliacoes: 47,
    link: 'https://fonovital.pay.yampi.com.br/r/6GZK7UNNPG'
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
    <>
      {/* SECTION - PRINCIPAL */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <Navbar />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#213547] mb-4">{dados.sigla}</h1>

          {/* Galeria */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do VoicePro"
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

          {/* Informações */}
          <div className="flex items-center mb-4">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
            <span className="text-sm text-gray-500 ml-2">({dados.avaliacoes})</span>
          </div>
          <p className="text-lg text-gray-600 mb-2">{dados.descricao}</p>
          <p className="text-gray-400 line-through">R$ {dados.precoOriginal.toFixed(2)}</p>
          <p className="text-3xl font-bold text-[#4A90E2]">R$ {dados.precoAtual.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-4">ou 12x R$145,90</p>

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
      <section className="w-full bg-[#028794] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Por que escolher o Voice Pro?
          </h2>
          <ul className="space-y-4 text-white text-base">
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

      {/* SECTION - BANNER E CUSTO BENEFÍCIO */}
      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={voiceProBanner}
            alt="Banner VoicePro"
            className="block object-cover w-full lg:max-w-3xl mx-auto rounded-lg"
          />
          <img
            src={voiceProBeneficios}
            alt="Benefícios do VoicePro"
            className="block object-cover w-full lg:max-w-3xl mx-auto rounded-lg"
          />
        </div>
      </section>

      {/* SECTION - GARANTIA */}
      <section className="w-full py-12 px-4 bg-[#f0fdf4]">
        <div className="max-w-3xl mx-auto border border-green-300 rounded-lg text-center p-6">
          <p className="text-lg font-semibold text-green-700 mb-2">
            Garantia de 1 ano de fábrica Fonovital
          </p>
          <p className="text-gray-600">
            Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
          </p>
        </div>
      </section>

      {/* SECTION - CHAMADA FINAL */}
      <section className="w-full py-16 px-4 bg-white text-center">
        <p className="text-2xl font-bold text-[#213547] mb-4">
          Potência profissional com o VoicePro.
        </p>
        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white bg-gradient-to-r from-[#4A90E2] to-[#00979c] py-4 px-8 rounded-full font-bold text-lg hover:scale-105 hover:brightness-110 transition animate-pulse"
        >
          GARANTA O SEU AGORA
        </a>

        {/* SECTION - COMENTÁRIOS */}
        <section className="w-full bg-[#f9f9f9] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <Comments />
          </div>
        </section>

        {/* FOOTER */}
        <Footer />


      </section>
    </>
  )
}
