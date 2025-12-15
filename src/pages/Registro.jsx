import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerRequest, loginRequest, saveAuth } from '../services/authService';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !email || !password) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (password !== passwordConfirm) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            setLoading(true);

            // 1️Registrar usuario (rol CLIENTE)
            await registerRequest({
                nombre,
                email,
                password,
                rol: "CLIENTE" 
            });

            // Login automatico
            const loginResp = await loginRequest(email, password);
            saveAuth(loginResp);

            // Redirigir
            navigate("/perfil");

        } catch (error) {
            alert(error.message || "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <section className="contact-section">
                <h2>Crear Cuenta</h2>

                <form className="contact-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Nombre completo</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Creando cuenta..." : "Crear Cuenta"}
                    </button>
                </form>

                <p style={{ marginTop: "1rem" }}>
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </section>
        </main>
    );
}

export default Registro;


