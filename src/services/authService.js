const API_URL = "http://18.206.208.70:8080";

const TOKEN_KEY = "ritmolab_token";
const USER_KEY = "ritmolab_user";

// login de usuario
export async function loginRequest(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let msg = "Credenciales inválidas";
    try {
      const text = await res.text();
      if (text) msg = text;
    } catch {}
    throw new Error(msg);
  }

  return res.json(); // { token, id, nombre, email, role }
}

// registro de nuevo usuario
export async function registerRequest({ nombre, email, password }) {
  const res = await fetch(`${API_URL}/api/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // OJO: no mandes "rol" si tu backend lo define por defecto
    body: JSON.stringify({ nombre, email, password }),
  });

  if (!res.ok) {
    let msg = "No se pudo registrar";
    try {
      const text = await res.text();
      if (text) msg = text;
    } catch {}
    throw new Error(msg);
  }

  return res.json(); // Usuario creado
}


export function saveAuth(data) {
  if (!data?.token) throw new Error("Respuesta de login sin token");

  localStorage.setItem(TOKEN_KEY, data.token);

  const user = {
    id: data.id,
    nombre: data.nombre,
    email: data.email,
    role: data.role, // "ROLE_ADMIN" o "ROLE_CLIENTE"
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
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

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
  return !!getToken();
}

export function isAdmin() {
  const u = getUser();
  return u?.role === "ROLE_ADMIN";
}

// fetch con token en headers
export async function authFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, { ...options, headers });
}

// perfil del usuario logueado desde el backend
export async function meRequest() {
  const res = await authFetch(`${API_URL}/api/auth/me`);
  if (!res.ok) {
    if (res.status === 401) throw new Error("Sesión expirada o token inválido");
    throw new Error(`Error HTTP ${res.status}`);
  }
  return res.json(); // { id, nombre, email, role }
}
