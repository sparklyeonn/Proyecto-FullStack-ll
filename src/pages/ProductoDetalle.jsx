import React from 'react';
import { useParams } from 'react-router-dom'; 
import { Container, Row, Col, Button } from 'react-bootstrap';
import { productos } from '../data/productos.js'; 
import { useApp } from '../context/AppContext.jsx'; 

function ProductoDetalle() {

    const { id } = useParams();
    const producto = productos.find(p => p.id === id);
    const { handleAddToCart } = useApp();

    if (!producto) {
        return (
            <Container>
                <Row>
                    <Col className="text-center mt-5">
                        <h2>Producto no encontrado</h2>
                        <p>El producto que buscas no existe.</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <main>
            <Container className="my-5">
                <div className="product-container">
                    <Row>
                        <Col md={6}>
                            <img src={producto.imagenUrl} alt={producto.imagenAlt} className="img-fluid rounded" />
                        </Col>
                        <Col md={6} className="product-info">
                            <h1 style={{ fontFamily: "'Fascinate', cursive" }}>{producto.titulo}</h1>
                            {producto.artista && <h4>por {producto.artista}</h4>}

                            <p className="lead mt-3">{producto.descripcion}</p>

                            <p><strong>Formato:</strong> {producto.tipo}</p>

                            <h3 className="my-3">
                                Precio: ${producto.precio.toLocaleString('es-CL')}
                            </h3>

                            <Button
                                className="btn-ritmo btn-lg" 
                                onClick={() => handleAddToCart(producto)}
                            >
                                Añadir al carrito
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </main>
    );
}

export default ProductoDetalle;