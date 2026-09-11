import { useCallback, useEffect, useState } from "react";

import { productImage } from "../productImage";

type Product = {
  id: number;
  name: string;
  description: string;
  image?: string;
  sku: string;
  slug: string;
  price: number | string;
  promotional_price?: number | string | null;
  category?: string;
  stock?: number | null;
  active: boolean;
  source_product_id?: number | null;
  product_kind?: string;
};
type Form = {
  name: string;
  description: string;
  image: string;
  sku: string;
  slug: string;
  price: string | number;
  promotional_price: string | number;
  category: string;
  stock: string | number;
  active: boolean;
};
const empty: Form = {
  name: "",
  description: "",
  image: "",
  sku: "",
  slug: "",
  price: "",
  promotional_price: "",
  category: "",
  stock: "",
  active: true,
};
const payload = (f: Form) => ({
  ...f,
  price: Number(f.price),
  promotional_price:
    f.promotional_price === "" ? null : Number(f.promotional_price),
  stock: f.stock === "" ? null : Number(f.stock),
});

export default function AdminProducts({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [products, setProducts] = useState<Product[]>([]),
    [form, setForm] = useState<Form>(empty),
    [mode, setMode] = useState<"quick" | "full">("quick"),
    [modelId, setModelId] = useState(""),
    [query, setQuery] = useState(""),
    [editing, setEditing] = useState<number | null>(null),
    [showCreated, setShowCreated] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [saving, setSaving] = useState(false);
  const load = useCallback(async () => {
    const r = await fetch("/api/admin/products", { credentials: "include" });
    if (r.status === 401) onUnauthorized();
    if (!r.ok) throw new Error("Não foi possível carregar os produtos.");
    setProducts(await r.json());
  }, [onUnauthorized]);
  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [load]);
  const update =
    (key: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((v) => ({ ...v, [key]: e.target.value }));
  const model = products.find((p) => p.id === Number(modelId));
  const originals = products.filter((p) => !p.source_product_id);
  const shown = products.filter((p) =>
    `${p.name} ${p.sku} ${p.category || ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  async function quickSave(e: React.FormEvent) {
    e.preventDefault();
    if (!modelId) {
      setError("Selecione um modelo existente.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const r = await fetch("/api/admin/products/quick", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_id: Number(modelId),
          price: form.price,
          promotional_price: form.promotional_price,
          stock: form.stock === "" ? null : form.stock,
          active: form.active,
        }),
      });
      const d = await r.json();
      if (r.status === 401) onUnauthorized();
    if (!r.ok) throw new Error(d.error || "Não foi possível criar a oferta.");
      setMessage("Oferta criada rapidamente.");
      setModelId("");
      setForm(empty);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao criar oferta.");
    } finally {
      setSaving(false);
    }
  }
  async function fullSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const r = await fetch(
        editing ? `/api/admin/products/${editing}` : "/api/admin/products",
        {
          method: editing ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload(form)),
        },
      );
      const d = await r.json();
      if (r.status === 401) onUnauthorized();
    if (!r.ok) throw new Error(d.error || "Não foi possível salvar.");
      setMessage("Produto salvo.");
      setForm(empty);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }
  async function remove(p: Product) {
    if (
      !window.confirm(
        "Excluir este produto? Pedidos históricos impedem a exclusão.",
      )
    )
      return;
    try {
      const r = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE", credentials: "include" });
      if (r.status === 401) onUnauthorized();
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Não foi possível excluir.");
      await load();
      setError(""); setMessage("Produto excluído.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível excluir."); }
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Produtos</h2>
          <p className="text-sm text-slate-500">
            Escolha cadastro rápido ou produto do zero.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => { setMode("quick"); setEditing(null); setForm(empty); setError(""); setMessage(""); }}
            className={`rounded-lg px-3 py-2 text-sm ${mode === "quick" ? "bg-[#008B91] text-white" : "border"}`}
          >
            Cadastro rápido
          </button>
          <button
            type="button"
            onClick={() => { setMode("full"); setEditing(null); setForm(empty); setError(""); setMessage(""); }}
            className={`rounded-lg px-3 py-2 text-sm ${mode === "full" ? "bg-[#008B91] text-white" : "border"}`}
          >
            Criar produto do zero
          </button>
          <button
            type="button"
            onClick={() => setShowCreated(true)}
            className="rounded-lg border border-[#008B91] px-3 py-2 text-sm text-[#008B91]"
          >
            Ver produtos e links ({products.length})
          </button>
        </div>
      </div>
      {mode === "quick" ? (
        <form
          onSubmit={quickSave}
          className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold">
              Selecionar modelo existente
            </span>
            <select
              required
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Pesquisar/selecionar modelo</option>
              {originals
                .filter((p) =>
                  `${p.name} ${p.sku}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                )
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.sku}
                  </option>
                ))}
            </select>
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar modelo"
            className="rounded-lg border p-2"
          />
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={update("price")}
            placeholder="Preço de oferta"
            className="rounded-lg border p-2"
          />
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.promotional_price}
            onChange={update("promotional_price")}
            placeholder="Preço promocional"
            className="rounded-lg border p-2"
          />
          <input
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={update("stock")}
            placeholder="Estoque opcional"
            className="rounded-lg border p-2"
          />
          <label className="flex items-center gap-2 p-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm((v) => ({ ...v, active: e.target.checked }))
              }
            />{" "}
            Disponível
          </label>
          {model && (
            <div className="flex items-center gap-3 rounded-lg bg-white p-2 text-sm sm:col-span-2">
              <div className="h-12 w-12 rounded bg-slate-100">
                {model.image && (
                  <img
                    src={productImage(model.image)}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
              <span>
                <b>{model.name}</b>
                <br />
                {model.category || "Sem categoria"} · dados preenchidos do
                modelo
              </span>
            </div>
          )}
          <button
            disabled={saving}
            className="rounded-lg bg-[#008B91] px-4 py-2 font-semibold text-white"
          >
            Criar rapidamente
          </button>
        </form>
      ) : (
        <form
          onSubmit={fullSave}
          className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Nome"
            className="rounded-lg border p-2"
          />
          <input
            required
            readOnly={editing !== null}
            value={form.sku}
            onChange={update("sku")}
            placeholder="SKU"
            className="rounded-lg border p-2"
          />
          <input
            readOnly={editing !== null}
            value={form.slug}
            onChange={update("slug")}
            placeholder="Slug público"
            className="rounded-lg border p-2"
          />
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={update("price")}
            placeholder="Preço"
            className="rounded-lg border p-2"
          />
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.promotional_price}
            onChange={update("promotional_price")}
            placeholder="Preço promocional"
            className="rounded-lg border p-2"
          />
          <input
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={update("stock")}
            placeholder="Estoque"
            className="rounded-lg border p-2"
          />
          <input
            value={form.category}
            onChange={update("category")}
            placeholder="Categoria"
            className="rounded-lg border p-2"
          />
          <input
            value={form.image}
            onChange={update("image")}
            placeholder="URL da imagem"
            className="rounded-lg border p-2"
          />
          <label className="flex items-center gap-2 p-2"><input type="checkbox" checked={form.active} onChange={event => setForm(current => ({ ...current, active: event.target.checked }))} /> Disponível</label>
          <textarea
            value={form.description}
            onChange={update("description")}
            placeholder="Descrição"
            className="rounded-lg border p-2 sm:col-span-2"
          />
          <button
            disabled={saving}
            className="rounded-lg bg-[#008B91] px-4 py-2 font-semibold text-white"
          >
            {editing ? "Atualizar" : "Criar produto"}
          </button>
        </form>
      )}
      {(error || message) && (
        <p
          role="alert"
          className={`mt-3 rounded-lg p-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}
        >
          {error || message}
        </p>
      )}
      {showCreated && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Produtos e links criados"
        >
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">Produtos e links criados</h3>
                <p className="text-sm text-slate-500">
                  Modelos e ofertas cadastradas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreated(false)}
                className="rounded-lg border px-3 py-2"
              >
                Fechar
              </button>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produto ou SKU"
              className="mt-4 w-full rounded-lg border p-2"
            />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {shown.map((p) => (
                <article key={p.id} className="rounded-xl border p-4">
                  <div className="flex justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="h-12 w-12 rounded bg-slate-100">
                        {p.image && (
                          <img
                            src={productImage(p.image)}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold">{p.name}</h4>
                        <p className="text-xs text-slate-500">
                          {p.product_kind === "offer"
                            ? "Oferta baseada em modelo"
                            : "Produto original"}{" "}
                          · {p.sku}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold">
                      {p.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">
                    Preço: R$ {Number(p.price).toFixed(2)}
                    {p.promotional_price && (
                      <>
                        {" "}
                        · Promoção: R$ {Number(p.promotional_price).toFixed(2)}
                      </>
                    )}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreated(false);
                        setMode("full");
                        setEditing(p.id);
                        setForm({
                          name: p.name,
                          description: p.description,
                          image: p.image || "",
                          sku: p.sku,
                          slug: p.slug,
                          price: p.price,
                          promotional_price: p.promotional_price || "",
                          category: p.category || "",
                          stock: p.stock ?? "",
                          active: p.active,
                        });
                      }}
                      className="rounded-lg border px-3 py-2 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(p)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700"
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard?.writeText(
                          `${window.location.origin}/#/produto-publico/${p.slug}`,
                        )
                      }
                      className="rounded-lg border border-[#008B91] px-3 py-2 text-sm text-[#008B91]"
                    >
                      Copiar link
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
