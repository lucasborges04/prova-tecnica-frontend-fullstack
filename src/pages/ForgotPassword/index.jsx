import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  requestPasswordReset,
  resetPassword,
} from "../../services/authService";

export function ForgotPassword() {
  const navigate = useNavigate();

  // Controle de qual etapa do formulário estamos (1: Pedir E-mail, 2: Digitar Código e Nova Senha)
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Função da Etapa 1
  async function handleRequestCode(e) {
    e.preventDefault();
    if (!email) {
      setFeedback({ type: "error", text: "Informe seu e-mail." });
      return;
    }

    try {
      setLoading(true);
      setFeedback({ type: "", text: "" });
      await requestPasswordReset(email);
      setFeedback({
        type: "success",
        text: "Código enviado! Verifique seu e-mail.",
      });
      setStep(2);
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    if (senha.length < 8) {
      setFeedback({
        type: "error",
        text: "A nova senha deve ter no mínimo 8 caracteres.",
      });
      return;
    }

    try {
      setLoading(true);
      setFeedback({ type: "", text: "" });
      await resetPassword(email, codigo, senha);
      setFeedback({
        type: "success",
        text: "Senha alterada com sucesso! Redirecionando...",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <h2>Recuperar Senha</h2>

      {feedback.text && (
        <p
          style={{
            color: feedback.type === "error" ? "red" : "green",
            marginBottom: "15px",
          }}
        >
          {feedback.text}
        </p>
      )}

      {step === 1 && (
        <form
          onSubmit={handleRequestCode}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div>
            <label>E-mail da conta:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: "10px" }}>
            {loading ? "Enviando..." : "Enviar código de recuperação"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleResetPassword}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              disabled
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                backgroundColor: "#f0f0f0",
              }}
            />
          </div>
          <div>
            <label>Código recebido:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: "10px" }}>
            {loading ? "Alterando..." : "Redefinir Senha"}
          </button>
        </form>
      )}

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <a href="/login" style={{ fontSize: "14px", color: "#0066cc" }}>
          Voltar para o Login
        </a>
      </div>
    </div>
  );
}
