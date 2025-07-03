import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'


import voxton from '../assets/voxton/voxton.png'
import voxcharge from '../assets/voxcharge/voxcharge (3).png'
import voxchargeUnidade from '../assets/voxcharge/voxcharge (8).jpg'

const aparelhos = [
  {
    sigla: 'Voxton | Unidade',
    nome: 'Voxton Mini CIC | Fonovital (unidade)',
    descricao:
      'Voxton Aparelho Auditivo Mini CIC Recarregável | Fonovital\n\nO Voxton é um aparelho auditivo discreto, potente e confortável...',
    galeria: [voxton],
    precoOriginal: 499,
    precoAtual: 399.9,
    parcelas: 12,
    avaliacoes: 34,
    link: 'https://fonovital.pay.yampi.com.br/r/4OOUVR2X4F',
    lados: {
      direito: {
        imagem: voxton,
        link: 'https://fonovital.pay.yampi.com.br/r/C7HALBCFQC'
      },
      esquerdo: {
        imagem: voxton,
        link: 'https://fonovital.pay.yampi.com.br/r/OFL1M0NBM6'
      }
    }
  },
  {
    sigla: 'Voxton | Fonovital',
    nome: 'Voxton Mini CIC | Fonovital (Unidade)',
    descricao:
      'Voxton Aparelho Auditivo Mini CIC Recarregável | Fonovital...',
    galeria: [voxton],
    precoOriginal: 1399,
    precoAtual: 599.9,
    parcelas: 12,
    avaliacoes: 21,
    link: '#'
  },
  {
    sigla: 'Voxcharge CIC  | Fonovital',
    nome: 'Voxcharge CIC | Recarregável',
    descricao:
      'O Voxcharge da Fonovital é a combinação perfeita de potência, conforto e discrição...',
    galeria: [voxcharge],
    precoOriginal: 1399,
    precoAtual: 599.9,
    parcelas: 12,
    avaliacoes: 9,
    link: 'https://fonovital.pay.yampi.com.br/r/38RYBJ69JM'
  },
  {
    sigla: 'Voxcharge | Unidade',
    nome: 'Voxcharge Mini CIC Recarregável | Fonovital (unidade)',
    descricao:
      'O Voxcharge une conforto, potência e discrição em um modelo moderno e invisível para uso diário.',
    galeria: [voxchargeUnidade],
    precoOriginal: 499,
    precoAtual: 399.9,
    parcelas: 12,
    avaliacoes: 34,
    link: 'https://fonovital.pay.yampi.com.br/r/4OOUVR2X4F',
    lados: {
      direito: {
        imagem: voxchargeUnidade,
        link: 'https://fonovital.pay.yampi.com.br/r/C7HALBCFQC'
      },
      esquerdo: {
        imagem: voxchargeUnidade,
        link: 'https://fonovital.pay.yampi.com.br/r/OFL1M0NBM6'
      }
    }
  },
]

export default function TiposAparelhos() {
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [galeriaIndex, setGaleriaIndex] = useState(0)
  const [ladoSelecionado, setLadoSelecionado] = useState<'direito' | 'esquerdo'>('direito')

  const atual = modalIndex !== null ? aparelhos[modalIndex] : null

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

        <p className="text-gray-500 text-center mb-12 text-lg">Conheça cada modelo disponível</p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {aparelhos.map((aparelho, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all"
            >
              <img
                src={aparelho.galeria[0]}
                alt={aparelho.sigla}
                className="w-full h-48 object-contain mb-4 rounded-lg border-4 border-[#4A90E2]"
              />
              <h3 className="text-xl font-bold text-[#213547] mb-1">{aparelho.sigla}</h3>
              <p className="text-gray-400 text-sm mb-2">{aparelho.nome}</p>
              <p className="text-gray-600 text-sm mb-4">
                {aparelho.descricao.split('\n')[0]}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setModalIndex(index)
                    setGaleriaIndex(0)
                    setLadoSelecionado('direito')
                  }}
                  className="text-white bg-gradient-to-r from-[#00979c] via-[#4A90E2] to-[#018d93] px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition"
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {modalIndex !== null && atual && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalIndex(null)}
          >
            <div
              className="bg-white rounded-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => setModalIndex(null)}
              >
                &times;
              </button>

              <div className="md:w-1/2 p-6 flex flex-col items-center">
                <img
                  src={atual.galeria[galeriaIndex]}
                  alt="Produto"
                  className="w-full h-72 object-contain mb-4 border-4 border-[#4A90E2] rounded-lg"
                />
                <div className="flex gap-2">
                  {atual.galeria.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Miniatura ${idx}`}
                      onClick={() => setGaleriaIndex(idx)}
                      className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition ${
                        galeriaIndex === idx
                          ? 'border-[#4A90E2] scale-105'
                          : 'border-transparent opacity-60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 p-6 text-[#213547]">
                <h2 className="text-2xl font-bold mb-2">{atual.sigla} - {atual.nome}</h2>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-500 text-xl mr-2">★★★★★</span>
                  <span className="text-sm text-gray-500">({atual.avaliacoes})</span>
                </div>
                <p className="line-through text-sm text-gray-400">R$ {atual.precoOriginal.toFixed(2)}</p>
                <p className="text-3xl font-bold text-[#4A90E2]">R$ {atual.precoAtual.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mb-4">
                  ou {atual.parcelas}x de R$ {(atual.precoAtual / atual.parcelas).toFixed(2)} sem juros
                </p>

                {atual.lados ? (
                  <div className="mb-6">
                    <div className="flex gap-2 mb-3">
                      <button
                        className={`px-4 py-1 rounded-full border font-semibold ${
                          ladoSelecionado === 'direito'
                            ? 'bg-[#4A90E2] text-white'
                            : 'bg-gray-100 text-[#213547]'
                        }`}
                        onClick={() => setLadoSelecionado('direito')}
                      >
                        Lado Direito
                      </button>
                      <button
                        className={`px-4 py-1 rounded-full border font-semibold ${
                          ladoSelecionado === 'esquerdo'
                            ? 'bg-[#4A90E2] text-white'
                            : 'bg-gray-100 text-[#213547]'
                        }`}
                        onClick={() => setLadoSelecionado('esquerdo')}
                      >
                        Lado Esquerdo
                      </button>
                    </div>

                    <img
                      src={atual.lados[ladoSelecionado].imagem}
                      alt={`Pré-visualização ${ladoSelecionado}`}
                      className="w-32 h-32 object-contain mx-auto mb-3 border-2 rounded-lg"
                    />

                    <a
                      href={atual.lados[ladoSelecionado].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-[#4A90E2] text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
                    >
                      COMPRAR LADO {ladoSelecionado.toUpperCase()}
                    </a>
                  </div>
                ) : (
                  <a
                    href={atual.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#4A90E2] text-white py-3 rounded-full font-semibold hover:opacity-90 transition animate-pulse"
                  >
                    COMPRAR AGORA
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
