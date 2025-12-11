import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function getToken() {
    return localStorage.getItem("adminToken");
}

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) return navigate("/admin/login");
        fetchUsuarios();
    }, []);

    async function fetchUsuarios() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/usuarios", {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) throw new Error("No se pudieron cargar usuarios");
            const data = await res.json();
            setUsuarios(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function toggleAdmin(user) {
        try {
            const res = await fetch(`/api/admin/usuarios/${user.id}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ isAdmin: !user.isAdmin }),
            });
            if (!res.ok) throw new Error("No se pudo actualizar rol");
            await fetchUsuarios();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(id) {
        if (!confirm("¿Eliminar usuario?")) return;
        try {
            const res = await fetch(`/api/admin/usuarios/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) throw new Error("No se pudo eliminar usuario");
            setUsuarios((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div className="admin-page">
            <h2>Admin - Usuarios</h2>
            {error && <p style={{ color: "crimson" }}>{error}</p>}
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Admin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length === 0 && <tr><td colSpan="5">No hay usuarios</td></tr>}
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.email}</td>
                            <td>{u.nombre || "-"}</td>
                            <td>{u.isAdmin ? "Sí" : "No"}</td>
                            <td>
                                <button onClick={() => toggleAdmin(u)}>{u.isAdmin ? "Quitar admin" : "Dar admin"}</button>{" "}
                                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
