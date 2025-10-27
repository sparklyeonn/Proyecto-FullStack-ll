import React from 'react';
import ProductItem from '../components/ProductItem'; 

import { productos } from '../data/productos.js';

function Accesorios() {
    const accesorios = productos.filter(producto => producto.categoria === 'accesorio');

    return (
        <main>
            <section className="welcome">
                <h2>Accesorios</h2>
                <p>Complementa tu pasión por la música con nuestra selección de accesorios únicos: desde artículos prácticos hasta piezas de colección diseñadas para fans como tú.</p>
            </section>
            
            <section className="accesorios">
                <div className="product-grid">

                    {accesorios.map(producto => (
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

export default Accesorios;