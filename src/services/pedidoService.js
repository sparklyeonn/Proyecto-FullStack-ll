import { authFetch } from "./authService";

const API_URL = "http://18.206.208.70:8080";

// CLIENTE: crear pedido desde carrito
export async function crearPedido(usuarioId) {
  const res = await authFetch(`${API_URL}/api/pedidos/usuario/${usuarioId}`, {
    method: "POST",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "No se pudo crear el pedido");
  }

  return res.json();
}

// CLIENTE: obtener pedidos del usuario
export async function getPedidosUsuario(usuarioId) {
  const res = await authFetch(`${API_URL}/api/pedidos/usuario/${usuarioId}`);

  if (!res.ok) {
    throw new Error("No se pudieron cargar los pedidos");
  }

  return res.json();
}
