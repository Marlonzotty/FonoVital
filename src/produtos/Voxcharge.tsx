import { useEffect, useState } from 'react'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import { FaCheckCircle } from 'react-icons/fa'
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

  const dados = {
    sigla: 'Voxcharge | Fonovital',
    nome: 'Voxcharge Mini CIC Recarregável | Fonovital',
    descricao: 'CIC recarregável, 117dB de ganho e 20h de bateria com estojo compacto.',
    precoOriginal: 1799,
    precoAtual: 1199.9,
    parcelas: 12,
    avaliacoes: 34,
    nota: 4.4,
    esgotado: true,
    whatsapp: 'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital'
  }

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(voxchargeGallery[0].src)
  const parcela = (dados.precoAtual / 12).toFixed(2).replace('.', ',')

  const suporteWhatsapp =
    'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital'

  return (
    <section className="pt-16 md:pt-20 min-h-screen hero-bg grid-bg font-body text-slate-900">
      <section className="w-full px-4 py-12 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center lg:text-left text-slate-900">{dados.nome}</h1>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-5 lg:flex-1">
              <ProductGallery
                images={voxchargeGallery}
                selected={imagemSelecionada}
                onChange={setImagemSelecionada}
                className="w-full"
              />
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                {dados.descricao}
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="flex flex-col gap-5 card-3d bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <ProductRating
                  rating={dados.nota}
                  count={dados.avaliacoes}
                  className="justify-center lg:justify-start text-slate-900"
                />

                <div className="space-y-1 text-center lg:text-left">
                  <p className="line-through text-xs sm:text-sm text-slate-400">
                    R$ {dados.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-slate-900 text-3xl font-bold">
                    R$ {dados.precoAtual.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-slate-600">12x R$ {parcela}</p>
                </div>

                <p className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200 py-3 font-semibold text-base text-slate-800 lg:justify-start">
                  <HiOutlineCreditCard className="text-xl text-teal-600" />
                  Parcele no cartão
                </p>

                <a
                  href={dados.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 sm:w-auto sm:self-start"
                >
                  Me avise quando chegar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
          <img src={voxchargeBanner} alt="Voxcharge banner" className="rounded-2xl shadow" />
          <div className="space-y-3 text-slate-700">
            <p className="flex items-start gap-2">
              <FaCheckCircle className="text-emerald-500 mt-1" />
              <span>Formato CIC discreto e confortável.</span>
            </p>
            <p className="flex items-start gap-2">
              <FaCheckCircle className="text-emerald-500 mt-1" />
              <span>Ganho de até 117dB para diferentes perdas auditivas.</span>
            </p>
            <p className="flex items-start gap-2">
              <FaCheckCircle className="text-emerald-500 mt-1" />
              <span>Estojo garante recargas e proteção no transporte.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Certificações</h2>
          <img src={certificado} alt="Certificados" className="w-full max-w-md" />
        </div>
      </section>

      <section className="w-full bg-white py-12 px-4 text-base lg:text-lg text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xl font-semibold text-slate-900">Precisa de ajuda para escolher?</p>
          <a
            href={suporteWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-teal-600 text-teal-700 px-6 py-3 font-semibold hover:bg-teal-50 transition"
          >
            Falar com especialista Fonovital
          </a>
        </div>
      </section>

      <section className="w-full bg-white py-10 px-4 text-base lg:text-lg">
        <div className="max-w-5xl mx-auto">
          <Comments />
        </div>
      </section>

      <Footer />
    </section>
  )
}
