const API_URL = "http://18.206.208.70:8080";
import { authFetch } from "./authService";

export async function getCarritoByUsuario(usuarioId) {
  const res = await authFetch(`${API_URL}/api/carritos/usuario/${usuarioId}`);
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  return res.json(); // devuelve Carrito
}

export async function addItem(usuarioId, productoId, cantidad = 1) {
  const url = `${API_URL}/api/carritos/usuario/${usuarioId}/items?productoId=${productoId}&cantidad=${cantidad}`;
  const res = await authFetch(url, { method: "POST" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error HTTP ${res.status}`);
  }
  return res.json(); // devuelve Carrito
}

export async function updateItemCantidad(usuarioId, itemId, cantidad) {
  const url = `${API_URL}/api/carritos/usuario/${usuarioId}/items/${itemId}?cantidad=${cantidad}`;
  const res = await authFetch(url, { method: "PUT" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error HTTP ${res.status}`);
  }
  return res.json(); // devuelve Carrito
}

export async function deleteItem(usuarioId, itemId) {
  const res = await authFetch(`${API_URL}/api/carritos/usuario/${usuarioId}/items/${itemId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error HTTP ${res.status}`);
  }
  return res.json(); // devuelve Carrito
}

export async function clearCarrito(usuarioId) {
  const res = await authFetch(`${API_URL}/api/carritos/usuario/${usuarioId}/items`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error HTTP ${res.status}`);
  }
  return res.json(); //  devuelve Carrito
}
