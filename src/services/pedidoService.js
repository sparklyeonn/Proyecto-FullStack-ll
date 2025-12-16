// src/services/pedidoService.js
import { api } from "./http";

// POST /api/pedidos/usuario/{usuarioId}
export const crearPedido = async (usuarioId) => {
  if (!usuarioId) throw new Error("usuarioId es requerido");

  try {
    const res = await api.post(`/api/pedidos/usuario/${usuarioId}`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.mensaje ||
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Error al crear el pedido";

    console.error("crearPedido error:", status, msg, err?.response?.data);
    throw new Error(`${status ? `HTTP ${status}: ` : ""}${msg}`);
  }
};

// GET /api/pedidos/usuario/{usuarioId}
export const obtenerPedidosPorUsuario = async (usuarioId) => {
  if (!usuarioId) throw new Error("usuarioId es requerido");

  try {
    const res = await api.get(`/api/pedidos/usuario/${usuarioId}`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.mensaje ||
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Error al obtener pedidos";

    console.error("obtenerPedidosPorUsuario error:", status, msg, err?.response?.data);
    throw new Error(`${status ? `HTTP ${status}: ` : ""}${msg}`);
  }
};
