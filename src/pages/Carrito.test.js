import React from 'react';
import { render, screen } from '@testing-library/react';
import Carrito from './Carrito.jsx';

describe('Componente Carrito.jsx', () => {

    // Test 1
    it('Mensaje "Tu carrito está vacío" por defecto', () => {

        render(<Carrito />);

        const mensajeVacio = screen.getByText(/Tu carrito está vacío/i);
        expect(mensajeVacio).toBeTruthy();
    });

});
