import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || "Credenciales inválidas");
            }

            const data = await res.json();
            // Asume { token: '...' }
            localStorage.setItem("adminToken", data.token);
            navigate("/admin/productos"); // manda al dashboard
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-page">
            <h2>Ingreso Administrador</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Contraseña
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
                {error && <p style={{ color: "crimson" }}>{error}</p>}
            </form>
        </div>
    );
}
