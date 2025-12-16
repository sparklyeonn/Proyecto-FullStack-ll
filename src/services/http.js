// src/services/http.js
import axios from "axios";

function getTokenFromStorage() {
  // Keys directas comunes
  const directKeys = ["token", "jwt", "accessToken", "authToken"];
  for (const k of directKeys) {
    const v = localStorage.getItem(k);
    if (v && v !== "null" && v !== "undefined") return v;
  }

  // Objeto auth serializado 
  const authRaw = localStorage.getItem("auth");
  if (authRaw) {
    try {
      const auth = JSON.parse(authRaw);
      const token =
        auth?.token ||
        auth?.jwt ||
        auth?.accessToken ||
        auth?.data?.token ||
        auth?.data?.accessToken;
      if (token) return token;
    } catch (_) {}
  }

  //  authService guarda al usuario con token adentro
  const userRaw = localStorage.getItem("user");
  if (userRaw) {
    try {
      const user = JSON.parse(userRaw);
      const token = user?.token || user?.jwt || user?.accessToken;
      if (token) return token;
    } catch (_) {}
  }

  return null;
}

export const api = axios.create({
  baseURL: "http://18.206.208.70:8080",
  timeout: 20000,
});

api.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// log útil para depurar 403/401
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
