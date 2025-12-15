import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Perfil() {
    const navigate = useNavigate();

    const [auth, setAuth] = useState({
        token: '',
        userId: '',
        nombre: '',
        email: '',
        rol: ''
    });

    const [pedidos] = useState([
        { id: "12345", estado: "Enviado" },
        { id: "12346", estado: "Procesando" }
    ]);

    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        const userId = localStorage.getItem("userId") || "";
        const nombre = localStorage.getItem("nombre") || "";
        const email = localStorage.getItem("email") || "";
        const rol = localStorage.getItem("rol") || "";

        if (!token) {
            navigate("/login");
            return;
        }

        setAuth({ token, userId, nombre, email, rol });
    }, [navigate]);

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("nombre");
        localStorage.removeItem("email");
        localStorage.removeItem("rol");
        navigate("/login");
    };

    const esAdmin = auth.rol === "ROLE_ADMIN" || auth.rol === "ADMIN";

    return (
        <Container as="main" className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="m-0">Mi Perfil</h2>
                <Button variant="outline-danger" onClick={cerrarSesion}>
                    Cerrar sesión
                </Button>
            </div>

            <p className="text-muted">
                Aquí puedes ver tu información y gestionar tus compras.
            </p>

            <section className="profile-section mb-4">
                <h3>Información Personal</h3>
                <p><strong>Nombre:</strong> {auth.nombre || "—"}</p>
                <p><strong>Email:</strong> {auth.email || "—"}</p>
                <p><strong>Rol:</strong> {auth.rol || "—"}</p>
            </section>

            {esAdmin && (
                <Alert variant="warning">
                    <strong>Modo Administrador:</strong> tu cuenta tiene permisos de administración.
                    <div className="mt-2">
                        <Link to="/admin" className="btn btn-dark btn-sm">
                            Ir al Panel Admin
                        </Link>
                    </div>
                </Alert>
            )}

            <section className="orders-section">
                <h3>Mis Pedidos</h3>

                {pedidos.length === 0 ? (
                    <p className="text-muted">Aún no tienes pedidos.</p>
                ) : (
                    <ListGroup>
                        {pedidos.map((pedido) => (
                            <ListGroup.Item key={pedido.id}>
                                Pedido #{pedido.id} — Estado: <strong>{pedido.estado}</strong>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </section>
        </Container>
    );
}

export default Perfil;


