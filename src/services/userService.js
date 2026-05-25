import api from "./api";

export async function getUserProfile() {
  try {
    const response = await api.get("/api/v1/user/me");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Erro ao carregar os dados do perfil.",
      );
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}
