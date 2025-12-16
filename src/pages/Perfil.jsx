import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner, Button, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken, meRequest, isAdmin, logout } from "../services/authService";
import { obtenerPedidosPorUsuario } from "../services/pedidoService";

function Perfil() {
  const nav = useNavigate();

  const [user, setUser] = useState(null);

  const [pedidos, setPedidos] = useState([]);
  const [pedidosLoading, setPedidosLoading] = useState(false);
  const [pedidosError, setPedidosError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      nav("/login", { replace: true });
      return;
    }

    if (isAdmin()) {
      nav("/admin/productos", { replace: true });
      return;
    }

    const loadAll = async () => {
      try {
        setLoading(true);
        setError("");

        // Trae el perfil desde /api/auth/me
        const me = await meRequest();
        setUser(me);

        // Trae pedidos del usuario
        setPedidosLoading(true);
        setPedidosError("");

        const lista = await obtenerPedidosPorUsuario(me.id);
       
        setPedidos(Array.isArray(lista) ? lista : (lista?.pedidos ?? []));
      } catch (e) {
        setError(e.message || "No se pudo cargar el perfil");
      } finally {
        setPedidosLoading(false);
        setLoading(false);
      }
    };

    loadAll();
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

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {!loading && !error && user && (
        <>
          <h3>Información Personal</h3>
          <p>
            <strong>Nombre:</strong> {user.nombre}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <hr className="my-4" />

          <h3 className="mb-3">Mis pedidos</h3>

          {pedidosLoading && <Spinner animation="border" />}

          {pedidosError && (
            <Alert variant="warning" className="mt-3">
              {pedidosError}
            </Alert>
          )}

          {!pedidosLoading && !pedidosError && (
            <>
              {pedidos.length === 0 ? (
                <Alert variant="info">Aún no has realizado pedidos.</Alert>
              ) : (
                <ListGroup>
                  {pedidos.map((p) => (
                    <ListGroup.Item key={p.id}>
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                          <div className="fw-bold">
                            Pedido #{p.id}{" "}
                            {p.estado && <Badge bg="secondary">{p.estado}</Badge>}
                          </div>

                        
                          {p.fechaCreacion && (
                            <small className="text-muted">
                              Fecha: {new Date(p.fechaCreacion).toLocaleString("es-CL")}
                            </small>
                          )}
                        </div>

                        <div className="text-end">
                          {p.total != null && (
                            <div className="fw-bold">
                              Total: ${Number(p.total).toLocaleString("es-CL")}
                            </div>
                          )}
                          {p.items?.length != null && (
                            <small className="text-muted">{p.items.length} ítems</small>
                          )}
                        </div>
                      </div>

                      {/* Detalle simple de items  */}
                      {Array.isArray(p.items) && p.items.length > 0 && (
                        <ListGroup className="mt-2">
                          {p.items.map((it) => (
                            <ListGroup.Item key={it.id}>
                              <div className="d-flex justify-content-between">
                                <span>
                                  {it.producto?.titulo ?? "Producto"} x {it.cantidad}
                                </span>
                                {it.precioUnitario != null && (
                                  <span>
                                    ${Number(it.precioUnitario).toLocaleString("es-CL")}
                                  </span>
                                )}
                              </div>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default Perfil;
