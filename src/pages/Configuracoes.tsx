import { Topbar } from "../components/Topbar";
import { type ModalConfig } from "../app/types";

type ConfiguracoesProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Configuracoes = ({ onOpenModal }: ConfiguracoesProps) => {
  return (
    <section className="screen">
      <Topbar
        eyebrow="Configuracoes"
        title="Preferencias"
        actions={
          <button
            className="pill"
            type="button"
            onClick={() =>
              onOpenModal({
                title: "Salvar preferencias",
                description: "Confirme as alteracoes.",
                mode: "form",
                actionLabel: "Salvar",
              })
            }
          >
            Salvar
          </button>
        }
      />

      <section className="grid">
        <div className="panel wide">
          <div className="panel-header">
            <h2>Perfil</h2>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                onOpenModal({
                  title: "Editar perfil",
                  description: "Atualize seus dados pessoais.",
                  mode: "form",
                  actionLabel: "Salvar perfil",
                })
              }
            >
              Editar
            </button>
          </div>
          <ul className="list">
            <li>
              <span>Nome</span>
              <span>Diego Novello</span>
            </li>
            <li>
              <span>Email</span>
              <span>diego@fluxo.app</span>
            </li>
            <li>
              <span>Telefone</span>
              <span>+55 11 99999-0000</span>
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
                  title: "Gerenciar alertas",
                  description: "Ative ou desative notificacoes.",
                  mode: "view",
                })
              }
            >
              Gerenciar
            </button>
          </div>
          <ul className="list">
            <li>
              <span>Gastos acima de R$ 500</span>
              <span>Ativo</span>
            </li>
            <li>
              <span>Lembrete de fatura</span>
              <span>Ativo</span>
            </li>
            <li>
              <span>Resumo semanal</span>
              <span>Ativo</span>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};
