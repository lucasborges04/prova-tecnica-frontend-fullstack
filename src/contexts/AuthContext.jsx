import { createContext, useState } from "react";
import { loginUser } from "../services/authService";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // Estado para saber se o usuário está logado.
  // Ele inicia verificando se já existe um token salvo no navegador.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("@Prova:jwt");
    return !!token;
  });

  // Função que será chamada pela tela de Login
  async function signIn(email, senha) {
    try {
      const responseData = await loginUser(email, senha);

      const jwtToken = responseData.data?.token || responseData.token;

      if (!jwtToken) {
        throw new Error("Token JWT não encontrado na resposta da API.");
      }

      // 1. Salva o JWT no navegador para não perder o login ao atualizar a página
      localStorage.setItem("@Prova:jwt", jwtToken);

      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  }

  function signOut() {
    localStorage.removeItem("@Prova:jwt");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
