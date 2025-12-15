import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { isLoggedIn, isAdmin } from "../services/authService";

function Header() {
    const nav = useNavigate();

    const logged = isLoggedIn();
    const admin = isAdmin();

    const handleLogout = () => {
        logout();
        nav("/login", { replace: true });
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="ritmo-lab-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/assets/img/ritmo-lab.png"
                        alt="Logo de Ritmo Lab"
                        height="30"
                        className="d-inline-block align-top logo-header"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-lg-center">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/cds">CDs</Nav.Link>
                        <Nav.Link as={NavLink} to="/vinilos">Vinilos</Nav.Link>
                        <Nav.Link as={NavLink} to="/accesorios">Accesorios</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>

                        {/* MI CUENTA: cambia según sesión */}
                        {!logged ? (
                            <Nav.Link as={NavLink} to="/login">Mi Cuenta</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to={admin ? "/admin" : "/perfil"}>
                                    {admin ? "Admin" : "Mi Perfil"}
                                </Nav.Link>

                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="ms-lg-2 mt-2 mt-lg-0"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
