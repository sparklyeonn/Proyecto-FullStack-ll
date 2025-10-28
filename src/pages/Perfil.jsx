import React from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';


function Perfil() {

    const userInfo = {
        nombre: "Juan Pérez",
        email: "juan.perez@example.com"
    };

    const pedidos = [
        { id: "12345", estado: "Enviado" },
        { id: "12346", estado: "Procesando" }
    ];

    return (
        <Container as="main" className="my-4">
            <h2>Bienvenido a tu perfil</h2>
            <p>Aquí puedes gestionar tu información personal y tus pedidos.</p>

            <section className="profile-section mb-4">
                <h3>Información Personal</h3>
                <p><strong>Nombre:</strong> {userInfo.nombre}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
            </section>

            <section className="orders-section">
                <h3>Mis Pedidos</h3>


                <ListGroup>

                    {pedidos.map((pedido) => (
                        <ListGroup.Item key={pedido.id}>
                            Pedido #{pedido.id} - Estado: {pedido.estado}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </section>
        </Container>
    );
}

export default Perfil;