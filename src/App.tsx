import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {
  Truck,
  ShieldCheck,
  RefreshCcw,
  CreditCard,
  Headphones,
  Ear,
  ChevronRight,
  Zap,
  Trophy,
  ZoomIn,
  X
} from 'lucide-react';

import Comments from './components/Comments';
import Footer from './components/Footer';
import PurchaseAlert from './components/PurchaseAlert';

// Product images
import { voxtonHeroImage } from './produtos/voxton';
import { voxchargeHeroImage } from './produtos/Voxcharge';
import { iaVoiceHeroImage } from './produtos/IAvoice';
import { vitalAirHeroImage } from './produtos/VitalAir';
import bannerJunho from './assets/bannerjunho.png';

import { voiceProHeroImage } from './produtos/VoicePro';
import { smartVoiceHeroImage } from './produtos/SmartVoice';
import { softVoiceHeroImage } from './produtos/SoftVoice';

const renderStars = (nota: number) => {
  const estados: Array<'full' | 'half' | 'empty'> = [];
  for (let i = 1; i <= 5; i += 1) {
    if (nota >= i) estados.push('full');
    else if (nota >= i - 0.5) estados.push('half');
    else estados.push('empty');
  }
  return estados;
};

const aparelhos = [
  {
    sigla: 'Vital Air',
    nome: 'Vital Air Bluetooth Inteligente',
    descricao: 'Bluetooth 5.0, app de controle, 32 canais DSP',
    precoOriginal: 2899.0,
    precoAtual: 1999.0,
    precoParcela: '12x R$ 216,36',
    avaliacoes: 42,
    imagem: vitalAirHeroImage,
    esgotado: false,
    rota: '/produto/vitalair',
    badge: 'TWS',
    nota: 4.8,
    link: 'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital',
  },
  {
    sigla: 'Voxton Mini CIC',
    nome: 'Voxton Aparelho Auditivo Mini CIC',
    descricao: 'Design discreto, bateria 60h, fácil operação',
    precoOriginal: 1399.0,
    precoAtual: 599.9,
    precoParcela: '12x R$ 64,94',
    avaliacoes: 21,
    imagem: voxtonHeroImage,
    esgotado: false,
    rota: '/produto/voxton',
    badge: 'CIC',
    nota: 4.3,
    link: 'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital',
  },
  {
    sigla: 'IAvoice Inteligente',
    nome: 'IAvoice Inteligência Auditiva',
    descricao: 'Chip digital 16 canais, display LED, design BTE',
    precoOriginal: 1999.0,
    precoAtual: 1699.0,
    precoParcela: '12x R$ 216,36',
    avaliacoes: 51,
    imagem: iaVoiceHeroImage,
    esgotado: false,
    rota: '/produto/iavoice',
    badge: 'IA',
    nota: 4.6,
    link: 'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital',
  },
  {
    sigla: 'VoicePro',
    nome: 'VoicePro Profissional Digital',
    descricao: 'UV esterilização, carregamento magnético, 24h bateria',
    precoOriginal: 2099.0,
    precoAtual: 1499.0,
    precoParcela: '12x R$ 162,24',
    avaliacoes: 47,
    imagem: voiceProHeroImage,
    esgotado: false,
    rota: '/produto/voicepro',
    badge: 'PRO',
    nota: 4.5,
    link: 'https://clkdmg.site/pay/voicepro-digital',
    destaque: true,
  },
  {
    sigla: 'SmartVoice',
    nome: 'SmartVoice CIC Bluetooth Magnético',
    descricao: 'CIC discreto, BT streaming, 4-6h + estojo magnético',
    precoOriginal: 2699.0,
    precoAtual: 1999.9,
    precoParcela: '12x R$ 166,66',
    avaliacoes: 18,
    imagem: smartVoiceHeroImage,
    esgotado: false,
    rota: '/produto/smartvoice',
    badge: 'BT',
    nota: 4.5,
    novo: true,
    link: 'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital',
  },
  {
    sigla: 'SoftVoice',
    nome: 'SoftVoice Recarregável 16 Canais',
    descricao: 'Chip importado, 16 canais, 20h com estojo UV/LED',
    precoOriginal: 4499.0,
    precoAtual: 2699.9,
    precoParcela: '12x R$ 224,99',
    avaliacoes: 15,
    imagem: softVoiceHeroImage,
    esgotado: false,
    rota: '/produto/softvoice',
    badge: 'CIC',
    nota: 4.4,
    novo: true,
    link: 'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital',
  },
  {
    sigla: 'Voxcharge',
    nome: 'Voxcharge Mini CIC Recarregável',
    descricao: 'CIC recarregável, 117dB ganho, 20h bateria',
    precoOriginal: 1799.0,
    precoAtual: 1199.9,
    precoParcela: '12x R$ 116,75',
    avaliacoes: 34,
    imagem: voxchargeHeroImage,
    esgotado: true,
    rota: '/produto/voxcharge',
    badge: 'CIC',
    nota: 4.4,
    link: 'https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital',
  },
];

const trustBadges = [
  { icon: Truck, label: 'Frete Grátis', desc: 'Envio 24h' },
  { icon: ShieldCheck, label: 'Garantia 2 Anos', desc: 'Contra defeitos' },
  { icon: RefreshCcw, label: '7 Dias', desc: 'Para devolução' },
  { icon: CreditCard, label: '12x no Cartão ', desc: 'No Cartão' },
];

const faqItems = [
  {
    pergunta: 'O aparelho realmente vai funcionar para o meu caso?',
    resposta:
      'Sim. Nossos aparelhos ajudam em diferentes quadros, como perda auditiva, zumbido, chiado e dificuldade para entender conversas ou TV. Nossa equipe orienta o ajuste ideal para a sua necessidade.'
  },
  {
    pergunta: 'Qual modelo é o ideal para mim: Voxton, VoicePro ou IA Voice?',
    resposta:
      'Depende do seu nível de perda auditiva, rotina e preferência de recursos. O Voxton é prático e discreto, o VoicePro entrega mais desempenho e o IA Voice traz tecnologia inteligente de ajuste. Nós indicamos o melhor custo-benefício para o seu perfil.'
  },
  {
    pergunta: 'É seguro comprar com a Fonovital?',
    resposta:
      'Sim. Trabalhamos com CNPJ ativo, emissão de nota fiscal, meios de pagamento seguros e política de garantia. Você também acompanha entrega e tem suporte direto no WhatsApp durante todo o processo.'
  },
  {
    pergunta: 'Como funciona sem consulta ou sem receita médica?',
    resposta:
      'Os aparelhos permitem adaptação com ajustes guiados, sem obrigatoriedade de consulta prévia para uso inicial. Nosso atendimento acompanha cada etapa para você configurar de forma segura e personalizada.'
  },
  {
    pergunta: 'Qual é o valor e como funciona o pagamento?',
    resposta:
      'Temos parcelamento no cartão e opção com desconto à vista. Nossa equipe explica as condições atualizadas e te ajuda a comparar o custo-benefício com opções mais baratas do mercado.'
  }
];

const championProduct = aparelhos.find(p => p.sigla === 'VoicePro');
const featuredProduct = championProduct || aparelhos.find(p => p.destaque) || aparelhos[0];
const heroVideoId = 'Z4-1AfiPFQ0';

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isMainBannerZoomOpen, setMainBannerZoomOpen] = useState(false);
  const featuredDiscount = Math.round(
    ((featuredProduct.precoOriginal - featuredProduct.precoAtual) / featuredProduct.precoOriginal) * 100
  );

  useEffect(() => {
    if (!isMainBannerZoomOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMainBannerZoomOpen(false);
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isMainBannerZoomOpen]);

  return (
    <div className="min-h-screen hero-bg">
      <PurchaseAlert />

      <section className="relative z-10 px-4 lg:px-8 pt-4">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl border border-[#008B91]/20 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
          <button
            type="button"
            onClick={() => setMainBannerZoomOpen(true)}
            className="group relative block w-full text-left cursor-zoom-in"
            aria-label="Ampliar banner promocional"
          >
            <img
              src={bannerJunho}
              alt="Banner promocional Fonovital"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </button>
        </div>
      </section>

      {/* ===== HERO SECTION ===== */}
      <section className="relative px-4 py-14 lg:px-8 lg:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="flex flex-col gap-7 pt-4 lg:pt-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                <ShieldCheck size={16} className="text-[#008B91]" />
                Atendimento especializado, garantia real e compra segura
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f3f8f8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#006d73]">
                <Trophy size={14} />
                VoicePro | Mais vendido da linha
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-5xl lg:text-[4.2rem]">
                Aparelhos auditivos com desempenho confiável e suporte humano de verdade.
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                A Fonovital combina tecnologia auditiva, orientação especializada e uma experiência de compra clara. O VoicePro reúne conforto, discrição e recursos avançados para a rotina de quem quer ouvir melhor com segurança.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-semibold text-slate-900">+10 mil</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">clientes atendidos com suporte no pré e pós-venda</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-semibold text-slate-900">2 anos</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">de garantia contra defeitos de fabricação</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-semibold text-slate-900">7 dias</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">para devolução com processo simples e assistido</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={featuredProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d inline-flex items-center justify-center gap-2 text-base"
                >
                  <Zap size={20} />
                  Comprar VoicePro
                </a>
                <Link
                  to="/garantia"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
                >
                  <ShieldCheck size={18} />
                  Garantia e Prazos
                </Link>
              </div>

              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-[#008B91]" />
                  Frete grátis com envio rápido
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCcw size={16} className="text-[#008B91]" />
                  Compra com devolução em 7 dias
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-[#008B91]" />
                  Parcelamento em até 12x
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:gap-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:hidden lg:p-7">
                <div className="grid gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center">
                  <div className="rounded-[1.5rem] bg-[#f5f9fa] p-4">
                    <img
                      src={featuredProduct.imagem.src}
                      alt={featuredProduct.nome}
                      className="mx-auto w-full max-w-[360px]"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#006d73]">
                      <Headphones size={16} />
                      Produto em destaque
                    </div>

                    <div>
                      <h2 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">
                        {featuredProduct.nome}
                      </h2>
                      <p className="mt-2 text-base leading-7 text-slate-600">
                        {featuredProduct.descricao}. Indicado para quem busca adaptação confortável, rotina prática e melhor compreensão da fala.
                      </p>
                    </div>

                    <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="font-semibold text-slate-900">Até 85% de perda auditiva</p>
                        <p className="mt-1">Ajuste pensado para uso diário com segurança.</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="font-semibold text-slate-900">Suporte guiado no WhatsApp</p>
                        <p className="mt-1">Orientação desde a compra até a adaptação.</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">Condição de lançamento</p>
                      <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-2">
                        <p className="text-5xl font-semibold leading-none tracking-[-0.04em] text-slate-900">
                          R$ {featuredProduct.precoAtual.toFixed(2).replace('.', ',')}
                        </p>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                          {featuredDiscount}% off
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <p className="text-base text-slate-500 line-through">
                          R$ {featuredProduct.precoOriginal.toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-base font-semibold text-[#006d73]">{featuredProduct.precoParcela}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] lg:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Conheça a Fonovital</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">Veja como funciona nosso atendimento e adaptação</p>
                  </div>
                  <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 md:block">
                    Vídeo institucional
                  </div>
                </div>

                <div className="aspect-video overflow-hidden rounded-[1.5rem] bg-slate-950">
                  <iframe
                    src={`https://www.youtube.com/embed/${heroVideoId}?rel=0&modestbranding=1&color=white`}
                    title="Conheça a Fonovital"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="px-4 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="trust-badge-3d flex items-center gap-3">
                <badge.icon size={24} className="text-[#008B91]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{badge.label}</p>
                  <p className="text-xs text-slate-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="py-20 px-4 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos <span className="text-gradient">Aparelhos</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tecnologia avançada para todos os tipos de perda auditiva. Escolha o modelo ideal para você.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {aparelhos.map((item, index) => {
              const desconto = Math.round(
                ((item.precoOriginal - item.precoAtual) / item.precoOriginal) * 100
              );

              return (
                <div
                  key={index}
                  className={`product-card-3d flex flex-col ${item.esgotado ? 'opacity-60' : ''}`}
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {item.novo && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-300 text-slate-900 text-[10px] font-black px-2 py-1 shadow-sm">
                        ★ Novo
                      </span>
                    )}
                    <span className="badge-type">{item.badge}</span>
                    {!item.esgotado && <span className="badge-discount">-{desconto}%</span>}
                    {item.esgotado && (
                      <span className="bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                        ESGOTADO
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="p-6 pb-2 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                    <img
                      src={item.imagem.src}
                      alt={item.sigla}
                      className="h-40 w-auto object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-white mb-1">{item.sigla}</h3>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{item.descricao}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(item.nota).map((estado, i) => {
                        if (estado === 'full') return <FaStar key={i} className="text-yellow-400 text-sm" />;
                        if (estado === 'half') return <FaStarHalfAlt key={i} className="text-yellow-400 text-sm" />;
                        return <FaRegStar key={i} className="text-yellow-400 text-sm" />;
                      })}
                      <span className="text-xs text-gray-500 ml-1">({item.avaliacoes})</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 line-through">
                        R$ {item.precoOriginal.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-[1.1rem] font-extrabold text-[#005f6e] leading-tight">
                        {item.precoParcela}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">no cartão</p>
                      <p className="text-sm font-semibold text-[#008B91]">
                        À vista R$ {item.precoAtual.toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      {item.esgotado ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-700/50 text-gray-300 font-medium text-sm"
                        >
                          Avise-me
                        </a>
                      ) : (
                        <Link
                          to={item.rota}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg btn-3d text-sm"
                        >
                          Ver Produto
                          <ChevronRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="product-card-3d flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#008B91]/12 to-[#3ac28b]/8">
              <div className="w-16 h-16 rounded-full bg-[#008B91]/20 flex items-center justify-center mb-4">
                <Ear size={32} className="text-[#008B91]" />
              </div>
              <h3 className="font-bold text-[#0f172a] mb-2 text-lg">
                FALE COM ESPECIALISTA FONOVITAL PARA SABER QUAL MELHOR PARA você
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Atendimento rápido via WhatsApp para indicar o aparelho ideal ao seu caso.
              </p>
              <a
                href="https://wa.me/5532999069763?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Fonovital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg border border-[#008B91] text-[#008B91] font-semibold text-sm hover:bg-[#008B91]/10 transition flex items-center justify-center gap-2"
              >
                Falar com especialista
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY FONOVITAL ===== */}
      <section className="py-20 px-4 lg:px-8 section-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Por que escolher a <span className="text-gradient">Fonovital?</span>
              </h2>

              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, title: 'Garantia de 1 Ano', desc: 'Troca imediata em caso de defeito de fabricação' },
                  { icon: RefreshCcw, title: '7 Dias para devolução', desc: 'Não gostou? Devolvemos 100% do seu dinheiro' },
                  { icon: Truck, title: 'Envio em 24 Horas', desc: 'Despachamos seu pedido no mesmo dia' },
                  { icon: Headphones, title: 'Suporte Especializado', desc: 'Atendimento via WhatsApp com especialistas' },
                ].map((item, i) => (
                  <div key={i} className="card-3d p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#008B91]/20 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#008B91]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/5532999069763"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 btn-3d"
              >
                Falar com Especialista
                <ChevronRight size={18} />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10K+', label: 'Clientes Satisfeitos' },
                { value: '1 Ano', label: 'Garantia' },
                { value: '7 Dias', label: 'devolução' },
                { value: '24h', label: 'Envio' },
              ].map((stat, i) => (
                <div key={i} className="card-3d p-6 text-center">
                  <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-4 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos <span className="text-gradient">clientes</span> dizem
            </h2>
            <p className="text-gray-400">
              Histórias reais de quem recuperou a qualidade de vida
            </p>
          </div>
          <Comments />
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className="py-20 px-4 lg:px-8 section-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Nossa <span className="text-gradient">Localização</span>
            </h2>
            <p className="text-gray-400">Visite nossa unidade em São João del-Rei, MG</p>
          </div>

          <div className="card-3d overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.122083025319!2d-44.2522057!3d-21.1475393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1c963c59a1c0f%3A0x53f730cb26c74473!2sFonovital%20LTDA!5e0!3m2!1spt-BR!2sbr!4v1759945084576!5m2!1spt-BR!2sbr"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Fonovital"
            />
          </div>

          <div className="text-center mt-6 text-sm text-gray-400">
            <p className="font-semibold text-[#008B91]">Fonovital LTDA</p>
            <p>CNPJ: 61.894.698/0001-20</p>
            <p>Avenida Eduardo Magalhães, 202 - Centro, São João del-Rei - MG</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative z-20 py-10 px-4 lg:px-8 section-gradient sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-[#0f172a] sm:text-4xl lg:text-5xl">
              Dúvidas Frequentes
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Reunimos as perguntas mais comuns dos nossos clientes para te ajudar a decidir com segurança.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-12">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.pergunta}
                  className={`transition-all duration-200 bg-white border border-gray-200 rounded-xl ${
                    isOpen ? 'shadow-lg' : 'shadow-sm hover:bg-gray-50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6 text-left"
                  >
                    <span className="text-lg font-semibold text-black">{item.pergunta}</span>
                    <span
                      className={`ml-4 text-gray-400 text-xl leading-none transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    >
                      ⌄
                    </span>
                  </button>

                  <div
                    className={`px-4 sm:px-6 transition-all duration-200 overflow-hidden ${
                      isOpen ? 'max-h-48 pb-5 sm:pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-700">{item.resposta}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-600 text-base mt-9">
            Ainda com dúvida?{' '}
            <a
              href="https://wa.me/5532999069763?text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20os%20aparelhos%20auditivos%20da%20Fonovital"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#007c91] transition-all duration-200 hover:text-[#005f6e] hover:underline"
            >
              Fale com nosso suporte
            </a>
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />

      {isMainBannerZoomOpen && (
        <div
          className="fixed inset-0 z-[120] bg-[#0b1720]/85 backdrop-blur-sm px-4 py-6 sm:p-8 flex items-center justify-center"
          onClick={() => setMainBannerZoomOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMainBannerZoomOpen(false)}
              className="absolute -top-3 -right-3 z-10 h-11 w-11 rounded-full bg-white text-[#0f172a] shadow-lg border border-slate-200 flex items-center justify-center"
              aria-label="Fechar modal do banner"
            >
              <X size={20} />
            </button>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0f172a] text-white px-4 py-2 text-sm font-semibold border border-[#00c2c7]/40 shadow-lg">
              <ZoomIn size={16} />
              Use zoom para ver detalhes
            </div>

            <div className="rounded-2xl overflow-auto max-h-[88vh] border border-white/20 bg-[#0f172a]/50">
              <img
                src={bannerJunho}
                alt="Banner promocional Fonovital ampliado"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}












