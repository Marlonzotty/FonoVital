import { useState } from 'react'
import produto from '../assets/produto.jpeg'

type Product = {
  brand: string
  model: string
  description: string
  badge?: string
  badgeColor?: string
  priceOriginal: number
  priceDiscount: number
  image: string
}

const products: Product[] = [
  {
    brand: 'REXTON',
    model: 'BiCore B-Li Rugged',
    description: 'Resistente à água, suor e quedas. Compacto e discreto.',
    badge: 'Prova d’água',
    badgeColor: 'bg-green-100 text-green-700',
    priceOriginal: 4990,
    priceDiscount: 3490,
    image: produto
  },
  {
    brand: 'REXTON',
    model: 'M-CORE iX',
    description: 'Modelo quase invisível com encaixe confortável no canal auditivo.',
    badge: 'Mais procurado',
    badgeColor: 'bg-blue-100 text-blue-700',
    priceOriginal: 4790,
    priceDiscount: 3390,
    image: produto
  },
  {
    brand: 'REXTON',
    model: 'BiCore Custom-Li',
    description: 'Customizado, recarregável e moderno.',
    badge: 'Lançamento',
    badgeColor: 'bg-[#A8E6CF] text-[#00796B]',
    priceOriginal: 5290,
    priceDiscount: 3890,
    image: produto
  }
]

export default function ProductGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const closeModal = () => setSelectedIndex(null)
  const current = selectedIndex !== null ? products[selectedIndex] : null

  const next = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % products.length)
    }
  }

  const prev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + products.length) % products.length)
    }
  }

  const getPromoEndDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 2)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <section className="py-20 px-6 bg-[#E6F0FA] rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#4A90E2] mb-4">
          Modelos em Destaque
        </h2>
        <p className="text-center text-gray-600 mb-14">
          Tecnologia, conforto e performance em cada modelo
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg relative transition hover:shadow-xl flex flex-col justify-between"
            >
              {p.badge && (
                <span
                  className={`absolute top-4 right-4 text-xs px-3 py-1 font-semibold rounded-full ${p.badgeColor}`}
                >
                  {p.badge}
                </span>
              )}
              <div className="h-44 flex items-center justify-center mb-6">
                <img src={p.image} alt={p.model} className="max-h-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col">
                <h4 className="text-sm text-gray-400 uppercase">{p.brand}</h4>
                <h3 className="text-xl font-semibold text-[#213547] mt-1 mb-3">{p.model}</h3>
                <p className="text-sm text-gray-600 mb-6">{p.description}</p>
              </div>
              <button
                onClick={() => setSelectedIndex(i)}
                className="text-[#4A90E2] border border-[#4A90E2] px-5 py-2 text-sm rounded-full font-semibold hover:bg-[#4A90E2]/10 transition"
              >
                Ver Modelo
              </button>
            </div>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-lg relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fechar */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 text-xl font-bold hover:text-red-500"
            >
              ×
            </button>

            {/* Navegação lateral */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-1 text-2xl text-white hover:text-[#A8E6CF]"
            >
              ◀
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 text-2xl text-white hover:text-[#A8E6CF]"
            >
              ▶
            </button>

            {/* Conteúdo */}
            <div className="text-center">
              <img
                src={current.image}
                alt={current.model}
                className="h-48 mx-auto mb-4 object-contain"
              />

              <h3 className="text-xl font-bold text-[#4A90E2] mb-2">
                {current.brand} – {current.model}
              </h3>

              <p className="text-sm text-gray-600 mb-4">{current.description}</p>

              <div className="mb-4">
                <span className="text-gray-500 line-through mr-2 text-lg">
                  R$ {current.priceOriginal.toFixed(2)}
                </span>
                <span className="text-2xl text-[#4A90E2] font-bold">
                  R$ {current.priceDiscount.toFixed(2)}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Promoção válida até: <strong>{getPromoEndDate()}</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="w-full bg-[#4A90E2] text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition animate-pulse">
                    Compre agora
    </button>
                <a
    href="https://wa.me/5532999069763"
    target="_blank"
    className="w-full text-center bg-[#A8E6CF] text-[#00796B] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition animate-pulse"
  >
    Fale com especialista
  </a>
</div>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}
