import api from "./api";

export async function checkApiHealth() {
  try {
    const response = await api.get("/health");

    console.log("API Health Check Sucesso:", response.data);

    return response.data;
  } catch (error) {
    console.error("API Health Check Erro:", error);
    throw error;
  }
}
