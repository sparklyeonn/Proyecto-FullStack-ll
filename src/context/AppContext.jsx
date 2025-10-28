import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    // CARRITO

    // estado del carrito
    const [cart, setCart] = useState([]);

    const handleAddToCart = (producto) => {
        const productoExistente = cart.find(item => item.id === producto.id);

        if (productoExistente) {
            setCart(cart.map(item =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            setCart([...cart, { ...producto, cantidad: 1 }]);
        }
        alert(`¡"${producto.titulo}" se añadió al carrito!`);
    };

    // autenticacion 
    const [user, setUser] = useState(null);

    // INICIO SESION

    // iniciar sesion
    const handleLogin = (userData) => {
        // verificacion de contraseña
        setUser(userData);
        localStorage.setItem('usuarioLogueado', JSON.stringify(userData));
    };

    // cerrar sesion
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('usuarioLogueado');
    };

    //

    const value = {
        cart,
        user,
        handleAddToCart,
        handleLogin,
        handleLogout
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    return useContext(AppContext);
};