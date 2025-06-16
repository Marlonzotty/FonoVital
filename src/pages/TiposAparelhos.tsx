import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

import fone1 from '../assets/fones.jpeg'
import fone2 from '../assets/fones2.jpeg'

const aparelhos = [
  {
    sigla: 'IIC',
    nome: 'Microcanal invisível',
    descricao:
      'O Microcanal Invisível (IIC) é o menor aparelho auditivo disponível, personalizado e praticamente invisível.',
    galeria: [fone1, fone2]
  },
  {
    sigla: 'CIC',
    nome: 'Completamente dentro do canal',
    descricao:
      'Os aparelhos CIC se encaixam completamente dentro do canal auditivo, sendo discretos e eficientes.',
    galeria: [fone1, fone2]
  },
  {
    sigla: 'ITC',
    nome: 'Intracanal',
    descricao:
      'Os aparelhos ITC são colocados dentro do canal auditivo, confortáveis e de fácil manuseio.',
    galeria: [fone1, fone2]
  },
  {
    sigla: 'RIC',
    nome: 'Receptor no Canal',
    descricao:
      'Aparelhos com receptor no canal, combinando potência com discrição e qualidade sonora.',
    galeria: [fone1, fone2]
  },
  {
    sigla: 'Mini BTE',
    nome: 'Atrás da Orelha',
    descricao:
      'Os modelos Mini BTE ficam atrás da orelha, com tubo fino e design discreto.',
    galeria: [fone1, fone2]
  },
  {
    sigla: 'BTE',
    nome: 'Retroauricular',
    descricao:
      'Os modelos BTE ficam atrás da orelha, sendo indicados para perdas auditivas severas.',
    galeria: [fone1, fone2]
  }
]

export default function TiposAparelhos() {
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [galeriaIndex, setGaleriaIndex] = useState(0)

  const atual = modalIndex !== null ? aparelhos[modalIndex] : null

  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#F7F9F9] to-[#A8E6CF]/30">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-[#213547]">
            Tipos de Aparelhos Auditivos
          </h1>
          <Link
            to="/"
            className="bg-[#A8E6CF] text-[#4A90E2] px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Voltar ao início
          </Link>
        </div>

        <p className="text-gray-500 text-center mb-12 text-lg">
          Conheça cada modelo disponível
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {aparelhos.map((aparelho, index) => (
            <div
              key={index}
              className="relative bg-[#A8E6CF]/20 rounded-2xl shadow-md p-6 pt-8 text-left hover:shadow-lg transition"
            >
              <img
                src={aparelho.galeria[0]}
                alt={aparelho.sigla}
                className="w-full h-32 object-contain mb-4 rounded"
              />
              <h3 className="text-xl font-bold text-[#213547] mb-1">{aparelho.sigla}</h3>
              <p className="text-gray-400 text-sm mb-2">{aparelho.nome}</p>
              <p className="text-gray-600 text-sm mb-4">
                {aparelho.descricao}
              </p>
              <button
                onClick={() => {
                  setModalIndex(index)
                  setGaleriaIndex(0)
                }}
                className="text-[#e7005a] border border-[#e7005a] px-4 py-1 rounded-full text-sm font-medium hover:bg-[#e7005a]/10 transition"
              >
                Ver Modelos
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalIndex !== null && atual && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setModalIndex(null)}
          >
            <div
              className="bg-[#A8E6CF] max-w-lg w-full rounded-xl p-6 relative mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalIndex(null)}
                className="absolute top-3 right-4 text-gray-700 text-xl font-bold hover:text-red-600"
              >
                ×
              </button>

              <div className="relative mb-4">
                <img
                  src={atual.galeria[galeriaIndex]}
                  alt="Aparelho"
                  className="w-full h-64 object-contain rounded transition-all duration-300"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 px-4 text-[#4A90E2] text-2xl cursor-pointer"
                  onClick={() =>
                    setGaleriaIndex(
                      (galeriaIndex - 1 + atual.galeria.length) % atual.galeria.length
                    )
                  }
                >
                  ◀
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 right-0 px-4 text-[#4A90E2] text-2xl cursor-pointer"
                  onClick={() =>
                    setGaleriaIndex((galeriaIndex + 1) % atual.galeria.length)
                  }
                >
                  ▶
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                {atual.galeria.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Miniatura ${idx}`}
                    onClick={() => setGaleriaIndex(idx)}
                    className={`w-14 h-14 object-cover rounded cursor-pointer border transition ${
                      galeriaIndex === idx
                        ? 'border-[#4A90E2] scale-105'
                        : 'border-transparent opacity-60'
                    }`}
                  />
                ))}
              </div>

              <h3 className="text-lg font-semibold text-[#213547] mb-2">
                {atual.sigla} – {atual.nome}
              </h3>
              <p className="text-sm text-[#333] mb-6">{atual.descricao}</p>

              <button className="w-full bg-[#4A90E2] text-white py-3 rounded-full font-semibold hover:opacity-90 transition animate-pulse">
                Saiba se este produto é para você
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-[#213547] mb-6">
            Dúvidas Frequentes
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto text-gray-700 text-sm">
            <div>
              <strong>Qual tipo de aparelho é mais discreto?</strong>
              <p>Os modelos IIC e CIC são os menores e mais invisíveis.</p>
            </div>
            <div>
              <strong>Todos os modelos funcionam com Bluetooth?</strong>
              <p>Não. Apenas os modelos mais modernos possuem conectividade.</p>
            </div>
            <div>
              <strong>Qual aparelho é indicado para perda severa?</strong>
              <p>Os modelos BTE são os mais potentes para esse tipo de necessidade.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
