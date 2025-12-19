import React from "react";

const PromoBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#005f6e] via-[#008B91] to-[#005f6e] text-white w-full overflow-hidden border-b border-[#005f6e] shadow-[0_6px_18px_rgba(0,79,90,0.35)]">
      <div className="animate-marquee inline-block whitespace-nowrap py-2 md:py-2.5 font-semibold text-sm md:text-base lg:text-lg tracking-wide">
       <span className="text-[#ecfeff] font-bold">Fonovital</span> —{" "}
        <span className="text-[#F5B50A] font-extrabold">10% OFF</span> com cupom{" "}
        <span className="px-2 py-0.5 rounded-md bg-[#ecfeff] text-[#007c91] font-black tracking-[0.1em]">
          PRIMEIRACOMPRA
        </span>{" "}
        &nbsp;|&nbsp; 💳 Até 12x no cartão &nbsp;|&nbsp; 🚚 Frete Grátis Brasil
      </div>
    </div>
  );
};

export default PromoBanner;
