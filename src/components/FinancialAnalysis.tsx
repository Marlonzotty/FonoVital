import { useEffect, useState } from "react";
type Client = {
  name?: string;
  country?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  address?: string;
  zipCode?: string;
  cpf?: string;
  product?: string;
  amount?: number | string;
  origin?: string;
  record_id?: number;
  record_type?: "legacy" | "order";
  sale_date?: string;
};
type Row = {
  month: string;
  total_count: number;
  total_amount: number | string;
  orders_count: number;
  legacy_count: number;
  clients?: Client[];
};
const money = (value: number | string | undefined) =>
  `R$ ${Number(value || 0)
    .toFixed(2)
    .replace(".", ",")}`;
const clientText = (client: Client) =>
  [
    client.name || "",
    "Brazil",
    client.state || "",
    client.city || "",
    client.address || "",
    client.phone || "",
    client.email || "",
    client.zipCode || "",
    client.cpf || "",
  ].join("\t");

const today = () => new Date().toISOString().slice(0, 10);

const stripWhatsappHeader = (value: string) =>
  value.replace(/^\s*\[[^\]]+\]\s*[^:]+:\s*/u, "").trim();
const isConcrete = (value: string | undefined) =>
  Boolean(value && !/^(?:-|–|—|n[aã]o informado|não informado|sem informa[cç][aã]o)$/i.test(value.trim()));
const firstConcrete = (...values: Array<string | undefined>) =>
  values.find((value) => isConcrete(value)) || "";

const parseAmount = (value: string) => {
  const normalized = value.replace(/R\$\s*/gi, "").replace(/\s/g, "");
  if (!normalized) return "";
  const number = normalized.includes(",")
    ? normalized.replace(/\./g, "").replace(",", ".")
    : normalized;
  const parsed = Number(number);
  return Number.isFinite(parsed) ? parsed.toFixed(2) : "";
};

const normalizeWhatsappCustomer = (raw: string): Client => {
  const text = raw.trim();
  const lines = text.split(/\r?\n/).map(stripWhatsappHeader).filter(Boolean);
  const tabs = text.split("\t").map((part) => part.trim());
  const values = tabs.length > 1 ? tabs : lines;
  const labeled: Record<string, string> = {};
  lines.forEach((line) => {
    const match = line.match(/^\s*(nome|pa[ií]s|estado|uf|cidade|endere[cç]o|telefone|celular|whatsapp|e-?mail|cep|cpf)\s*:\s*(.+)$/i);
    if (match) labeled[match[1].toLowerCase()] = match[2].trim();
  });
  const email = labeled["email"] || values.map(stripWhatsappHeader).map((value) => value.match(/\S+@\S+\.\S+/)?.[0] || "").find(Boolean) || "";
  const cpf = labeled.cpf || values.map(stripWhatsappHeader).map((value) => value.match(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/))
    .find(Boolean)?.[0] || "";
  const phone = labeled.telefone || labeled.celular || labeled.whatsapp || values.map(stripWhatsappHeader).find((value) => {
    const digits = value.replace(/\D/g, "");
    return !/cpf/i.test(value) && digits.length >= 10 && digits.length <= 13;
  }) || "";
  const zipCode = labeled.cep || values.map(stripWhatsappHeader).map((value) => value.match(/\b\d{5}-?\d{3}\b/)?.[0] || "").find(Boolean) || "";
  const name = labeled.nome || lines.find((value) =>
    isConcrete(value)
    && !/\S+@\S+\.\S+|cpf\s*:|cep\s*:|r\$\s*[\d.,]+|^\+?\d[\d\s().-]{9,}$/i.test(value),
  ) || "";
  const state = labeled.estado || labeled.uf || (tabs.length > 2 ? values[2] : "");
  const city = labeled.cidade || (tabs.length > 3 ? values[3] : "");
  const address = labeled["endereço"] || labeled["endereco"] || (tabs.length > 4 ? values[4] : "");
  const country = labeled["país"] || labeled["pais"] || (tabs.length > 1 ? values[1] : "Brazil");
  return { name, country, state, city, address, phone, email, zipCode, cpf };
};

const sanitizeClient = (client: Client): Client => {
  const validName = isConcrete(client.name)
    && !/^\s*\[[^\]]+\]/u.test(client.name || "")
    && !/cpf\s*:|r\$\s*[\d.,]+/i.test(client.name || "");
  if (validName) {
    return {
      ...client,
      country: "Brazil",
      name: client.name,
      state: firstConcrete(client.state),
      city: firstConcrete(client.city),
      address: firstConcrete(client.address),
      phone: firstConcrete(client.phone),
      email: firstConcrete(client.email),
      zipCode: firstConcrete(client.zipCode),
      cpf: firstConcrete(client.cpf),
    };
  }
  const parsed = normalizeWhatsappCustomer([
    client.name,
    client.country,
    client.state,
    client.city,
    client.address,
    client.phone,
    client.email,
    client.zipCode,
    client.cpf,
  ].filter(Boolean).join("\n"));
  return {
    ...client,
    name: firstConcrete(parsed.name, client.name),
    country: "Brazil",
    state: firstConcrete(parsed.state, client.state),
    city: firstConcrete(parsed.city, client.city),
    address: firstConcrete(parsed.address, client.address),
    phone: firstConcrete(parsed.phone, client.phone),
    email: firstConcrete(parsed.email, client.email),
    zipCode: firstConcrete(parsed.zipCode, client.zipCode),
    cpf: firstConcrete(parsed.cpf, client.cpf),
  };
};

const normalizeRows = (data: unknown): Row[] =>
  Array.isArray(data)
    ? data.map((row: Row) => ({
        ...row,
        clients: Array.isArray(row.clients)
          ? row.clients.map(sanitizeClient).filter((client) => isConcrete(client.name))
          : [],
      }))
    : [];

export default function FinancialAnalysis({
  month = "",
  onUnauthorized,
}: {
  month?: string;
  onUnauthorized: () => void;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [openMonth, setOpenMonth] = useState("");
  const [error, setError] = useState("");
  const [whatsappText, setWhatsappText] = useState("");
  const [importProduct, setImportProduct] = useState("");
  const [importAmount, setImportAmount] = useState("");
  const [importDate, setImportDate] = useState(today);
  const [importBusy, setImportBusy] = useState(false);
  const [importMessage, setImportMessage] = useState("");
  const [copiedClient, setCopiedClient] = useState("");
  const [editingClient, setEditingClient] = useState("");
  const [editDraft, setEditDraft] = useState<Record<string, string>>({});
  const [editBusy, setEditBusy] = useState(false);
  useEffect(() => {
    fetch("/api/admin/financial-analysis", { credentials: "include" })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 401) onUnauthorized();
        if (!response.ok)
          throw new Error(data.error || "Não foi possível carregar a análise.");
        setRows(normalizeRows(data));
      })
      .catch((reason) =>
        setError(
          reason instanceof Error
            ? reason.message
            : "Erro ao carregar análise.",
        ),
      );
  }, [onUnauthorized]);

  async function importWhatsappCustomer(event: React.FormEvent) {
    event.preventDefault();
    const customer = normalizeWhatsappCustomer(whatsappText);
    const amount = Number(parseAmount(importAmount));
    if (!customer.name || !importProduct.trim() || !importAmount.trim() || !Number.isFinite(amount) || amount < 0 || !importDate) {
      setImportMessage("Informe o cliente, produto, valor e data para adicionar o lançamento.");
      return;
    }
    setImportBusy(true);
    setImportMessage("");
    try {
      const response = await fetch("/api/admin/financial-analysis/import", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rows: [{
            source_sheet: `WhatsApp-${Date.now()}`,
            source_row: 1,
            sale_date: importDate,
            product: importProduct.trim(),
            customer,
            amount,
          }],
        }),
      });
      const data = await response.json();
      if (response.status === 401) onUnauthorized();
      if (!response.ok) throw new Error(data.error || "Não foi possível adicionar o lançamento.");
      setImportMessage("Cliente adicionado à análise financeira.");
      setWhatsappText("");
      setImportProduct("");
      setImportAmount("");
      setRows([]);
      const refreshed = await fetch("/api/admin/financial-analysis", { credentials: "include" });
      if (refreshed.ok) {
        const refreshedData = await refreshed.json();
        setRows(normalizeRows(refreshedData));
      }
    } catch (reason) {
      setImportMessage(reason instanceof Error ? reason.message : "Erro ao adicionar o lançamento.");
    } finally {
      setImportBusy(false);
    }
  }

  async function copyClient(client: Client, key: string) {
    try {
      await navigator.clipboard.writeText(clientText(client));
      setCopiedClient(key);
      window.setTimeout(() => setCopiedClient(""), 1500);
    } catch {
      setImportMessage("Não foi possível copiar os dados do cliente.");
    }
  }

  function startEditing(client: Client, key: string) {
    setEditingClient(key);
    setEditDraft({
      name: client.name || "",
      country: client.country || "Brazil",
      state: client.state || "",
      city: client.city || "",
      address: client.address || "",
      phone: client.phone || "",
      email: client.email || "",
      zipCode: client.zipCode || "",
      cpf: client.cpf || "",
      product: client.product || "",
      amount: String(client.amount ?? "").replace(".", ","),
      sale_date: client.sale_date || today(),
    });
  }

  async function saveClient(client: Client) {
    if (!client.record_id || !client.record_type) return;
    const amount = Number(parseAmount(editDraft.amount || ""));
    if (!editDraft.name?.trim() || !editDraft.product?.trim() || !Number.isFinite(amount) || amount < 0 || !editDraft.sale_date) {
      setImportMessage("Preencha nome, produto, valor e data antes de salvar.");
      return;
    }
    setEditBusy(true);
    setImportMessage("");
    try {
      const response = await fetch(`/api/admin/financial-analysis/${client.record_type}/${client.record_id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sale_date: editDraft.sale_date,
          product: editDraft.product.trim(),
          amount,
          customer: {
            name: editDraft.name.trim(),
            country: editDraft.country.trim() || "Brazil",
            state: editDraft.state.trim(),
            city: editDraft.city.trim(),
            address: editDraft.address.trim(),
            phone: editDraft.phone.trim(),
            email: editDraft.email.trim(),
            zipCode: editDraft.zipCode.trim(),
            cpf: editDraft.cpf.trim(),
          },
        }),
      });
      const data = await response.json();
      if (response.status === 401) onUnauthorized();
      if (!response.ok) throw new Error(data.error || "Não foi possível salvar as alterações.");
      setEditingClient("");
      setImportMessage("Dados atualizados.");
      const refreshed = await fetch("/api/admin/financial-analysis", { credentials: "include" });
      if (refreshed.ok) setRows(normalizeRows(await refreshed.json()));
    } catch (reason) {
      setImportMessage(reason instanceof Error ? reason.message : "Erro ao salvar as alterações.");
    } finally {
      setEditBusy(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">Análise financeira</h2>
      <p className="text-sm text-slate-500">
        Selecione um mês para visualizar o resumo e os clientes.
      </p>
      <form onSubmit={importWhatsappCustomer} className="mt-5 rounded-xl border border-[#cfe5e7] bg-white p-4">
        <h3 className="font-semibold text-slate-900">Adicionar cliente vindo do WhatsApp</h3>
        <p className="mt-1 text-xs text-slate-500">
          Cole os dados em qualquer formato. A sequência copiada em “Ver cliente” também funciona e será organizada automaticamente.
        </p>
        <textarea
          aria-label="Dados do cliente vindos do WhatsApp"
          value={whatsappText}
          onChange={(event) => setWhatsappText(event.target.value)}
          placeholder="Cole aqui nome, telefone, endereço, e-mail, CPF..."
          rows={4}
          className="mt-3 w-full rounded-lg border p-3 text-sm"
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <input aria-label="Produto do lançamento" value={importProduct} onChange={(event) => setImportProduct(event.target.value)} placeholder="Produto" className="rounded-lg border p-3 text-sm" />
          <input aria-label="Valor do lançamento" inputMode="decimal" value={importAmount} onChange={(event) => setImportAmount(event.target.value)} placeholder="Valor (ex.: 1.299,90)" className="rounded-lg border p-3 text-sm" />
          <input aria-label="Data do lançamento" type="date" value={importDate} onChange={(event) => setImportDate(event.target.value)} className="rounded-lg border p-3 text-sm" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={importBusy} className="rounded-lg bg-[#008B91] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {importBusy ? "Adicionando..." : "Adicionar à análise"}
          </button>
          {importMessage && <span className="text-sm text-slate-600" role="status">{importMessage}</span>}
        </div>
      </form>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {!error && !rows.some((row) => !month || row.month === month) && (
        <p className="mt-4 text-sm text-slate-500">
          Nenhum dado financeiro disponível.
        </p>
      )}
      <nav aria-label="Meses da análise financeira" className="mt-4 space-y-2">
        {rows
          .filter((row) => !month || row.month === month)
          .map((row) => {
            const open = openMonth === row.month;
            const clients = Array.isArray(row.clients) ? row.clients : [];
            return (
              <div
                key={row.month}
                className="overflow-hidden rounded-xl border bg-white"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenMonth(open ? "" : row.month)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-slate-50"
                >
                  <span>
                    <strong className="text-[#008B91]">{row.month}</strong>
                    <span className="ml-3 text-sm text-slate-500">
                      {row.total_count} vendas · {money(row.total_amount)}
                    </span>
                  </span>
                  <span className="text-xl text-slate-400">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="border-t bg-slate-50 p-4">
                    <div className="mb-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-slate-500">Faturamento</p>
                        <p className="text-lg font-bold">
                          {money(row.total_amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Pedidos atuais</p>
                        <p className="text-lg font-bold">{row.orders_count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Importados</p>
                        <p className="text-lg font-bold">{row.legacy_count}</p>
                      </div>
                    </div>
                    {!clients.length ? (
                      <p className="text-sm text-slate-500">
                        Nenhum cliente neste mês.
                      </p>
                    ) : (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {clients.map((client, index) => {
                          const clientKey = `${row.month}-${client.record_type}-${client.record_id}-${index}`;
                          const editing = editingClient === clientKey;
                          const field = (name: string, label: string, type = "text") => (
                            <label className="block text-xs font-semibold text-slate-600">
                              {label}
                              <input
                                type={type}
                                value={editDraft[name] || ""}
                                onChange={(event) => setEditDraft((current) => ({ ...current, [name]: event.target.value }))}
                                className="mt-1 w-full rounded-md border p-2 text-sm font-normal"
                              />
                            </label>
                          );
                          return (
                            <article key={clientKey} className="rounded-lg border bg-white p-3 text-sm">
                              {editing ? (
                                <div className="space-y-2">
                                  <div className="grid gap-2 sm:grid-cols-2">
                                    {field("name", "Nome")}
                                    {field("country", "País")}
                                    {field("state", "Estado")}
                                    {field("city", "Cidade")}
                                  </div>
                                  {field("address", "Endereço")}
                                  <div className="grid gap-2 sm:grid-cols-2">
                                    {field("phone", "Telefone")}
                                    {field("email", "E-mail")}
                                    {field("zipCode", "CEP")}
                                    {field("cpf", "CPF")}
                                    {field("product", "Produto")}
                                    {field("amount", "Valor")}
                                    {field("sale_date", "Data", "date")}
                                  </div>
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    <button type="button" disabled={editBusy} onClick={() => void saveClient(client)} className="rounded-lg bg-[#008B91] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
                                      {editBusy ? "Salvando..." : "Salvar alterações"}
                                    </button>
                                    <button type="button" onClick={() => setEditingClient("")} className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-slate-600">
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <p className="font-semibold">{client.name || "Cliente sem nome"}</p>
                                  <p className="text-slate-600">{client.product || "Produto não informado"} · {money(client.amount)}</p>
                                  <p className="text-slate-500">{[client.city, client.state].filter(Boolean).join(" · ")}</p>
                                  {isConcrete(client.address) && <p className="text-xs text-slate-500">{client.address}</p>}
                                  {(isConcrete(client.zipCode) || isConcrete(client.cpf)) && <p className="text-xs text-slate-500">{[isConcrete(client.zipCode) ? `CEP: ${client.zipCode}` : "", isConcrete(client.cpf) ? `CPF: ${client.cpf}` : ""].filter(Boolean).join(" · ")}</p>}
                                  {(isConcrete(client.email) || isConcrete(client.phone)) && <p className="text-xs text-slate-400">{client.email || client.phone} · {client.origin}</p>}
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <button type="button" onClick={() => startEditing(client, clientKey)} className="rounded-lg border border-[#2857c5] px-3 py-1.5 text-xs font-semibold text-[#2857c5] hover:bg-[#f1f5ff]">Editar</button>
                                    <button type="button" onClick={() => void copyClient(client, clientKey)} className="rounded-lg border border-[#008B91] px-3 py-1.5 text-xs font-semibold text-[#008B91] hover:bg-[#effafa]">
                                      {copiedClient === clientKey ? "Copiado" : "Copiar em sequência"}
                                    </button>
                                  </div>
                                </>
                              )}
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </nav>
    </section>
  );
}
