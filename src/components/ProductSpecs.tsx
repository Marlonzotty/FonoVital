import fundoCirculo from '../assets/fundoCirculo.jpeg';

export default function ProductSpecs() {
  const items = [
    {
      title: 'Agende sua consulta',
      text: 'Agende seu teste 100% gratuito em uma das nossas unidades.',
    },
    {
      title: 'Conheça cada modelo',
      text: 'Faça o teste do aparelho auditivo mais indicado para sua necessidade.',
    },
    {
      title: 'Melhor preço garantido',
      text: 'Temos as melhores condições para que você já saia com o seu aparelho.',
    },
    {
      title: 'Acompanhamento Vitalício',
      text: 'Garantimos o melhor pós-compra para você se sentir sempre abraçado.',
    },
  ];

  return (
    <section className="w-full bg-white px-4 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Entenda como funciona
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Os melhores profissionais à sua disposição
      </p>

      <div className="grid md:grid-cols-4 gap-6 text-center">
        {items.map((item, index) => (
          <div key={index}>
            <div className="mx-auto mb-4 w-28 h-28 rounded-full border-4 border-[#4A90E2] overflow-hidden">
              <img
                src={fundoCirculo}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="https://wa.me/5532999069763"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-pulse bg-[#A8E6CF] text-[#4A90E2] font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 transition"
        >
          Compre com um dos nossos consultores
        </a>
      </div>
    </section>
  );
}
