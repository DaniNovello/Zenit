import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";

type DashboardProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Dashboard = ({ onOpenModal }: DashboardProps) => {
  return (
    <section className="screen">
      <Topbar
        eyebrow="Bem-vindo, Diego"
        title="Visao geral"
        actions={
          <>
            <button
              className="pill"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Novo lancamento",
                  description: "Registre uma nova entrada ou saida.",
                  mode: "form",
                  actionLabel: "Adicionar",
                })
              }
            >
              Novo lancamento
            </button>
            <button
              className="icon-btn"
              aria-label="Notificacoes"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Notificacoes",
                  description: "Alertas recentes do sistema.",
                  mode: "view",
                })
              }
            >
              • • •
            </button>
          </>
        }
      />

      <section className="cards">
        <article className="glass-card reveal">
          <p className="card-label">Entrada do mes</p>
          <p className="card-value">R$ 18.250,00</p>
          <p className="card-trend up">+12% vs ultimo mes</p>
        </article>
        <article className="glass-card reveal">
          <p className="card-label">Saidas do mes</p>
          <p className="card-value">R$ 7.940,00</p>
          <p className="card-trend down">-6% vs ultimo mes</p>
        </article>
        <article className="glass-card reveal">
          <p className="card-label">Economia</p>
          <p className="card-value">R$ 3.500,00</p>
          <p className="card-trend up">Meta 70%</p>
        </article>
      </section>

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Cartoes de credito</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Gerenciar cartoes",
                  description: "Visualize limites e configuracoes.",
                  mode: "view",
                })
              }
            >
              Gerenciar
            </button>
          </div>
          <div className="credit-cards">
            <article className="credit-card reveal">
              <div className="card-chip"></div>
              <p className="credit-number">**** 1289</p>
              <p className="credit-holder">Diego Novello</p>
              <p className="credit-limit">Limite R$ 8.000</p>
            </article>
            <article className="credit-card alt reveal">
              <div className="card-chip"></div>
              <p className="credit-number">**** 6420</p>
              <p className="credit-holder">Fluxo Prime</p>
              <p className="credit-limit">Limite R$ 12.000</p>
            </article>
            <article className="credit-card dark reveal">
              <div className="card-chip"></div>
              <p className="credit-number">**** 2233</p>
              <p className="credit-holder">Business</p>
              <p className="credit-limit">Limite R$ 20.000</p>
            </article>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Proximos pagamentos</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Todos os pagamentos",
                  description: "Lista completa dos compromissos do mes.",
                  mode: "view",
                })
              }
            >
              Ver todos
            </button>
          </div>
          <ul className="list">
            <li>
              <span>Fatura Cartao Fluxo</span>
              <span>R$ 1.240,00</span>
            </li>
            <li>
              <span>Academia</span>
              <span>R$ 149,00</span>
            </li>
            <li>
              <span>Assinaturas</span>
              <span>R$ 89,90</span>
            </li>
            <li>
              <span>Internet</span>
              <span>R$ 119,90</span>
            </li>
          </ul>
        </div>

        <div className="panel wide">
          <div className="panel-header">
            <h2>Extrato</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Baixar extrato",
                  description: "Escolha o periodo para exportacao.",
                  mode: "view",
                })
              }
            >
              Baixar
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
                <p className="statement-title">Delivery</p>
                <p className="statement-sub">Pix - 2 dias</p>
              </div>
              <span className="statement-amount down">- R$ 74,90</span>
            </div>
            <div className="statement-row">
              <div>
                <p className="statement-title">Freelance</p>
                <p className="statement-sub">Entrada - 3 dias</p>
              </div>
              <span className="statement-amount up">+ R$ 980,00</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Metas</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Editar metas",
                  description: "Atualize valores e prazos.",
                  mode: "form",
                  actionLabel: "Salvar metas",
                })
              }
            >
              Editar
            </button>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Reserva</span>
              <span>R$ 7.000 / 10.000</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "70%" }}></div>
            </div>
          </div>
          <div className="goal">
            <div className="goal-row">
              <span>Viagem</span>
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
      </section>
    </section>
  );
};
