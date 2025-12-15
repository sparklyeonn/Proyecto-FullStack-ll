import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest, loginRequest, saveAuth } from "../services/authService";

function Registro() {
    const nav = useNavigate();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const nombreLimpio = nombre.trim();
        const emailLimpio = email.trim();

        if (!nombreLimpio) return setError("Ingresa tu nombre.");
        if (!emailLimpio) return setError("Ingresa tu correo.");

        if (!password || !passwordConfirm) return setError("Las contraseñas no pueden estar vacías.");
        if (password !== passwordConfirm) return setError("Las contraseñas no coinciden.");

        try {
            setLoading(true);

            // 1) Se crea el usuario en /api/usuarios como rol de cliente
            await registerRequest({
                nombre: nombreLimpio,
                email: emailLimpio,
                password,
                rol: "CLIENTE",
            });

            // 2) Auto-login usando /api/auth/login, este devuelve el token
            const data = await loginRequest(emailLimpio, password);
            saveAuth(data);

            nav("/perfil", { replace: true });
        } catch (e) {
            setError(e.message || "No se pudo crear la cuenta");
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

                    {error && <p style={{ color: "crimson", marginTop: 8 }}>{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Creando..." : "Crear Cuenta"}
                    </button>
                </form>

                <p style={{ marginTop: 12 }}>
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </section>
        </main>
    );
}

export default Registro;
