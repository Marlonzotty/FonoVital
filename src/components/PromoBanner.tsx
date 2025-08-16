import React from "react";

const PromoBanner: React.FC = () => {
  return (
    <div className="bg-[#008693] text-white w-full overflow-hidden">
      <div className="animate-marquee inline-block whitespace-nowrap py-1.5 md:py-2 font-semibold text-sm md:text-base lg:text-lg tracking-wide">
        🎉 Só na <span className="text-[#A8E6CF]">Fonovital</span> — 
        <span className="text-yellow-300 font-bold"> 10% OFF</span> com cupom: PRIMEIRACOMPRA &nbsp;|&nbsp; 
        💳 Até 12x no cartão &nbsp;|&nbsp; 🚚 Frete Grátis
      </div>
    </div>
  );
};

export default PromoBanner;
