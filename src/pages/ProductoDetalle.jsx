import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ id, titulo, artista, tipo, precio, imagenUrl, imagenAlt }) {
    
    return (
 
        <Link to={`/producto/${id}`} className="product-item-link">
            <article className="product-item">
                

                <img src={imagenUrl} alt={imagenAlt} className="product-image" />
                
                <div className="product-info-item">
                    <h3>{titulo}</h3>
                    <p>{artista}</p>
                    <p className="product-price">${precio}</p>
                    <button type="button" className="product-button">Añadir al carrito</button>
                </div>
            </article>
        </Link>
    );
}

export default ProductItem;