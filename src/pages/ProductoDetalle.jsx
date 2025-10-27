import React from 'react';
import { useParams } from 'react-router-dom';
import { productos } from '../data/productos.js';

function DetalleProducto() {
    const { id } = useParams();
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return (
            <main>
                <h2>Producto no encontrado</h2>
            </main>
        );
    }

    return (
        // FÍJATE: Sin <header> ni <footer>
        <main>
            <section className="product-detail">
                <div className="product-container">
                    <img src={producto.imagenUrl} alt={producto.imagenAlt} />
                    <div className="product-info">
                        <h1>{producto.titulo} - {producto.artista}</h1>
                        <p><strong>Formato:</strong> {producto.categoria}</p>
                        <p><strong>Precio:</strong> ${producto.precio}</p>
                        <p><strong>Descripción:</strong> {producto.descripcion}</p>
                        <button type="button">Añadir al carrito</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DetalleProducto;