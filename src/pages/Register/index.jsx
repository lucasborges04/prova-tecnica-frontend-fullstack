import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  // Estados para feedback visual
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Função que atualiza o estado conforme o usuário digita
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Impede a página de recarregar
    setError("");
    setSuccess("");

    if (formData.senha.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      });

      setSuccess(
        "Cadastro realizado com sucesso! Redirecionando para a verificação...",
      );
      setTimeout(() => {
        navigate("/send-code", { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      setError(err.message); // Exibe a mensagem de erro que traduzimos no authService
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
      <h2>Criar Conta</h2>

      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", marginBottom: "10px" }}>{success}</p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px", cursor: loading ? "wait" : "pointer" }}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <a
          href="/login"
          style={{ fontSize: "14px", color: "#0066cc", textDecoration: "none" }}
        >
          Já tenho uma conta
        </a>
      </div>
    </div>
  );
}
