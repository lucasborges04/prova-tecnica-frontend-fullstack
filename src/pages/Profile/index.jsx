import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserProfile } from "../../services/userService";

export function Profile() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // O useEffect busca os dados assim que a tela abre
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();

        // Vamos guardar os dados do usuário. Ajuste "data.data" dependendo de
        // como a API envia a resposta exata (ex: response.data.data.nome)
        setUserData(data.data || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Função para lidar com o clique no botão "Sair"
  function handleLogout() {
    signOut(); // Limpa o localStorage e o estado de autenticação
    navigate("/login"); // Manda de volta pro login
  }

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Carregando perfil...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ textAlign: "center", color: "red", marginTop: "50px" }}>
        {error}
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <h2>Meu Perfil</h2>
      <hr style={{ margin: "15px 0" }} />

      {userData && (
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>Nome:</strong> {userData.nome || userData.name}
          </p>
          <p>
            <strong>E-mail:</strong> {userData.email}
          </p>
          <p>
            <strong>ID:</strong> {userData.id || "Não informado"}
          </p>
        </div>
      )}

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Sair da Conta
      </button>
    </div>
  );
}
