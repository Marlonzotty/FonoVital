import Navbar from '../components/Navbar'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import vitalvoice from '../assets/vitalVoice.jpg'
import imagemPro from '../assets/imagemPro.png'

export default function Vitalvoice() {
  const dados = {
    sigla: 'Vitalvoice | Fonovital',
    nome: 'Vitalvoice CIC | Fonovital',
    descricao:
      'Descubra o poder da audição nítida e natural com o VitalVoice CIC Digital Recarregável — um aparelho auditivo que combina tecnologia avançada, design discreto e facilidade de uso em um único dispositivo.',
    imagem: vitalvoice,
    precoOriginal: 1990,
    precoAtual: 1399.9,
    parcelas: 12,
    avaliacoes: 12,
    link: 'https://fonovital.pay.yampi.com.br/r/I8QUKNPT55' // ← LINK ATUALIZADO AQUI
  }

  const parcela = (dados.precoAtual / dados.parcelas).toFixed(2)

  return (
    <section className="pt-32 pb-20 px-4 bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#213547] mb-4">{dados.sigla}</h1>
        <img
          src={dados.imagem}
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
        <p className="text-gray-400 line-through">R$ {dados.precoOriginal.toFixed(2)}</p>
        <p className="text-3xl font-bold text-[#4A90E2]">R$ {dados.precoAtual.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-4">ou 12x de R$ {parcela} </p>

        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-3 rounded-full font-bold hover:scale-105 hover:brightness-110 transition animate-pulse"
        >
          COMPRAR AGORA
        </a>

        {/* ESPECIFICAÇÕES E BENEFÍCIOS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#213547] mb-4">Potência, Discrição e Conforto em Um Só Aparelho</h2>
          <ul className="space-y-3 text-gray-700 text-base">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Design CIC praticamente invisível: encaixa-se dentro do canal auditivo
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Chip de processamento Sound Core: som limpo e natural, mesmo em ambientes ruidosos
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              16 canais digitais com redução de ruído inteligente
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Botão único para ligar/desligar e trocar de modo: fácil de usar
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Recarregável via estojo portátil — sem pilhas!
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Tecnologia acessível com alto desempenho e excelente custo-benefício
            </li>
          </ul>

          <img
            src={imagemPro}
            alt="Ilustração do uso do Vitalvoice"
            className="w-full rounded-lg shadow-lg border mb-10 mt-8"
          />

          {/* GARANTIA */}
          <div className="mt-12 p-6 bg-[#f0fdf4] border border-green-300 rounded-lg text-center">
            <p className="text-lg font-semibold text-green-700 mb-2">Garantia de 1 ano de fábrica Fonovital</p>
            <p className="text-gray-600">
              Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#213547] mb-4">Perguntas Frequentes</h3>
            <div className="space-y-4">
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">O Vitalvoice é bom para o dia a dia?</summary>
                <p className="mt-2 text-gray-600">
                  Sim. Ele foi projetado para oferecer desempenho estável com discrição e conforto.
                </p>
              </details>
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">Funciona para diferentes níveis de perda auditiva?</summary>
                <p className="mt-2 text-gray-600">
                  É ideal para perdas leves a moderadas. Recomendamos fazer nosso teste auditivo online gratuito.
                </p>
              </details>
              <details className="border rounded-md p-4 cursor-pointer">
                <summary className="font-semibold text-[#4A90E2]">Qual a diferença para os outros modelos?</summary>
                <p className="mt-2 text-gray-600">
                  O Vitalvoice tem excelente custo-benefício e é perfeito para quem busca equilíbrio entre preço e desempenho.
                </p>
              </details>
            </div>
          </div>

          {/* CHAMADA FINAL */}
          <div className="mt-16 text-center">
            <p className="text-2xl font-bold text-[#213547] mb-4">Garanta seu Vitalvoice agora mesmo</p>
            <a
              href={dados.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white bg-gradient-to-r from-[#4A90E2] to-[#00979c] py-4 px-8 rounded-full font-bold text-lg hover:scale-105 hover:brightness-110 transition animate-pulse"
            >
              GARANTIR O MEU
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
