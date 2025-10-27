import React from 'react';
import ProductItem from '../components/ProductItem'; 

import { productos } from '../data/productos.js';

function Vinilos() {
    const vinilos = productos.filter(producto => producto.categoria === 'vinilo');

    return (
        <main>
            <section className="welcome">
                <h2>Colección de Vinilos</h2>
                <p>Explora nuestra exclusiva colección de vinilos y encuentra tus álbumes favoritos.</p>
            </section>

            <section className="vinilos">
                <div className="product-grid">

                    {vinilos.map(producto => (
                        <ProductItem
                            key={producto.id}
                            id={producto.id}
                            titulo={producto.titulo}
                            artista={producto.artista}
                            tipo={producto.categoria}
                            precio={producto.precio}
                            imagenUrl={producto.imagenUrl}
                            imagenAlt={producto.imagenAlt}
                        />
                    ))}

                </div>
            </section>
        </main>
    );
}

export default Vinilos;