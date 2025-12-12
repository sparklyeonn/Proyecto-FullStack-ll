import React, { useEffect, useMemo, useState } from 'react';
import ProductItem from '../components/ProductItem.jsx';
import { Container, Alert, Spinner } from 'react-bootstrap';


const API_URL = "http://18.206.208.70:8080";

function Vinilos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

        const data = await res.json();
        setProductos(Array.isArray(data) ? data : (data.content ?? []));
      } catch (e) {
        setError(e.message || "No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const productosVinilos = useMemo(() => {
    // Filtra por nombre de categoría "Vinilos" (como te devuelve tu backend)
    return productos.filter(p => {
      const nombreCat = (p.categoria?.nombre || "").toLowerCase();
      return nombreCat === "vinilos" || nombreCat === "vinilo";
    });
  }, [productos]);

  return (
    <main>
      <Container className="my-5">
        <section className="welcome text-center">
          <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Colección de Vinilos</h2>
          <p className="lead">
            Explora nuestra exclusiva colección de vinilos y encuentra tus álbumes favoritos.
          </p>
        </section>

        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" />
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {!loading && !error && productosVinilos.length === 0 && (
          <Alert variant="warning" className="mt-4">
            Aún no hay vinilos cargados (o la categoría no coincide).
          </Alert>
        )}

        <section className="vinilos mt-5">
          <div className="product-grid">
            {productosVinilos.map(producto => (
              <ProductItem key={producto.id} producto={producto} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

export default Vinilos;