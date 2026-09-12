import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { trackPurchaseConversion } from '../analytics/googleAds';
import MercadoPagoSeal from '../components/MercadoPagoSeal';
import SocialProofVideos from '../components/SocialProofVideos';

const products: Record<string, string> = {
  'galinha-pintadinha': 'Galinha Pintadinha',
  voicepro: 'VoicePro Profissional Digital', voxton: 'Voxton Mini CIC', 'voxton-direito': 'Voxton Mini CIC — Lado Direito', 'voxton-esquerdo': 'Voxton Mini CIC — Lado Esquerdo',
  iavoice: 'IAvoice Inteligência Auditiva', smartvoice: 'SmartVoice CIC Bluetooth', softvoice: 'SoftVoice Recarregável', vitalair: 'Vital Air Bluetooth', vitalvoice: 'VitalVoice', 'vital-wellness': 'Vital Wellness',
};

export default function FinalizarCompra() {
  const { product = 'voicepro', outcome } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const reference = query.get('reference') || new URLSearchParams(window.location.search).get('external_reference') || '';
  const quantity = Number(query.get('quantity') || 1);
  const [catalog, setCatalog] = useState<{ name: string; price: string | number; promotional_price?: string | number; available: boolean } | null>(null);
  const [receipt, setReceipt] = useState<{ status: string; amount: string | number; payment_id: string } | null>(null);
  const cepRequest = useRef<AbortController | null>(null);
  const checkoutRequest = useRef<{ payload: string; id: string } | null>(null);
  useEffect(() => () => cepRequest.current?.abort(), []);
  useEffect(() => {
    const controller = new AbortController();
    setError(''); setCatalog(null); setReceipt(null);
    let timer: ReturnType<typeof setTimeout>;
    async function load() {
      try {
        if (outcome && !reference) { setError('Não foi possível identificar o pedido. Entre em contato com o atendimento.'); return; }
        const response = await fetch(outcome ? `/api/orders/${encodeURIComponent(reference)}/status` : `/api/products/${encodeURIComponent(product)}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Não foi possível consultar o pedido.');
        if (outcome) {
          setReceipt(data);
          if (data.status === 'approved') {
            const key = `purchase:${data.payment_id}`;
            try {
              if (!sessionStorage.getItem(key)) { trackPurchaseConversion(String(data.payment_id), Number(data.amount)); sessionStorage.setItem(key, '1'); }
            } catch { /* O comprovante continua disponível se o armazenamento estiver bloqueado. */ }
          } else if (['created', 'pending', 'in_process', 'authorized', 'in_mediation'].includes(data.status)) timer = setTimeout(load, 5000);
        } else setCatalog(data);
      } catch (reason) { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Erro na consulta.'); }
    }
    void load();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [product, outcome, reference]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [cepMessage, setCepMessage] = useState('');
  const [form, setForm] = useState<Record<string, string>>({});
  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = key === 'zipCode'
      ? e.target.value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2')
      : e.target.value;
    setForm((current) => ({ ...current, [key]: value }));

    if (key === 'zipCode') {
      cepRequest.current?.abort();
      setCepLoading(false);
      setCepMessage('');
      setForm((current) => ({ ...current, street: '', neighborhood: '', city: '', state: '' }));
    }
  };

  async function lookupCep() {
    const cep = (form.zipCode || '').replace(/\D/g, '');
    if (cep.length !== 8) return;
    cepRequest.current?.abort();
    const controller = new AbortController();
    cepRequest.current = controller;
    setCepLoading(true); setCepMessage('');
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal });
      if (!response.ok) throw new Error('Não foi possível consultar o CEP');
      const address = await response.json();
      if (address.erro) throw new Error('CEP não encontrado');
      setForm((current) => ({ ...current, street: address.logradouro || '', neighborhood: address.bairro || '', city: address.localidade || '', state: address.uf || '' }));
      setCepMessage('Endereço preenchido automaticamente.');
    } catch (err) {
      if (controller.signal.aborted) return;
      setCepMessage(err instanceof Error ? err.message : 'Não foi possível consultar o CEP');
    } finally { if (!controller.signal.aborted) setCepLoading(false); }
  }
  async function submit(e: FormEvent) {
    e.preventDefault(); if (loading || !catalog?.available) return; setLoading(true); setError('');
    try {
      const payload = JSON.stringify({ product, ...form, quantity });
      if (checkoutRequest.current?.payload !== payload) checkoutRequest.current = { payload, id: crypto.randomUUID() };
      const response = await fetch(`/api/checkout/${encodeURIComponent(product)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, quantity, request_id: checkoutRequest.current.id }) });
      const raw = await response.text();
      let data: { checkoutUrl?: string; error?: string } = {};
      try { data = JSON.parse(raw); } catch { throw new Error(`Erro do servidor (${response.status})`); }
      if (!response.ok) throw new Error(data.error || 'Confira os dados informados');
      if (!data.checkoutUrl) throw new Error('O servidor não retornou o link de pagamento');
      window.location.href = data.checkoutUrl;
    } catch (err) { setError(err instanceof Error ? err.message : 'Erro ao continuar'); setLoading(false); }
  }
  if (outcome) {
    const statuses: Record<string, string> = { approved: 'Pagamento aprovado', rejected: 'Pagamento recusado', cancelled: 'Pagamento cancelado', refunded: 'Pagamento reembolsado', charged_back: 'Pagamento contestado' };
    return <main className="min-h-screen bg-slate-50 px-4 py-12"><section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl"><MercadoPagoSeal /><h1 className="mt-6 text-3xl font-bold">{receipt ? statuses[receipt.status] || 'Aguardando confirmação do pagamento' : 'Consultando pagamento'}</h1><p className="mt-4 text-slate-600">{receipt?.status === 'approved' ? 'Seu pedido foi confirmado. Guarde a referência para o atendimento.' : 'A situação do pedido é atualizada após a confirmação do Mercado Pago.'}</p>{reference && <p className="mt-4 break-all text-sm">Referência: {reference}</p>}{error && <p role="alert" className="mt-4 text-red-700">{error}</p>}<Link to="/" className="mt-6 inline-block font-semibold text-[#008B91]">Voltar para a loja</Link><a href="https://wa.me/5532999069763" className="ml-5 text-[#008B91]">Atendimento</a></section></main>;
  }
  const fields = [['name', 'Nome completo'], ['cpf', 'CPF'], ['email', 'E-mail'], ['phone', 'Telefone'], ['zipCode', 'CEP'], ['street', 'Rua'], ['number', 'Número'], ['complement', 'Complemento (opcional)'], ['neighborhood', 'Bairro'], ['city', 'Cidade'], ['state', 'UF']];
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto mb-6 max-w-2xl rounded-3xl bg-white px-6 py-4 shadow-sm">
        <MercadoPagoSeal />
      </div>
      <form onSubmit={submit} className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        <h1 className="text-3xl font-bold text-slate-900">Finalizar compra</h1>
        <p className="mt-2 text-slate-600">{catalog?.name || products[product] || 'Produto Fonovital'}</p>
        {catalog && <p className="mt-2 font-semibold">{quantity} unidade(s) ? {(Number(catalog.promotional_price || catalog.price) * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>}
        {catalog && !catalog.available && <p role="alert" className="mt-4 text-amber-700">Produto indisponível no momento.</p>}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {fields.map(([key, label]) => (
            <label key={key} className={key === 'email' || key === 'street' || key === 'name' ? 'sm:col-span-2' : ''}>
              <span className="mb-1 block text-sm font-semibold text-slate-700">{label}{key !== 'complement' && ' *'}</span>
              <input required={key !== 'complement'} value={form[key] || ''} onChange={update(key)} onBlur={key === 'zipCode' ? lookupCep : undefined} type={key === 'email' ? 'email' : 'text'} inputMode={key === 'zipCode' ? 'numeric' : undefined} placeholder={key === 'zipCode' ? '00000-000' : undefined} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#008B91] read-only:bg-slate-50" />
              {key === 'zipCode' && (cepLoading || cepMessage) && <span className={`mt-1 block text-xs ${cepMessage.includes('preenchido') ? 'text-emerald-700' : 'text-slate-500'}`}>{cepLoading ? 'Consultando endereço...' : cepMessage}</span>}
            </label>
          ))}
        </div>
        {error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={loading || cepLoading || !catalog?.available || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100} className="mt-8 w-full rounded-xl bg-[#008B91] px-5 py-4 font-bold text-white disabled:opacity-60">
          {loading ? 'Processando...' : 'Compre agora'}
        </button>
      </form>
      <SocialProofVideos />
    </main>
  );
}
