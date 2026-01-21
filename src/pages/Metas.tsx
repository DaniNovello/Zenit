import { useEffect, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type Goal, type ModalConfig, type PlannedExpense } from "../app/types";
import {
  createGoal,
  createPlannedExpense,
  deleteGoal,
  deletePlannedExpense,
  fetchGoals,
  fetchPlannedExpenses,
  updateGoal,
  updatePlannedExpense,
} from "../services/db";

type MetasProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Metas = ({ onOpenModal }: MetasProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [planned, setPlanned] = useState<PlannedExpense[]>([]);

  const loadGoals = async () => {
    try {
      const goalsData = await fetchGoals();
      setGoals(goalsData);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    }
  };

  const loadPlanned = async () => {
    try {
      const plannedData = await fetchPlannedExpenses();
      setPlanned(plannedData);
    } catch (error) {
      console.error("Erro ao buscar planejamento:", error);
    }
  };

  useEffect(() => {
    loadGoals();
    loadPlanned();
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
                },
                onSuccess: () => {
                  void loadGoals();
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
              <div className="goal-actions">
                <button
                  className="ghost"
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      title: "Editar meta",
                      description: "Atualize os valores da meta.",
                      mode: "form",
                      actionLabel: "Salvar",
                      fields: [
                        {
                          name: "title",
                          label: "Titulo",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "target_amount",
                          label: "Valor da meta",
                          type: "number",
                          required: true,
                        },
                        {
                          name: "current_amount",
                          label: "Valor atual",
                          type: "number",
                          required: true,
                        },
                      ],
                      initialValues: {
                        title: goal.title,
                        target_amount: String(goal.targetAmount),
                        current_amount: String(goal.currentAmount),
                      },
                      onSubmit: async (values) => {
                        await updateGoal({
                          id: goal.id,
                          title: values.title,
                          target_amount: Number(values.target_amount),
                          current_amount: Number(values.current_amount),
                        });
                      },
                      onSuccess: () => {
                        void loadGoals();
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
                      title: "Excluir meta",
                      description: "Confirme a exclusao desta meta.",
                      mode: "form",
                      actionLabel: "Excluir",
                      onSubmit: async () => {
                        await deleteGoal(goal.id);
                      },
                      onSuccess: () => {
                        void loadGoals();
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
        <div className="panel">
          <div className="panel-header">
            <h2>Planejado</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Adicionar planejamento",
                  description: "Inclua um novo item planejado.",
                  mode: "form",
                  actionLabel: "Salvar",
                  fields: [
                    {
                      name: "title",
                      label: "Descricao",
                      type: "text",
                      placeholder: "Casa propria",
                      required: true,
                    },
                    {
                      name: "amount",
                      label: "Valor (mes)",
                      type: "number",
                      placeholder: "1200",
                      required: true,
                    },
                    {
                      name: "frequency",
                      label: "Frequencia",
                      type: "text",
                      placeholder: "mes",
                    },
                  ],
                  onSubmit: async (values) => {
                    await createPlannedExpense({
                      title: values.title,
                      amount: Number(values.amount),
                      frequency: values.frequency || "mes",
                    });
                  },
                  onSuccess: () => {
                    void loadPlanned();
                  },
                })
              }
            >
              Editar
            </button>
          </div>
          <ul className="list">
            {planned.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <span>
                  R$ {item.amount.toLocaleString("pt-BR")} / {item.frequency}
                </span>
              </li>
            ))}
          </ul>
          <div className="goal-actions">
            {planned.map((item) => (
              <div className="inline-actions" key={`${item.id}-actions`}>
                <button
                  className="ghost"
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      title: "Editar planejamento",
                      description: "Atualize o item planejado.",
                      mode: "form",
                      actionLabel: "Salvar",
                      fields: [
                        {
                          name: "title",
                          label: "Descricao",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "amount",
                          label: "Valor (mes)",
                          type: "number",
                          required: true,
                        },
                        {
                          name: "frequency",
                          label: "Frequencia",
                          type: "text",
                        },
                      ],
                      initialValues: {
                        title: item.title,
                        amount: String(item.amount),
                        frequency: item.frequency,
                      },
                      onSubmit: async (values) => {
                        await updatePlannedExpense({
                          id: item.id,
                          title: values.title,
                          amount: Number(values.amount),
                          frequency: values.frequency || "mes",
                        });
                      },
                      onSuccess: () => {
                        void loadPlanned();
                      },
                    })
                  }
                >
                  Editar {item.title}
                </button>
                <button
                  className="ghost"
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      title: "Excluir planejamento",
                      description: "Confirme a exclusao deste item.",
                      mode: "form",
                      actionLabel: "Excluir",
                      onSubmit: async () => {
                        await deletePlannedExpense(item.id);
                      },
                      onSuccess: () => {
                        void loadPlanned();
                      },
                    })
                  }
                >
                  Excluir {item.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
