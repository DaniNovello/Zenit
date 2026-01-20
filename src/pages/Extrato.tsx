import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";

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
            <div className="statement-row">
              <div>
                <p className="statement-title">Mercado Central</p>
                <p className="statement-sub">Cartao - Hoje</p>
              </div>
              <span className="statement-amount down">- R$ 320,40</span>
            </div>
            <div className="statement-row">
              <div>
                <p className="statement-title">Salario</p>
                <p className="statement-sub">Entrada - Ontem</p>
              </div>
              <span className="statement-amount up">+ R$ 4.200,00</span>
            </div>
            <div className="statement-row">
              <div>
                <p className="statement-title">Restaurante</p>
                <p className="statement-sub">Pix - 2 dias</p>
              </div>
              <span className="statement-amount down">- R$ 210,00</span>
            </div>
            <div className="statement-row">
              <div>
                <p className="statement-title">Freelance</p>
                <p className="statement-sub">Entrada - 3 dias</p>
              </div>
              <span className="statement-amount up">+ R$ 980,00</span>
            </div>
            <div className="statement-row">
              <div>
                <p className="statement-title">Uber</p>
                <p className="statement-sub">Cartao - 4 dias</p>
              </div>
              <span className="statement-amount down">- R$ 38,90</span>
            </div>
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
          <div className="goal">
            <div className="goal-row">
              <span>Entradas</span>
              <span>R$ 12.880</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "82%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Saidas</span>
              <span>R$ 7.200</span>
            </div>
            <div className="progress">
              <div className="progress-bar alt" style={{ width: "58%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Economia</span>
              <span>R$ 5.680</span>
            </div>
            <div className="progress">
              <div className="progress-bar soft" style={{ width: "64%" }}></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
