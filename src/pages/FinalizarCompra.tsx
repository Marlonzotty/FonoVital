import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

const products: Record<string, string> = {
  voicepro: 'VoicePro Profissional Digital', voxton: 'Voxton Mini CIC', 'voxton-direito': 'Voxton Mini CIC — Lado Direito', 'voxton-esquerdo': 'Voxton Mini CIC — Lado Esquerdo',
  iavoice: 'IAvoice Inteligência Auditiva', smartvoice: 'SmartVoice CIC Bluetooth', softvoice: 'SoftVoice Recarregável', vitalair: 'Vital Air Bluetooth', vitalvoice: 'VitalVoice',
};

export default function FinalizarCompra() {
  const { product = 'voicepro' } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Record<string, string>>({});
  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });
  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const response = await fetch(`/api/checkout/${product}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const raw = await response.text();
      let data: { checkoutUrl?: string; error?: string } = {};
      try { data = JSON.parse(raw); } catch { throw new Error(`Erro do servidor (${response.status})`); }
      if (!response.ok) throw new Error(data.error || 'Confira os dados informados');
      if (!data.checkoutUrl) throw new Error('O servidor não retornou o link de pagamento');
      window.location.href = data.checkoutUrl;
    } catch (err) { setError(err instanceof Error ? err.message : 'Erro ao continuar'); setLoading(false); }
  }
  const fields = [['name', 'Nome completo'], ['cpf', 'CPF'], ['email', 'E-mail'], ['phone', 'Telefone'], ['zipCode', 'CEP'], ['street', 'Rua'], ['number', 'Número'], ['complement', 'Complemento (opcional)'], ['neighborhood', 'Bairro'], ['city', 'Cidade'], ['state', 'UF']];
  return <main className="min-h-screen bg-slate-50 px-4 py-12"><form onSubmit={submit} className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-xl sm:p-10"><h1 className="text-3xl font-bold text-slate-900">Finalizar compra</h1><p className="mt-2 text-slate-600">{products[product] || 'Produto Fonovital'}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{fields.map(([key, label]) => <label key={key} className={key === 'email' || key === 'street' || key === 'name' ? 'sm:col-span-2' : ''}><span className="mb-1 block text-sm font-semibold text-slate-700">{label}{key !== 'complement' && ' *'}</span><input required={key !== 'complement'} value={form[key] || ''} onChange={update(key)} type={key === 'email' ? 'email' : 'text'} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#008B91]" /></label>)}</div>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={loading} className="mt-8 w-full rounded-xl bg-[#008B91] px-5 py-4 font-bold text-white disabled:opacity-60">{loading ? 'Abrindo pagamento...' : 'Continuar para pagamento seguro'}</button></form></main>;
}
