import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUser, isLoggedIn } from "../services/authService";
import {
  getCarritoByUsuario,
  addItem,
  updateItemCantidad,
  deleteItem,
  clearCarrito,
} from "../services/carritoService";
import { crearPedido } from "../services/pedidoService";
import { useNavigate } from "react-router-dom";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const navigate = useNavigate();

  // user como state (para que se actualice cuando haces login/logout)
  const [user, setUser] = useState(() => getUser());

  // carrito state
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  // escucha un evento para refrescar user (lo disparas desde saveAuth/logout)
  useEffect(() => {
    const onAuthChanged = () => setUser(getUser());
    window.addEventListener("authChanged", onAuthChanged);
    window.addEventListener("storage", onAuthChanged); // por si cambia en otra pestaña
    return () => {
      window.removeEventListener("authChanged", onAuthChanged);
      window.removeEventListener("storage", onAuthChanged);
    };
  }, []);

  const loadCart = async () => {
    if (!user?.id) {
      setCart([]);
      return;
    }

    try {
      setCartError("");
      setCartLoading(true);
      const data = await getCarritoByUsuario(user.id);
      setCart(data?.items || []);
    } catch (e) {
      setCartError(e.message || "No se pudo cargar el carrito");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Agregar al carrito (si no está logueado, manda a login)
  const handleAddToCart = async (productoId, cantidad = 1) => {
    if (!isLoggedIn()) {
      navigate("/login", { replace: true });
      return;
    }
    if (!user?.id) return;

    try {
      setCartError("");
      await addItem(user.id, productoId, cantidad);
      await loadCart();
    } catch (e) {
      setCartError(e.message || "No se pudo agregar al carrito");
    }
  };

  // Cambiar cantidad (si baja a 0 => elimina)
  const handleSetCantidad = async (itemId, cantidad) => {
    if (!user?.id) return;

    try {
      setCartError("");
      if (cantidad <= 0) {
        await deleteItem(user.id, itemId);
      } else {
        await updateItemCantidad(user.id, itemId, cantidad);
      }
      await loadCart();
    } catch (e) {
      setCartError(e.message || "No se pudo actualizar la cantidad");
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    if (!user?.id) return;

    try {
      setCartError("");
      await deleteItem(user.id, itemId);
      await loadCart();
    } catch (e) {
      setCartError(e.message || "No se pudo eliminar el item");
    }
  };

  const handleClearCart = async () => {
    if (!user?.id) return;

    try {
      setCartError("");
      await clearCarrito(user.id);
      setCart([]);
    } catch (e) {
      setCartError(e.message || "No se pudo vaciar el carrito");
    }
  };

  // Checkout => crea pedido desde carrito y te manda al perfil
  const handleCheckout = async () => {
    if (!isLoggedIn()) {
      navigate("/login", { replace: true });
      return;
    }
    if (!user?.id) return;

    try {
      setCartError("");
      await crearPedido(user.id);
      setCart([]);
      navigate("/perfil", { replace: true });
    } catch (e) {
      setCartError(e.message || "No se pudo realizar el pago");
    }
  };

  const value = useMemo(
    () => ({
      user,
      cart,
      cartLoading,
      cartError,
      loadCart,
      handleAddToCart,
      handleSetCantidad,
      handleRemoveFromCart,
      handleClearCart,
      handleCheckout,
    }),
    [user, cart, cartLoading, cartError]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
  return ctx;
};
