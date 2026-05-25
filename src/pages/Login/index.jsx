import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Chama a função do Contexto (que faz o serviço e salva o token)
      await signIn(email, senha);

      navigate("/me");
    } catch (err) {
      setError(err.message);
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
      <h2>Login</h2>

      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px", cursor: loading ? "wait" : "pointer" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div
        style={{
          marginTop: "15px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <a href="/register" style={{ fontSize: "14px", color: "#0066cc" }}>
          Não tem conta? Cadastre-se
        </a>
        <a
          href="/forgot-password"
          style={{ fontSize: "14px", color: "#0066cc" }}
        >
          Esqueci minha senha
        </a>
      </div>
    </div>
  );
}
