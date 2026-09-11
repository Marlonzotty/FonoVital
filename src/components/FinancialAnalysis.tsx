import { useEffect, useState } from "react";
type Client = {
  name?: string;
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
  useEffect(() => {
    fetch("/api/admin/financial-analysis", { credentials: "include" })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 401) onUnauthorized();
        if (!response.ok)
          throw new Error(data.error || "Não foi possível carregar a análise.");
        setRows(
          Array.isArray(data)
            ? data.map((row: Row) => ({
                ...row,
                clients: Array.isArray(row.clients) ? row.clients : [],
              }))
            : [],
        );
      })
      .catch((reason) =>
        setError(
          reason instanceof Error
            ? reason.message
            : "Erro ao carregar análise.",
        ),
      );
  }, [onUnauthorized]);
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">Análise financeira</h2>
      <p className="text-sm text-slate-500">
        Selecione um mês para visualizar o resumo e os clientes.
      </p>
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
                        {clients.map((client, index) => (
                          <article
                            key={`${row.month}-${client.email || client.phone || client.name}-${index}`}
                            className="rounded-lg border bg-white p-3 text-sm"
                          >
                            <p className="font-semibold">
                              {client.name || "Cliente sem nome"}
                            </p>
                            <p className="text-slate-600">
                              {client.product || "Produto não informado"} ·{" "}
                              {money(client.amount)}
                            </p>
                            <p className="text-slate-500">
                              {[client.city, client.state]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                            <p className="text-xs text-slate-500">{client.address || "Endereço não informado"}</p>
                            <p className="text-xs text-slate-500">CEP: {client.zipCode || "não informado"} · CPF: {client.cpf || "não informado"}</p>
                            <p className="text-xs text-slate-400">
                              {client.email ||
                                client.phone ||
                                "Contato não informado"}{" "}
                              · {client.origin}
                            </p>
                          </article>
                        ))}
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
