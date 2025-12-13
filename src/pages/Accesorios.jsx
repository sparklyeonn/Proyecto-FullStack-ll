import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem.jsx';
import { Container, Alert, Spinner } from 'react-bootstrap';

const API_URL = "http://18.206.208.70:8080";

function Accesorios() {

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

    const productosAccesorios = productos.filter(
        p => p.categoria?.nombre?.toLowerCase() === 'accesorios'
    );

    return (
        <main>
            <Container className="my-5">

                <section className="welcome text-center">
                    <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Accesorios</h2>
                    <p className="lead">
                        Complementa tu pasión por la música con nuestra selección de accesorios únicos.
                    </p>
                </section>

                {loading && (
                    <div className="d-flex justify-content-center my-4">
                        <Spinner animation="border" />
                    </div>
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && !error && productosAccesorios.length === 0 && (
                    <Alert variant="warning">No hay accesorios disponibles.</Alert>
                )}

                <section className="accesorios mt-5">
                    <div className="product-grid">
                        {productosAccesorios.map(producto => (
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

export default Accesorios;
