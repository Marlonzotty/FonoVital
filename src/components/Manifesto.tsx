import logo from '../assets/logomarca.png';

export default function Manifesto() {
  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Manifesto</h2>
      <p className="text-center text-gray-500 mb-8">
        Saiba um pouco dos nossos objetivos
      </p>

      <div className="space-y-6 text-justify">
        <p>
          Na <span className="font-bold">Fonovital</span>, nossa missão é
          clara e inabalável: proporcionar a todos uma{' '}
          <span className="underline decoration-[#4A90E2]">
            vida plena e conectada por meio da audição
          </span>
          .
        </p>
        <p>
          Acreditamos que a audição é essencial para a plenitude da vida. Cada
          sorriso, cada palavra, cada momento começa com a capacidade de ouvir.
          Por isso, buscamos incansavelmente a{' '}
          <span className="underline decoration-[#4A90E2] font-semibold">
            excelência em tudo o que fazemos
          </span>
          .
        </p>
        <p>
          <span className="font-semibold text-[#4A90E2]">
            Investimos constantemente em tecnologia
          </span>{' '}
          e nossos profissionais recebem treinamento contínuo para garantir os
          melhores resultados.
        </p>
        <p>
          Estamos comprometidos em transformar vidas e construir{' '}
          <span className="underline decoration-[#4A90E2] font-semibold">
            relacionamentos duradouros
          </span>{' '}
          com nossos clientes.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <img src={logo} alt="Logo Fonovital" className="h-20 w-auto mb-6" />
        <a
          href="https://wa.me/5532999069763"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#3ac28b] text-white px-6 py-3 rounded-full font-bold hover:bg-[#3ac28b] transition animate-bounce"
        >
          Agende agora, não perca tempo
        </a>
      </div>
    </section>
  );
}
