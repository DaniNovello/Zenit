import { type ModalConfig } from "../app/types";

type ModalProps = {
  config: ModalConfig;
  onClose: () => void;
};

export const Modal = ({ config, onClose }: ModalProps) => {
  const isForm = config.mode === "form";

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <h2 id="modal-title">{config.title}</h2>
            {config.description ? (
              <p className="modal-description">{config.description}</p>
            ) : null}
          </div>
          <button className="modal-close" type="button" onClick={onClose}>
            ×
          </button>
        </header>

        <div className="modal-body">
          {isForm ? (
            <form className="modal-form">
              <label className="modal-field">
                <span>Descricao</span>
                <input type="text" placeholder="Ex: Mercado Central" />
              </label>
              <label className="modal-field">
                <span>Valor</span>
                <input type="number" placeholder="R$ 0,00" />
              </label>
              <label className="modal-field">
                <span>Categoria</span>
                <input type="text" placeholder="Alimentacao" />
              </label>
              <label className="modal-field">
                <span>Data</span>
                <input type="date" />
              </label>
            </form>
          ) : (
            <div className="modal-content">
              <p>
                Conteudo de exemplo. Aqui voce podera listar registros, detalhes
                ou graficos vindos do banco de dados.
              </p>
              <ul className="modal-list">
                <li>Registro 1 - R$ 320,40</li>
                <li>Registro 2 - R$ 1.240,00</li>
                <li>Registro 3 - R$ 89,90</li>
              </ul>
            </div>
          )}
        </div>

        <footer className="modal-actions">
          <button className="ghost" type="button" onClick={onClose}>
            Fechar
          </button>
          {isForm ? (
            <button className="pill" type="button">
              {config.actionLabel ?? "Salvar"}
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
};
