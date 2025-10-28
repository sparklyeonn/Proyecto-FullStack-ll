import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registro from './Registro.jsx';

describe('Componente Registro.jsx', () => {

    beforeEach(() => {
        vi.spyOn(window, 'alert');
    });

    // Test 1
    it('Deberia: Alerta si las contraseñas no coinciden', async () => {
        render(<Registro />, { wrapper: BrowserRouter });

        const inputPassword = screen.getByLabelText('Contraseña');
        const inputConfirm = screen.getByLabelText('Confirmar Contraseña');
        const botonCrear = screen.getByRole('button', { name: /crear cuenta/i });

        await act(async () => {
            fireEvent.change(inputPassword, { target: { value: 'pass123' } });
            fireEvent.change(inputConfirm, { target: { value: 'pass456' } });
        });

        fireEvent.submit(botonCrear.form);

        expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden.');
    });

    // Test 2
    it('debería mostrar alerta de éxito si el formulario es válido', async () => {
        render(<Registro />, { wrapper: BrowserRouter });

        const inputNombre = screen.getByLabelText('Nombre completo');
        const inputEmail = screen.getByLabelText('Correo electrónico');
        const inputPassword = screen.getByLabelText('Contraseña');
        const inputConfirm = screen.getByLabelText('Confirmar Contraseña');
        const botonCrear = screen.getByRole('button', { name: /crear cuenta/i });

        await act(async () => {
            fireEvent.change(inputNombre, { target: { value: 'Test User' } });
            fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
            fireEvent.change(inputPassword, { target: { value: 'pass123' } });
            fireEvent.change(inputConfirm, { target: { value: 'pass123' } });
        });

        fireEvent.submit(botonCrear.form);

        expect(window.alert).toHaveBeenCalledWith('¡Cuenta creada con éxito!');
    });

});
