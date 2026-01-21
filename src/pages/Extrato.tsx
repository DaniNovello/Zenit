import { useEffect, useMemo, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type ModalConfig, type Transaction } from "../app/types";
import {
  deleteTransaction,
  queryTransactions,
  updateTransaction,
} from "../services/db";

type ExtratoProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Extrato = ({ onOpenModal }: ExtratoProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    category?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  const loadTransactions = async () => {
    try {
      const result = await queryTransactions({
        page,
        pageSize,
        search: search || undefined,
        category: filters.category,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
      setTransactions(result.data);
      setTotalCount(result.count);
    } catch (error) {
      console.error("Erro ao buscar extrato:", error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [page, pageSize, search, filters]);

  const handleExport = () => {
    const header = ["descricao", "subtitulo", "valor", "tipo", "categoria", "data"];
    const rows = transactions.map((transaction) => [
      transaction.description,
      transaction.subtitle ?? "",
      transaction.amount,
      transaction.type,
      transaction.category ?? "",
      transaction.createdAt,
    ]);
    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((cell) =>
            `"${String(cell).replace(/\"/g, '""')}"`
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "extrato.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);
    const savings = totalIncome - totalExpense;
    const maxValue = Math.max(totalIncome, totalExpense, Math.abs(savings), 1);

    return [
      {
        id: "income",
        title: "Entradas",
        value: totalIncome,
        progress: (totalIncome / maxValue) * 100,
        style: "default",
      },
      {
        id: "expense",
        title: "Saidas",
        value: totalExpense,
        progress: (totalExpense / maxValue) * 100,
        style: "alt",
      },
      {
        id: "savings",
        title: "Economia",
        value: savings,
        progress: (Math.abs(savings) / maxValue) * 100,
        style: "soft",
      },
    ];
  }, [transactions]);

  return (
    <section className="screen">
      <Topbar
        eyebrow="Extrato"
        title="Movimentacoes"
        actions={
          <>
            <button
              className="pill"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Filtrar extrato",
                  description: "Selecione periodo e categoria.",
                  mode: "form",
                  actionLabel: "Aplicar filtro",
                  fields: [
                    {
                      name: "category",
                      label: "Categoria",
                      type: "text",
                      placeholder: "Alimentacao",
                    },
                    {
                      name: "start",
                      label: "Data inicial",
                      type: "date",
                    },
                    {
                      name: "end",
                      label: "Data final",
                      type: "date",
                    },
                  ],
                  initialValues: {
                    category: filters.category ?? "",
                    start: filters.startDate ?? "",
                    end: filters.endDate ?? "",
                  },
                  onSubmit: async (values) => {
                    setFilters({
                      category: values.category || undefined,
                      startDate: values.start || undefined,
                      endDate: values.end || undefined,
                    });
                    setPage(1);
                  },
                })
              }
            >
              Filtrar
            </button>
            <button
              className="icon-btn"
              aria-label="Exportar"
              type="button"
              onClick={handleExport}
            >
              DL
            </button>
          </>
        }
      />

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Ultimas transacoes</h2>
            <button
              className="ghost"
              type="button"
              onClick={handleExport}
            >
              Exportar
            </button>
          </div>
          <div className="search-row">
            <input
              className="search-input"
              type="text"
              placeholder="Buscar por descricao..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="statement">
            {transactions.map((transaction) => (
              <div className="statement-row" key={transaction.id}>
                <div>
                  <p className="statement-title">{transaction.description}</p>
                  <p className="statement-sub">
                    {transaction.subtitle ??
                      `${transaction.category ?? "Outro"} - ${new Date(
                        transaction.createdAt,
                      ).toLocaleDateString("pt-BR")}`}
                  </p>
                </div>
                <span
                  className={`statement-amount ${
                    transaction.amount > 0 ? "up" : "down"
                  }`}
                >
                  {transaction.amount > 0 ? "+ " : "- "}
                  {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <div className="inline-actions">
                  <button
                    className="ghost"
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        title: "Editar transacao",
                        description: "Atualize os dados da transacao.",
                        mode: "form",
                        actionLabel: "Salvar",
                        fields: [
                          {
                            name: "description",
                            label: "Descricao",
                            type: "text",
                            required: true,
                          },
                          {
                            name: "subtitle",
                            label: "Subtitulo",
                            type: "text",
                          },
                          {
                            name: "amount",
                            label: "Valor",
                            type: "number",
                            required: true,
                          },
                          {
                            name: "type",
                            label: "Tipo",
                            type: "select",
                            options: [
                              { label: "Entrada", value: "income" },
                              { label: "Saida", value: "expense" },
                            ],
                            required: true,
                          },
                          {
                            name: "category",
                            label: "Categoria",
                            type: "text",
                          },
                          {
                            name: "created_at",
                            label: "Data",
                            type: "date",
                          },
                        ],
                        initialValues: {
                          description: transaction.description,
                          subtitle: transaction.subtitle ?? "",
                          amount: String(Math.abs(transaction.amount)),
                          type: transaction.type,
                          category: transaction.category ?? "",
                          created_at: transaction.createdAt.slice(0, 10),
                        },
                        onSubmit: async (values) => {
                          await updateTransaction({
                            id: transaction.id,
                            description: values.description,
                            subtitle: values.subtitle,
                            amount: Number(values.amount),
                            type: values.type === "income" ? "income" : "expense",
                            category: values.category,
                            created_at: values.created_at || undefined,
                          });
                        },
                        onSuccess: () => {
                          void loadTransactions();
                        },
                      })
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        title: "Excluir transacao",
                        description: "Confirme a exclusao desta transacao.",
                        mode: "form",
                        actionLabel: "Excluir",
                        onSubmit: async () => {
                          await deleteTransaction(transaction.id);
                        },
                        onSuccess: () => {
                          void loadTransactions();
                        },
                      })
                    }
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              className="ghost"
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>
              Pagina {page} de {Math.max(1, Math.ceil(totalCount / pageSize))}
            </span>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                setPage((prev) =>
                  prev < Math.ceil(totalCount / pageSize) ? prev + 1 : prev,
                )
              }
              disabled={page >= Math.ceil(totalCount / pageSize)}
            >
              Proxima
            </button>
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Resumo</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Selecionar periodo",
                  description: "Escolha mes ou intervalo.",
                  mode: "view",
                })
              }
            >
              Mes
            </button>
          </div>
          {summary.map((item) => (
            <div className="goal" key={item.id}>
              <div className="goal-row">
                <span>{item.title}</span>
                <span>
                  {item.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar ${
                    item.style === "alt"
                      ? "alt"
                      : item.style === "soft"
                      ? "soft"
                      : ""
                  }`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
