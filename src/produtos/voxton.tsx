import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import voxton from '../assets/voxton/voxton.png'
import voxtonPacote from '../assets/voxton/VoxtonPacote.jpg'
import voxtonOque from '../assets/voxton/voxtonOque.jpg'
import comparacao from '../assets/comparacao.jpg'
import certificados from '../assets/certificados.png'
import caixaVoxton from '../assets/voxton/caixaVoxton.jpg'
import explicando from '../assets/explicando.jpg'
import bannerVoxton from '../assets/voxton/BannerVoxton.jpg'
import voxtonCustoBeneficio from '../assets/voxton/voxtonCustoBeneficio.jpg'

export default function Voxton() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [opcao, setOpcao] = useState<'par' | 'direito' | 'esquerdo'>('par')
  const [imagemSelecionada, setImagemSelecionada] = useState<string>(voxton)

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

  const miniaturas = [
    { src: voxton, alt: 'Foto principal do produto' },
    { src: voxtonPacote, alt: 'Pacote do produto' },
    { src: voxtonOque, alt: 'Imagem extra do produto' },
    { src: comparacao, alt: 'Comparação do produto' },
    { src: certificados, alt: 'Certificados do produto' },
    { src: caixaVoxton, alt: 'Caixa do Voxton' },
    { src: explicando, alt: 'Imagem explicativa do produto' }
  ]

  return (
    <>
      <section className="pt-32 pb-20 px-4 bg-white">
        <Navbar />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#213547] mb-4">{dados.sigla}</h1>

          {/* Galeria */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do produto"
              className="w-full max-w-lg object-contain rounded-lg border-4 border-[#4A90E2] mb-4"
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

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
            <span className="text-sm text-gray-500 ml-2">({dados.avaliacoes})</span>
          </div>
          <p className="text-lg text-gray-600 mb-2">{dados.descricao}</p>
          <p className="text-gray-400 line-through">
            R$ {dados.lados[opcao].precoOriginal.toFixed(2)}
          </p>
          <p className="text-3xl font-bold text-[#4A90E2]">
            R$ {preco.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            ou 12x de R$ {parcela}
          </p>

          {/* Seleção de lado */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {(['esquerdo', 'par', 'direito'] as const).map((lado) => (
              <button
                key={lado}
                onClick={() => {
                  setOpcao(lado)
                  setImagemSelecionada(dados.lados[lado].imagem)
                }}
                className={`py-2 rounded-full font-semibold border ${opcao === lado
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

          {/* ESPECIFICAÇÕES */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#213547] mb-4">Por que escolher o Voxton?</h2>
            <ul className="space-y-3 text-gray-700 text-base mb-8">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Discrição total: Design CIC que desaparece no ouvido para quem valoriza estética e liberdade.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Conforto que dura o dia todo: Ajuste anatômico e leveza que você esquece que está usando.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Som natural e claro: Tecnologia avançada para entender conversas sem esforço.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Mais confiança, menos ruído: Redução inteligente de sons indesejados para momentos tranquilos.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Indicado para perdas auditivas leves a severas (86%): Potência ideal para restaurar sua qualidade de vida.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 🔵 Seção separada de imagens com fundo azul total */}
      <section className="w-full bg-[#028794] py-10">
        <div className="w-full max-w-6xl  mx-auto px-4">
          <img
            src={bannerVoxton}
            alt="Banner Voxton"
            className="block object-cover w-full max-w-full lg:max-w-3xl mx-auto"
          />
          <img
            src={voxtonCustoBeneficio}
            alt="Voxton Custo Benefício"
            className="block object-cover w-full max-w-full lg:max-w-3xl mx-auto mt-4"
          />
        </div>
      </section>

      {/* Continuação da seção branca */}
      <section className="bg-white px-4 pt-12 pb-20">
        <div className="max-w-5xl mx-auto">

          {/* Garantia */}
          <div className="p-6 bg-[#f0fdf4] border border-green-300 rounded-lg text-center">
            <p className="text-lg font-semibold text-green-700 mb-2">
              Garantia de 1 ano de fábrica Fonovital
            </p>
            <p className="text-gray-600">
              Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
            </p>
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
            <p className="text-2xl font-bold text-[#213547] mb-4">
              Pronto para ouvir melhor todos os dias?
            </p>
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
      </section>
    </>
  )
}
