import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";

type InvestimentosProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Investimentos = ({ onOpenModal }: InvestimentosProps) => {
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
                })
              }
            >
              Comparar
            </button>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Renda fixa</span>
              <span>45%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Fundos imobiliarios</span>
              <span>28%</span>
            </div>
            <div className="progress">
              <div className="progress-bar alt" style={{ width: "28%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Acoes</span>
              <span>27%</span>
            </div>
            <div className="progress">
              <div className="progress-bar soft" style={{ width: "27%" }}></div>
            </div>
          </div>
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
                })
              }
            >
              Periodo
            </button>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>12 meses</span>
              <span className="statement-amount up">+ 14,2%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "72%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>24 meses</span>
              <span className="statement-amount up">+ 22,9%</span>
            </div>
            <div className="progress">
              <div className="progress-bar soft" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
