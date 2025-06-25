import { Link } from 'react-router-dom';
import fone1 from '../assets/fones.jpeg';
import fone2 from '../assets/fones2.jpeg';

const aparelhos = [
  {
    sigla: 'Voxcharge',
    nome: 'Aparelho Auditivo Recarregável Mini CIC | Fonovital',
    descricao:
      'O Voxcharge da Fonovital é a combinação perfeita de potência, conforto e discrição. Com design Mini CIC invisível e bateria recarregável, é ideal para quem busca uma solução moderna e eficiente para perda auditiva moderada a severa',
    imagem: fone1,
  },
  {
    sigla: 'Voxton',
    nome: 'Voxton Aparelho Auditivo Mini CIC Recarregável | Fonovital',
    descricao:
      'O Voxton é um aparelho auditivo discreto, potente e confortável, desenvolvido pela Fonovital para quem busca qualidade sonora com total discrição. Seu design Mini CIC (completamente no canal) o torna praticamente invisível durante o uso, ideal para o dia a dia ',
    imagem: fone2,
  },
  {
    sigla: 'Voxcharge (unidade)',
    nome: 'Intracanal',
    descricao:
      'O Voxcharge da Fonovital é a combinação perfeita de potência, conforto e discrição. Com design Mini CIC invisível e bateria recarregável, é ideal para quem busca uma solução moderna e eficiente para perda auditiva moderada a severa.',
    imagem: fone1,
  },
  {
    sigla: 'Voxton (unidade)',
    nome: 'Receptor no Canal',
    descricao:
      'O Voxton é um aparelho auditivo discreto, potente e confortável, desenvolvido pela Fonovital para quem busca qualidade sonora com total discrição. Seu design Mini CIC (completamente no canal) o torna praticamente invisível durante o uso, ideal para o dia a dia ',
    imagem: fone2,
  },
];

export default function ProductGallery() {
  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#213547] mb-10 text-center">
        Nossos Aparelhos Auditivos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {aparelhos.map((aparelho, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300"
          >
            <img
              src={aparelho.imagem}
              alt={aparelho.sigla}
              className="w-full h-48 object-contain mb-4 rounded-lg border-4 border-[#4A90E2]"
            />
            <h3 className="text-xl font-bold text-[#213547] mb-1">
              {aparelho.sigla}
            </h3>
            <p className="text-gray-400 text-sm mb-2">{aparelho.nome}</p>
            <p className="text-gray-600 text-sm mb-6">{aparelho.descricao}</p>

            <div className="flex justify-center">
              <Link
                to="/tipos-de-aparelhos"
                className="px-6 py-2 rounded-full font-semibold text-[#4A90E2] border border-[#4A90E2] shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Saiba Mais
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/tipos-de-aparelhos"
          className="px-6 py-2 rounded-full font-semibold text-[#4A90E2] border border-[#4A90E2] shadow-md hover:shadow-lg hover:scale-105 transition"
        >
          Ver todos os aparelhos
        </Link>
      </div>
    </section>
  );
}
