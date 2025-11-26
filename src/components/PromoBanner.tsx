import React from "react";

const PromoBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-black via-[#0f172a] to-black text-white w-full overflow-hidden border-b border-[#111827] shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
      <div className="animate-marquee inline-block whitespace-nowrap py-2 md:py-2.5 font-semibold text-sm md:text-base lg:text-lg tracking-wide">
        🏴 Black Friday <span className="text-[#38bdf8] font-bold">Fonovital</span> —{" "}
        <span className="text-[#fbbf24] font-extrabold">15% OFF</span> com cupom{" "}
        <span className="px-2 py-0.5 rounded-md bg-[#111827] text-[#f472b6] font-black tracking-[0.12em]">BLACK</span>{" "}
        &nbsp;|&nbsp; 💳 Até 12x no cartão &nbsp;|&nbsp; 🚚 Frete Grátis Brasil
      </div>
    </div>
  );
};

export default PromoBanner;
