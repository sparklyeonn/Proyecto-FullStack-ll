// src/services/http.js
import axios from "axios";
import { TOKEN_KEY } from "./authService"; // TOKEN_KEY = "ritmolab_token"

export const api = axios.create({
  baseURL: "http://18.206.208.70:8080",
  timeout: 20000,
});

// Agrega automáticamente Authorization: Bearer <token> a cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && token !== "null" && token !== "undefined") {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Log útil para depurar 401/403
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      console.warn("API auth error:", status, err?.response?.data);
    }
    return Promise.reject(err);
  }
);
