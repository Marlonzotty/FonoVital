import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import fone2 from '../assets/fones2.jpeg';
import voxchargeImage from '../assets/voxcharge/voxcharge (3).png';
import vitalvoiceImage from '../assets/vitalVoice.jpg';

const aparelhos = [
  {
    sigla: 'Voxton',
    descricao: 'Discreto e eficiente',
    preco: 'R$ 599,90',
    envio: 'Envio 24h',
    imagem: fone2,
    recomendado: false,
    rota: '/produto/voxton',
  },
  {
    sigla: 'Voxcharge',
    descricao: 'Bateria recarregável',
    preco: 'R$ 1199,00',
    envio: 'Envio 24h',
    imagem: voxchargeImage,
    recomendado: true,
    rota: '/produto/voxcharge',
  },
  {
    sigla: 'Vitalvoice',
    descricao: 'Excelente custo-benefício',
    preco: 'R$ 1399,00',
    envio: 'Envio 24h',
    imagem: vitalvoiceImage,
    recomendado: false,
    rota: '/produto/vitalvoice',
  },
];

export default function ProductGallery() {
  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#213547] mb-10 text-center">
        Nossos Aparelhos Auditivos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {aparelhos.map((aparelho, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border ${
              aparelho.recomendado
                ? 'border-[#4A90E2]'
                : 'border-transparent'
            }`}
          >
            {aparelho.recomendado && (
              <div className="bg-[#E6F7F8] text-[#007c91] text-sm font-semibold px-2 py-1 rounded-t-2xl text-center flex items-center justify-center">
                <Star size={16} className="inline-block mr-1 text-[#007c91]" />
                RECOMENDADO
              </div>
            )}

            <img
              src={aparelho.imagem}
              alt={aparelho.sigla}
              className="w-full h-48 object-contain mb-4 rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#213547] mb-1">
                {aparelho.sigla}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {aparelho.descricao}
              </p>
              <p className="text-[#007c91] text-lg font-bold mb-2">
                {aparelho.preco}
              </p>
              <p className="text-gray-400 text-sm mb-4">{aparelho.envio}</p>

              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-gray-700"
                defaultValue="Par (2 unidades)"
              >
                <option>Par (2 unidades)</option>
                <option>1 unidade</option>
              </select>

              <Link
                to={aparelho.rota}
                className="block text-center bg-[#007c91] text-white font-semibold py-2 rounded-lg hover:bg-[#005f6e] transition"
              >
                Comprar Agora
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
