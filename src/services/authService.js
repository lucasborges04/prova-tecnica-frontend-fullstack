import api from "./api";

export async function registerUser(userData) {
  try {
    const response = await api.post("/api/v1/auth/register", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 409) {
        throw new Error("Este e-mail já está em uso. Tente outro.");
      }
      if (status === 422) {
        throw new Error(
          "Dados inválidos. Verifique se a senha tem no mínimo 8 caracteres.",
        );
      }

      throw new Error(
        error.response.data?.message || "Erro desconhecido ao cadastrar.",
      );
    }

    throw new Error("Erro de conexão com o servidor.");
  }
}

export async function sendVerificationCode(email) {
  try {
    const response = await api.post("/api/v1/auth/send-code", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Erro ao enviar o código de verificação.",
      );
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}

export async function validateCode(email, codigo) {
  try {
    const response = await api.post("/api/v1/auth/validate-code", {
      email,
      codigo,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Código inválido ou expirado.",
      );
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}

export async function loginUser(email, senha) {
  try {
    const response = await api.post("/api/v1/auth/login", { email, senha });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 404) {
        throw new Error("E-mail ou senha incorretos.");
      }
      throw new Error(
        error.response.data?.message || "Erro ao realizar login.",
      );
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}

export async function requestPasswordReset(email) {
  try {
    const response = await api.post("/api/v1/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Erro ao solicitar redefinição de senha.",
      );
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}

export async function resetPassword(email, codigo, senha) {
  try {
    const response = await api.post("/api/v1/auth/reset-password", {
      email,
      codigo,
      senha,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Erro ao redefinir a senha. Verifique o código.",
      );
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}
