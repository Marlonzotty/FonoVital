import logo from '../assets/logomarca.png';
import consultorio from '../assets/consultorio.jpeg';
import imgPorques from '../assets/img-porques-v2.webp';
import comparaGeral from '../assets/comparaGeral.jpg';
import { Brain, Frown, DollarSign, Puzzle } from 'lucide-react';

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
            href="https://wa.me/5532998820710?text=Gostaria%20de%20saber%20mais%20sobre"
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
    </section>
  );
}
