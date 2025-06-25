import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import voxcharge from '../assets/voxcharge/voxcharge (3).png'



import fone1 from '../assets/fones.jpeg'
import fone2 from '../assets/fones2.jpeg'
import voxton from '../assets/voxton/voxton.png'

const aparelhos = [
  {
    sigla: 'Voxton',
    nome: 'Voxton Mini CIC  | Fonovital',
    descricao:
      'Voxton Aparelho Auditivo Mini CIC Recarregável | Fonovital\n\nO Voxton é um aparelho auditivo discreto, potente e confortável, desenvolvido pela Fonovital para quem busca qualidade sonora com total discrição. Seu design Mini CIC (completamente no canal) o torna praticamente invisível durante o uso, ideal para o dia a dia.\n\nEquipado com chips de última geração (WDRC | AGC | Noise Reduction), o Voxton proporciona uma audição clara, natural e sem ruídos indesejados.\n\nDestaques do Voxton:\n• Design compacto e invisível no canal auditivo\n• Conforto ergonômico com encaixe leve e seguro\n• Som nítido e potente com chips super tecnológicos\n• Uso fácil com bateria A10 (inclusa)\n• Ideal para idosos e usuários que buscam discrição\n\nConteúdo da embalagem:\n• 1 Aparelho auditivo Voxton\n• 3 moldes de silicone (tamanhos P, M, G)\n• 1 escova de limpeza\n• 1 bateria A10\n• Manual do usuário\n\nVoxton – Ouça com clareza, viva com liberdade.\nFabricado por Fonovital. Qualidade auditiva em cada detalhe.',
    galeria: [voxton],
    precoOriginal: 1399,
    precoAtual: 599.9,
    parcelas: 12,
    avaliacoes: 34
  },
  {
  sigla: 'Voxcharge CIC | Fonovital',
  nome: 'Voxcharge CIC | Recarregável',
  descricao:
    'O Voxcharge da Fonovital é a combinação perfeita de potência, conforto e discrição. Com design Mini CIC invisível e bateria recarregável, é ideal para quem busca uma solução moderna e eficiente para perda auditiva moderada a severa.',
  galeria: [voxcharge],
  precoOriginal: 1399,
  precoAtual: 599.9,
  parcelas: 12,
  avaliacoes: 9,
  link: '#' // substitua com o link real quando tiver
}
,
  {
    sigla: 'CIC',
    nome: 'Completamente dentro do canal',
    descricao:
      'Os aparelhos CIC se encaixam completamente dentro do canal auditivo, sendo discretos e eficientes.',
    galeria: [fone1, fone2],
    precoOriginal: 1399,
    precoAtual: 999,
    parcelas: 12,
    avaliacoes: 12
  }
]

export default function TiposAparelhos() {
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [galeriaIndex, setGaleriaIndex] = useState(0)

  const atual = modalIndex !== null ? aparelhos[modalIndex] : null

  return (
    <section className="pt-32 pb-20 px-4 bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#213547] mb-4">
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

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 justify-center max-w-5xl mx-auto">
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
              <p className="text-gray-600 text-sm mb-4">{aparelho.descricao.split('\n')[0]}</p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setModalIndex(index)
                    setGaleriaIndex(0)
                  }}
                  className="text-white bg-gradient-to-r from-[#00979c] via-[#4A90E2] to-[#018d93] px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition"
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

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
                onClick={() => setModalIndex(null)}
                className="absolute top-3 right-4 text-gray-500 text-2xl font-bold hover:text-red-600 transition"
              >
                ×
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

                <ul className="text-sm text-gray-700 space-y-1 mb-6">
                  <li>✔️ Frete grátis para todo o Brasil</li>
                  <li>✔️ Devolução fácil</li>
                  <li>✔️ Frete seguro</li>
                </ul>

                <a
                  href="https://fonovital.pay.yampi.com.br/r/4OOUVR2X4F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#10a5aa] text-[#38393a] text-center py-3 rounded-full font-semibold hover:opacity-90 transition animate-pulse"
                >
                  COMPRAR AGORA
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}