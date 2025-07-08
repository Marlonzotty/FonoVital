import { useState } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import voxton from '../assets/voxton/voxton.png'
import imagemPro from '../assets/imagemPro.png' // ✅ nova imagem adicionada

export default function Voxton() {
  const [opcao, setOpcao] = useState<'par' | 'direito' | 'esquerdo'>('par')

  const dados = {
    sigla: 'Voxton | Fonovital',
    nome: 'Voxton Mini CIC | Fonovital',
    descricao: 'Voxton Aparelho Auditivo Mini CIC  | Fonovital. Tecnologia discreta e eficiente para o dia a dia.',
    lados: {
      par: {
        imagem: voxton,
        precoOriginal: 1399,
        precoAtual: 599.9,
        link: 'https://fonovital.pay.yampi.com.br/r/3H7FPTZSYX'
      },
      direito: {
        imagem: voxton,
        precoOriginal: 499,
        precoAtual: 399.9,
        link: 'https://fonovital.pay.yampi.com.br/r/C7HALBCFQC'
      },
      esquerdo: {
        imagem: voxton,
        precoOriginal: 499,
        precoAtual: 399.9,
        link: 'https://fonovital.pay.yampi.com.br/r/OFL1M0NBM6'
      }
    },
    avaliacoes: 21,
    parcelas: 12
  }

  const preco = dados.lados[opcao].precoAtual
  const parcela = (preco / dados.parcelas).toFixed(2)

  return (
    <section className="pt-32 pb-20 px-4 bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#213547] mb-4">{dados.sigla}</h1>
        <img
          src={dados.lados[opcao].imagem}
          alt="Imagem do produto"
          className="w-full max-h-96 object-contain rounded-lg border-4 border-[#4A90E2] mb-6"
        />
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
          <span className="text-sm text-gray-500 ml-2">({dados.avaliacoes})</span>
        </div>
        <p className="text-lg text-gray-600 mb-2">{dados.descricao}</p>
        <p className="text-gray-400 line-through">R$ {dados.lados[opcao].precoOriginal.toFixed(2)}</p>
        <p className="text-3xl font-bold text-[#4A90E2]">R$ {preco.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-4">ou 12x de R$ {parcela} sem juros</p>

        {/* Seleção de lado */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {(['esquerdo', 'par', 'direito'] as const).map((lado) => (
            <button
              key={lado}
              onClick={() => setOpcao(lado)}
              className={`py-2 rounded-full font-semibold border ${
                opcao === lado
                  ? 'bg-[#4A90E2] text-white'
                  : 'bg-gray-100 text-[#213547]'
              }`}
            >
              {lado === 'par' ? 'PAR' : `Lado ${lado}`}
            </button>
          ))}
        </div>

        <a
          href={dados.lados[opcao].link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-3 rounded-full font-bold hover:scale-105 hover:brightness-110 transition animate-pulse"
        >
          COMPRAR {opcao === 'par' ? 'O PAR' : `LADO ${opcao.toUpperCase()}`}
        </a>

        {/* ESPECIFICAÇÕES E BENEFÍCIOS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#213547] mb-4">O que o Voxton oferece:</h2>
          <ul className="space-y-3 text-gray-700 text-base mb-8">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Invisível e discreto – encaixe profundo e confortável
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Bateria de 60 Horas
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Ideal para perdas auditivas leves a moderadas
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Redução de ruídos ambiente automática
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Compatível com consultas de regulagem online
            </li>
          </ul>

          {/* Imagem adicional */}
          <img
            src={imagemPro}
            alt="Imagem ilustrativa do Voxton em uso"
            className="w-full rounded-lg shadow-lg border mb-10"
          />

          {/* Garantia */}
          <div className="p-6 bg-[#f0fdf4] border border-green-300 rounded-lg text-center">
            <p className="text-lg font-semibold text-green-700 mb-2">Garantia de 1 ano de fabrica Fonovital</p>
            <p className="text-gray-600">Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.</p>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#213547] mb-4">Perguntas Frequentes</h3>
            <div className="space-y-4">
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">O Voxton é indicado para qualquer idade?</summary>
                <p className="mt-2 text-gray-600">Sim! Ele é discreto, confortável e fácil de usar, ideal para adultos e idosos.</p>
              </details>
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">É preciso fazer exames antes de usar?</summary>
                <p className="mt-2 text-gray-600">Não obrigatoriamente, mas recomendamos realizar nosso teste auditivo gratuito online antes da compra.</p>
              </details>
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">Quanto tempo dura a bateria descartável?</summary>
                <p className="mt-2 text-gray-600">Aproximadamente 60 horas de uso.</p>
              </details>
            </div>
          </div>

          {/* Chamada final */}
          <div className="mt-16 text-center">
            <p className="text-2xl font-bold text-[#213547] mb-4">Pronto para ouvir melhor todos os dias?</p>
            <a
              href={dados.lados[opcao].link}
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
