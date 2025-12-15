import { getToken, clearAuth } from "./authService";

export async function authFetch(url, options = {}) {
    const token = getToken();

    const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(url, { ...options, headers });

    // Si expiró o no es válido
    if (res.status === 401 || res.status === 403) {
    }

    return res;
}
