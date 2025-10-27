import React from 'react';
import ProductItem from '../components/ProductItem'; 

import { productos } from '../data/productos.js';

function Cds() {
    const cds = productos.filter(producto => producto.categoria === 'cd');

    return (
        <main>
            <section className="welcome">
                <h2>Colección de CDs</h2>
                <p>Descubre nuestra variedad de álbumes en formato CD, desde los clásicos hasta los lanzamientos más recientes.</p>
            </section>

            <section className="featured-products">
                <div className="product-grid">
                    
                    {cds.map(producto => (
                        <ProductItem
                            key={producto.id}
                            id={producto.id} // <-- Importante para el link de detalle
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

export default Cds;