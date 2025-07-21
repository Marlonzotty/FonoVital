import { useState } from 'react';
import { Quote } from 'lucide-react';
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
  { id: 1, nome: 'Claudia Zeferino', idade: 68, produto: 'Voxcharge', local: 'São João del-Rei, MG', texto: 'Gostei bastante, mas precisei de ajuda para configurar no início.', imagem: img1, estrelas: 4 },
  { id: 2, nome: 'Gabriel Nenshin', idade: 72, produto: 'BTE Premium', local: 'Juiz de Fora, MG', texto: 'Funciona bem, mas a entrega demorou mais do que o esperado.', imagem: img4, estrelas: 3 },
  { id: 3, nome: 'Ana Silva', idade: 65, produto: 'Voxton', local: 'Campinas, SP', texto: 'Produto excelente, som limpo e confortável. Recomendo!', imagem: img2, estrelas: 5 },
  { id: 4, nome: 'Carlos Henrique', idade: 59, produto: 'Voxcharge', local: 'Caxias do Sul, RS', texto: 'Bom custo-benefício, mas o manual podia ser mais claro.', imagem: img5, estrelas: 4 },
  { id: 5, nome: 'Marina Silva', idade: 70, produto: 'Vitalvoice', local: 'Barbacena, MG', texto: 'Gostei da qualidade, mas demorou para me adaptar ao encaixe.', imagem: img3, estrelas: 4 },
  { id: 6, nome: 'Lucas Ramos', idade: 62, produto: 'Voxton', local: 'Itabira, MG', texto: 'Som muito bom, mas às vezes o botão de volume falha.', imagem: img6, estrelas: 3 },
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
        <p className="text-center text-yellow-500 font-semibold mb-10">★ 4.3/5.0</p>

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

       <form onSubmit={handleSubmit} className="mt-12 space-y-6 bg-white p-6 rounded-xl shadow border max-w-3xl mx-auto">
  <h3 className="text-xl font-semibold text-[#213547] mb-4 text-center">Deixe sua avaliação</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Nome"
      value={newComment.nome}
      onChange={(e) => setNewComment({ ...newComment, nome: e.target.value })}
      className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#007c91]"
      required
    />
    <input
      type="number"
      placeholder="Idade"
      value={newComment.idade || ''}
      onChange={(e) => setNewComment({ ...newComment, idade: Number(e.target.value) })}
      className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#007c91]"
      required
    />
    <input
      type="text"
      placeholder="Produto"
      value={newComment.produto}
      onChange={(e) => setNewComment({ ...newComment, produto: e.target.value })}
      className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#007c91]"
      required
    />
    <input
      type="text"
      placeholder="Local"
      value={newComment.local}
      onChange={(e) => setNewComment({ ...newComment, local: e.target.value })}
      className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#007c91]"
      required
    />
  </div>

  <textarea
    placeholder="Comentário"
    value={newComment.texto}
    onChange={(e) => setNewComment({ ...newComment, texto: e.target.value })}
    className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#007c91]"
    rows={3}
    required
  />

  {/* Estrelas interativas */}
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-gray-700">Nota:</label>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          onClick={() => setNewComment({ ...newComment, estrelas: n })}
          className={`w-6 h-6 cursor-pointer transition ${
            n <= newComment.estrelas ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  </div>

  {/* Upload de imagem com estilo */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
    <label className="text-sm font-medium text-gray-700">Foto:</label>
    <label className="cursor-pointer bg-gray-100 border border-gray-300 px-4 py-2 rounded hover:bg-gray-200 transition text-sm text-gray-700 w-full sm:w-auto">
      Escolher imagem
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        required
      />
    </label>
    {newComment.imagem && (
      <span className="text-sm text-green-600 font-medium">Imagem selecionada ✅</span>
    )}
  </div>

  <button
    type="submit"
    className="w-full sm:w-auto bg-[#007c91] text-white px-6 py-2 rounded hover:opacity-90 transition font-semibold"
  >
    Enviar Comentário
  </button>
</form>

      </div>
    </section>
  );
}
