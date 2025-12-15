import { authFetch } from "./authService";

const API_URL = "http://18.206.208.70:8080";

export async function getProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  return res.json();
}

export async function createProducto(payload) {
  const res = await authFetch(`${API_URL}/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error HTTP ${res.status}`);
  }
  return res.json();
}

export async function updateProducto(id, payload) {
  const res = await authFetch(`${API_URL}/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error HTTP ${res.status}`);
  }
  return res.json();
}

export async function deleteProducto(id) {
  const res = await authFetch(`${API_URL}/api/productos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error HTTP ${res.status}`);
  }
  return true;
}
