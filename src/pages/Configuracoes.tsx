import { useEffect, useState } from "react";
import { Topbar } from "../components/Topbar";
import { type ModalConfig, type Profile } from "../app/types";
import { fetchProfile, updateProfile } from "../services/db";
import { supabase } from "../services/supabase";

type ConfiguracoesProps = {
  onOpenModal: (config: ModalConfig) => void;
};

export const Configuracoes = ({ onOpenModal }: ConfiguracoesProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadProfile = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      return;
    }
    try {
      const profileData = await fetchProfile(data.user.id);
      setProfile(profileData);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

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
                fields: [
                  {
                    name: "name",
                    label: "Nome",
                    type: "text",
                    placeholder: "Diego Novello",
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "text",
                    placeholder: "voce@email.com",
                  },
                ],
                initialValues: {
                  name: profile?.name ?? "",
                  email: profile?.email ?? "",
                },
                onSubmit: async (values) => {
                  if (!profile) {
                    return;
                  }
                  await updateProfile({
                    id: profile.id,
                    name: values.name,
                    email: values.email,
                  });
                  await loadProfile();
                },
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
                  fields: [
                    {
                      name: "name",
                      label: "Nome",
                      type: "text",
                      placeholder: "Diego Novello",
                      required: true,
                    },
                    {
                      name: "email",
                      label: "Email",
                      type: "text",
                      placeholder: "voce@email.com",
                      required: true,
                    },
                  ],
                  initialValues: {
                    name: profile?.name ?? "",
                    email: profile?.email ?? "",
                  },
                  onSubmit: async (values) => {
                    if (!profile) {
                      return;
                    }
                    await updateProfile({
                      id: profile.id,
                      name: values.name,
                      email: values.email,
                    });
                    await loadProfile();
                  },
                })
              }
            >
              Editar
            </button>
          </div>
          <ul className="list">
            <li>
              <span>Nome</span>
              <span>{profile?.name ?? "-"}</span>
            </li>
            <li>
              <span>Email</span>
              <span>{profile?.email ?? "-"}</span>
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
                  content: (
                    <ul className="modal-list">
                      <li>Gastos acima de R$ 500 - Ativo</li>
                      <li>Lembrete de fatura - Ativo</li>
                      <li>Resumo semanal - Ativo</li>
                    </ul>
                  ),
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
