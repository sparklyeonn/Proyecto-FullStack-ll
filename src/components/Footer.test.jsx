import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';
import { describe, it, expect } from 'vitest';

describe('Componente Footer', () => {

    it('debería renderizar el texto de copyright correctamente', () => {
        render(<Footer />);

        const copyrightText = screen.getByText(/© 2025 Ritmo Lab. Todos los derechos reservados./i);

        expect(copyrightText).toBeTruthy();
    });

});
