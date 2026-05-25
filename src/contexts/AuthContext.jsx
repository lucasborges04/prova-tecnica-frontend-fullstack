import { createContext, useState } from "react";
import { loginUser } from "../services/authService";

// Cria o contexto
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // Estado para saber se o usuário está logado.
  // Ele inicia verificando se já existe um token salvo no navegador.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("@Prova:jwt");
    return !!token; // Retorna true se tiver token, false se não tiver
  });

  // Função que será chamada pela tela de Login
  async function signIn(email, senha) {
    try {
      const responseData = await loginUser(email, senha);

      // Precisamos pegar o token que a API retornou.
      // Dependendo de como a API deles foi construída, o JWT pode estar em
      // responseData.data.token, responseData.token, etc.
      // Vamos assumir que vem dentro de 'data.token' (padrão comum),
      // mas ajustaremos se necessário quando testarmos.
      const jwtToken = responseData.data?.token || responseData.token;

      if (!jwtToken) {
        throw new Error("Token JWT não encontrado na resposta da API.");
      }

      // 1. Salva o JWT no navegador para não perder o login ao atualizar a página
      localStorage.setItem("@Prova:jwt", jwtToken);

      // 2. Avisa o React que o usuário agora está autenticado
      setIsAuthenticated(true);
    } catch (error) {
      // Se der erro, repassamos para a tela de login mostrar a mensagem
      throw error;
    }
  }

  // Função de logout (já deixamos pronta para o futuro)
  function signOut() {
    localStorage.removeItem("@Prova:jwt");
    setIsAuthenticated(false);
  }

  return (
    // Tudo que colocarmos na propriedade "value" poderá ser acessado por qualquer tela
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
