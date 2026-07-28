import seloMercadoPago from '../assets/MERCADOPAGOSELODEQUALIDADEONG.webp';

export default function MercadoPagoSeal() {
  return (
    <div className="mt-4 flex justify-center" aria-label="Compra protegida pelo Mercado Pago">
      <img
        src={seloMercadoPago}
        alt="Compra protegida pelo Mercado Pago"
        className="h-auto w-full max-w-[280px] object-contain"
      />
    </div>
  );
}
