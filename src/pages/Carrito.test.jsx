// src/pages/Carrito.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import Carrito from './Carrito.jsx';
// 🔑 Importa BrowserRouter
import { BrowserRouter } from 'react-router-dom';

describe('Componente Carrito.jsx', () => {

    it('Mensaje "Tu carrito está vacío" por defecto', () => {

        render(
            // 🔑 Envolver el componente en BrowserRouter y AppProvider
            <BrowserRouter> 
                <AppProvider>
                    <Carrito />
                </AppProvider>
            </BrowserRouter>
        );

        const mensajeVacio = screen.getByText(/Tu carrito está vacío/i);
        expect(mensajeVacio).toBeInTheDocument();
    });

});