import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
    return (
        <>
            <nav style={{ padding: "1rem", background: "#222", color: "white" }}>
                <h2>Panel Admin</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><Link to="/admin" style={{ color: "white" }}>Dashboard</Link></li>
                    <li><Link to="/admin/productos" style={{ color: "white" }}>Productos</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
