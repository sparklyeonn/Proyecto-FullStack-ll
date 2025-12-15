import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Alert, Spinner } from "react-bootstrap";
import { logout } from "../../services/authService";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../../services/productService";
import { useNavigate } from "react-router-dom";

const emptyForm = {
    id: null,
    titulo: "",
    artista: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    imagenAlt: "",
    tipo: "",
    categoriaId: "",
};

export default function AdminProductos() {
    const nav = useNavigate();

    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState(emptyForm);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [ok, setOk] = useState("");

    const isEdit = useMemo(() => !!form.id, [form.id]);

    const load = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getProductos();
            setProductos(data);
        } catch (e) {
            setError(e.message || "No se pudieron cargar productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const onChange = (key) => (e) => {
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const resetForm = () => setForm(emptyForm);

    const selectToEdit = (p) => {
        setOk("");
        setError("");
        setForm({
            id: p.id,
            titulo: p.titulo ?? "",
            artista: p.artista ?? "",
            descripcion: p.descripcion ?? "",
            precio: p.precio ?? "",
            stock: p.stock ?? "",
            imagenUrl: p.imagenUrl ?? "",
            imagenAlt: p.imagenAlt ?? "",
            tipo: p.tipo ?? "",
            categoriaId: p.categoria?.id ?? "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOk("");
        setError("");

        // Validaciones 
        if (!form.titulo.trim()) return setError("El título es obligatorio");
        if (!form.precio) return setError("El precio es obligatorio");
        if (!form.stock) return setError("El stock es obligatorio");
        if (!form.categoriaId) return setError("La categoría (ID) es obligatoria");

        const payload = {
            titulo: form.titulo.trim(),
            artista: form.artista.trim(),
            descripcion: form.descripcion.trim(),
            precio: Number(form.precio),
            stock: Number(form.stock),
            imagenUrl: form.imagenUrl.trim(),
            imagenAlt: form.imagenAlt.trim(),
            tipo: form.tipo.trim(),
            categoria: { id: Number(form.categoriaId) },
        };

        try {
            setSaving(true);
            if (isEdit) {
                await updateProducto(form.id, payload);
                setOk("Producto actualizado!");
            } else {
                await createProducto(payload);
                setOk("Producto creado!");
            }
            resetForm();
            await load();
        } catch (e2) {
            setError(e2.message || "Error al guardar producto");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        setOk("");
        setError("");
        const confirm = window.confirm("¿Eliminar este producto?");
        if (!confirm) return;

        try {
            await deleteProducto(id);
            setOk("Producto eliminado!");
            await load();
            if (form.id === id) resetForm();
        } catch (e) {
            setError(e.message || "No se pudo eliminar");
        }
    };

    const handleLogout = () => {
        logout();
        nav("/login", { replace: true });
    };

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Panel Administrador - Productos</h2>
                <Button variant="outline-danger" onClick={handleLogout}>Cerrar sesión</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {ok && <Alert variant="success">{ok}</Alert>}

            <Row className="g-4">
                <Col md={5}>
                    <h4 className="mb-3">{isEdit ? "Editar producto" : "Crear producto"}</h4>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Título</Form.Label>
                            <Form.Control value={form.titulo} onChange={onChange("titulo")} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Artista</Form.Label>
                            <Form.Control value={form.artista} onChange={onChange("artista")} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} value={form.descripcion} onChange={onChange("descripcion")} />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" value={form.precio} onChange={onChange("precio")} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" value={form.stock} onChange={onChange("stock")} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-2">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control placeholder="cd | vinilo | accesorio" value={form.tipo} onChange={onChange("tipo")} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Imagen URL</Form.Label>
                            <Form.Control value={form.imagenUrl} onChange={onChange("imagenUrl")} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Imagen Alt</Form.Label>
                            <Form.Control value={form.imagenAlt} onChange={onChange("imagenAlt")} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoría ID</Form.Label>
                            <Form.Control type="number" value={form.categoriaId} onChange={onChange("categoriaId")} />
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Button type="submit" disabled={saving}>
                                {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear"}
                            </Button>
                            <Button variant="secondary" type="button" onClick={resetForm}>
                                Limpiar
                            </Button>
                        </div>
                    </Form>
                </Col>

                <Col md={7}>
                    <h4 className="mb-3">Listado</h4>

                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Categoría</th>
                                    <th style={{ width: 190 }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.titulo}</td>
                                        <td>{p.precio}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.categoria?.id ?? "-"}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button size="sm" variant="outline-primary" onClick={() => selectToEdit(p)}>
                                                    Editar
                                                </Button>
                                                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {productos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center">No hay productos</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
