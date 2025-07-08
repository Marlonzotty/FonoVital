import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import Navbar from '../components/Navbar'

import voxton from '../assets/voxton/voxton.png'

import voxchargeUnidade from '../assets/voxcharge/voxcharge (3).png'
import vitalvoice from '../assets/vitalVoice.jpg'

const aparelhos = [
  {
    sigla: 'Voxton | Fonovital',
    nome: 'Voxton Mini CIC | Fonovital (par)',
    descricao: 'Voxton Aparelho Auditivo Mini CIC Recarregável | Fonovital...',
    galeria: [voxton],
    precoOriginal: 1399,
    precoAtual: 599.9,
    parcelas: 12,
    avaliacoes: 21,
    link: 'https://fonovital.pay.yampi.com.br/r/3H7FPTZSYX',
    rota: '/produto/voxton'
  },
  {
    sigla: 'Voxcharge | Fonovital',
    nome: 'Voxcharge Mini CIC Recarregável | Fonovital (par)',
    descricao: 'O Voxcharge une conforto, potência e discrição em um modelo moderno e invisível para uso diário.',
    galeria: [voxchargeUnidade],
    precoOriginal: 1799,
    precoAtual: 1199.9,
    parcelas: 12,
    avaliacoes: 34,
    link: 'https://fonovital.pay.yampi.com.br/r/6MAP1B08TF',
    rota: '/produto/voxcharge'
  },
  {
    sigla: 'Vitalvoice | Fonovital',
    nome: 'Vitalvoice CIC | Fonovital (par)',
    descricao: 'O Vitalvoice CIC Recarregável da Fonovital...',
    galeria: [vitalvoice],
    precoOriginal: 1990,
    precoAtual: 1399.9,
    parcelas: 12,
    avaliacoes: 12,
    link: '#',
    rota: '/produto/vitalvoice'
  }
]

export default function TiposAparelhos() {
  return (
    <section className="pt-32 pb-20 px-4 bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-[#213547] text-center w-full sm:w-auto mb-4 sm:mb-0">
            Tipos de Aparelhos Auditivos
          </h1>
          <Link
            to="/"
            className="bg-[#A8E6CF] text-[#4A90E2] font-semibold rounded-full transition hover:opacity-90
              text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2"
          >
            Voltar ao início
          </Link>
        </div>

        <p className="text-gray-500 text-center mb-12 text-lg">
          Conheça cada modelo disponível
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {aparelhos.map((aparelho, index) => {
            const desconto = Math.round(
              ((aparelho.precoOriginal - aparelho.precoAtual) / aparelho.precoOriginal) * 100
            )

            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all"
              >
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{desconto}%
                </span>

                <span className="inline-block text-xs text-white bg-[#4A90E2] px-2 py-1 rounded mb-2">
                  Oferta
                </span>

                <img
                  src={aparelho.galeria[0]}
                  alt={`Imagem de ${aparelho.nome}`}
                  className="w-full h-48 object-contain mb-4 rounded-lg border-4 border-[#4A90E2]"
                />

                <h3 className="text-xl font-bold text-[#213547] mb-1">
                  {aparelho.sigla}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {aparelho.nome}
                </p>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-base" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({aparelho.avaliacoes})
                  </span>
                </div>

                <p className="line-through text-gray-400 text-sm mb-1">
                  R$ {aparelho.precoOriginal.toFixed(2)}
                </p>
                <p className="text-2xl font-bold text-[#4A90E2] mb-1">
                  R$ {aparelho.precoAtual.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  12x de R$ {(aparelho.precoAtual / 12).toFixed(2)} 
                </p>

                <div className="flex justify-center">
                  <Link
                    to={aparelho.rota}
                    className="text-white bg-gradient-to-r from-[#00979c] via-[#4A90E2] to-[#018d93] px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition text-center"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
