import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MercadoPagoSeal from '../components/MercadoPagoSeal';
import SocialProofVideos from '../components/SocialProofVideos';

import { productImage } from '../productImage';

type Product = { name: string; description: string; image?: string | null; price: number | string; promotional_price?: number | string | null; stock?: number | null; active: boolean; available: boolean; sku: string };

export default function PublicProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setProduct(null); setError('');
    fetch(`/api/products/${encodeURIComponent(slug || '')}`, { signal: controller.signal }).then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Produto não encontrado.'); setProduct(data); }).catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Produto não encontrado.'); });
    return () => controller.abort();
  }, [slug]);
  if (error) return <main className="min-h-screen bg-slate-50 p-8 text-center"><h1 className="text-2xl font-bold">{error}</h1><Link to="/" className="mt-4 inline-block text-[#008B91]">Voltar para a vitrine</Link></main>;
  if (!product) return <main className="min-h-screen bg-slate-50 p-8 text-center">Carregando produto…</main>;
  const price = Number(product.promotional_price || product.price);
  return <main className="min-h-screen bg-slate-50 px-4 py-6 sm:py-10">
    <div className="mx-auto mb-5 max-w-5xl rounded-2xl bg-white px-4 py-2 shadow-sm sm:mb-8 sm:px-8"><MercadoPagoSeal /></div>
    <section className="mx-auto grid max-w-4xl items-center gap-8 rounded-3xl bg-white p-5 shadow-xl sm:p-8 md:grid-cols-2 md:gap-10 md:p-10">
      <div className="flex min-h-[260px] items-center justify-center rounded-3xl bg-white p-3 shadow-[0_18px_45px_rgba(0,139,145,0.16)] ring-1 ring-slate-100 sm:min-h-[360px] md:min-h-[420px]">{product.image ? <img src={productImage(product.image)} alt={product.name} className="max-h-[330px] w-full rounded-2xl object-contain drop-shadow-xl sm:max-h-[400px] md:max-h-[440px]" /> : <div className="flex min-h-64 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">Imagem não disponível</div>}</div>
      <div className="text-center md:text-left"><p className="text-sm font-semibold uppercase tracking-widest text-[#008B91]">Fonovital</p><h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{product.name}</h1><p className="mt-5 whitespace-pre-line text-slate-600">{product.description || 'Produto Fonovital'}</p><div className="mt-8">{product.promotional_price && <p className="text-slate-400 line-through">R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>}<p className="text-4xl font-bold text-[#008B91]">R$ {price.toFixed(2).replace('.', ',')}</p></div>{!product.available ? <p className="mt-6 rounded-xl bg-amber-50 p-4 text-left font-semibold text-amber-800">Produto indisponível ou sem estoque no momento.</p> : <Link to={`/finalizar/${encodeURIComponent(product.sku)}`} className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#008B91] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-[#008B91]/25 transition hover:bg-[#006d73] sm:w-auto">Comprar agora</Link>}</div>
    </section>
    <SocialProofVideos />
  </main>;
}
