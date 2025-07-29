import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
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
    nome: 'Vitalvoice CIC | Fonovital',
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
    { src: certificado, alt: 'certificado' }
  ]

  return (
    <>
      {/* SECTION - INFORMAÇÕES PRINCIPAIS */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <Navbar />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#213547] mb-4">{dados.sigla}</h1>

          {/* Galeria */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do Vitalvoice"
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
          <p className="text-sm text-gray-500 mb-4">R$ 12x R$ 136,16</p>

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
            Por que escolher o VitalVoice?
          </h2>
          <ul className="space-y-4 text-white text-base">
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

      {/* SECTION - BANNER E BENEFÍCIOS */}
      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={vitalVoiceBanner}
            alt="Banner VitalVoice"
            className="block object-cover w-full lg:max-w-3xl mx-auto rounded-lg"
          />
          <img
            src={vitalVoiceBeneficios}
            alt="Benefícios do VitalVoice"
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
          Garanta seu Vitalvoice agora mesmo
        </p>
        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white bg-gradient-to-r from-[#4A90E2] to-[#00979c] py-4 px-8 rounded-full font-bold text-lg hover:scale-105 hover:brightness-110 transition animate-pulse"
        >
          GARANTIR O MEU
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
