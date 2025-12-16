// src/services/pedidoService.js
import { api } from "./http"; // <- tu instancia axios con baseURL + interceptor Bearer token

//crea pedido a partir del carrito
export const crearPedido = async (usuarioId) => {
  if (!usuarioId) throw new Error("usuarioId es requerido");

  try {
    const res = await api.post(`/api/pedidos/usuario/${usuarioId}`);
    return res.data; // 
  } catch (err) {
    // Manejo de error amigable
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.mensaje ||
      err?.response?.data?.error ||
      err?.message ||
      "Error al crear el pedido";

    console.error("crearPedido error:", status, msg, err?.response?.data);
    throw new Error(`${status ? `HTTP ${status}: ` : ""}${msg}`);
  }
};

//obtiene los pedidos
export const obtenerPedidosPorUsuario = async (usuarioId) => {
  if (!usuarioId) throw new Error("usuarioId es requerido");

  try {
    const res = await api.get(`/api/pedidos/usuario/${usuarioId}`);
    return res.data; // lista de pedidos
  } catch (err) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.mensaje ||
      err?.response?.data?.error ||
      err?.message ||
      "Error al obtener pedidos";

    console.error("obtenerPedidosPorUsuario error:", status, msg, err?.response?.data);
    throw new Error(`${status ? `HTTP ${status}: ` : ""}${msg}`);
  }
};


export const obtenerPedidoPorId = async (pedidoId) => {
   if (!pedidoId) throw new Error("pedidoId es requerido");
   const res = await api.get(`/api/pedidos/${pedidoId}`);
   return res.data;
};


export const actualizarEstadoPedido = async (pedidoId, nuevoEstado) => {
   if (!pedidoId) throw new Error("pedidoId es requerido");
   const res = await api.put(`/api/pedidos/${pedidoId}/estado`, { estado: nuevoEstado });
   return res.data;
};
