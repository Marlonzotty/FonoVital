import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, Truck, Repeat } from 'lucide-react';

import voxton from '../assets/voxton/voxton.png';
import certificados from '../assets/certificados.png';

/** Declaração global para evitar erro TS */
declare global {
  interface Window {
    Yampi?: {
      BuyButton?: {
        reload?: () => void;
        open?: (productCode: string) => void;
      };
    };
  }
}

export default function ProductPage() {
  const [currentImage, setCurrentImage] = useState(voxton);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === voxton ? certificados : voxton));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.Yampi?.BuyButton?.reload?.();
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="w-full bg-white px-4 lg:px-8 py-10 shadow-2xl rounded-xl border border-gray-200">
      {/* Título */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0d7f83]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Voxton Mini CIC | Fonovital
      </motion.h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 max-w-6xl mx-auto">
        {/* Imagem com troca suave */}
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] bg-white p-4 rounded-xl shadow-lg"
        >
          <img
            src={currentImage}
            alt="Imagem do produto"
            className="w-full object-contain rounded"
          />
        </motion.div>

        {/* Informações do Produto */}
        <div className="w-full max-w-xl space-y-4 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#213547] leading-snug">
            Aparelho Auditivo Recarregável Voxton Mini CIC
          </h2>

          <div>
            <p className="text-gray-500 line-through text-lg md:text-xl">
              R$ 1.399,00
            </p>
            <p className="text-4xl md:text-5xl text-[#3ac28b] font-bold">
              R$ 599,90
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              ou 12x de R$ 59,90
            </p>
          </div>

          {/* Ícones agrupados e margens ajustadas */}
          <div
            className="
              grid grid-cols-2
              gap-x-4 gap-y-2
              items-center
              text-base text-gray-700 leading-relaxed
            "
          >
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Star className="w-5 h-5 text-yellow-500" />
              4.9/5 (213 avaliações)
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              Compra segura
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Truck className="w-5 h-5 text-yellow-500" />
              Frete grátis Brasil
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Repeat className="w-5 h-5 text-green-600" />
              Devolução garantida
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 pt-4">
            {/* Botão invisível para registrar o produto na Yampi */}
            <div
              className="ymp-btn hidden"
              data-product-code="KQ4WBFEEML"
            ></div>

            <motion.button
              onClick={() => navigate('/produto/voxton')}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto bg-[#0d7f83] text-white font-bold px-6 py-3 rounded-lg transition text-center text-base md:text-lg animate-pulse border-2 border-[#0b666a] shadow-lg"
            >
              COMPRAR AGORA
            </motion.button>

            <Link
              to="/teste-auditivo"
              className="w-full sm:w-auto bg-[#f1f1f1] text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition text-center mt-3 sm:mt-0 text-base md:text-lg"
            >
              Faça seu teste auditivo grátis
            </Link>
          </div>

          <div className="pt-4 text-base text-gray-600 italic text-center lg:text-left leading-relaxed">
            Produto exclusivo Fonovital | Qualidade garantida 2025
          </div>
        </div>
      </div>

      {/* Seção do vídeo */}
      <section className="w-full bg-[#f9fafb] rounded-xl p-6 shadow-lg border border-gray-200 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#213547] text-center mb-6">
          Conheça a FonoVital !
        </h2>

        <div className="relative w-full aspect-video max-w-3xl mx-auto rounded-lg overflow-hidden">
          {!showVideo ? (
            <motion.div
              className="w-full h-full bg-black flex items-center justify-center cursor-pointer"
              onClick={() => setShowVideo(true)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Imagem de capa do vídeo (thumbnail) */}
              <img
                src="https://img.youtube.com/vi/3cMKdrOKzy8/maxresdefault.jpg"
                alt="Assista ao vídeo"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
              />
              <div className="z-10 relative text-white text-xl md:text-2xl font-bold flex items-center gap-2">
                ▶ Clique e assista 
              </div>
            </motion.div>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/3cMKdrOKzy8?si=HhoD3h8EmTZkO3I1&autoplay=1&rel=0"
              title="Voxton Mini CIC"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          )}
        </div>
      </section>
    </section>
  );
}
