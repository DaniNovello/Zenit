import { useEffect, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";
import {
  deleteInvestmentAllocation,
  deleteInvestmentReturn,
  fetchInvestmentAllocations,
  fetchInvestmentReturns,
  upsertInvestmentAllocation,
  upsertInvestmentReturn,
} from "../services/db";

type InvestimentosProps = {
  onOpenModal: (config: ModalConfig) => void;
};

type Allocation = {
  id: string;
  label: string;
  percent: number;
  style?: "default" | "alt" | "soft";
};

type InvestmentReturn = {
  id: string;
  label: string;
  percent: number;
  style?: "default" | "alt" | "soft";
};

export const Investimentos = ({ onOpenModal }: InvestimentosProps) => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [returns, setReturns] = useState<InvestmentReturn[]>([]);

  const loadData = async () => {
    try {
      const [allocationsData, returnsData] = await Promise.all([
        fetchInvestmentAllocations(),
        fetchInvestmentReturns(),
      ]);
      setAllocations(allocationsData);
      setReturns(returnsData);
    } catch (error) {
      console.error("Erro ao buscar investimentos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="screen">
      <Topbar
        eyebrow="Investimentos"
        title="Carteira"
        actions={
          <button
            className="pill"
            type="button"
            onClick={() =>
              onOpenModal({
                title: "Novo aporte",
                description: "Registre um novo investimento.",
                mode: "form",
                actionLabel: "Adicionar aporte",
                fields: [
                  {
                    name: "label",
                    label: "Descricao",
                    type: "text",
                    placeholder: "Aporte mensal",
                    required: true,
                  },
                  {
                    name: "percent",
                    label: "Percentual",
                    type: "number",
                    placeholder: "10",
                    required: true,
                  },
                  {
                    name: "style",
                    label: "Estilo",
                    type: "select",
                    options: [
                      { label: "Padrao", value: "default" },
                      { label: "Dourado", value: "alt" },
                      { label: "Azul", value: "soft" },
                    ],
                  },
                ],
                onSubmit: async (values) => {
                  await upsertInvestmentAllocation({
                    id: undefined,
                    label: values.label,
                    percent: Number(values.percent),
                    style: values.style as "default" | "alt" | "soft",
                  });
                },
                onSuccess: () => {
                  void loadData();
                },
              })
            }
          >
            Novo aporte
          </button>
        }
      />

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Distribuicao</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Comparar carteira",
                  description: "Comparativo entre periodos.",
                  mode: "view",
                  content: (
                    <ul className="modal-list">
                      <li>Ultimos 6 meses: +7,4%</li>
                      <li>Ultimos 12 meses: +14,2%</li>
                      <li>Ultimos 24 meses: +22,9%</li>
                    </ul>
                  ),
                })
              }
            >
              Comparar
            </button>
          </div>
          {allocations.map((item) => (
            <div className="goal" key={item.id}>
              <div className="goal-row">
                <span>{item.label}</span>
                <span>{item.percent}%</span>
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
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
              <div className="inline-actions">
                <button
                  className="ghost"
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      title: "Editar distribuicao",
                      description: "Atualize o percentual.",
                      mode: "form",
                      actionLabel: "Salvar",
                      fields: [
                        {
                          name: "label",
                          label: "Descricao",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "percent",
                          label: "Percentual",
                          type: "number",
                          required: true,
                        },
                        {
                          name: "style",
                          label: "Estilo",
                          type: "select",
                          options: [
                            { label: "Padrao", value: "default" },
                            { label: "Dourado", value: "alt" },
                            { label: "Azul", value: "soft" },
                          ],
                        },
                      ],
                      initialValues: {
                        label: item.label,
                        percent: String(item.percent),
                        style: item.style ?? "default",
                      },
                      onSubmit: async (values) => {
                        await upsertInvestmentAllocation({
                          id: item.id,
                          label: values.label,
                          percent: Number(values.percent),
                          style: values.style as "default" | "alt" | "soft",
                        });
                      },
                      onSuccess: () => {
                        void loadData();
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
                      title: "Excluir distribuicao",
                      description: "Confirme a exclusao.",
                      mode: "form",
                      actionLabel: "Excluir",
                      onSubmit: async () => {
                        await deleteInvestmentAllocation(item.id);
                      },
                      onSuccess: () => {
                        void loadData();
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
            <h2>Rentabilidade</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Periodo da rentabilidade",
                  description: "Selecione o intervalo desejado.",
                  mode: "view",
                  content: (
                    <ul className="modal-list">
                      <li>30 dias</li>
                      <li>6 meses</li>
                      <li>12 meses</li>
                    </ul>
                  ),
                })
              }
            >
              Periodo
            </button>
          </div>
          {returns.map((item) => (
            <div className="goal" key={item.id}>
              <div className="goal-row">
                <span>{item.label}</span>
                <span className="statement-amount up">+ {item.percent}%</span>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar ${
                    item.style === "soft" ? "soft" : ""
                  }`}
                  style={{ width: `${Math.min(100, item.percent)}%` }}
                ></div>
              </div>
              <div className="inline-actions">
                <button
                  className="ghost"
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      title: "Editar rentabilidade",
                      description: "Atualize o percentual.",
                      mode: "form",
                      actionLabel: "Salvar",
                      fields: [
                        {
                          name: "label",
                          label: "Periodo",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "percent",
                          label: "Percentual",
                          type: "number",
                          required: true,
                        },
                      ],
                      initialValues: {
                        label: item.label,
                        percent: String(item.percent),
                      },
                      onSubmit: async (values) => {
                        await upsertInvestmentReturn({
                          id: item.id,
                          label: values.label,
                          percent: Number(values.percent),
                          style: item.style,
                        });
                      },
                      onSuccess: () => {
                        void loadData();
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
                      title: "Excluir rentabilidade",
                      description: "Confirme a exclusao.",
                      mode: "form",
                      actionLabel: "Excluir",
                      onSubmit: async () => {
                        await deleteInvestmentReturn(item.id);
                      },
                      onSuccess: () => {
                        void loadData();
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
      </section>
    </section>
  );
};
