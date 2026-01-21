import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";
import { bills, creditCards, goals, monthlyMetrics, transactions } from "../app/mocks";

type DashboardProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Dashboard = ({ onOpenModal }: DashboardProps) => {
  return (
    <section className="screen">
      <Topbar
        eyebrow="Bem-vindo, Diego"
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
        {monthlyMetrics.map((metric) => (
          <article className="glass-card reveal" key={metric.id}>
            <p className="card-label">{metric.label}</p>
            <p className="card-value">
              {metric.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <p className={`card-trend ${metric.trendDirection}`}>{metric.trend}</p>
          </article>
        ))}
      </section>

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Cartoes de credito</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Gerenciar cartoes",
                  description: "Visualize limites e configuracoes.",
                  mode: "view",
                })
              }
            >
              Gerenciar
            </button>
          </div>
          <div className="credit-cards">
            {creditCards.map((card) => (
              <article
                key={card.id}
                className={`credit-card ${card.style !== "default" ? card.style : ""} reveal`}
              >
                <div className="card-chip"></div>
                <p className="credit-number">**** {card.lastDigits}</p>
                <p className="credit-holder">{card.holder}</p>
                <p className="credit-limit">
                  Limite{" "}
                  {card.availableLimit.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Proximos pagamentos</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Todos os pagamentos",
                  description: "Lista completa dos compromissos do mes.",
                  mode: "view",
                })
              }
            >
              Ver todos
            </button>
          </div>
          <ul className="list">
            {bills.map((bill) => (
              <li key={bill.id}>
                <span>{bill.title}</span>
                <span>
                  {bill.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel wide">
          <div className="panel-header">
            <h2>Extrato</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Baixar extrato",
                  description: "Escolha o periodo para exportacao.",
                  mode: "view",
                })
              }
            >
              Baixar
            </button>
          </div>
          <div className="statement">
            {transactions.slice(0, 4).map((transaction) => (
              <div className="statement-row" key={transaction.id}>
                <div>
                  <p className="statement-title">{transaction.title}</p>
                  <p className="statement-sub">
                    {transaction.category} - {transaction.date}
                  </p>
                </div>
                <span className={`statement-amount ${transaction.amount > 0 ? "up" : "down"}`}>
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
            <h2>Metas</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Editar metas",
                  description: "Atualize valores e prazos.",
                  mode: "form",
                  actionLabel: "Salvar metas",
                })
              }
            >
              Editar
            </button>
          </div>
          {goals.map((goal) => (
            <div className="goal" key={goal.id}>
              <div className="goal-row">
                <span>{goal.title}</span>
                <span>
                  R$ {goal.currentAmount.toLocaleString("pt-BR")} /{" "}
                  {goal.targetAmount.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar ${goal.style && goal.style !== "default" ? goal.style : ""}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
