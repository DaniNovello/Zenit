import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";
import { extratoSummary, transactions } from "../app/mocks";

type ExtratoProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Extrato = ({ onOpenModal }: ExtratoProps) => {
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
              ⇩
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
          {extratoSummary.map((item) => (
            <div className="goal" key={item.id}>
              <div className="goal-row">
                <span>{item.title}</span>
                <span>{item.value}</span>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar ${item.style === "alt" ? "alt" : item.style === "soft" ? "soft" : ""}`}
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
