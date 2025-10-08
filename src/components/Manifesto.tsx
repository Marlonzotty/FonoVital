import { useState } from 'react';
import logo from '../assets/logomarca.png';
import consultorio from '../assets/consultorio.jpeg';
import imgPorques from '../assets/img-porques-v2.webp';
import comparaGeral from '../assets/comparaGeral.jpg';
import { Brain, Frown, DollarSign, Puzzle, Star, X } from 'lucide-react';

export default function Manifesto() {
  return (
    <section className="w-full bg-white px-4 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Título e descrição */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#213547] mb-2">
            Nosso Manifesto
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Entenda o que nos move na missão pela saúde auditiva
          </p>
        </div>

        {/* Imagem e texto lado a lado */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Texto do manifesto */}
          <div className="w-full lg:w-1/2 space-y-6 text-center text-[#38393a]">
            <p>
              Na Fonovital, nossa missão é clara e inabalável: proporcionar a todos uma vida plena e conectada por meio da audição.
            </p>
            <p>
              Acreditamos que ouvir bem é viver melhor. Cada conversa, risada e reencontro começa com a capacidade de escutar com clareza. Por isso, atuamos com excelência, empatia e inovação.
            </p>
            <p>
              Investimos em tecnologia de ponta e na qualificação constante da nossa equipe para garantir soluções auditivas que realmente transformam vidas.
            </p>
            <p>
              Mais do que vender aparelhos, estamos aqui para resgatar conexões, restaurar confiança e criar novos começos.
            </p>
          </div>

          {/* Imagem do consultório */}
          <div className="w-full lg:w-1/2">
            <img
              src={consultorio}
              alt="Consultório Fonovital"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Logo e botão */}
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo Fonovital" className="h-20 w-auto mb-6" />
          <a
            href="https://wa.me/55329999069763?text=Gostaria%20de%20saber%20mais%20sobre"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3ac28b] text-white px-6 py-3 rounded-full font-bold hover:bg-[#34b07f] transition animate-bounce"
          >
            Fale com a gente, não perca tempo
          </a>
        </div>
      </div>

      {/* NOVA SEÇÃO - POR QUE TRATAR AGORA */}
      <div className="w-full bg-[#018B92] text-white mt-16 px-4 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* IMAGEM */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={imgPorques}
              alt="Por que tratar agora sua perda auditiva?"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* TEXTO */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              <span className="border-b-4 border-white pb-1">
                Por que tratar agora
              </span>{' '}
              sua perda auditiva?
            </h2>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3">
                <Frown className="text-white flex-shrink-0" size={24} />
                <p className="text-sm leading-relaxed">
                  A perda auditiva dificulta a comunicação e{' '}
                  <span className="font-bold">
                    pode levar a ESTRESSE, FADIGA E ISOLAMENTO SOCIAL.
                  </span>
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <Brain className="text-white flex-shrink-0" size={24} />
                <p className="text-sm leading-relaxed">
                  A perda auditiva não tratada{' '}
                  <span className="font-bold">
                    aumenta o RISCO DE DEMÊNCIA em até 5X.
                  </span>{' '}
                  (Baltimore Longitudinal Study of Ageing)
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <Puzzle className="text-white flex-shrink-0" size={24} />
                <p className="text-sm leading-relaxed">
                  A cada 10 decibéis perdidos na audição,{' '}
                  <span className="font-bold">
                    o risco de doenças como o ALZHEIMER AUMENTA 27%.
                  </span>{' '}
                  (John Hopkins)
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <DollarSign className="text-white flex-shrink-0" size={24} />
                <p className="text-sm leading-relaxed">
                  A perda auditiva não tratada{' '}
                  <span className="font-bold">
                    pode trazer perdas de salário
                  </span>{' '}
                  em comparação aos indivíduos que utilizam aparelhos auditivos. (National Institute of Health)
                </p>
              </li>
            </ul>

            <div className="flex justify-center">
              <a
                href="https://wa.me/5532999069763"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#018B92] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition animate-pulse"
              >
                QUERO SABER MAIS
              </a>
            </div>



            {/* IMAGEM DE COMPARAÇÃO */}

          </div>

        </div>
        <div className="mt-8">
          <img
            src={comparaGeral}
            alt="Comparação de produtos auditivos"
            className="mx-auto w-full max-w-2xl h-auto rounded-lg shadow-md" />
        </div>
      </div>

      <PrincipaisDuvidas />
    </section>
  );
}

type FAQModalContent = {
  titulo: string;
  conteudo: string[];
};

const duvidasPrincipais = [
  'Você não precisa enviar nenhum documento para nós, basta comprar direto no site e receber em casa.',
  'Todos os modelos são adaptáveis e fáceis de usar, não requerem moldes e acompanham ponteiras antialérgicas em vários tamanhos.',
  'Os aparelhos possuem ajuste de volume para você selecionar o mais confortável conforme sua necessidade.',
  'Ajustáveis para até 85% de perda auditiva.',
  'Após a compra você terá acesso a vídeos e suporte com especialistas sobre como ajustar e usar.',
  'Não se preocupe: se não se adaptar ou não gostar, você pode devolver o aparelho e ter seu dinheiro de volta sem burocracia.'
];

const faqExtras: FAQModalContent[] = [
  {
    titulo: 'Como é feito o molde / ajuste?',
    conteudo: [
      'Estes aparelhos são 100% adaptáveis e não requerem moldes ou ajustes personalizados.',
      'Acompanham ponteiras de silicone antialérgico (olivas) de vários tamanhos para você escolher a que melhor se adapta ao seu canal auditivo.',
      'O controle de volume é simples, permitindo que você selecione o nível mais confortável para cada ambiente.'
    ]
  },
  {
    titulo: 'Como faço pra usar? Terei ajuda?',
    conteudo: [
      'Sim! Após a compra você recebe acesso a uma área exclusiva com vídeos, dicas e instruções detalhadas para usar, ajustar e conservar seus aparelhos.',
      'Também disponibilizamos atendimento online com especialistas via chat para tirar qualquer dúvida sempre que precisar.'
    ]
  },
  {
    titulo: 'E se eu não gostar ou tiver dificuldades?',
    conteudo: [
      'Você conta com nossa política de devolução em até 7 dias: não gostou por qualquer motivo, devolvemos 100% do seu dinheiro.',
      'Nossa equipe de suporte acompanha toda a jornada para garantir adaptação confortável e segura.'
    ]
  }
];

function PrincipaisDuvidas() {
  const [faqAberta, setFaqAberta] = useState<FAQModalContent | null>(null);

  return (
    <div className="w-full bg-[#eef1f9] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#213547] mb-2">
            Principais dúvidas
          </h2>
          <p className="text-gray-600">
            Veja como é simples adquirir, ajustar e aproveitar o seu aparelho auditivo Fonovital.
          </p>
        </div>

        <div className="rounded-3xl bg-white shadow-lg border border-[#d8def0] p-6 sm:p-10">
          <div className="flex items-start gap-3 mb-6">
            <div className="h-12 w-1 bg-[#213547] rounded-full" />
            <h3 className="text-2xl font-semibold text-[#213547]">
              O que você precisa saber antes de comprar
            </h3>
          </div>
          <ul className="space-y-4 text-[#4a5163] text-sm sm:text-base">
            {duvidasPrincipais.map(item => (
              <li key={item} className="flex gap-3">
                <Star className="text-[#213547] shrink-0 mt-1" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {faqExtras.map(item => (
            <button
              key={item.titulo}
              type="button"
              onClick={() => setFaqAberta(item)}
              className="group rounded-2xl bg-white p-6 text-left shadow hover:shadow-lg border border-transparent hover:border-[#018B92] transition flex flex-col gap-3"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#018B92]/10 text-[#018B92]">
                <Star size={22} />
              </div>
              <h4 className="text-lg font-semibold text-[#213547] group-hover:text-[#018B92]">
                {item.titulo}
              </h4>
              <p className="text-sm text-gray-500">
                Clique para ver detalhes e instruções completas.
              </p>
            </button>
          ))}
        </div>
      </div>

      {faqAberta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setFaqAberta(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>
            <div className="p-6 sm:p-10 space-y-4 text-[#213547]">
              <h3 className="text-2xl font-bold text-[#018B92]">
                {faqAberta.titulo}
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                {faqAberta.conteudo.map(paragrafo => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setFaqAberta(null)}
                  className="inline-flex items-center justify-center rounded-lg bg-[#018B92] px-5 py-2 text-sm font-semibold text-white hover:bg-[#026c74] transition"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
