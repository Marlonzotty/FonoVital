import { useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css';

import img1 from '../assets/IMG_2365.jpg';
import img2 from '../assets/IMG_2366.jpg';
import img3 from '../assets/IMG_2367.jpg';
import img4 from '../assets/IMG_2368.jpg';
import img5 from '../assets/IMG_2370.jpg';
import img6 from '../assets/IMG_2371.jpg';
import img7 from '../assets/IMG_2372.jpg';

interface Comment {
  id: number;
  nome: string;
  idade: number;
  produto: string;
  local: string;
  texto: string;
  imagem: string;
  estrelas: number;
}

const initialComments: Comment[] = [
  { id: 1, nome: 'Claudia Zeferino', idade: 68, produto: 'Voxcharge', local: 'São João del-Rei, MG', texto: 'Gostei bastante, me impressionei.', imagem: img1, estrelas: 4 },
  { id: 2, nome: 'Gabriel Nenshin', idade: 72, produto: 'BTE Premium', local: 'Juiz de Fora, MG', texto: 'Funciona bem, achei que demoraria mas foi super rapido.', imagem: img4, estrelas: 4 },
  { id: 3, nome: 'Ana Silva', idade: 65, produto: 'Voxton', local: 'Campinas, SP', texto: 'Produto excelente, som limpo e confortável. Recomendo!', imagem: img2, estrelas: 5 },
  { id: 4, nome: 'Carlos Henrique', idade: 59, produto: 'Voxcharge', local: 'Caxias do Sul, RS', texto: 'Bom custo-benefício, me atendeu bem.', imagem: img5, estrelas: 4 },
  { id: 5, nome: 'Marina Silva', idade: 70, produto: 'Vitalvoice', local: 'Barbacena, MG', texto: 'Gostei da qualidade, leve e eficiente.', imagem: img3, estrelas: 4 },
  { id: 6, nome: 'Ligia Ramos', idade: 42, produto: 'Voxton', local: 'Itabira, MG', texto: 'Som muito bom, manual super intuitivo.', imagem: img6, estrelas: 4 },
  { id: 7, nome: 'Fernanda Souza', idade: 67, produto: 'Voxcharge', local: 'São José dos Campos, SP', texto: 'Chegou rápido, atendimento ótimo. Voltaria a comprar!', imagem: img7, estrelas: 5 }
];

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<Omit<Comment, 'id'>>({
    nome: '',
    idade: 0,
    produto: '',
    local: '',
    texto: '',
    estrelas: 5,
    imagem: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewComment((prev) => ({ ...prev, imagem: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.nome || !newComment.texto || !newComment.imagem) return;

    setComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newComment
      }
    ]);

    setNewComment({
      nome: '',
      idade: 0,
      produto: '',
      local: '',
      texto: '',
      estrelas: 5,
      imagem: ''
    });
  };

  return (
    <section className="w-full bg-[#F9FAFB] px-4 lg:px-8 py-12 mb-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#213547] mb-4 text-center">
          Avaliações dos Clientes
        </h2>
        <p className="text-center text-yellow-500 font-semibold mb-10">★ 4.4/5.0</p>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-10"
        >
          {comments.map((comment) => (
            <SwiperSlide key={comment.id}>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full mx-2">
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
                    <span key={i} className="text-lg">{star}</span>
                  ))}
                </div>

                <div className="flex items-center text-[#007c91] text-xl mb-2">
                  <Quote size={20} className="mr-2" />
                  <span className="text-gray-500 italic text-sm">
                    "{comment.texto}"
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Formulário de avaliação */}
        <form onSubmit={handleSubmit} className="mt-10 bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-xl font-bold text-[#213547]">Deixe sua Avaliação</h3>

          <input
            type="text"
            placeholder="Seu nome"
            value={newComment.nome}
            onChange={(e) => setNewComment({ ...newComment, nome: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Sua idade"
            value={newComment.idade}
            onChange={(e) => setNewComment({ ...newComment, idade: Number(e.target.value) })}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Produto utilizado"
            value={newComment.produto}
            onChange={(e) => setNewComment({ ...newComment, produto: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Cidade, Estado"
            value={newComment.local}
            onChange={(e) => setNewComment({ ...newComment, local: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            placeholder="Comentário"
            value={newComment.texto}
            onChange={(e) => setNewComment({ ...newComment, texto: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          {/* Seleção de estrelas */}
          <div className="flex items-center gap-2">
            <span className="text-[#213547] font-medium">Avaliação:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={24}
                className={`cursor-pointer transition ${
                  newComment.estrelas > i ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() =>
                  setNewComment((prev) => ({ ...prev, estrelas: i + 1 }))
                }
              />
            ))}
          </div>

          {/* Botão customizado para upload */}
          <div>
            <label
              htmlFor="imagem"
              className="cursor-pointer inline-block bg-[#007c91] text-white px-4 py-2 rounded hover:bg-[#006b7d] transition"
            >
              Enviar Imagem
            </label>
            <input
              type="file"
              id="imagem"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full"
          >
            Publicar Avaliação
          </button>
        </form>
      </div>
    </section>
  );
}
