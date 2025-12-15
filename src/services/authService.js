import { baseURL } from "../config/api";

const TOKEN_KEY = "ritmolab_token";
const ROLE_KEY = "ritmolab_role";
const EMAIL_KEY = "ritmolab_email";

export function saveAuth({ token, rol, email }) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, rol);
    localStorage.setItem(EMAIL_KEY, email);
}

export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
    return localStorage.getItem(ROLE_KEY);
}

export function getEmail() {
    return localStorage.getItem(EMAIL_KEY);
}

export function isLoggedIn() {
    return !!getToken();
}

export function isAdmin() {
    return getRole() === "ADMIN";
}

export async function login(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        let msg = "Credenciales inválidas";
        try {
            const data = await res.json();
            msg = data?.message || msg;
        } catch (_) { }
        throw new Error(msg);
    }

    const data = await res.json(); // { token, email, rol }
    saveAuth(data);
    return data;
}
