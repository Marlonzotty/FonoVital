import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import voxton from '../assets/voxton/voxton.png';

export default function ProductPage() {
  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#38393a] tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Voxton Mini CIC  | Fonovital
      </motion.h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-5xl mx-auto px-2">
        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-60 sm:w-64 md:w-72 bg-white p-3 rounded-xl shadow-md"
        >
          <img
            src={voxton}
            alt="Aparelho Auditivo Voxton"
            className="w-full object-contain rounded"
          />
        </motion.div>

        {/* Apenas nome, preço e botões */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full sm:w-1/2 text-center sm:text-left space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[#213547]">
            Voxton Mini CIC Recarregável
          </h2>

          <div>
            <span className="text-gray-500 line-through text-lg mr-2">
              R$ 1.399,00
            </span>
            <span className="text-4xl text-[#3ac28b] font-bold">
              R$ 599,90
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
         <motion.a
  href="https://fonovital.pay.yampi.com.br/r/4OOUVR2X4F"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  className="w-full sm:w-auto bg-[#10a5aa] text-[#38393a] font-semibold px-6 py-3 rounded-lg transition mb-4 sm:mb-0 text-center"
>
  Comprar agora
</motion.a>


            <Link
              to="/teste-auditivo"
              className="w-full sm:w-auto text-center bg-[#dce0e4] text-black font-semibold px-6 py-3 rounded-lg animate-pulse hover:opacity-90 transition"
            >
              Faça seu teste auditivo grátis agora
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
