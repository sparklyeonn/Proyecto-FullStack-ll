import React from 'react';
import ProductItem from '../components/ProductItem.jsx';
import { Container } from 'react-bootstrap';
import { productos } from '../data/productos.js';

function Accesorios() {

    const productosAccesorios = productos.filter(p => p.categoria === 'accesorio');

    return (
        <main>
            <Container className="my-5">
                <section className="welcome text-center">
                    <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Accesorios</h2>
                    <p className="lead">Complementa tu pasión por la música con nuestra selección de accesorios únicos.</p>
                </section>

                <section className="accesorios mt-5">
                    <div className="product-grid">
                        {productosAccesorios.map(producto => (
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

export default Accesorios;