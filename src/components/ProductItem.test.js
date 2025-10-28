import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem.jsx';

describe('Componente ProductItem', () => {

    // Test 1
    it('debería mostrar las props (título, artista y precio) correctamente', () => {

        const mockProducto = {
            titulo: "Breach (2025)",
            artista: "Twenty One Pilots",
            tipo: "Vinilo",
            precio: "21.990",
            imagenUrl: "/assets/img/vinilo_top.webp",
            imagenAlt: "Portada de Breach"
        };

        render(<ProductItem {...mockProducto} />);

        expect(screen.getByText('Breach (2025)')).toBeTruthy();
        expect(screen.getByText('Twenty One Pilots')).toBeTruthy();
        expect(screen.getByText('$21.990')).toBeTruthy();
    });

});
