import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
return (
    <header>
    <div className="logo">
        <Link to="/">
        <img 
            src="/assets/img/ritmo-lab.png" 
            alt="Logo de Ritmo Lab" 
            className="logo-header" 
        />
        </Link>
    </div>
    <nav>
        <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/cds">CDs</Link></li>
        <li><Link to="/vinilos">Vinilos</Link></li>
        <li><Link to="/accesorios">Accesorios</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
        <li><Link to="/login">Mi Cuenta</Link></li>
        </ul>
    </nav>
    </header>
 );
}

export default Header;