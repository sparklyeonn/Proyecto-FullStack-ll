const API_URL = "http://18.206.208.70:8080"; 

const TOKEN_KEY = "ritmolab_token";
const USER_KEY = "ritmolab_user"; // {id,nombre,email,rol}

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
        } catch (_) {
            const text = await res.text().catch(() => "");
            if (text) msg = text;
        }
        throw new Error(msg);
    }

    return res.json();
}

export async function registerRequest({ nombre, email, password, rol = "CLIENTE" }) {
    const res = await fetch(`${API_URL}/api/usuarios`, {
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

export function saveAuth(loginResponse) {
    // { token, id, nombre, email, rol }
    if (!loginResponse?.token) return;

    localStorage.setItem(TOKEN_KEY, loginResponse.token);

    const user = {
        id: loginResponse.id ?? null,
        nombre: loginResponse.nombre ?? "",
        email: loginResponse.email ?? "",
        rol: loginResponse.rol ?? "", 
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function getRole() {
    return getUser()?.rol ?? "";
}

export function isLoggedIn() {
    return !!getToken();
}

export function isAdmin() {
    const role = getRole();
    // soporta ambas formas
    return role === "ADMIN" || role === "ROLE_ADMIN";
}

export async function authFetch(path, options = {}) {
    const token = getToken();

    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", headers.get("Content-Type") || "application/json");

    if (token) headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    // si expira o es inválido, se limpia la sesión
    if (res.status === 401) {
        logout();
    }

    return res;
}

