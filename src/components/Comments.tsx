import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';

import img1 from '../assets/IMG_2365.jpg';
import img2 from '../assets/IMG_2366.jpg';
import img3 from '../assets/IMG_2367.jpg';
import img4 from '../assets/IMG_2368.jpg';
import img5 from '../assets/IMG_2370.jpg';
import img6 from '../assets/IMG_2371.jpg';
import img7 from '../assets/IMG_2372.jpg';

const commentsData = [
  { id: 1, nome: 'Claudia Zeferinno', idade: 68, produto: 'Voxcharge', local: 'São Paulo, SP', texto: 'Voltei a ouvir meus netos claramente!', imagem: img1, estrelas: 5 },
  { id: 2, nome: 'Gabriel Nenshin', idade: 72, produto: 'BTE Premium', local: 'Rio de Janeiro, RJ', texto: 'Produto excelente, chegou rápido!', imagem: img4, estrelas: 5 },
  { id: 3, nome: 'Ana Silva', idade: 65, produto: 'Voxton', local: 'Belo Horizonte, MG', texto: 'Mudou completamente minha vida!', imagem: img2, estrelas: 5 },
  { id: 4, nome: 'Carlos Henrique', idade: 59, produto: 'Voxcharge', local: 'Curitiba, PR', texto: 'Me ajudou muito no trabalho.', imagem: img5, estrelas: 4 },
  { id: 5, nome: 'Marina Silva', idade: 70, produto: 'Vitalvoice', local: 'Salvador, BA', texto: 'Nunca imaginei uma qualidade tão boa.', imagem: img3, estrelas: 5 },
  { id: 6, nome: 'Lucas Ramos', idade: 62, produto: 'Voxton', local: 'Porto Alegre, RS', texto: 'Mudou minha qualidade de vida.', imagem: img6, estrelas: 5 },
  { id: 7, nome: 'Fernanda Souza', idade: 67, produto: 'Voxcharge', local: 'Fortaleza, CE', texto: 'Entrega rápida e produto excelente!', imagem: img7, estrelas: 5 },
];

export default function Comments() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 3) % commentsData.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 3 + commentsData.length) % commentsData.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentComments =
    commentsData.slice(index, index + 3).length > 0
      ? commentsData.slice(index, index + 3)
      : [
          ...commentsData.slice(index),
          ...commentsData.slice(0, (index + 3) % commentsData.length),
        ];

  return (
    <section className="w-full bg-[#F9FAFB] px-4 lg:px-8 py-12 mb-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#213547] mb-4 text-center">
          Avaliações dos Clientes
        </h2>
        <p className="text-center text-yellow-500 font-semibold mb-10">
          ★ 4.9/5.0
        </p>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={comment.imagem}
                    alt={comment.nome}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#007c91]"
                  />
                  <div>
                    <h3 className="text-[#213547] font-semibold text-lg">
                      {comment.nome}, {comment.idade} anos
                    </h3>
                    <p className="text-gray-500 text-sm">{comment.local}</p>
                    <p className="text-[#007c91] text-sm font-medium">
                      {comment.produto}
                    </p>
                  </div>
                </div>

                <div className="flex text-yellow-400 mb-2">
                  {'★'.repeat(comment.estrelas).split('').map((star, i) => (
                    <span key={i} className="text-lg">
                      {star}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-[#007c91] text-xl mb-2">
                  <Quote size={20} className="mr-2" />
                  <span className="text-gray-500 italic text-sm">
                    "{comment.texto}"
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Botões */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2">
            <button
              onClick={prev}
              className="bg-white border border-[#007c91] rounded-full p-2 shadow-md hover:scale-110 transition"
            >
              <ChevronLeft className="text-[#007c91]" size={20} />
            </button>
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2">
            <button
              onClick={next}
              className="bg-white border border-[#007c91] rounded-full p-2 shadow-md hover:scale-110 transition"
            >
              <ChevronRight className="text-[#007c91]" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
