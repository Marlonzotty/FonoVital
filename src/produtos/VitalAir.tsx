import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import vitalAirBanner from '../assets/vitalair/VitalAirBanner.jpg'
import vitalAirBeneficios from '../assets/vitalair/VitalAirBeneficios.jpg'
import img1 from '../assets/vitalair/produto-completo.jpg'
import img2 from '../assets/vitalair/tws-bluetooth.jpg'
import img3 from '../assets/vitalair/32-canais.jpg'
import img4 from '../assets/vitalair/bateria-autonomia.jpg'
import img5 from '../assets/vitalair/comparacao-fonovital.jpg'
import img6 from '../assets/vitalair/VitalAir-oqueinclui.jpg'

export default function VitalAir() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [imagemSelecionada, setImagemSelecionada] = useState<string>(img1)

  const dados = {
    sigla: 'Vital Air | Fonovital',
    nome: 'Vital Air Digital Recarregável | Fonovital',
    descricao:
      'O Vital Air foi projetado para quem deseja controle completo da audição com liberdade e tecnologia. A combinação perfeita entre personalização e facilidade de uso.',
    precoOriginal: 1899,
    precoAtual: 1999.0,
    parcelas: 12,
    avaliacoes: 42,
    link: 'https://fonovital.pay.yampi.com.br/r/DLE7SWQNKR'
  }

  const parcela = (dados.precoAtual / dados.parcelas).toFixed(2)

  const miniaturas = [
    { src: img1, alt: 'Imagem principal do Vital Air' },
    { src: img2, alt: 'Fone Bluetooth Vital Air' },
    { src: img3, alt: 'Vital Air com 32 canais' },
    { src: img4, alt: 'Autonomia de bateria do Vital Air' },
    { src: img5, alt: 'Comparação com outras marcas' },
    { src: img6, alt: 'O que inclui na caixa Vital Air' }
  ]

  return (
    <>
      {/* SECTION - PRINCIPAL */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <Navbar />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#213547] mb-4">{dados.sigla}</h1>

          {/* Galeria */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={imagemSelecionada}
              alt="Imagem selecionada do Vital Air"
              className="w-full max-w-lg object-contain rounded-lg border-4 border-[#4A90E2] mb-4 opacity-0 animate-fadeIn"
            />
            <div className="flex gap-3 flex-wrap justify-center">
              {miniaturas.map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  title={item.alt}
                  className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                    imagemSelecionada === item.src
                      ? 'border-[#4A90E2] scale-105'
                      : 'border-gray-300 hover:border-[#4A90E2] hover:scale-105'
                  }`}
                  onClick={() => setImagemSelecionada(item.src)}
                />
              ))}
            </div>
          </div>

          {/* Informações e Preço */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
            <span className="text-sm text-gray-500 ml-2">({dados.avaliacoes})</span>
          </div>
          <p className="text-lg text-gray-600 mb-2">{dados.descricao}</p>
          <p className="text-gray-400 line-through">R$ {dados.precoOriginal.toFixed(2)}</p>
          <p className="text-3xl font-bold text-[#4A90E2]">R$ {dados.precoAtual.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-4">ou 12x de R$ {parcela}</p>

          <a
            href={dados.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-gradient-to-r from-[#4A90E2] to-[#00979c] text-white py-3 rounded-full font-bold hover:scale-105 hover:brightness-110 transition animate-pulse"
          >
            COMPRAR AGORA
          </a>
        </div>
      </section>

      {/* SECTION - BENEFÍCIOS */}
      <section className="w-full bg-[#028794] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Por que escolher o Vital Air?
          </h2>
          <ul className="space-y-4 text-white text-base">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Controle total na palma da mão: Ajuste pelo app com 32 canais para personalização completa.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Experiência sob medida: Cada detalhe do som adaptado ao seu estilo de vida.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Mais liberdade e conectividade: Ajustes rápidos sem sair do conforto do seu lar.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Tecnologia profissional, simples de usar: Tudo intuitivo para você aproveitar mais a vida.
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Indicado para perdas auditivas leves a severas (86%): Ajuste profissional com praticidade.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION - BANNER E BENEFÍCIOS VISUAIS */}
      <section className="w-full bg-[#028794] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <img
            src={vitalAirBanner}
            alt="Banner Vital Air"
            className="block object-cover w-full lg:max-w-3xl mx-auto rounded-lg"
          />
          <img
            src={vitalAirBeneficios}
            alt="Benefícios do Vital Air"
            className="block object-cover w-full lg:max-w-3xl mx-auto rounded-lg"
          />
        </div>
      </section>

      {/* SECTION - GARANTIA */}
      <section className="w-full py-12 px-4 bg-[#f0fdf4]">
        <div className="max-w-3xl mx-auto border border-green-300 rounded-lg text-center p-6">
          <p className="text-lg font-semibold text-green-700 mb-2">
            Garantia de 1 ano de fábrica Fonovital
          </p>
          <p className="text-gray-600">
            Troca imediata em caso de defeito de fabricação. Suporte por WhatsApp com nossa equipe especializada.
          </p>
        </div>
      </section>

      {/* SECTION - FAQ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-[#213547] mb-6">
            Perguntas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                Precisa de exames para usar o Vital Air?
              </summary>
              <p className="mt-2 text-gray-600">
                Não. Ele é pronto para uso, mas o teste auditivo gratuito pode ajudar a orientar sua escolha.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                Posso controlar tudo pelo celular?
              </summary>
              <p className="mt-2 text-gray-600">
                Sim! O Vital Air possui app com ajuste completo e intuitivo para sua rotina.
              </p>
            </details>
            <details className="border rounded-md p-4 cursor-pointer">
              <summary className="font-semibold text-[#4A90E2]">
                Serve para idosos?
              </summary>
              <p className="mt-2 text-gray-600">
                Sim, a interface é simples e amigável para todas as idades.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* SECTION - CHAMADA FINAL */}
      <section className="w-full py-16 px-4 bg-white text-center">
        <p className="text-2xl font-bold text-[#213547] mb-4">
          Controle sua audição com Vital Air.
        </p>
        <a
          href={dados.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white bg-gradient-to-r from-[#4A90E2] to-[#00979c] py-4 px-8 rounded-full font-bold text-lg hover:scale-105 hover:brightness-110 transition animate-pulse"
        >
          GARANTA O SEU AGORA
        </a>
      </section>
    </>
  )
}
