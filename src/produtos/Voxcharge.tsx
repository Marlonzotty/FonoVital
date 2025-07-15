import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import voxcharge from '../assets/voxcharge/voxcharge (3).png'
import voxchargePacote from '../assets/voxcharge/voxchargePacote.jpg'
import voxchargeExplica from '../assets/voxcharge/voxchargeExplica.jpg'
import certificado from '../assets/certificado.jpg'
import comparacao from '../assets/comparacao.jpg'
import imagemPro from '../assets/imagemPro.png'

export default function Voxcharge() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(voxcharge)

  const dados = {
    sigla: 'Voxcharge | Fonovital',
    nome: 'Voxcharge Mini CIC Recarregável | Fonovital',
    descricao:
      'O Voxcharge une conforto, potência e discrição em um modelo moderno e invisível para uso diário.',
    precoOriginal: 1799,
    precoAtual: 1199.9,
    parcelas: 12,
    avaliacoes: 34,
    link: 'https://fonovital.pay.yampi.com.br/r/6MAP1B08TF'
  }

  const parcela = (dados.precoAtual / dados.parcelas).toFixed(2)

  const miniaturas = [
    { src: voxcharge, alt: 'Imagem principal do Voxcharge' },
    { src: voxchargePacote, alt: 'Pacote do Voxcharge' },
    { src: voxchargeExplica, alt: 'Explicação do Voxcharge' },
    { src: certificado, alt: 'Certificado do Voxcharge' },
    { src: comparacao, alt: 'Comparação de modelos' }
  ]

  return (
    <section className="pt-32 pb-20 px-4 bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#213547] mb-4">
          {dados.sigla}
        </h1>

        {/* Galeria */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={imagemSelecionada}
            alt="Imagem selecionada do produto"
            className="w-full max-w-lg object-contain rounded-lg border-4 border-[#4A90E2] mb-4 opacity-0 animate-fadeIn"
          />
          <div className="flex gap-3 flex-wrap justify-center">
            {miniaturas.map((item, index) => (
              <img
                key={index}
                src={item.src}
                alt={item.alt}
                title={item.alt}
                className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                  imagemSelecionada === item.src
                    ? 'border-[#4A90E2] scale-105'
                    : 'border-gray-300 hover:border-[#4A90E2] hover:scale-105'
                }`}
                onClick={() => setImagemSelecionada(item.src)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
          <span className="text-sm text-gray-500 ml-2">
            ({dados.avaliacoes})
          </span>
        </div>
        <p className="text-lg text-gray-600 mb-2">
          {dados.descricao}
        </p>
        <p className="text-gray-400 line-through">
          R$ {dados.precoOriginal.toFixed(2)}
        </p>
        <p className="text-3xl font-bold text-[#4A90E2]">
          R$ {dados.precoAtual.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          ou 12x de R$ {parcela}
        </p>

        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-3 rounded-full font-bold hover:scale-105 hover:brightness-110 transition animate-pulse"
        >
          COMPRAR AGORA
        </a>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#213547] mb-4">
            Por que escolher o Voxcharge?
          </h2>
          <ul className="space-y-3 text-gray-700 text-base">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Confortável e discreto – ideal para uso prolongado
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Recarregável com autonomia superior a 24h
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Amplificação clara e precisa em ambientes ruidosos
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Pronto para uso imediato
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Excelente para quem busca potência com conforto
            </li>
          </ul>

          {/* IMAGEM ADICIONAL */}
          <img
            src={imagemPro}
            alt="Ilustração do uso do Voxcharge"
            className="w-full rounded-lg shadow-lg border mb-10 opacity-0 animate-fadeIn"
          />

          {/* GARANTIA */}
          <div className="mt-12 p-6 bg-[#f0fdf4] border border-green-300 rounded-lg text-center">
            <p className="text-lg font-semibold text-green-700 mb-2">
              Garantia de 1 ano de fábrica Fonovital
            </p>
            <p className="text-gray-600">
              Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#213547] mb-4">
              Perguntas Frequentes
            </h3>
            <div className="space-y-4">
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">
                  Precisa de exames para usar o Voxcharge?
                </summary>
                <p className="mt-2 text-gray-600">
                  Não. Ele é pronto para uso, mas o teste auditivo gratuito pode ajudar a orientar sua escolha.
                </p>
              </details>
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">
                  Qual a diferença entre Voxcharge e Voxton?
                </summary>
                <p className="mt-2 text-gray-600">
                  O Voxcharge oferece maior autonomia e potência, sendo ideal para quem deseja mais durabilidade sem perder conforto.
                </p>
              </details>
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">
                  Serve para idosos?
                </summary>
                <p className="mt-2 text-gray-600">
                  Sim, o design e funcionamento são simples, ideais para uso em todas as idades.
                </p>
              </details>
            </div>
          </div>

          {/* CHAMADA FINAL */}
          <div className="mt-16 text-center">
            <p className="text-2xl font-bold text-[#213547] mb-4">
              Ouça melhor com o Voxcharge!
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
        </div>
      </div>
    </section>
  )
}
