import { useEffect, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type Goal, type ModalConfig, type Transaction } from "../app/types";
import { createTransaction, fetchGoals, fetchTransactions } from "../services/db";

type DashboardProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Dashboard = ({ onOpenModal }: DashboardProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  const balance = totalIncome - totalExpense;

  const loadData = async () => {
    try {
      setLoading(true);
      const [goalsData, transactionsData] = await Promise.all([
        fetchGoals(),
        fetchTransactions(),
      ]);
      setGoals(goalsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="screen">
      <Topbar
        eyebrow="Bem-vindo, Daniel"
        title="Visao geral"
        actions={
          <>
            <button
              className="pill"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Novo lancamento",
                  description: "Registre uma nova entrada ou saida.",
                  mode: "form",
                  actionLabel: "Adicionar",
                  fields: [
                    {
                      name: "description",
                      label: "Descricao",
                      type: "text",
                      placeholder: "Ex: Mercado Central",
                      required: true,
                    },
                    {
                      name: "subtitle",
                      label: "Subtitulo",
                      type: "text",
                      placeholder: "Ex: Cartao - Hoje",
                    },
                    {
                      name: "amount",
                      label: "Valor",
                      type: "number",
                      placeholder: "0.00",
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
                      placeholder: "Alimentacao",
                    },
                    {
                      name: "created_at",
                      label: "Data",
                      type: "date",
                    },
                  ],
                  onSubmit: async (values) => {
                    await createTransaction({
                      description: values.description,
                      subtitle: values.subtitle,
                      amount: Number(values.amount),
                      type: values.type === "income" ? "income" : "expense",
                      category: values.category,
                      created_at: values.created_at || undefined,
                    });
                    await loadData();
                  },
                })
              }
            >
              Novo lancamento
            </button>
            <button
              className="icon-btn"
              aria-label="Notificacoes"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Notificacoes",
                  description: "Alertas recentes do sistema.",
                  mode: "view",
                })
              }
            >
              • • •
            </button>
          </>
        }
      />

      <section className="cards">
        <article className="glass-card reveal">
          <p className="card-label">Entrada do mes</p>
          <p className="card-value">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalIncome)}
          </p>
          <p className="card-trend up">Calculado via API</p>
        </article>
        <article className="glass-card reveal">
          <p className="card-label">Saidas do mes</p>
          <p className="card-value">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalExpense)}
          </p>
          <p className="card-trend down">Calculado via API</p>
        </article>
        <article className="glass-card reveal">
          <p className="card-label">Economia</p>
          <p className="card-value">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(balance)}
          </p>
          <p className="card-trend up">Saldo Atual</p>
        </article>
      </section>

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Cartoes de credito</h2>
          </div>
          <p style={{ padding: 20, color: "#888" }}>Em breve conectado...</p>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Proximos pagamentos</h2>
          </div>
          <p style={{ padding: 20, color: "#888" }}>Em breve conectado...</p>
        </div>

        <div className="panel wide">
          <div className="panel-header">
            <h2>Extrato</h2>
          </div>
          <p style={{ padding: 20, color: "#888" }}>Em breve conectado...</p>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Metas</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Metas cadastradas",
                  description: "Resumo das metas atuais.",
                  mode: "view",
                  content: (
                    <ul className="modal-list">
                      {goals.map((goal) => (
                        <li key={goal.id}>
                          {goal.title} - R$ {goal.currentAmount} /{" "}
                          {goal.targetAmount}
                        </li>
                      ))}
                    </ul>
                  ),
                })
              }
            >
              Editar
            </button>
          </div>

          {loading ? (
            <p style={{ padding: 20 }}>Carregando metas...</p>
          ) : (
            goals.map((goal) => (
              <div className="goal" key={goal.id}>
                <div className="goal-row">
                  <span>{goal.title}</span>
                  <span>
                    R$ {goal.currentAmount} / {goal.targetAmount}
                  </span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))
          )}

          {!loading && goals.length === 0 && (
            <p style={{ padding: 20, color: "#888" }}>
              Nenhuma meta cadastrada.
            </p>
          )}
        </div>
      </section>
    </section>
  );
};
