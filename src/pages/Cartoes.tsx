import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";
import { alerts, creditCards, invoices } from "../app/mocks";

type CartoesProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Cartoes = ({ onOpenModal }: CartoesProps) => {
  return (
    <section className="screen">
      <Topbar
        eyebrow="Cartoes"
        title="Seus cartoes"
        actions={
          <button
            className="pill"
            type="button"
            onClick={() =>
              onOpenModal({
                title: "Adicionar cartao",
                description: "Informe os dados do novo cartao.",
                mode: "form",
                actionLabel: "Salvar cartao",
              })
            }
          >
            Adicionar cartao
          </button>
        }
      />

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Principais cartoes</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Limites dos cartoes",
                  description: "Revise limites e consumos atuais.",
                  mode: "view",
                })
              }
            >
              Limites
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
                  Disponivel{" "}
                  {card.availableLimit.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Faturas abertas</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Detalhes das faturas",
                  description: "Faturas abertas e vencimentos.",
                  mode: "view",
                })
              }
            >
              Detalhar
            </button>
          </div>
          <ul className="list">
            {invoices.map((invoice) => (
              <li key={invoice.id}>
                <span>{invoice.cardName}</span>
                <span>
                  {invoice.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Alertas</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Ajustar alertas",
                  description: "Defina regras e limites.",
                  mode: "form",
                  actionLabel: "Salvar alertas",
                })
              }
            >
              Ajustar
            </button>
          </div>
          {alerts.map((alert) => (
            <div className="goal" key={alert.id}>
              <div className="goal-row">
                <span>{alert.title}</span>
                <span>{alert.value}</span>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar ${alert.style === "soft" ? "soft" : ""}`}
                  style={{ width: `${alert.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
