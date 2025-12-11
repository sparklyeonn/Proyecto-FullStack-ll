import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function getToken() {
    return localStorage.getItem("adminToken");
}

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ id: null, nombre: "", precio: "", descripcion: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) return navigate("/admin/login");
        fetchProductos();
    }, []);

    async function fetchProductos() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/productos", {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) throw new Error("No se pudo obtener productos");
            const data = await res.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setForm({ id: null, nombre: "", precio: "", descripcion: "" });
    }

    function handleEdit(p) {
        setForm({ id: p.id, nombre: p.nombre || "", precio: p.precio || "", descripcion: p.descripcion || "" });
    }

    async function handleSave(e) {
        e.preventDefault();
        setError(null);
        try {
            const method = form.id ? "PUT" : "POST";
            const url = form.id ? `/api/admin/productos/${form.id}` : "/api/admin/productos";
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ nombre: form.nombre, precio: form.precio, descripcion: form.descripcion }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || "Error al guardar");
            }
            await fetchProductos();
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(id) {
        if (!confirm("¿Eliminar producto?")) return;
        try {
            const res = await fetch(`/api/admin/productos/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) throw new Error("No se pudo eliminar");
            setProductos((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div className="admin-page">
            <h2>Admin - Productos</h2>

            <section style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 1 }}>
                    <h3>Lista</h3>
                    {error && <p style={{ color: "crimson" }}>{error}</p>}
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.length === 0 && (
                                <tr><td colSpan="4">No hay productos</td></tr>
                            )}
                            {productos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.precio}</td>
                                    <td>
                                        <button onClick={() => handleEdit(p)}>Editar</button>{" "}
                                        <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ width: 360 }}>
                    <h3>{form.id ? "Editar" : "Nuevo"} Producto</h3>
                    <form onSubmit={handleSave}>
                        <label>
                            Nombre
                            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                        </label>
                        <label>
                            Precio
                            <input value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required />
                        </label>
                        <label>
                            Descripción
                            <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                        </label>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button type="submit">{form.id ? "Actualizar" : "Crear"}</button>
                            <button type="button" onClick={resetForm}>Limpiar</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
