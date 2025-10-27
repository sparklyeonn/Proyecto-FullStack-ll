import React from 'react';

function ProductItem({ imagenUrl, imagenAlt, titulo, artista, tipo, precio }) {
    return (
        <article className="product-item">
            <h3>{titulo}</h3>
            <img src={imagenUrl} alt={imagenAlt} />
            <p>{artista}</p>
            <p>{tipo}</p>
            <span className="price">${precio}</span>
            <br />
            <button>Añadir al carrito</button>
        </article>
    );
}

export default ProductItem;