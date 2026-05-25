import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Adicionado useLocation
import { sendVerificationCode } from "../../services/authService";

export function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation(); // Captura a "bagagem" da rota anterior

  // Se veio um e-mail lá do cadastro, usamos ele como valor inicial do estado
  const emailVindoDoCadastro = location.state?.email || "";

  const [email, setEmail] = useState(emailVindoDoCadastro);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSendCode(e) {
    e.preventDefault();
    if (!email) {
      setError("Por favor, insira o e-mail cadastrado.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await sendVerificationCode(email);

      // Redireciona para a tela de validação passando o e-mail adiante
      navigate("/validate-code", { state: { email } });
    } catch (err) {
      setError(err.message);
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
      <h2>Enviar Código de Verificação</h2>

      {error && <p style={{ color: "red", marginbottom: "15px" }}>{error}</p>}

      <form
        onSubmit={handleSendCode}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label>E-mail cadastrado:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px", cursor: loading ? "wait" : "pointer" }}
        >
          {loading ? "Enviando..." : "Enviar Código para o E-mail"}
        </button>
      </form>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <a href="/validate-code" style={{ fontSize: "14px", color: "#0066cc" }}>
          Já possuo um código
        </a>
      </div>
    </div>
  );
}
