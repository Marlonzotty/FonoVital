import { useEffect, useRef } from 'react';
import { Activity, Bluetooth, Droplets, HeartPulse, Moon, ShieldCheck, Smartphone, Sparkles, Watch, Waves, Zap } from 'lucide-react';
import Footer from '../components/Footer';
import MercadoPagoSeal from '../components/MercadoPagoSeal';
import { loadFacebookPixel, trackPageView } from '../analytics/fbpixel';
import vitalWellnessHero from '../assets/Vitalwellness/ChatGPT Image 11 de set. de 2026, 22_16_26.png';
import heartRate from '../assets/Vitalwellness/Frequencia_Cardiaca (1).png';
import sleep from '../assets/Vitalwellness/Sono (1).png';
import hrv from '../assets/Vitalwellness/HRV (1).png';
import stress from '../assets/Vitalwellness/Estresse (1).png';
import bloodPressure from '../assets/Vitalwellness/Pressao_Arterial (1).png';
import spO2 from '../assets/Vitalwellness/SpO2 (1).png';
import temperature from '../assets/Vitalwellness/Temperatura_Corporal (1).png';
import productVideo from '../assets/Vitalwellness/6000334024356.mp4';
import appVideo from '../assets/Vitalwellness/6000327238885 (1).mp4';

const checkoutUrl = '/#/finalizar/vital-wellness';

const metricCards = [
  { title: 'Frequência cardíaca', text: 'Observe como seus batimentos se comportam ao longo do dia e compare diferentes momentos da sua rotina.', icon: heartRate },
  { title: 'ECG', text: 'Registre a atividade elétrica do coração pelo dispositivo e consulte o resultado no aplicativo.', icon: vitalWellnessHero },
  { title: 'HRV', text: 'Acompanhe a variabilidade entre os batimentos e perceba tendências ligadas a descanso, esforço e recuperação.', icon: hrv },
  { title: 'Sono', text: 'Veja o histórico das suas noites e acompanhe padrões de descanso ao longo do tempo.', icon: sleep },
  { title: 'Estresse', text: 'Consulte indicadores que ajudam você a entender como o corpo responde à rotina e aos momentos de maior demanda.', icon: stress },
  { title: 'Pressão arterial', text: 'Visualize os registros disponíveis no aplicativo para acompanhar a sua rotina de bem-estar.', icon: bloodPressure },
  { title: 'SpO₂', text: 'Acompanhe a saturação de oxigênio registrada pelo dispositivo como parte do seu histórico pessoal.', icon: spO2 },
  { title: 'Temperatura corporal', text: 'Observe as variações registradas ao longo do tempo e conheça melhor os sinais da sua rotina.', icon: temperature },
];

export default function VitalWellness() {
  const pixelPageViewSent = useRef(false);

  useEffect(() => {
    document.title = 'Vital Wellness | Cuidar é estar presente';
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Pixel exclusivo desta landing page. O Pixel das demais páginas não é alterado.
    const vitalWellnessPixelId = '4833094476935342';
    loadFacebookPixel(vitalWellnessPixelId);
    if (!pixelPageViewSent.current) {
      trackPageView();
      pixelPageViewSent.current = true;
    }
  }, []);

  return (
    <main className="vital-wellness-page overflow-hidden bg-[#f7fbfb] text-slate-900">
      <section className="relative bg-[#0c3137] px-5 pb-16 pt-12 text-white sm:px-8 lg:pb-24 lg:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(63,190,184,.25),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <div>
            <p className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[.22em] text-[#8de4d9]"><Sparkles size={16} /> Vital Wellness</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-6xl">Cuidar de quem você ama ficou mais próximo.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">Uma pulseira discreta que acompanha indicadores de saúde, sono e atividade — e organiza tudo no seu celular.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={checkoutUrl} data-google-ads-purchase="true" className="btn-3d inline-flex items-center justify-center gap-2"><HeartPulse size={19} /> Quero minha Vital Wellness</a>
              <span className="text-sm text-slate-300">Pagamento seguro • R$ 350,00</span>
            </div>
            <div className="mt-5 max-w-sm rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-slate-200"><ShieldCheck className="mr-2 inline text-[#a6f1df]" size={17} /> Pagamento processado com segurança pelo Mercado Pago.<br /><span className="text-xs text-slate-400">FonoVital • CNPJ 61.894.698/0001-20</span></div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm text-slate-300"><span><b className="block text-xl text-white">Sem tela</b>menos distrações</span><span><b className="block text-xl text-white">IP68</b>proteção anunciada</span><span><b className="block text-xl text-white">Bluetooth</b>conexão com app</span></div>
          </div>
          <div className="relative rounded-[2rem] bg-[#163e43] p-3 shadow-2xl shadow-black/30 sm:p-6"><img src={vitalWellnessHero} alt="Pulseira Vital Wellness ao lado do aplicativo" className="mx-auto w-full max-w-[640px] object-contain" /><span className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-[#0c3137]/80 px-4 py-2 text-xs font-semibold text-[#a6f1df] backdrop-blur">Acompanhe no seu celular</span></div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#168c88]">Presença que cabe na rotina</p><h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Ela usa.<br />Você acompanha.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">Sem telas complicadas ou dezenas de menus no pulso. A Vital Wellness acompanha a rotina enquanto as informações ficam organizadas no aplicativo.</p><div className="mt-7 flex gap-3 text-sm font-semibold text-slate-700"><span className="rounded-full bg-white px-4 py-2 shadow-sm"><ShieldCheck className="mr-1 inline text-[#168c88]" size={17} /> simples</span><span className="rounded-full bg-white px-4 py-2 shadow-sm"><Watch className="mr-1 inline text-[#168c88]" size={17} /> discreta</span></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="overflow-hidden rounded-3xl bg-slate-200 sm:col-span-2"><video src={productVideo} controls muted playsInline className="h-full max-h-[470px] w-full object-cover" /></div><div className="rounded-3xl bg-[#dff4ef] p-6"><Smartphone className="text-[#168c88]" /><h3 className="mt-10 text-xl font-bold">Seu corpo no celular</h3><p className="mt-2 text-sm leading-6 text-slate-600">Um histórico para enxergar mudanças ao longo do tempo.</p></div><div className="rounded-3xl bg-[#e8eef8] p-6"><Moon className="text-[#4d6c9e]" /><h3 className="mt-10 text-xl font-bold">Do dia para a noite</h3><p className="mt-2 text-sm leading-6 text-slate-600">Use durante o dia e continue durante o sono.</p></div></div></div></section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#168c88]">Uma rotina inteira de informações</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Muito mais que contar passos.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Não veja apenas números. Entenda tendências da sua rotina com dados centralizados no app.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{metricCards.map((card) => <article key={card.title} className="rounded-3xl border border-slate-100 bg-[#f8fbfb] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="rounded-[1.35rem] border border-[#cce9e4] bg-white p-2 shadow-[0_8px_24px_rgba(22,140,136,.08)]"><img src={card.icon} alt={`Indicador de ${card.title}`} className="h-40 w-full rounded-[1rem] object-contain" /></div><h3 className="mt-5 text-xl font-bold">{card.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p></article>)}</div><div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl bg-[#e8f6f3] p-6 text-center sm:flex-row sm:text-left"><div><p className="font-bold text-[#0c666a]">Comece a acompanhar sua rotina</p><p className="mt-1 text-sm text-slate-600">Tenha todos esses indicadores no seu celular.</p></div><a href={checkoutUrl} data-google-ads-purchase="true" className="btn-3d inline-flex items-center gap-2 whitespace-nowrap"><HeartPulse size={18} /> Comprar agora</a></div><p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-slate-500">Os indicadores são apresentados para acompanhamento de bem-estar e tendências pessoais. Eles não substituem exames, avaliação ou orientação de um profissional de saúde.</p></div></section>

      <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#168c88]">Sem mais uma tela no seu pulso</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Menos tela.<br />Mais atenção ao que importa.</h2><p className="mt-6 text-lg leading-8 text-slate-600">A ausência de display é uma escolha: mais discrição, simplicidade e foco no acompanhamento. Seus dados ficam para você, no celular.</p><div className="mt-8 grid gap-4 sm:grid-cols-3">{[['Mais discreta', 'Parece uma pulseira convencional.'], ['Mais simples', 'Sem navegar por menus no pulso.'], ['Mais foco', 'Informações organizadas no app.']].map(([title, text]) => <div key={title}><p className="font-bold text-[#0c666a]">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div><div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl"><video src={appVideo} controls muted playsInline className="aspect-[4/5] w-full object-cover" /></div></div></section>

      <section className="bg-[#e8f6f3] px-5 py-20 sm:px-8 lg:py-24"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#168c88]">Feita para acompanhar</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Tecnologia que cuida sem atrapalhar.</h2></div><div className="max-w-sm text-sm leading-6 text-slate-600">Coloque no pulso, conecte ao aplicativo e use normalmente. A pulseira coleta; o celular transforma os dados em informação visual.</div></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-3xl bg-white p-6"><Bluetooth className="text-[#168c88]" /><b className="mt-8 block">Compatível com Android e iOS</b><p className="mt-2 text-sm text-slate-600">Sincronização por Bluetooth.</p></div><div className="rounded-3xl bg-white p-6"><Droplets className="text-[#168c88]" /><b className="mt-8 block">Proteção IP68</b><p className="mt-2 text-sm text-slate-600">Para acompanhar os imprevistos da rotina.</p></div><div className="rounded-3xl bg-white p-6"><Zap className="text-[#168c88]" /><b className="mt-8 block">Bateria recarregável</b><p className="mt-2 text-sm text-slate-600">Desenvolvida para acompanhar vários dias.</p></div><div className="rounded-3xl bg-white p-6"><Activity className="text-[#168c88]" /><b className="mt-8 block">Monitoramento contínuo</b><p className="mt-2 text-sm text-slate-600">Histórico de saúde, sono e atividade.</p></div></div></div></section>

      <section className="bg-[#0c3137] px-5 py-20 text-center text-white sm:px-8 lg:py-28"><div className="mx-auto max-w-3xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#8de4d9]">Comece hoje</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Uma pulseira. Uma rotina inteira de informações.</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">Mais tranquilidade para quem cuida. Mais liberdade para quem usa.</p><a href={checkoutUrl} data-google-ads-purchase="true" className="btn-3d mt-8 inline-flex items-center gap-2">Comprar por R$ 350,00 <Waves size={18} /></a><div className="mx-auto mt-8 max-w-sm rounded-2xl bg-white px-4 py-2"><MercadoPagoSeal /></div><p className="mt-3 text-sm text-slate-300">Pagamento seguro processado pelo Mercado Pago.</p><p className="mt-6 text-xs leading-5 text-slate-400">FonoVital • CNPJ 61.894.698/0001-20<br />A Vital Wellness é voltada ao acompanhamento de bem-estar e atividade. As informações não substituem avaliação, diagnóstico ou acompanhamento de profissionais de saúde.</p><noscript><img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=4833094476935342&ev=PageView&noscript=1" alt="" /></noscript></div></section>
      <Footer />
    </main>
  );
}
