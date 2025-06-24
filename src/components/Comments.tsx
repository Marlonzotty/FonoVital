import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import img1 from '../assets/IMG_2365.jpg';
import img2 from '../assets/IMG_2366.jpg';
import img3 from '../assets/IMG_2367.jpg';
import img4 from '../assets/IMG_2368.jpg';
import img5 from '../assets/IMG_2370.jpg';
import img6 from '../assets/IMG_2371.jpg';
import img7 from '../assets/IMG_2372.jpg';

const commentsData = [
  { id: 1, nome: 'Claudia Zeferinno', local: 'Búzios - RJ', texto: 'Confesso que comprei meio desconfiada rs, mas realmente é o melhor aparelho que já usei e olha que tive aparelho de mais de 10 mil reais. Recomendo a todos essa empresa e os aparelhos dela.', imagem: img1, estrelas: 5 },
  { id: 2, nome: 'Gabriel Nenshin', local: 'Florianópolis - SC', texto: 'Minha namorada teve uma cirurgia cardíaca e, devido à medicação, acabou acarretando em surdez. Comprei o aparelho e fui super bem atendido.', imagem: img4, estrelas: 5 },
  { id: 3, nome: 'Carlos Henrique', local: 'São Paulo - SP', texto: 'Fiquei muito satisfeito com o atendimento e com a qualidade do aparelho. Superou minhas expectativas.', imagem: img5, estrelas: 4 },
  { id: 4, nome: 'Ana Luiza', local: 'Curitiba - PR', texto: 'O aparelho é muito bom! Me ajudou bastante na minha rotina de trabalho. Recomendo demais.', imagem: img2, estrelas: 5 },
  { id: 5, nome: 'Aa Clara', local: 'Belo Horizonte - MG', texto: 'Adorei! Chegou rápido, bem embalado e funciona perfeitamente. Atendimento excelente.', imagem: img6, estrelas: 5 },
  { id: 6, nome: 'Marina Silva', local: 'Salvador - BA', texto: 'Achei sensacional a qualidade. Nunca imaginei que um aparelho tão discreto pudesse ter uma qualidade tão boa.', imagem: img3, estrelas: 5 },
  { id: 7, nome: 'Lucas Ramos', local: 'Porto Alegre - RS', texto: 'Produto maravilhoso, mudou completamente minha qualidade de vida. Recomendo demais!', imagem: img5, estrelas: 5 },
  { id: 8, nome: 'Fernanda Souza', local: 'Fortaleza - CE', texto: 'Atendimento impecável, produto excelente e entrega super rápida. Nota 10!', imagem: img7, estrelas: 5 },
];

export default function Comments() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 4) % commentsData.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 4 + commentsData.length) % commentsData.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentComments = commentsData.slice(index, index + 4).length
    ? commentsData.slice(index, index + 4)
    : [...commentsData.slice(index), ...commentsData.slice(0, (index + 4) % commentsData.length)];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12 mb-20">
      <h2 className="text-3xl font-bold text-[#213547] mb-8 text-center">
        O que dizem nossos clientes
      </h2>

      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col transition"
              >
                <div className="mb-4">
                  <img
                    src={comment.imagem}
                    alt={comment.nome}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#4A90E2] mx-auto object-cover"
                  />
                </div>

                <div className="flex justify-center text-[#4A90E2] text-xl mb-2">
                  <FaQuoteLeft />
                </div>

                <p className="text-sm text-gray-600 mb-4 text-center">
                  {comment.texto}
                </p>

                <div className="mt-auto text-center">
                  <h3 className="font-semibold text-[#213547]">
                    {comment.nome}
                  </h3>
                  <p className="text-sm text-gray-500">{comment.local}</p>

                  <div className="flex justify-center mt-2">
                    {'★'.repeat(comment.estrelas).split('').map((star, i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        {star}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botões */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2">
          <button
            onClick={prev}
            className="bg-white border border-[#4A90E2] rounded-full p-2 shadow-md hover:scale-110 transition"
          >
            <FaChevronLeft className="text-[#4A90E2]" />
          </button>
        </div>
        <div className="absolute -right-6 top-1/2 -translate-y-1/2">
          <button
            onClick={next}
            className="bg-white border border-[#4A90E2] rounded-full p-2 shadow-md hover:scale-110 transition"
          >
            <FaChevronRight className="text-[#4A90E2]" />
          </button>
        </div>
      </div>
    </section>
  );
}
