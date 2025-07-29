import { Link } from 'react-router-dom';
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
      preco: '12x R$ 58,17',
      imagem: voxton,
      recomendado: false,
      esgotado: false,
      rota: '/produto/voxton',
      badge: 'CIC',
    },
    {
      nome: 'Voxcharge Mini CIC',
      descricao: 'Conforto, potência e recarga rápida.',
      preco: '12x R$116,75',
      imagem: voxcharge,
      recomendado: true,
      esgotado: true,
      rota: '/produto/voxcharge',
      badge: 'CIC',
    },
    {
      nome: 'Vitalvoice CIC',
      descricao: 'Excelente custo-benefício com qualidade.',
      preco: '12x R$ 136,16',
      imagem: vitalvoice,
      recomendado: false,
      esgotado: false,
      rota: '/produto/vitalvoice',
      badge: 'CIC',
    },
    {
      nome: 'VoicePro Profissional',
      descricao: 'Alta performance em ambientes ruidosos.',
      preco: '12x R$145,90',
      imagem: voicepro,
      recomendado: true,
      esgotado: false,
      rota: '/produto/voicepro',
      badge: 'CIC',
    },
  ],
  "IA Voice (BTE)": [
    {
      nome: 'IAvoice Inteligente',
      descricao: 'Inteligência auditiva com adaptação ao ambiente.',
      preco: '12x R$ 136,16',
      imagem: iaVoice,
      recomendado: true,
      esgotado: false,
      rota: '/produto/iavoice',
      badge: 'IA',
    },
  ],
  "TWS – Vital Air": [
    {
      nome: 'Vital Air',
      descricao: 'Controle via app e 32 canais de personalização.',
      preco: '12x R$116,75',
      imagem: vitalAir,
      recomendado: false,
      esgotado: false,
      rota: '/produto/vitalair',
      badge: 'TWS',
    },
  ],
};

export default function ProductGallery() {
  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#213547] mb-12 text-center">
        Nossos Aparelhos Auditivos
      </h2>

      {Object.entries(aparelhos).map(([categoria, lista], catIndex) => (
        <div key={catIndex} className="mb-20">
          <h3 className="text-2xl font-semibold text-[#4A90E2] mb-6">{categoria}</h3>

          <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:gap-x-6 md:scroll-smooth pb-2">
            {lista.map((item, index) => (
              <div
                key={index}
                className={`
                  shrink-0 w-full md:w-[280px] rounded-2xl transition duration-300
                  bg-white
                  ${item.recomendado ? 'border-2 border-[#4A90E2] shadow-lg animate-pulseBorder' : 'border border-gray-200 shadow-md hover:shadow-xl'}
                  ${item.esgotado ? 'opacity-60' : ''}
                `}
              >
                <figure className="p-4 h-48 flex items-center justify-center relative">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="h-full object-contain"
                  />
                  {item.esgotado && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ESGOTADO
                    </span>
                  )}
                </figure>

                <div className="px-5 py-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-semibold text-[#213547] text-base leading-snug">
                      {item.nome}
                    </h2>
                    {item.recomendado && !item.esgotado && (
                      <div className="badge badge-secondary text-xs">RECOMENDADO</div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-2">{item.descricao}</p>
                  <p className="text-[#007c91] text-lg font-bold mb-4">{item.preco}</p>

                  <div className="flex justify-between items-center mt-auto">
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
                        Compre em até 12x
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
