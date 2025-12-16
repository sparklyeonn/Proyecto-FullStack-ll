import React, { useMemo } from "react";
import { useApp } from "../context/AppContext.jsx";
import { Container, Row, Col, Button, ListGroup, Image, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Carrito() {
  const {
    cart,
    cartLoading,
    cartError,
    handleRemoveFromCart,
    handleClearCart,
    handleSetCantidad,
    handleCheckout,
  } = useApp();

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const precio = Number(item?.producto?.precio ?? 0);
      return acc + precio * Number(item?.cantidad ?? 0);
    }, 0);
  }, [cart]);

  return (
    <main>
      <Container className="my-5">
        <Row>
          <Col>
            <h2 className="mb-4" style={{ fontFamily: "'Fascinate', cursive" }}>
              Carrito de Compras
            </h2>

            {cartError && <Alert variant="danger">{cartError}</Alert>}

            {cartLoading ? (
              <Spinner animation="border" />
            ) : cart.length === 0 ? (
              <div className="text-center p-5 bg-light rounded">
                <p className="lead">Tu carrito está vacío. Agrega productos para continuar.</p>
                <Button as={Link} to="/" variant="primary" className="btn-ritmo">
                  Ir a la Tienda
                </Button>
              </div>
            ) : (
              <div>
                <ListGroup variant="flush">
                  {cart.map((item) => {
                    const p = item.producto ?? {};
                    return (
                      <ListGroup.Item
                        key={item.id}
                        className="d-flex justify-content-between align-items-center flex-wrap"
                      >
                        <Col xs={3} md={2} lg={1} className="mb-2 mb-md-0">
                          <Image src={p.imagenUrl} alt={p.imagenAlt || p.titulo} fluid thumbnail />
                        </Col>

                        <Col xs={9} md={4} lg={5} className="mb-2 mb-md-0">
                          <h5 className="mb-0">{p.titulo}</h5>
                          <small className="text-muted">{p.artista}</small>
                        </Col>

                        <Col xs={6} md={3} lg={2} className="text-md-center">
                          <span className="fw-bold">
                            ${Number(p.precio ?? 0).toLocaleString("es-CL")}
                          </span>
                        </Col>

                        <Col xs={6} md={3} lg={2} className="text-md-center">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleSetCantidad(item.id, (item.cantidad ?? 0) - 1)}
                            >
                              -
                            </Button>
                            <span>Cant: {item.cantidad}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleSetCantidad(item.id, (item.cantidad ?? 0) + 1)}
                            >
                              +
                            </Button>
                          </div>
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
                    );
                  })}
                </ListGroup>

                <div className="mt-4 p-3 bg-light rounded d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <Button variant="danger" onClick={handleClearCart}>
                    Vaciar Carrito
                  </Button>

                  <h4 className="mb-0">Total: ${total.toLocaleString("es-CL")}</h4>

                  <Button variant="success" onClick={handleCheckout}>
                    Pagar
                  </Button>
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
