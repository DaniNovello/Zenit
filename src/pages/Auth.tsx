import { useState } from "react";
import { supabase } from "../services/supabase";

type AuthMode = "login" | "signup";

export const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          throw signInError;
        }
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          throw signUpError;
        }
        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            name,
            email,
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">Fluxo</p>
          <h1>{mode === "login" ? "Entrar" : "Criar conta"}</h1>
          <p className="auth-subtitle">
            {mode === "login"
              ? "Acesse seu gestor financeiro."
              : "Crie sua conta para comecar."}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" ? (
            <label className="modal-field">
              <span>Nome</span>
              <input
                type="text"
                placeholder="Diego Novello"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          ) : null}
          <label className="modal-field">
            <span>Email</span>
            <input
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="modal-field">
            <span>Senha</span>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="pill auth-submit" type="submit" disabled={loading}>
            {loading
              ? "Aguarde..."
              : mode === "login"
              ? "Entrar"
              : "Criar conta"}
          </button>
        </form>

        <button
          className="auth-toggle"
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "Nao tem conta? Criar agora"
            : "Ja tem conta? Fazer login"}
        </button>
      </div>
    </div>
  );
};
