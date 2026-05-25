import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { checkApiHealth } from "../services/healthService";
import { Register } from "../pages/Register";
import { VerifyEmail } from "../pages/VerifyEmail";
import { ValidateCode } from "../pages/ValidateCode";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { PrivateRoute } from "./PrivateRoute";
import { ForgotPassword } from "../pages/ForgotPassword";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 style={{ color: "#333" }}>404 - Página não encontrada</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        A URL que você tentou acessar não existe.
      </p>
      <a
        href="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#0066cc",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Voltar para o Início
      </a>
    </div>
  );
}

function Home() {
  useEffect(() => {
    checkApiHealth();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Prova tecnica - API Carsten</h1>
      <p>Cadastre-se ou faça login para acessar</p>
      <a href="/login" style={{ marginRight: "15px" }}>
        Ir para Login
      </a>
      <a href="/register" style={{ marginRight: "15px" }}>
        Ir para Cadastro
      </a>
    </div>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send-code" element={<VerifyEmail />} />
        <Route path="/validate-code" element={<ValidateCode />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/me"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
