import { useEffect, useMemo, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type ModalConfig, type Transaction } from "../app/types";
import { fetchTransactions } from "../services/db";

type ExtratoProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Extrato = ({ onOpenModal }: ExtratoProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions()
      .then(setTransactions)
      .catch((error) => console.error("Erro ao buscar extrato:", error));
  }, []);

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);
    const savings = totalIncome - totalExpense;

    return [
      { id: "income", title: "Entradas", value: totalIncome, progress: 82, style: "default" },
      { id: "expense", title: "Saidas", value: totalExpense, progress: 58, style: "alt" },
      { id: "savings", title: "Economia", value: savings, progress: 64, style: "soft" },
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
                })
              }
            >
              Filtrar
            </button>
            <button
              className="icon-btn"
              aria-label="Exportar"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Exportar extrato",
                  description: "Escolha o formato do arquivo.",
                  mode: "view",
                })
              }
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
              onClick={() =>
                onOpenModal({
                  title: "Exportar transacoes",
                  description: "Exportacao por periodo e categoria.",
                  mode: "view",
                })
              }
            >
              Exportar
            </button>
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
              </div>
            ))}
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
