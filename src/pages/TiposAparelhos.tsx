import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { HiOutlineCreditCard } from 'react-icons/hi2';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Comments from '../components/Comments';

import voxton from '../assets/voxton/caixaVoxton.jpg';
import voxchargeUnidade from '../assets/voxcharge/caixavonxcharge.jpg';
import iavoice from '../assets/iavoice/iavoice-caixa-produto.jpg';
import vitalair from '../assets/vitalair/produto-completo.jpg';
import voicepro from '../assets/voicepro/voicepro-caixa-produto.jpg';

const aparelhos = [
  {
    sigla: 'Voxton Mini CIC',
    descricao: 'Voxton Aparelho Auditivo Mini CIC Recarregável | Fonovital...',
    precoOriginal: 1399.0,
    precoAtual: 599.9,
    precoParcela: '12x R$ 64,94',
    avaliacoes: 21,
    imagem: voxton,
    esgotado: false,
    rota: '/produto/voxton',
    badge: 'CIC',
    link: 'https://fonovitaloficial.carrinho.app/one-checkout/ocmtb/28068276',
  },
  {
    sigla: 'Voxcharge Mini CIC',
    descricao: 'O Voxcharge une conforto, potência e discrição em um modelo moderno.',
    precoOriginal: 1799.0,
    precoAtual: 1199.9,
    precoParcela: '12x R$ 116,75',
    avaliacoes: 34,
    imagem: voxchargeUnidade,
    esgotado: true,
    rota: '/produto/voxcharge',
    badge: 'CIC',
    link: 'https://wa.me/553x?text=Ol%C3%A1%2C+gostaria+de+ser+avisado+quando+o+Voxcharge+voltar+ao+estoque.',
  },
  
  {
    sigla: 'IAvoice Inteligente',
    descricao: 'Com inteligência artificial, o IAvoice se adapta ao ambiente.',
    precoOriginal: 1999.0,
    precoAtual: 1699.0,
    precoParcela: '12x R$ 216,36',
    avaliacoes: 51,
    imagem: iavoice,
    esgotado: false,
    rota: '/produto/iavoice',
    badge: 'IA',
    link: 'https://fonovital.pay.yampi.com.br/r/EXEMPLOIAVOICE',
  },
  {
    sigla: 'Vital Air',
    descricao: 'Controle total da audição com app e 32 canais de personalização.',
    precoOriginal: 2899.0,
    precoAtual: 1999.0,
    precoParcela: '12x R$ 216,36',
    avaliacoes: 42,
    imagem: vitalair,
    esgotado: false,
    rota: '/produto/vitalair',
    badge: 'TWS',
    link: 'https://fonovital.pay.yampi.com.br/r/DLE7SWQNKR',
  },
  {
    sigla: 'VoicePro Profissional',
    descricao: 'Alta performance para ambientes ruidosos com 48 canais.',
    precoOriginal: 2099.0,
    precoAtual: 1499.0,
    precoParcela: '12x R$ 162,24',
    avaliacoes: 47,
    imagem: voicepro,
    esgotado: false,
    rota: '/produto/voicepro',
    badge: 'CIC',
    link: 'https://fonovital.pay.yampi.com.br/r/EXEMPLOVOICEPRO',
  },
];

export default function TiposAparelhos() {
  return (
    <div className="w-full bg-white font-[Montserrat]">
      <Navbar />

      <section className="px-4 lg:px-8 py-12">
        <h2 className="mt-16 text-3xl sm:text-4xl font-bold text-[#213547] mb-12 text-center">
          Tipos de Aparelhos Auditivos
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {aparelhos.map((item, index) => {
            const precoOriginal = item.precoOriginal.toFixed(2).replace('.', ',');
            const precoAtual = item.precoAtual.toFixed(2).replace('.', ',');
            const desconto = Math.round(
              ((item.precoOriginal - item.precoAtual) / item.precoOriginal) * 100
            );

            return (
              <div
                key={index}
                className={`relative w-full sm:w-[300px] lg:w-[280px] bg-white rounded-2xl border border-[#4A90E2] shadow-sm hover:shadow-md transition duration-300 ${
                  item.esgotado ? 'opacity-60' : ''
                }`}
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

                <figure className="p-4 h-48 flex items-center justify-center">
                  <img
                    src={item.imagem}
                    alt={item.sigla}
                    className="h-full object-contain rounded-xl"
                  />
                </figure>

                <div className="px-5 py-4">
                  <h2 className="font-semibold text-[#213547] text-base leading-snug mb-1">
                    {item.sigla}
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
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500/80 text-white text-sm px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                      >
                        Avise-me
                      </a>
                    ) : (
                      <Link
                        to={item.rota}
                        className="bg-[#007c91] hover:bg-[#005f6e] text-white text-sm px-4 py-2 rounded-lg font-medium transition"
                      >
                        Compre Agora 
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 lg:px-0 py-12">
        <h3 className="text-2xl font-bold text-[#213547] mb-6 text-center">
          Comentários de quem já experimentou
        </h3>
        <Comments />
      </section>

      <Footer />
    </div>
  );
}
