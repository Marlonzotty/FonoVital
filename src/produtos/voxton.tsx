import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'

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
    descricao: 'Voxton Aparelho Auditivo Mini CIC | Fonovital. Tecnologia discreta e eficiente para o dia a dia.',
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

  const miniaturas = [
    { src: voxton, alt: 'Foto principal do produto' },
    { src: voxtonPacote, alt: 'Pacote do produto' },
    { src: voxtonOque, alt: 'Imagem extra do produto' },
    { src: comparacao, alt: 'Comparação do produto' },
    { src: certificados, alt: 'Certificados do produto' },
    { src: caixaVoxton, alt: 'Caixa do Voxton' },
    { src: explicando, alt: 'Imagem explicativa do produto' }
  ]

  const preco = dados.lados[opcao].precoAtual

  return (
    <section className="pt-32 bg-white font-[Montserrat] text-[#213547]">
      <Navbar />

      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">{dados.nome}</h1>

          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do Voxton"
              className="w-full max-w-lg object-contain rounded-xl  border-[#] mb-4"
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


          <div className="flex items-center gap-1 text-sm mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#213547]" />
            ))}
            <span className="ml-1 text-gray-500">({dados.avaliacoes})</span>
          </div>

          <p className="text-sm text-gray-600 mb-2">{dados.descricao}</p>
          <p className="line-through text-sm text-gray-400 mb-0">
            R$ {dados.lados[opcao].precoOriginal.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-[#213547] text-sm font-semibold mb-1">
            R$ {preco.toFixed(2).replace('.', ',')}
          </p>

          <p className="flex items-center gap-2 font-bold text-xl mb-6">
            <HiOutlineCreditCard className="text-lg" />
            12x R$ 58,17
          </p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {(['esquerdo', 'par', 'direito'] as const).map((lado) => (
              <button
                key={lado}
                onClick={() => {
                  setOpcao(lado)
                  setImagemSelecionada(dados.lados[lado].imagem)
                }}
                className={`py-2 rounded-full font-semibold border transition ${opcao === lado
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
            className="inline-block bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white text-sm px-6 py-3 rounded-lg font-medium transition animate-pulse"
          >
            COMPRAR {opcao === 'par' ? 'O PAR' : `LADO ${opcao.toUpperCase()}`}
          </a>
        </div>
      </section>
      {/* Vídeo demonstrativo do produto */}
      <div className="w-full my-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#213547]">Veja o Voxton em ação</h2>
          <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/HK2MSo0sIjc?si=JGG598yJedx3W2Bg"
              title="YouTube video player"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>



      <section className="w-full bg-[#028794] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Por que escolher o Voxton?
          </h2>
          <ul className="space-y-4 text-white">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Discrição total: Design CIC que desaparece no ouvido para quem valoriza estética e liberdade.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Conforto que dura o dia todo: Ajuste anatômico e leveza que você esquece que está usando.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Som natural e claro: Tecnologia avançada para entender conversas sem esforço.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Mais confiança, menos ruído: Redução inteligente de sons indesejados para momentos tranquilos.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Indicado para perdas auditivas leves a severas (86%): Potência ideal para restaurar sua qualidade de vida.
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={bannerVoxton}
            alt="Banner Voxton"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
          <img
            src={voxtonCustoBeneficio}
            alt="Voxton custo benefício"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      <section className="w-full bg-[#f0fdf4] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-3xl mx-auto border border-green-300 rounded-2xl text-center p-6">
          <p className="text-lg font-semibold text-green-700 mb-2">
            Garantia de 1 ano de fábrica Fonovital
          </p>
          <p className="text-gray-600">
            Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-6">Perguntas Frequentes</h3>
          <div className="space-y-4">
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                O Voxton é indicado para qualquer idade?
              </summary>
              <p className="mt-2 text-gray-600">
                Sim! Ele é discreto, confortável e fácil de usar, ideal para adultos e idosos.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                É preciso fazer exames antes de usar?
              </summary>
              <p className="mt-2 text-gray-600">
                Não obrigatoriamente, mas recomendamos realizar nosso teste auditivo gratuito online antes da compra.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                Quanto tempo dura a bateria descartável?
              </summary>
              <p className="mt-2 text-gray-600">
                Aproximadamente 60 horas de uso.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">Pronto para ouvir melhor todos os dias?</p>
        <a
          href={dados.lados[opcao].link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-4 px-8 rounded-full font-bold text-lg transition animate-pulse"
        >
          GARANTIR O MEU
        </a>
      </section>

      <section className="w-full bg-[#f9f9f9] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <Comments />
        </div>
      </section>

      <Footer />
    </section>
  )
}
