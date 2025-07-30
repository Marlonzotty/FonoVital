import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'

import vitalvoice from '../assets/vitalVoice.jpg'
import comparacao from '../assets/comparacao.jpg'
import explicando from '../assets/explicando.jpg'
import vitalVoicePacote from '../assets/vitalVoice/vitalVoicePacote.jpg'
import vitalvoiceExplica from '../assets/vitalVoice/vitalvoiceExplica.jpg'
import vitalVoiceCaixa from '../assets/vitalVoice/vitalVoiceCaixa.jpg'
import vitalVoiceBanner from '../assets/vitalVoice/VitalVoiceBanner.jpg'
import vitalVoiceBeneficios from '../assets/vitalVoice/VitalVoiceBeneficios.jpg'
import certificado from '../assets/certificados.png'

export default function Vitalvoice() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(vitalvoice)

  const dados = {
    sigla: 'Vitalvoice | Fonovital',
    nome: 'Vitalvoice CIC Digital Recarregável | Fonovital',
    descricao:
      'Descubra o poder da audição nítida e natural com o VitalVoice CIC Digital Recarregável — um aparelho auditivo que combina tecnologia avançada, design discreto e facilidade de uso em um único dispositivo.',
    precoOriginal: 1990,
    precoAtual: 1399.9,
    parcelas: 12,
    avaliacoes: 12,
    link: 'https://fonovital.pay.yampi.com.br/r/I8QUKNPT55'
  }

  const miniaturas = [
    { src: vitalvoice, alt: 'Imagem principal do Vitalvoice' },
    { src: vitalVoicePacote, alt: 'Pacote do Vitalvoice' },
    { src: vitalvoiceExplica, alt: 'Explicação do Vitalvoice' },
    { src: vitalVoiceCaixa, alt: 'Caixa do Vitalvoice' },
    { src: comparacao, alt: 'Comparação de modelos' },
    { src: explicando, alt: 'Explicação geral sobre aparelhos auditivos' },
    { src: certificado, alt: 'Certificado' }
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
              alt="Imagem selecionada do Vitalvoice"
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
            {[...Array(4)].map((_, i) => (
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
            12x R$ 136,16
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
            Por que escolher o Vitalvoice?
          </h2>
          <ul className="space-y-4 text-white">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Digital e inteligente: Ajusta-se automaticamente aos diferentes ambientes sonoros.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Carregamento rápido, uso prolongado: Diga adeus às pilhas, com bateria de longa duração.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Clareza em qualquer situação: Redução de ruídos múltiplos para ouvir apenas o que importa.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Mais liberdade, zero preocupações: Ideal para quem quer praticidade e desempenho.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Indicado para perdas auditivas leves a severas (86%): Potência confiável para todas as necessidades.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Tecnologia acessível com alto desempenho e excelente custo-benefício.
            </li>
          </ul>
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

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <Comments />
        </div>
      </section>

      <Footer />
    </section>
  )
}
