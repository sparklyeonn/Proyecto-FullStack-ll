import { baseURL } from "../config/api";

const TOKEN_KEY = "ritmolab_token";
const ROLE_KEY = "ritmolab_role";
const EMAIL_KEY = "ritmolab_email";

export function saveAuth({ token, rol, email }) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, rol);
    localStorage.setItem(EMAIL_KEY, email);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
    return localStorage.getItem(ROLE_KEY);
}

export function isAdmin() {
    return getRole() === "ADMIN";
}

export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
}

export async function loginRequest(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        let msg = "Credenciales inválidas";
        try {
            const data = await res.json();
            msg = data?.message || msg;
        } catch (_) { }
        throw new Error(msg);
    }

    // esperado: { token, email, rol }
    return res.json();
}

export async function registerRequest({ nombre, email, password, rol }) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, rol }),
    });

    if (!res.ok) {
        let msg = "No se pudo registrar";
        try {
            const data = await res.json();
            msg = data?.message || msg;
        } catch (_) {
            const text = await res.text().catch(() => "");
            if (text) msg = text;
        }
        throw new Error(msg);
    }

    return res.json();
}
