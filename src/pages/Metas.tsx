import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";

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
          <div className="goal">
            <div className="goal-row">
              <span>Reserva de emergencia</span>
              <span>R$ 7.000 / 10.000</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "70%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Viagem internacional</span>
              <span>R$ 2.100 / 4.000</span>
            </div>
            <div className="progress">
              <div className="progress-bar alt" style={{ width: "52%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Novo notebook</span>
              <span>R$ 1.500 / 6.000</span>
            </div>
            <div className="progress">
              <div className="progress-bar soft" style={{ width: "25%" }}></div>
            </div>
          </div>
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
