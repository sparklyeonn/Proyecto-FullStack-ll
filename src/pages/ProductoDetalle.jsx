import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useApp } from '../context/AppContext.jsx';

const API_URL = "http://18.206.208.70:8080"; // backend

function ProductoDetalle() {

    const { id } = useParams();
    const { handleAddToCart } = useApp();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${API_URL}/api/productos/${id}`);
                if (!res.ok) {
                    if (res.status === 404) throw new Error("Producto no encontrado");
                    throw new Error(`Error HTTP ${res.status}`);
                }

                const data = await res.json();
                setProducto(data);
            } catch (e) {
                setError(e.message || "No se pudo cargar el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) {
        return (
            <Container className="my-5">
                <div className="d-flex justify-content-center my-4">
                    <Spinner animation="border" />
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger" className="text-center">
                    <h4>{error}</h4>
                    <p>El producto que buscas no existe o no se pudo cargar.</p>
                </Alert>
            </Container>
        );
    }

    if (!producto) {
        return (
            <Container className="my-5">
                <Alert variant="warning" className="text-center">
                    <h4>Producto no encontrado</h4>
                    <p>El producto que buscas no existe.</p>
                </Alert>
            </Container>
        );
    }

    return (
        <main>
            <Container className="my-5">
                <div className="product-container">
                    <Row>
                        <Col md={6}>
                            <img
                                src={producto.imagenUrl}
                                alt={producto.imagenAlt || producto.titulo}
                                className="img-fluid rounded"
                            />
                        </Col>

                        <Col md={6} className="product-info">
                            <h1 style={{ fontFamily: "'Fascinate', cursive" }}>
                                {producto.titulo}
                            </h1>

                            {producto.artista && <h4>por {producto.artista}</h4>}

                            <p className="lead mt-3">{producto.descripcion}</p>

                            {producto.tipo && (
                                <p><strong>Formato:</strong> {producto.tipo}</p>
                            )}

                            {producto.categoria?.nombre && (
                                <p><strong>Categoría:</strong> {producto.categoria.nombre}</p>
                            )}

                            <h3 className="my-3">
                                Precio: ${Number(producto.precio).toLocaleString('es-CL')}
                            </h3>

                            {typeof producto.stock === "number" && (
                                <p><strong>Stock:</strong> {producto.stock}</p>
                            )}

                            <Button
                                className="btn-ritmo btn-lg"
                                onClick={() => handleAddToCart(producto)}
                                disabled={producto.stock === 0}
                            >
                                {producto.stock === 0 ? "Sin stock" : "Añadir al carrito"}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </main>
    );
}

export default ProductoDetalle;