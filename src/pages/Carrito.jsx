import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Carrito() {

    const { cart, handleRemoveFromCart, handleClearCart } = useApp();
    const parsePrecio = (precioStr) => {
        if (typeof precioStr === 'number') return precioStr;
        return Number(String(precioStr).replace(/\./g, ''));
    };

    // total del carrito
    const total = cart.reduce((acc, item) => {
        // Multiplica el precio (limpio) por la cantidad
        return acc + (parsePrecio(item.precio) * item.cantidad);
    }, 0); 

    return (
        <main>
            <Container className="my-5">
                <Row>
                    <Col>
                        <h2 className="mb-4" style={{ fontFamily: "'Fascinate', cursive" }}>Carrito de Compras</h2>

                        {cart.length === 0 ? (

                            // Si es que el carrito está vacío 
                            <div className="text-center p-5 bg-light rounded">
                                <p className="lead">Tu carrito está vacío. Agrega productos para continuar.</p>
                                <Button as={Link} to="/" variant="primary" className="btn-ritmo">
                                    Ir a la Tienda
                                </Button>
                            </div>

                        ) : (

                            // Si es que el carrito tiene productos 
                            <div>
                                <ListGroup variant="flush">
                                    {cart.map(item => (
                                        <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center flex-wrap">

                                            <Col xs={3} md={2} lg={1} className="mb-2 mb-md-0">
                                                <Image src={item.imagenUrl} alt={item.imagenAlt} fluid thumbnail />
                                            </Col>

                                            <Col xs={9} md={4} lg={5} className="mb-2 mb-md-0">
                                                <h5 className="mb-0">{item.titulo}</h5>
                                                <small className="text-muted">{item.artista}</small>
                                            </Col>

                                            <Col xs={6} md={3} lg={2} className="text-md-center">
                                                <span className="fw-bold">${parsePrecio(item.precio).toLocaleString('es-CL')}</span>
                                            </Col>

                                            <Col xs={6} md={3} lg={2} className="text-md-center">
                                                <span>Cantidad: {item.cantidad}</span>
                                            </Col>

                                            <Col xs={12} md={12} lg={2} className="text-md-end mt-2 mt-lg-0">
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Col>

                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                                <div className="mt-4 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                                    <Button variant="danger" onClick={handleClearCart}>
                                        Vaciar Carrito
                                    </Button>
                                    <h4 className="mb-0">
                                        Total: ${total.toLocaleString('es-CL')}
                                    </h4>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Carrito;
