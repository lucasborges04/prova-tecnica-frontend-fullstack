import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateCode } from "../../services/authService";

export function ValidateCode() {
  const navigate = useNavigate();
  const location = useLocation();

  // Capturamos o e-mail invisível que veio da outra tela
  const emailOculto = location.state?.email;

  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  async function handleValidate(e) {
    e.preventDefault();

    // Trava de segurança: se não tem e-mail oculto, não deixamos prosseguir
    if (!emailOculto) {
      setFeedback({
        type: "error",
        text: "E-mail não identificado. Volte e solicite o código novamente.",
      });
      return;
    }

    if (!codigo) {
      setFeedback({ type: "error", text: "Preencha o código." });
      return;
    }

    try {
      setLoading(true);
      setFeedback({ type: "", text: "" });

      // Enviamos o e-mail oculto e o código digitado para a API, cumprindo a exigência
      await validateCode(emailOculto, codigo);

      setFeedback({
        type: "success",
        text: "E-mail validado com sucesso! Redirecionando para o login...",
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
      <h2>Validar Código</h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
        Insira o código de 6 dígitos enviado para o seu e-mail.
      </p>

      {/* Se não tivermos o e-mail oculto, mostramos um aviso logo de cara */}
      {!emailOculto && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
            marginBottom: "15px",
            borderRadius: "4px",
          }}
        >
          Erro: E-mail não encontrado na sessão.{" "}
          <a href="/verify-email">Clique aqui para voltar</a>.
        </div>
      )}

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

      {/* Escondemos o formulário inteiro caso falte o e-mail oculto */}
      {emailOculto && (
        <form
          onSubmit={handleValidate}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {/* REMOVEMOS COMPLETAMENTE O INPUT DE E-MAIL DAQUI */}
          <div>
            <label>Código de Verificação:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ex: 123456"
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px", cursor: loading ? "wait" : "pointer" }}
          >
            {loading ? "Validando..." : "Confirmar Validação"}
          </button>
        </form>
      )}
    </div>
  );
}
