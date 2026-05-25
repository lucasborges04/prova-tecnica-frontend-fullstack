import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      `Bearer ${import.meta.env.VITE_API_TOKEN}`;

    const jwtToken = localStorage.getItem("@Prova:jwt");
    if (jwtToken) {
      config.headers["X-Access-Token"] = jwtToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
