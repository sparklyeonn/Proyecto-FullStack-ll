import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest, saveAuth, isAdmin } from "../services/authService";

function Login() {
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const esEmailValido = (value) => {
        const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return regex.test(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const emailLimpio = email.trim();

        if (emailLimpio === "") return setError("Por favor ingresa tu correo.");
        if (!esEmailValido(emailLimpio)) return setError("Correo inválido (ej: usuario@mail.com).");
        if (password.trim() === "") return setError("Por favor ingresa tu contraseña.");

        try {
            setLoading(true);

            const data = await loginRequest(emailLimpio, password); // {token,email,rol}
            saveAuth(data);

            if (isAdmin()) nav("/admin", { replace: true });
            else nav("/perfil", { replace: true });
        } catch (e) {
            setError(e.message || "No se pudo iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section">
            <h2>Iniciar Sesión</h2>

            <form className="form-group" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@ritmolab.cl"
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
                        placeholder="********"
                    />
                </div>

                {error && <p style={{ color: "crimson", marginTop: 8 }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </form>

            <p>
                ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
        </section>
    );
}

export default Login;

