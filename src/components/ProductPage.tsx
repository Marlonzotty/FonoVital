import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import produto from '../assets/produto.jpeg'

export default function ProductPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-4 text-center text-[#4A90E2]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Aparelho Auditivo Fonovital Pro+
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 mt-10 items-center">
        {/* Imagem do Produto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <img
            src={produto}
            alt="Produto Fonovital"
            className="w-full object-cover rounded"
          />
        </motion.div>

        {/* Informações e Preço */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-lg text-gray-700 mb-4">
            O Fonovital Pro+ oferece clareza sonora superior, conforto e conectividade com seu smartphone. Ideal para quem busca tecnologia discreta e de alta performance.
          </p>

          <div className="mb-4">
            <span className="text-gray-500 line-through text-lg mr-2">R$ 4.990,00</span>
            <span className="text-2xl text-[#4A90E2] font-bold">R$ 789,90</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#A8E6CF] text-[#4A90E2] font-semibold px-6 py-3 rounded-lg transition mb-4"
          >
            <Link to="/checkout">Comprar agora</Link>
          </motion.button>

          <Link
            to="/teste-auditivo"
            className="block w-full text-center bg-[#4A90E2] text-white font-semibold px-6 py-3 rounded-lg animate-pulse hover:opacity-90 transition"
          >
            Faça seu teste auditivo grátis agora
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
