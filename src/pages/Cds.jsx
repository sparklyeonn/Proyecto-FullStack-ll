import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem.jsx';
import { Container, Alert, Spinner } from 'react-bootstrap';

const API_URL = "http://18.206.208.70:8080";

function Cds() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/api/productos`);
                if (!res.ok) throw new Error("Error al cargar productos");

                const data = await res.json();
                setProductos(Array.isArray(data) ? data : (data.content ?? []));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const productosCds = productos.filter(
        p => p.categoria?.nombre?.toLowerCase() === 'cd'
    );

    return (
        <main>
            <Container className="my-5">

                <section className="welcome text-center">
                    <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Colección de CDs</h2>
                    <p className="lead">
                        Descubre nuestra variedad de álbumes en formato CD,
                        desde los clásicos hasta los lanzamientos más recientes.
                    </p>
                </section>

                {loading && (
                    <div className="d-flex justify-content-center my-4">
                        <Spinner animation="border" />
                    </div>
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && !error && productosCds.length === 0 && (
                    <Alert variant="warning">No hay CDs disponibles.</Alert>
                )}

                <section className="featured-products mt-5">
                    <div className="product-grid">
                        {productosCds.map(producto => (
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

export default Cds;
