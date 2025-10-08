import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'

import voxcharge from '../assets/voxcharge/voxcharge (3).png'
import voxchargePacote from '../assets/voxcharge/voxchargePacote.jpg'
import voxchargeExplica from '../assets/voxcharge/voxchargeExplica.jpg'
import certificado from '../assets/certificados.png'
import comparacao from '../assets/comparacao.jpg'
import voxchargeBanner from '../assets/voxcharge/VoxchargeBanner.jpg'
import voxchargeCusto from '../assets/voxcharge/VoxchargeCustoBeneficio-2.jpg'
import voxchargecaixa from '../assets/voxcharge/caixavonxcharge.jpg'
import pro from '../assets/imagemPro.png'

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
    esgotado: true,
    whatsapp: 'https://wa.me/55329999069763?text=Ol%C3%A1%2C+gostaria+de+ser+avisado+quando+o+Voxcharge+voltar+ao+estoque.'
  }

  const suporteWhatsapp = `https://wa.me/55329999069763?text=${encodeURIComponent(
    'Olá, quero falar com um especialista sobre o Voxcharge.'
  )}`

  const parcela = (dados.precoAtual / dados.parcelas).toFixed(2).replace('.', ',')

  const miniaturas = [
    { src: voxcharge, alt: 'Imagem principal do Voxcharge' },
    { src: voxchargePacote, alt: 'Pacote do Voxcharge' },
    { src: voxchargeExplica, alt: 'Explicação do Voxcharge' },
    { src: certificado, alt: 'Certificado do Voxcharge' },
    { src: comparacao, alt: 'Comparação de modelos' },
    { src: voxchargecaixa, alt: 'Caixa do Voxcharge' },
    { src: pro, alt: 'Chip Soundcore' }
  ]

  return (
    <section className="pt-32 bg-white font-[Montserrat] text-[#213547]">
      <Navbar />

      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">{dados.nome}</h1>

          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do Voxcharge"
              className="w-full max-w-lg object-contain rounded-xl border border-[#4A90E2] mb-4"
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

          <p className="line-through text-sm text-gray-400 mb-0">
            R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-[#213547] text-sm font-semibold mb-1">
            R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
          </p>

          <p className="flex items-center gap-2 font-bold text-xl mb-6">
            <HiOutlineCreditCard className="text-lg" />
            12x R$ {parcela}
          </p>

          <a
            href={dados.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-3 rounded-lg font-medium transition animate-bounce"
          >
            Me avise quando Voxcharge chegar
          </a>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Por que escolher o Voxcharge?
          </h2>
          <ul className="space-y-4 text-white">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Potente e discreto: Modelo CIC com até 117 dB de ganho para sons claros e naturais.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Carregamento inteligente: 4 a 6 horas para até 20 horas de uso contínuo.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Leve e invisível: Conforto total com design que desaparece no ouvido.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Simplicidade com tecnologia: Fácil de usar, sem complicações.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Indicado para perdas auditivas leves a severas (85%): Alta performance em qualquer situação.
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={voxchargeBanner}
            alt="Banner Voxcharge"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
          <img
            src={voxchargeCusto}
            alt="Custo-benefício Voxcharge"
            className="block object-cover w-full rounded-2xl lg:max-w-3xl mx-auto"
          />
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#1f2937] via-[#314c68] to-[#0f172a] py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Lista de espera aberta para o Voxcharge</h3>
            <p className="text-sm sm:text-base text-white/90">
              Garanta prioridade quando o estoque voltar e tire suas dúvidas sem precisar de audiometria presencial.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={dados.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f2937] shadow hover:bg-white/90 transition"
            >
              Quero ser avisado
            </a>
            <a
              href={suporteWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Falar com especialista
            </a>
          </div>
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
      </section>

      <section className="w-full bg-white py-16 px-4 text-center text-base lg:text-lg">
        <p className="text-2xl font-bold mb-4">Ouça melhor com o Voxcharge!</p>
        <a
          href={dados.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-full font-bold text-lg transition animate-bounce"
        >
          Me avise quando Voxcharge chegar
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
