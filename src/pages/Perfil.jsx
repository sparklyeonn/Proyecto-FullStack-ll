import React, { useEffect, useState } from "react";
import { Container, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken, logout, meRequest } from "../services/authService";

function Perfil() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      nav("/login", { replace: true });
      return;
    }

    const loadMe = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await meRequest();
        setUser(data);
      } catch (e) {
        setError(e.message || "No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, [nav]);

  const handleLogout = () => {
    logout();
    nav("/login", { replace: true });
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Mi Perfil</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      {loading && <Spinner animation="border" />}

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {!loading && !error && user && (
        <>
          <h3>Información Personal</h3>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      )}
    </Container>
  );
}

export default Perfil;
