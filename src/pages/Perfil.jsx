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

        if (email.trim() === '') {
            alert('Por favor, ingresa tu correo electrónico.');
            return;
        }

        if (mensaje.trim() === '') {
            alert('Por favor, escribe tu mensaje.');
            return;
        }

        // Validacion del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        alert('¡Formulario enviado con éxito!');

        // se limpia el formulario al momento de enviar
        setNombre('');
        setEmail('');
        setTelefono('');
        setMensaje('');
    };

    return (
        <main>
            <section className="contact-section"> 
                <h2>Contacto</h2>
                <p>¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar?</p>
                <p>¡Contáctanos!</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Número de teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows="5"
                            required
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit">Enviar mensaje</button>
                </form>
            </section>
        </main>
    );
}

export default Contacto;