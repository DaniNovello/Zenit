import { useMemo, useState } from "react";
import { type ModalConfig, type ModalField } from "../app/types";

type ModalProps = {
  config: ModalConfig;
  onClose: () => void;
};

export const Modal = ({ config, onClose }: ModalProps) => {
  const isForm = config.mode === "form";
  const fields = config.fields ?? [];

  const initialValues = useMemo(() => {
    const values: Record<string, string> = {};
    fields.forEach((field) => {
      values[field.name] = config.initialValues?.[field.name] ?? "";
    });
    return values;
  }, [fields, config.initialValues]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: ModalField, value: string) => {
    setValues((prev) => ({ ...prev, [field.name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!config.onSubmit) {
      onClose();
      return;
    }
    try {
      setSubmitting(true);
      await config.onSubmit(values);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

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
            x
          </button>
        </header>

        <div className="modal-body">
          {isForm ? (
            <form className="modal-form" id="modal-form" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <label className="modal-field" key={field.name}>
                  <span>{field.label}</span>
                  {field.type === "select" ? (
                    <select
                      value={values[field.name] ?? ""}
                      onChange={(event) =>
                        handleChange(field, event.target.value)
                      }
                      required={field.required}
                    >
                      <option value="">Selecione</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={values[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        handleChange(field, event.target.value)
                      }
                      rows={3}
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={values[field.name] ?? ""}
                      onChange={(event) =>
                        handleChange(field, event.target.value)
                      }
                      required={field.required}
                    />
                  )}
                </label>
              ))}
            </form>
          ) : (
            <div className="modal-content">
              {config.content ?? (
                <p>
                  Conteudo de exemplo. Aqui voce podera listar registros,
                  detalhes ou graficos vindos do banco de dados.
                </p>
              )}
            </div>
          )}
        </div>

        <footer className="modal-actions">
          <button className="ghost" type="button" onClick={onClose}>
            Fechar
          </button>
          {isForm ? (
            <button
              className="pill"
              type="submit"
              form="modal-form"
              disabled={submitting}
            >
              {submitting ? "Salvando..." : config.actionLabel ?? "Salvar"}
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
};
