import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { HiOutlineCreditCard } from 'react-icons/hi2';

import iaVoice from '../assets/iavoice/iavoice-caixa-produto.jpg';
import vitalAir from '../assets/vitalair/produto-completo.jpg';
import voxton from '../assets/voxton/caixaVoxton.jpg';
import voxcharge from '../assets/voxcharge/caixavonxcharge.jpg';
import vitalvoice from '../assets/vitalVoice/vitalVoiceCaixa.jpg';
import voicepro from '../assets/voicepro/voicepro-caixa-produto.jpg';

const aparelhos = {
  "Modelos CIC": [
    {
      nome: 'Voxton Mini CIC',
      descricao: 'Discreto e eficiente para o dia a dia.',
      precoOriginal: 1399,
      precoParcela: '12x R$ 58,17',
      precoAtual: 599.90,
      imagem: voxton,
      recomendado: false,
      esgotado: false,
      rota: '/produto/voxton',
      badge: 'CIC',
      avaliacoes: 21
    },
    {
      nome: 'Voxcharge Mini CIC',
      descricao: 'Conforto, potência e recarga rápida.',
      precoOriginal: 1799,
      precoParcela: '12x R$116,75',
      precoAtual: 1199.90,
      imagem: voxcharge,
      recomendado: true,
      esgotado: true,
      rota: '/produto/voxcharge',
      badge: 'CIC',
      avaliacoes: 34
    },
    {
      nome: 'Vitalvoice CIC',
      descricao: 'Excelente custo-benefício com qualidade.',
      precoOriginal: 1990,
      precoParcela: '12x R$ 136,16',
      precoAtual: 1399.90,
      imagem: vitalvoice,
      recomendado: false,
      esgotado: false,
      rota: '/produto/vitalvoice',
      badge: 'CIC',
      avaliacoes: 12
    },
    {
      nome: 'VoicePro Profissional',
      descricao: 'Alta performance em ambientes ruidosos.',
      precoOriginal: 2099,
      precoParcela: '12x R$145,90',
      precoAtual: 1499.00,
      imagem: voicepro,
      recomendado: true,
      esgotado: false,
      rota: '/produto/voicepro',
      badge: 'CIC',
      avaliacoes: 47
    },
  ],
  "IA Voice (BTE)": [
    {
      nome: 'IAvoice Inteligente',
      descricao: 'Inteligência auditiva com adaptação ao ambiente.',
      precoOriginal: 1999,
      precoParcela: '12x R$ 166,16',
      precoAtual: 1699.00,
      imagem: iaVoice,
      recomendado: true,
      esgotado: false,
      rota: '/produto/iavoice',
      badge: 'IA',
      avaliacoes: 51
    },
  ],
  "TWS – Vital Air": [
    {
      nome: 'Vital Air',
      descricao: 'Controle via app e 32 canais de personalização.',
      precoOriginal: 2899,
      precoParcela: '12x R$ 199,75',
      precoAtual: 1999.00,
      imagem: vitalAir,
      recomendado: false,
      esgotado: false,
      rota: '/produto/vitalair',
      badge: 'TWS',
      avaliacoes: 42
    },
  ],
};

export default function ProductGallery() {
  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12 font-[Montserrat]">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#213547] mb-12 text-center">
        Nossos Aparelhos Auditivos
      </h2>

      {Object.entries(aparelhos).map(([categoria, lista], catIndex) => (
        <div key={catIndex} className="mb-20">
          <h3 className="text-2xl font-semibold text-[#4A90E2] mb-6">{categoria}</h3>

          <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:gap-x-6 md:scroll-smooth pb-2">
            {lista.map((item, index) => {
              const precoOriginal = item.precoOriginal.toFixed(2).replace('.', ',');
              const precoAtual = item.precoAtual.toFixed(2).replace('.', ',');
              const desconto = Math.round(((item.precoOriginal - item.precoAtual) / item.precoOriginal) * 100);

              return (
                <div
                  key={index}
                  className={`shrink-0 w-full md:w-[280px] rounded-2xl transition duration-300 bg-[#] border border-[#4A90E2] shadow-sm hover:shadow-md ${item.esgotado ? 'opacity-60' : ''}`}
                >
                  {!item.esgotado && (
                    <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{desconto}%
                    </span>
                  )}

                  {item.esgotado && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ESGOTADO
                    </span>
                  )}

                  <figure className="p-4 h-48 flex items-center justify-center relative">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="h-full object-contain rounded-xl  border-[#]"
                    />
                  </figure>

                  <div className="px-5 py-4">
                    <h2 className="font-semibold text-[#213547] text-base leading-snug mb-1">
                      {item.nome}
                    </h2>

                    <div className="flex items-center gap-1 text-[#213547] text-sm mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#213547]" />
                      ))}
                      <span className="ml-1 text-gray-500 text-sm">({item.avaliacoes})</span>
                    </div>

                    <p className="line-through text-gray-400 text-sm mb-0">R$ {precoOriginal}</p>
                    <p className="text-[#213547] text-sm font-semibold mb-1">R$ {precoAtual}</p>

                    <p className="flex items-center gap-2 text-[#213547] font-bold text-xl mb-3">
                      <HiOutlineCreditCard className="text-lg" />
                      {item.precoParcela}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="badge badge-outline">{item.badge}</div>
                      {item.esgotado ? (
                        <button
                          disabled
                          className="bg-red-500/80 text-white text-sm px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                        >
                          Avise-me
                        </button>
                      ) : (
                        <Link
                          to={item.rota}
                          className="bg-[#007c91] hover:bg-[#005f6e] text-white text-sm px-4 py-2 rounded-lg font-medium transition"
                        >
                          Ver detalhes
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
