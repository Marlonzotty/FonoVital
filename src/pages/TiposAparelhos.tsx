import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FaStar } from 'react-icons/fa'

import voxton from '../assets/voxton/voxton.png'
import voxcharge from '../assets/voxcharge/voxcharge (3).png'
import voxchargeUnidade from '../assets/voxcharge/voxcharge (3).png'
import vitalvoice from '../assets/vitalVoice.jpg'

const aparelhos = [
  {
    sigla: 'Voxton | Fonovital',
    nome: 'Voxton Mini CIC | Fonovital (par)',
    descricao:
      'Voxton Aparelho Auditivo Mini CIC Recarregável | Fonovital...',
    galeria: [voxton],
    precoOriginal: 1399,
    precoAtual: 599.9,
    parcelas: 12,
    avaliacoes: 21,
    link: 'https://fonovital.pay.yampi.com.br/r/3H7FPTZSYX',
    lados: {
      direito: {
        imagem: voxton,
        link: 'https://fonovital.pay.yampi.com.br/r/C7HALBCFQC',
        precoOriginal: 499,
        precoAtual: 399.9
      },
      esquerdo: {
        imagem: voxton,
        link: 'https://fonovital.pay.yampi.com.br/r/OFL1M0NBM6',
        precoOriginal: 499,
        precoAtual: 399.9
      },
      par: {
        imagem: voxton,
        link: 'https://fonovital.pay.yampi.com.br/r/3H7FPTZSYX',
        precoOriginal: 1399,
        precoAtual: 599.9
      }
    }
  },
  {
    sigla: 'Voxcharge | Fonovital',
    nome: 'Voxcharge Mini CIC Recarregável | Fonovital (par)',
    descricao:
      'O Voxcharge une conforto, potência e discrição em um modelo moderno e invisível para uso diário.',
    galeria: [voxchargeUnidade],
    precoOriginal: 499,
    precoAtual: 399.9,
    parcelas: 12,
    avaliacoes: 34,
    link: 'https://fonovital.pay.yampi.com.br/r/6MAP1B08TF',
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
    link: '#'
  }
]

export default function TiposAparelhos() {
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<'direito' | 'esquerdo' | 'par'>('par')

  const atual = modalIndex !== null ? aparelhos[modalIndex] : null

  const imagemModal =
    atual?.lados?.[opcaoSelecionada]?.imagem ||
    atual?.galeria[0]

  const linkCompra =
    atual?.lados?.[opcaoSelecionada]?.link ||
    atual?.link

  // NOVO: Define os preços dinâmicos conforme lado selecionado
  const precoModalOriginal =
    atual?.lados?.[opcaoSelecionada]?.precoOriginal ??
    atual?.precoOriginal

  const precoModalAtual =
    atual?.lados?.[opcaoSelecionada]?.precoAtual ??
    atual?.precoAtual

  const precoParcela =
    precoModalAtual && atual?.parcelas
      ? precoModalAtual / atual.parcelas
      : 0

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
                  12x de R$ {(aparelho.precoAtual / 12).toFixed(2)} sem juros
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setModalIndex(index)
                      setOpcaoSelecionada('par')
                    }}
                    className="text-white bg-gradient-to-r from-[#00979c] via-[#4A90E2] to-[#018d93] px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {modalIndex !== null && atual && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalIndex(null)}
          >
            <div
              className="bg-white rounded-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => setModalIndex(null)}
              >
                &times;
              </button>

              <div className="md:w-1/2 p-6 flex flex-col items-center">
                <img
                  src={imagemModal}
                  alt={`Imagem ${opcaoSelecionada}`}
                  className="w-full h-72 object-contain mb-4 border-4 border-[#4A90E2] rounded-lg"
                />
              </div>

              <div className="md:w-1/2 p-6 text-[#213547]">
                <h2 className="text-2xl font-bold mb-2">
                  {atual.sigla} - {atual.nome}
                </h2>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-base" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({atual.avaliacoes})
                  </span>
                </div>

                <p className="line-through text-sm text-gray-400">
                  R$ {precoModalOriginal?.toFixed(2)}
                </p>
                <p className="text-3xl font-bold text-[#4A90E2]">
                  R$ {precoModalAtual?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  ou {atual.parcelas}x de R$ {precoParcela.toFixed(2)} sem juros
                </p>

                {atual.lados ? (
                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button
                        className={`px-4 py-1 rounded-full border font-semibold text-center ${
                          opcaoSelecionada === 'esquerdo'
                            ? 'bg-[#4A90E2] text-white'
                            : 'bg-gray-100 text-[#213547]'
                        }`}
                        onClick={() => setOpcaoSelecionada('esquerdo')}
                      >
                        Lado Esquerdo
                      </button>
                      <button
                        className={`px-4 py-1 rounded-full border font-semibold text-center ${
                          opcaoSelecionada === 'par'
                            ? 'bg-[#4A90E2] text-white'
                            : 'bg-gray-100 text-[#213547]'
                        }`}
                        onClick={() => setOpcaoSelecionada('par')}
                      >
                        PAR
                      </button>
                      <button
                        className={`px-4 py-1 rounded-full border font-semibold text-center ${
                          opcaoSelecionada === 'direito'
                            ? 'bg-[#4A90E2] text-white'
                            : 'bg-gray-100 text-[#213547]'
                        }`}
                        onClick={() => setOpcaoSelecionada('direito')}
                      >
                        Lado Direito
                      </button>
                    </div>

                    <a
                      href={linkCompra}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-3 rounded-full font-bold hover:scale-105 hover:brightness-110 transition animate-pulse"
                    >
                      COMPRAR {opcaoSelecionada === 'par' ? 'O PAR' : `LADO ${opcaoSelecionada.toUpperCase()}`}
                    </a>
                  </div>
                ) : (
                  <a
                    href={linkCompra}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-3 rounded-full font-bold hover:scale-105 hover:brightness-110 transition animate-pulse"
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
