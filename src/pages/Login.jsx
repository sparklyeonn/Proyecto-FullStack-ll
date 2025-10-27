import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const esEmailValido = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const emailLimpio = username.trim();

        // valida que el email no esté vacío
        if (emailLimpio === "") {
            alert("Por favor ingresa tu correo.");
            return;
        }

        // valida el formato del email
        if (!esEmailValido(emailLimpio)) {
            alert("Por favor ingresa un correo electrónico válido (ej: usuario@mail.com).");
            return; 
        }

        // valida la contraseña no esté vacía
        if (password.trim() === "") {
            alert("Por favor ingresa tu contraseña.");
            return;
        }

        alert("Inicio de sesión exitoso.");
        window.location.href = "/perfil"; 
    };

    return (
        <section className="contact-section">
            <h2>Iniciar Sesión</h2> 
            
            <form className="form-group" onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input 
                        type="text"
                        id="username" 
                        name="username" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Ingresar</button>
            </form>
            
            <p>
                ¿No tienes una cuenta? <Link to="/crear-cuenta">Regístrate aquí</Link>
            </p>
        </section>
    );
}

export default Login;