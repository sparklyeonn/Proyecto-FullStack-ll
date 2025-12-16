// src/services/pedidoService.js
const API_URL = "http://18.206.208.70:8080";
import { authFetch } from "./authService";

export async function crearPedido(usuarioId) {
  const res = await authFetch(`${API_URL}/api/pedidos/usuario/${usuarioId}`, {
    method: "POST",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "No se pudo crear el pedido");
  }
  return res.json();
}

export async function getPedidosUsuario(usuarioId) {
  const res = await authFetch(`${API_URL}/api/pedidos/usuario/${usuarioId}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "No se pudieron cargar los pedidos");
  }
  return res.json();
}

// (admin)
export async function cambiarEstadoPedido(pedidoId, estado) {
  const url = `${API_URL}/api/pedidos/${pedidoId}/estado?estado=${encodeURIComponent(estado)}`;
  const res = await authFetch(url, { method: "PUT" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "No se pudo cambiar el estado");
  }
  return res.json();
}
