import React from 'react';
import ProductItem from '../components/ProductItem.jsx';
import { Container } from 'react-bootstrap';
import { productos } from '../data/productos.js';

function Cds() {

    const productosCds = productos.filter(p => p.categoria === 'cd');

    return (
        <main>
            <Container className="my-5">
                <section className="welcome text-center">
                    <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Colección de CDs</h2>
                    <p className="lead">Descubre nuestra variedad de álbumes en formato CD, desde los clásicos hasta los lanzamientos más recientes.</p>
                </section>

                <section className="featured-products mt-5">
                    <div className="product-grid">
                        {productosCds.map(producto => (
                            <ProductItem
                                key={producto.id}
                                producto={producto}
                            />
                        ))}
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default Cds;