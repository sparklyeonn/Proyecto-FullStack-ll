import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (password === '' || passwordConfirm === '') {
            alert('Las contraseñas no pueden estar vacías.');
            return; 
        }

        if (password !== passwordConfirm) {
            alert('Las contraseñas no coinciden.');
            return; 
        }

        // Mensaje en caso de buen resultado
        alert('¡Cuenta creada con éxito!');

        navigate('/perfil'); 
    };

    return (
        <main>
            <section className="contact-section">
                <h2>Crear Cuenta</h2>

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
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirm">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="password_confirm"
                            name="password_confirm"
                            required
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>

                    <button typeG="submit">Crear Cuenta</button>
                </form>
            </section>
        </main>
    );
}

export default Registro;