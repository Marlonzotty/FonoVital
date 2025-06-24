import React, { useEffect } from 'react';
import { publicKey } from '../config/mercadopago'; // Importando a chave pública do Mercado Pago
import { Link } from 'react-router-dom';

const Checkout = () => {
  useEffect(() => {
    // Inicializando o Mercado Pago com a chave pública
    const mp = new window.MercadoPago(publicKey, {
      locale: 'pt-BR', // Definindo o idioma para português
    });

    // Criando o botão de pagamento com a preferência gerada no backend
    mp.checkout({
      preference: {
        id: 'ID_DA_PREFERENCIA', // O ID da preferência deve ser gerado no backend
      },
      render: {
        container: '#button-checkout', // O container onde o botão será renderizado
        label: 'Pagar Agora', // Texto do botão
      },
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto pt-32 px-4">
      <h1 className="text-4xl font-bold text-[#213547] mb-4 text-center">
        Checkout de Pagamento
      </h1>

      <div className="text-center">
        <p className="text-lg text-gray-600 mb-6">
          Complete sua compra de forma rápida e segura
        </p>

        {/* Container para o botão do Mercado Pago */}
        <div id="button-checkout" className="mx-auto"></div>
      </div>

      {/* Link para voltar ao início */}
      <div className="mt-10 text-center">
        <Link
          to="/"
          className="text-[#4A90E2] underline hover:text-[#213547] transition"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
