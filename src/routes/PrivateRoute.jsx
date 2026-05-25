import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // Se não estiver logado, o React Router redireciona o usuário para o /login imediatamente
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Se estiver logado, ele renderiza o componente filho (neste caso, a tela de Perfil)
  return children;
}
