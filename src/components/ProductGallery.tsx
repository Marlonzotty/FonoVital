import { Link } from 'react-router-dom';
import fone1 from '../assets/fones.jpeg';
import fone2 from '../assets/fones2.jpeg';

const aparelhos = [
  {
    sigla: 'IIC',
    nome: 'Microcanal invisível',
    descricao:
      'O Microcanal Invisível (IIC) é o menor aparelho auditivo disponível, personalizado e praticamente invisível.',
    imagem: fone1,
  },
  {
    sigla: 'CIC',
    nome: 'Completamente dentro do canal',
    descricao:
      'Os aparelhos CIC se encaixam completamente dentro do canal auditivo, sendo discretos e eficientes.',
    imagem: fone2,
  },
  {
    sigla: 'ITC',
    nome: 'Intracanal',
    descricao:
      'Os aparelhos ITC são colocados dentro do canal auditivo, confortáveis e de fácil manuseio.',
    imagem: fone1,
  },
  {
    sigla: 'RIC',
    nome: 'Receptor no Canal',
    descricao:
      'Aparelhos com receptor no canal, combinando potência com discrição e qualidade sonora.',
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
