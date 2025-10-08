import { useEffect, useState } from 'react';

const nomes = [
  'Pedro S.', 'Ana P.', 'João M.', 'Mariana R.', 'Carlos L.',
  'Juliana F.', 'Lucas V.', 'Fernanda G.', 'Ricardo T.', 'Patrícia K.',
  'Sérgio H.', 'Larissa B.', 'Eduardo C.', 'Camila D.', 'André E.',
  'Renata N.', 'Bruno O.', 'Sofia Q.', 'Diego W.', 'Lívia Z.'
];

const cidades = [
  'São João del-Rei, MG', 'Itabira, MG', 'Jundiaí, SP', 'Araras, SP', 'Bragança Paulista, SP',
  'Lajeado, RS', 'Caxias do Sul, RS', 'Itabuna, BA', 'Petrolina, PE', 'Caruaru, PE',
  'Marília, SP', 'Cataguases, MG', 'Criciúma, SC', 'Ijuí, RS', 'Patos de Minas, MG',
  'Barbacena, MG', 'Linhares, ES', 'Chapecó, SC', 'Pouso Alegre, MG', 'Paranavaí, PR'
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
    let interval: number;

    const showAlert = () => {
      if (visible) return;

      const nome = nomes[Math.floor(Math.random() * nomes.length)];
      const cidade = cidades[Math.floor(Math.random() * cidades.length)];
      const produto = produtos[Math.floor(Math.random() * produtos.length)];

      setData({ nome, cidade, produto });
      setVisible(true);

      setTimeout(() => {
        setShow(true);
      }, 5000); // início da animação

      setTimeout(() => {
        setShow(false); // começa a esconder após 15s de exibição
        setTimeout(() => {
          setVisible(false);
        }, 500); // finaliza animação
      }, 15000);
    };

    const firstTimeout = setTimeout(showAlert, 1000);
    interval = window.setInterval(showAlert, 60000); // exibe a cada 60s

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [visible]);

  return visible ? (
    <div
      className={`
        fixed top-20 left-2
        bg-white/95 backdrop-blur-sm rounded-lg border-l-4 border-green-500
        px-3 py-2 shadow-md
        flex items-start gap-2.5 w-[75vw] max-w-[220px]
        transition-all duration-500 ease-out z-40
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
    >
      <div className="h-2 w-2 rounded-full bg-green-500 mt-1"></div>
      <div className="space-y-0.5">
        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{data.nome}</p>
        <p className="text-gray-500 text-[11px] sm:text-xs">{data.cidade}</p>
        <p className="text-green-600 text-[11px] sm:text-xs font-medium">
          Comprou {data.produto}
        </p>
      </div>
    </div>
  ) : null;
}
