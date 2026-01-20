import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";

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
            <article className="credit-card reveal">
              <div className="card-chip"></div>
              <p className="credit-number">**** 1289</p>
              <p className="credit-holder">Diego Novello</p>
              <p className="credit-limit">Disponivel R$ 4.680</p>
            </article>
            <article className="credit-card alt reveal">
              <div className="card-chip"></div>
              <p className="credit-number">**** 6420</p>
              <p className="credit-holder">Fluxo Prime</p>
              <p className="credit-limit">Disponivel R$ 7.200</p>
            </article>
            <article className="credit-card dark reveal">
              <div className="card-chip"></div>
              <p className="credit-number">**** 2233</p>
              <p className="credit-holder">Business</p>
              <p className="credit-limit">Disponivel R$ 12.500</p>
            </article>
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
            <li>
              <span>Fluxo Prime</span>
              <span>R$ 1.240,00</span>
            </li>
            <li>
              <span>Business</span>
              <span>R$ 2.890,00</span>
            </li>
            <li>
              <span>Cartao pessoal</span>
              <span>R$ 890,00</span>
            </li>
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
          <div className="goal">
            <div className="goal-row">
              <span>Uso do limite</span>
              <span>62%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "62%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Assinaturas</span>
              <span>R$ 210</span>
            </div>
            <div className="progress">
              <div className="progress-bar soft" style={{ width: "40%" }}></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
