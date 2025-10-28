import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header.jsx';

describe('Componente Header', () => {

    // Test 1
    it('debería renderizar el logo y los links de navegación', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logo = screen.getByAltText('Logo de Ritmo Lab');
        expect(logo).toBeTruthy();

        expect(screen.getByText('Inicio')).toBeTruthy();
        expect(screen.getByText('CDs')).toBeTruthy();
        expect(screen.getByText('Vinilos')).toBeTruthy();
        expect(screen.getByText('Accesorios')).toBeTruthy();
        expect(screen.getByText('Mi Cuenta')).toBeTruthy();
    });

    // Test 2
    it('debería tener los links apuntando a las rutas correctas (href)', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const linkCDs = screen.getByRole('link', { name: /CDs/i });
        const linkVinilos = screen.getByRole('link', { name: /Vinilos/i });
        const linkMiCuenta = screen.getByRole('link', { name: /Mi Cuenta/i });

        expect(linkCDs.getAttribute('href')).toBe('/cds');
        expect(linkVinilos.getAttribute('href')).toBe('/vinilos');
        expect(linkMiCuenta.getAttribute('href')).toBe('/login');
    });

});
