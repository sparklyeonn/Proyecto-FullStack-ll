import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductItem({ imagenUrl, imagenAlt, titulo, artista, tipo, precio }) {
    return (
        <Card className="product-item">
            <Card.Img variant="top" src={imagenUrl} alt={imagenAlt} />
            <Card.Body className="text-center d-flex flex-column"> 

                <Card.Title as="h3">{titulo}</Card.Title>
                {artista && <p className="mb-1">{artista}</p>}
                {tipo && <p className="mb-2">{tipo}</p>}    

                <div className="mt-auto">
                    <span className="price">${precio}</span>
                    <br />
                    <Button className="btn-ritmo">Añadir al carrito</Button> 
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductItem;
