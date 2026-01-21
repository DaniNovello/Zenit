import { useEffect, useMemo, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type CreditCard, type ModalConfig, type Transaction } from "../app/types";
import {
  createCreditCard,
  deleteCreditCard,
  fetchAlertSettings,
  fetchCreditCards,
  fetchTransactions,
  updateCreditCard,
  upsertAlertSettings,
} from "../services/db";

type CartoesProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Cartoes = ({ onOpenModal }: CartoesProps) => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [alertSettings, setAlertSettings] = useState({
    limitPercent: 70,
    subscriptionsBudget: 210,
  });

  const loadData = async () => {
    try {
      const [cardsData, transactionsData, alertData] = await Promise.all([
        fetchCreditCards(),
        fetchTransactions(),
        fetchAlertSettings(),
      ]);
      setCards(cardsData);
      setTransactions(transactionsData);
      setAlertSettings(alertData);
    } catch (error) {
      console.error("Erro ao buscar cartoes:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const invoices = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .slice(0, 3);
  }, [transactions]);

  const usedLimitPercent = useMemo(() => {
    const totalLimit = cards.reduce((acc, card) => acc + card.limitAmount, 0);
    const totalAvailable = cards.reduce(
      (acc, card) => acc + card.availableAmount,
      0,
    );
    if (!totalLimit) return 0;
    return Math.round(((totalLimit - totalAvailable) / totalLimit) * 100);
  }, [cards]);

  const subscriptionsTotal = useMemo(() => {
    return transactions
      .filter((transaction) =>
        (transaction.category ?? "").toLowerCase().includes("assin"),
      )
      .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);
  }, [transactions]);

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
                fields: [
                  {
                    name: "name",
                    label: "Nome",
                    type: "text",
                    placeholder: "Fluxo Prime",
                    required: true,
                  },
                  {
                    name: "holder_name",
                    label: "Titular",
                    type: "text",
                    placeholder: "Diego Novello",
                    required: true,
                  },
                  {
                    name: "last_digits",
                    label: "Ultimos digitos",
                    type: "text",
                    placeholder: "1289",
                    required: true,
                  },
                  {
                    name: "limit_amount",
                    label: "Limite total",
                    type: "number",
                    placeholder: "8000",
                    required: true,
                  },
                  {
                    name: "available_amount",
                    label: "Limite disponivel",
                    type: "number",
                    placeholder: "4680",
                    required: true,
                  },
                  {
                    name: "style",
                    label: "Estilo",
                    type: "select",
                    options: [
                      { label: "Padrao", value: "default" },
                      { label: "Dourado", value: "alt" },
                      { label: "Escuro", value: "dark" },
                    ],
                  },
                ],
                onSubmit: async (values) => {
                  await createCreditCard({
                    name: values.name,
                    holder_name: values.holder_name,
                    last_digits: values.last_digits,
                    limit_amount: Number(values.limit_amount),
                    available_amount: Number(values.available_amount),
                    style: values.style as "default" | "alt" | "dark",
                  });
                },
                onSuccess: () => {
                  void loadData();
                },
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
                  content: (
                    <ul className="modal-list">
                      {cards.map((card) => (
                        <li key={card.id}>
                          {card.name} -{" "}
                          {card.availableAmount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </li>
                      ))}
                    </ul>
                  ),
                })
              }
            >
              Limites
            </button>
          </div>
          <div className="credit-cards">
            {cards.map((card) => (
              <article
                key={card.id}
                className={`credit-card ${card.style !== "default" ? card.style : ""} reveal`}
              >
                <div className="card-chip"></div>
                <p className="credit-number">**** {card.lastDigits}</p>
                <p className="credit-holder">{card.holderName}</p>
                <p className="credit-limit">
                  Disponivel{" "}
                  {card.availableAmount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <div className="card-actions">
                  <button
                    className="ghost"
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        title: "Editar cartao",
                        description: "Atualize os dados do cartao.",
                        mode: "form",
                        actionLabel: "Salvar",
                        fields: [
                          {
                            name: "name",
                            label: "Nome",
                            type: "text",
                            required: true,
                          },
                          {
                            name: "holder_name",
                            label: "Titular",
                            type: "text",
                            required: true,
                          },
                          {
                            name: "last_digits",
                            label: "Ultimos digitos",
                            type: "text",
                            required: true,
                          },
                          {
                            name: "limit_amount",
                            label: "Limite total",
                            type: "number",
                            required: true,
                          },
                          {
                            name: "available_amount",
                            label: "Limite disponivel",
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
                              { label: "Escuro", value: "dark" },
                            ],
                          },
                        ],
                        initialValues: {
                          name: card.name,
                          holder_name: card.holderName,
                          last_digits: card.lastDigits,
                          limit_amount: String(card.limitAmount),
                          available_amount: String(card.availableAmount),
                          style: card.style,
                        },
                        onSubmit: async (values) => {
                          await updateCreditCard({
                            id: card.id,
                            name: values.name,
                            holder_name: values.holder_name,
                            last_digits: values.last_digits,
                            limit_amount: Number(values.limit_amount),
                            available_amount: Number(values.available_amount),
                            style: values.style as "default" | "alt" | "dark",
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
                        title: "Excluir cartao",
                        description: "Confirme a exclusao deste cartao.",
                        mode: "form",
                        actionLabel: "Excluir",
                        onSubmit: async () => {
                          await deleteCreditCard(card.id);
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
                  content: (
                    <ul className="modal-list">
                      {invoices.map((invoice) => (
                        <li key={invoice.id}>
                          {invoice.description} -{" "}
                          {Math.abs(invoice.amount).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </li>
                      ))}
                    </ul>
                  ),
                })
              }
            >
              Detalhar
            </button>
          </div>
          <ul className="list">
            {invoices.map((invoice) => (
              <li key={invoice.id}>
                <span>{invoice.description}</span>
                <span>
                  {Math.abs(invoice.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
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
                  fields: [
                    {
                      name: "limite",
                      label: "Uso do limite (%)",
                      type: "number",
                      placeholder: "80",
                    },
                    {
                      name: "assinaturas",
                      label: "Assinaturas (R$)",
                      type: "number",
                      placeholder: "210",
                    },
                  ],
                  initialValues: {
                    limite: String(alertSettings.limitPercent),
                    assinaturas: String(alertSettings.subscriptionsBudget),
                  },
                  onSubmit: async (values) => {
                    const updated = {
                      limitPercent: Number(values.limite),
                      subscriptionsBudget: Number(values.assinaturas),
                    };
                    await upsertAlertSettings(updated);
                    setAlertSettings(updated);
                  },
                })
              }
            >
              Ajustar
            </button>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Uso do limite</span>
              <span>{cards.length ? `${usedLimitPercent}%` : "--"}</span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${usedLimitPercent}%` }}
              ></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Assinaturas</span>
              <span>
                {subscriptionsTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="progress">
              <div
                className="progress-bar soft"
                style={{
                  width: `${Math.min(
                    100,
                    alertSettings.subscriptionsBudget
                      ? (subscriptionsTotal /
                          alertSettings.subscriptionsBudget) *
                          100
                      : 0,
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
