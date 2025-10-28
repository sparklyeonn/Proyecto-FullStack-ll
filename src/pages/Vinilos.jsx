import React from 'react';
import ProductItem from '../components/ProductItem.jsx';
import { Container } from 'react-bootstrap';
import { productos } from '../data/productos.js';

function Vinilos() {

    const productosVinilos = productos.filter(p => p.categoria === 'vinilo');

    return (
        <main>
            <Container className="my-5">
                <section className="welcome text-center">
                    <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Colección de Vinilos</h2>
                    <p className="lead">Explora nuestra exclusiva colección de vinilos y encuentra tus álbumes favoritos.</p>
                </section>

                <section className="vinilos mt-5">
                    <div className="product-grid">
                        {productosVinilos.map(producto => (
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

export default Vinilos;