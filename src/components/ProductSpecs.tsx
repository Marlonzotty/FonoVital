import { useEffect, useState } from 'react';

const nomes = [
  'Pedro S.', 'Ana P.', 'João M.', 'Mariana R.', 'Carlos L.',
  'Juliana F.', 'Lucas V.', 'Fernanda G.', 'Ricardo T.', 'Patrícia K.',
  'Sérgio H.', 'Larissa B.', 'Eduardo C.', 'Camila D.', 'André E.',
  'Renata N.', 'Bruno O.', 'Sofia Q.', 'Diego W.', 'Lívia Z.'
];

const cidades = [
  'São João del-Rei, MG', 'Itabuna, BA', 'Lins, SP', 'Santarém, PA',
  'Caruaru, PE', 'Caxias do Sul, RS', 'Pouso Alegre, MG', 'Petrolina, PE',
  'Chapecó, SC', 'Blumenau, SC', 'Marabá, PA', 'Itabaiana, SE',
  'Imperatriz, MA', 'Catanduva, SP', 'Passo Fundo, RS', 'Parauapebas, PA',
  'Patos, PB', 'Balsas, MA', 'Teófilo Otoni, MG', 'Arapiraca, AL'
];

const produtos = [
  'Voxton', 'Voxcharge', 'Vitalvoice'
];

export default function PurchaseAlert() {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    nome: '',
    cidade: '',
    produto: ''
  });

  useEffect(() => {
    const showAlert = () => {
      const nome = nomes[Math.floor(Math.random() * nomes.length)];
      const cidade = cidades[Math.floor(Math.random() * cidades.length)];
      const produto = produtos[Math.floor(Math.random() * produtos.length)];

      setData({ nome, cidade, produto });
      setVisible(true);

      // Pequeno delay para garantir que Tailwind aplique as classes
      setTimeout(() => {
        setShow(true);
      }, 50);

      setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          setVisible(false);
        }, 500); // tempo da animação de fade-out
      }, 5000);
    };

    showAlert();
    const interval = setInterval(showAlert, 30000);

    return () => clearInterval(interval);
  }, []);

  return visible ? (
    <div
      className={`
        fixed top-16 left-4 md:left-auto md:right-4 z-50
        bg-white rounded-xl border-l-4 border-green-500
        px-4 py-3 shadow-lg flex items-start space-x-3
        transition-all duration-500 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
    >
      <div className="h-3 w-3 rounded-full bg-green-500 mt-1"></div>
      <div>
        <p className="font-semibold text-gray-800">{data.nome}</p>
        <p className="text-gray-500 text-sm">{data.cidade}</p>
        <p className="text-green-600 text-sm font-medium">
          Comprou {data.produto}
        </p>
      </div>
    </div>
  ) : null;
}
