import React from 'react';
import { Link } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useApp } from '../context/AppContext.jsx';

function ProductItem({ producto }) {

    const { handleAddToCart } = useApp();

    const onAddToCart = () => {
        handleAddToCart(producto);
    };

    return (
        <Card className="product-item">
            <Link to={`/producto/${producto.id}`}>
                <Card.Img
                    variant="top"
                    src={producto.imagenUrl}
                    alt={producto.imagenAlt}
                />
            </Link>

            <Card.Body className="text-center d-flex flex-column">

                <Card.Title as="h3">
                    <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {producto.titulo}
                    </Link>
                </Card.Title>

                {producto.artista && <p className="mb-1">{producto.artista}</p>}
                {producto.tipo && <p className="mb-2">{producto.tipo}</p>}

                <div className="mt-auto">
                    <span className="price">${producto.precio.toLocaleString('es-CL')}</span>
                    <br />
                    <Button className="btn-ritmo" onClick={onAddToCart}>
                        Añadir al carrito
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductItem;