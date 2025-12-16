import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isLoggedIn, getUser, setRedirectAfterLogin } from "../services/authService";
import {
  getCarritoByUsuario,
  addItem,
  updateItemCantidad,
  deleteItem,
  clearCarrito,
} from "../services/cartService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const nav = useNavigate();

  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");


  const normalizeCartResponse = (carrito) => carrito?.items ?? [];

  const refreshCart = async () => {
    if (!isLoggedIn()) {
      setCart([]);
      return;
    }

    const u = getUser();
    if (!u?.id) return;

    setCartLoading(true);
    setCartError("");

    try {
      const carrito = await getCarritoByUsuario(u.id);
      setCart(normalizeCartResponse(carrito));
    } catch (e) {
      setCartError(e.message || "No se pudo cargar el carrito");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const requireLogin = (redirectTo = "/carrito") => {
    if (isLoggedIn()) return true;
    setRedirectAfterLogin(redirectTo);
    nav("/login", { replace: true });
    return false;
  };

  const handleAddToCart = async (producto, cantidad = 1) => {
    if (!requireLogin("/carrito")) return;

    const u = getUser();
    try {
      setCartError("");
      await addItem(u.id, producto.id, cantidad);
      await refreshCart();
      alert(`¡"${producto.titulo}" se añadió al carrito!`);
    } catch (e) {
      setCartError(e.message || "No se pudo agregar al carrito");
    }
  };

  const handleSetCantidad = async (itemId, nuevaCantidad) => {
    if (!requireLogin("/carrito")) return;

    const u = getUser();
    try {
      setCartError("");
      if (nuevaCantidad <= 0) {
        await deleteItem(u.id, itemId);
      } else {
        await updateItemCantidad(u.id, itemId, nuevaCantidad);
      }
      await refreshCart();
    } catch (e) {
      setCartError(e.message || "No se pudo actualizar la cantidad");
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    if (!requireLogin("/carrito")) return;

    const u = getUser();
    try {
      setCartError("");
      await deleteItem(u.id, itemId);
      await refreshCart();
    } catch (e) {
      setCartError(e.message || "No se pudo eliminar el item");
    }
  };

  const handleClearCart = async () => {
    if (!requireLogin("/carrito")) return;

    const u = getUser();
    try {
      setCartError("");
      await clearCarrito(u.id);
      await refreshCart();
    } catch (e) {
      setCartError(e.message || "No se pudo vaciar el carrito");
    }
  };

  const handleCheckout = async () => {
    if (!requireLogin("/carrito")) return;
    alert("Checkout pendiente: falta endpoint de pedido/checkout en el backend.");
  };

  const value = {
    cart,
    cartLoading,
    cartError,
    refreshCart,
    handleAddToCart,
    handleSetCantidad,
    handleRemoveFromCart,
    handleClearCart,
    handleCheckout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe ser usado dentro de un AppProvider");
  return ctx;
};
