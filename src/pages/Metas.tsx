import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";
import { goals, plannedExpenses } from "../app/mocks";

type MetasProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Metas = ({ onOpenModal }: MetasProps) => {
  return (
    <section className="screen">
      <Topbar
        eyebrow="Metas"
        title="Planejamento"
        actions={
          <button
            className="pill"
            type="button"
            onClick={() =>
              onOpenModal({
                title: "Nova meta",
                description: "Defina um objetivo financeiro.",
                mode: "form",
                actionLabel: "Criar meta",
              })
            }
          >
            Nova meta
          </button>
        }
      />

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Metas em andamento</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Prioridades",
                  description: "Reordene metas e pesos.",
                  mode: "view",
                })
              }
            >
              Prioridades
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
        <div className="panel">
          <div className="panel-header">
            <h2>Planejado</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Editar planejamento",
                  description: "Atualize valores planejados.",
                  mode: "form",
                  actionLabel: "Salvar planejamento",
                })
              }
            >
              Editar
            </button>
          </div>
          <ul className="list">
            {plannedExpenses.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <span>
                  R$ {item.amount.toLocaleString("pt-BR")} / {item.frequency}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};
