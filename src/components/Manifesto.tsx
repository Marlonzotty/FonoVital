import logo from '../assets/logomaarca.jpeg'

export default function Manifesto() {
  return (
    <section className="bg-white mt-12 px-6 py-12 rounded-3xl shadow-md text-gray-800 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Manifesto</h2>
      <p className="text-center text-gray-500 mb-8">Saiba um pouco dos nossos objetivos</p>

      <div className="space-y-6 text-justify text-base leading-relaxed">
        <p>
          Na <span className="font-bold">Fonovital</span>, nossa missão é clara e inabalável:
          proporcionar a todos uma <span className="underline decoration-[#4A90E2]">vida plena e conectada por meio da audição</span>. 
          Em um mercado onde a qualidade muitas vezes é negligenciada em favor dos lucros, nós priorizamos o bem-estar e a saúde auditiva de nossos clientes como nossa razão de existir.
        </p>

        <p>
          Acreditamos que a audição é essencial para a plenitude da vida. Cada sorriso, cada palavra,
          cada momento de alegria ou aprendizado começa com a capacidade de ouvir. 
          E é por isso que, na Fonovital, buscamos incansavelmente a 
          <span className="underline decoration-[#4A90E2] font-semibold"> excelência em tudo o que fazemos</span>.
        </p>

        <p>
          Além disso, a qualidade não é um compromisso vago para nós. 
          <span className="font-semibold text-[#4A90E2]"> Investimos constantemente em tecnologia de ponta e equipamentos modernos</span>, 
          garantindo que nossos clientes tenham acesso aos aparelhos auditivos mais avançados e eficazes disponíveis. 
          Nossos <span className="font-semibold text-[#4A90E2]">profissionais recebem treinamento contínuo</span> para se manterem atualizados com as últimas inovações em saúde auditiva.
        </p>

        <p>
          Estamos comprometidos em transformar vidas, superar desafios e construir 
          <span className="underline decoration-[#4A90E2] font-semibold"> relacionamentos duradouros com nossos clientes</span>.
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
  )
}
