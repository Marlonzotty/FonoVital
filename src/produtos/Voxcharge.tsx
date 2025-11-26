import { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import ProductGallery from '../components/ProductGallery'
import ProductRating from '../components/ProductRating'

import voxcharge from '../assets/voxcharge/voxcharge (3).png'
import voxchargeClean from '../assets/voxcharge/voxcharge (5) (1).png'
import voxchargeClose from '../assets/voxcharge/voxcharge (8).jpg'
import voxchargePacote from '../assets/voxcharge/voxchargePacote.jpg'
import voxchargeExplica from '../assets/voxcharge/voxchargeExplica.jpg'
import certificado from '../assets/certificados.png'
import comparacao from '../assets/comparacao.jpg'
import voxchargeBanner from '../assets/voxcharge/VoxchargeBanner.jpg'
import voxchargeCusto from '../assets/voxcharge/VoxchargeCustoBeneficio-2.jpg'
import voxchargecaixa from '../assets/voxcharge/caixavonxcharge.jpg'
import pro from '../assets/imagemPro.png'

export const voxchargeGallery = [
  { src: voxchargeClean, alt: 'Imagem principal do Voxcharge' },
  { src: voxchargeClose, alt: 'Close do Voxcharge com estojo' },
  { src: voxcharge, alt: 'Voxcharge em detalhe lateral' },
  { src: voxchargePacote, alt: 'Pacote completo do Voxcharge' },
  { src: voxchargeExplica, alt: 'Explicação do Voxcharge' },
  { src: voxchargecaixa, alt: 'Caixa do Voxcharge' },
  { src: pro, alt: 'Chip Soundcore' },
  { src: comparacao, alt: 'Comparação de modelos' },
  { src: certificado, alt: 'Certificado do Voxcharge' }
]

export const voxchargeHeroImage = voxchargeGallery[0]

export default function Voxcharge() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const suporteWhatsapp = `https://wa.me/55329999069763?text=${encodeURIComponent(
    'Olá, quero falar com um especialista sobre o Voxcharge.'
  )}`

  const imagensGaleria = voxchargeGallery

  const dados = {
    sigla: 'Voxcharge | Fonovital',
    nome: 'Voxcharge Mini CIC Recarregável | Fonovital',
    descricao:
      'O Voxcharge une conforto, potência e discrição em um modelo moderno e invisível para uso diário.',
    precoOriginal: 1799,
    precoAtual: 1199.9,
    parcelas: 12,
    avaliacoes: 34,
    nota: 4.4,
    esgotado: true,
    whatsapp: 'https://wa.me/55329999069763?text=Ol%C3%A1%2C+gostaria+de+ser+avisado+quando+o+Voxcharge+voltar+ao+estoque.'
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(imagensGaleria[0].src)
  const parcela = (dados.precoAtual / dados.parcelas).toFixed(2).replace('.', ',')
  const notaMedia = dados.nota

  return (
    <section className="pt-32 bg-white font-[Montserrat] text-[#213547]">
      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center lg:text-left">{dados.nome}</h1>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-5 lg:flex-1">
              <ProductGallery
                images={imagensGaleria}
                selected={imagemSelecionada}
                onChange={setImagemSelecionada}
                className="w-full"
              />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                {dados.descricao}
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="flex flex-col gap-5 rounded-2xl border border-[#4A90E2]/20 bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                <ProductRating
                  rating={notaMedia}
                  count={dados.avaliacoes}
                  className="justify-center lg:justify-start"
                />

                <div className="space-y-1 text-center lg:text-left">
                  <p className="line-through text-xs sm:text-sm text-gray-400">
                    R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-[#213547] text-2xl sm:text-3xl font-bold">
                    R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-[#028794]/10 py-3 font-semibold text-base text-[#028794] lg:justify-start">
                  <HiOutlineCreditCard className="text-xl" />
                  12x R$ {parcela}
                </p>

                <a
                  href={dados.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600 sm:w-auto sm:self-start"
                >
                  Me avise quando Voxcharge chegar
                </a>
              </div>
            </div>
          </div>
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
