import { useEffect, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type Goal, type ModalConfig } from "../app/types";
import { createGoal, fetchGoals } from "../services/db";

type MetasProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Metas = ({ onOpenModal }: MetasProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const loadGoals = async () => {
    try {
      const goalsData = await fetchGoals();
      setGoals(goalsData);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

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
                fields: [
                  {
                    name: "title",
                    label: "Titulo",
                    type: "text",
                    placeholder: "Reserva",
                    required: true,
                  },
                  {
                    name: "target_amount",
                    label: "Valor da meta",
                    type: "number",
                    placeholder: "10000",
                    required: true,
                  },
                  {
                    name: "current_amount",
                    label: "Valor atual",
                    type: "number",
                    placeholder: "0",
                    required: true,
                  },
                ],
                onSubmit: async (values) => {
                  await createGoal({
                    title: values.title,
                    target_amount: Number(values.target_amount),
                    current_amount: Number(values.current_amount),
                  });
                  await loadGoals();
                },
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
                  content: (
                    <ul className="modal-list">
                      {goals.map((goal) => (
                        <li key={goal.id}>{goal.title}</li>
                      ))}
                    </ul>
                  ),
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
                  fields: [
                    {
                      name: "casa",
                      label: "Casa propria (mes)",
                      type: "number",
                      placeholder: "1200",
                    },
                    {
                      name: "carro",
                      label: "Carro (mes)",
                      type: "number",
                      placeholder: "900",
                    },
                    {
                      name: "curso",
                      label: "Curso (mes)",
                      type: "number",
                      placeholder: "350",
                    },
                  ],
                })
              }
            >
              Editar
            </button>
          </div>
          <ul className="list">
            <li>
              <span>Casa propria</span>
              <span>R$ 1.200 / mes</span>
            </li>
            <li>
              <span>Carro</span>
              <span>R$ 900 / mes</span>
            </li>
            <li>
              <span>Curso</span>
              <span>R$ 350 / mes</span>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};
