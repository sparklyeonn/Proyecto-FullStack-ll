import React, { useState } from 'react';

function Contacto() { 
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() === '') {
            alert('Por favor, ingresa tu nombre.');
            return;
        }
        alert('¡Formulario enviado con éxito!');
    };

    return (
        <main>
            <section className="contact-section">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <button type="submit">Enviar mensaje</button>
                </form>
            </section>
        </main>
    );
}

export default Contacto; 