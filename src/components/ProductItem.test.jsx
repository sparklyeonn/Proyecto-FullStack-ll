import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem.jsx';
import { AppProvider } from '../context/AppContext';
import { BrowserRouter } from 'react-router-dom'; 

describe('Componente ProductItem', () => {
    it('debería mostrar las props (título, artista y precio) correctamente', () => {

        const mockProducto = {
            id: 1, 
            titulo: "Breach (2025)",
            artista: "Twenty One Pilots",
            tipo: "Vinilo",
            precio: "21.990",
            imagenUrl: "/assets/img/vinilo_top.webp",
            imagenAlt: "Portada de Breach"
        };

        render(
            <BrowserRouter>
                <AppProvider> 
                    <ProductItem producto={mockProducto} /> 
                </AppProvider>
            </BrowserRouter>
        );

        expect(screen.getByText('Breach (2025)')).toBeInTheDocument();
        expect(screen.getByText('Twenty One Pilots')).toBeInTheDocument();
        expect(screen.getByText('$21.990')).toBeInTheDocument();
    });
});