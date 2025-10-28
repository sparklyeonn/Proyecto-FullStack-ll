import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importamos componentes de Navbar

function Header() {
  return (
    // Usamos Navbar de Bootstrap
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="ritmo-lab-navbar"> 
      <Container> {/* Para centrar el contenido */}
        {/* El logo ahora es parte de la Navbar */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/img/ritmo-lab.png"
            alt="Logo de Ritmo Lab"
            height="30" // Ajusta la altura según necesites
            className="d-inline-block align-top logo-header" // Mantenemos tu clase por si tienes estilos específicos
          />
        </Navbar.Brand>
        
        {/* Botón para menú responsivo (hamburguesa) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Contenido colapsable */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ms-auto alinea los links a la derecha */}
          <Nav className="ms-auto">
            {/* Usamos Nav.Link de Bootstrap y NavLink de react-router para estilo activo */}
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/cds">CDs</Nav.Link>
            <Nav.Link as={NavLink} to="/vinilos">Vinilos</Nav.Link>
            <Nav.Link as={NavLink} to="/accesorios">Accesorios</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Mi Cuenta</Nav.Link> 
            {/* Podrías añadir íconos aquí si quieres */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;