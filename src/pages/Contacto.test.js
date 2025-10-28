import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Contacto from './Contacto.jsx';

describe('Componente Contacto.jsx', () => {

    beforeEach(() => {
        spyOn(window, 'alert');
    });

    // Test 1 
    it('debería mostrar alerta si el nombre está vacío al enviar', () => {
        render(<Contacto />);

        const botonEnviar = screen.getByRole('button', { name: /enviar mensaje/i });

        fireEvent.submit(botonEnviar.form);

        expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa tu nombre.');
    });

    // Test 2 
    it('debería mostrar alerta de email inválido si el nombre y mensaje están llenos', async () => { 
        render(<Contacto />);

        const inputNombre = screen.getByLabelText('Nombre completo');
        const inputEmail = screen.getByLabelText('Correo electrónico');
        const inputMensaje = screen.getByLabelText('Mensaje');
        const botonEnviar = screen.getByRole('button', { name: /enviar mensaje/i });

        await act(async () => {
            fireEvent.change(inputNombre, { target: { value: 'Conny' } });
            fireEvent.change(inputMensaje, { target: { value: 'Esto es una prueba' } });
            fireEvent.change(inputEmail, { target: { value: 'correo-invalido' } });
        });

        fireEvent.submit(botonEnviar.form);

        expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa un correo electrónico válido.');
    });

});