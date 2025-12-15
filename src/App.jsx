import React from 'react';
import './styles.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Cds from './pages/Cds';
import Contacto from './pages/Contacto';
import Accesorios from './pages/Accesorios';
import Vinilos from './pages/Vinilos';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ProductoDetalle from './pages/ProductoDetalle';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';

// los import de admin
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminLogin from './pages/admin/AdminLogin';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminRoute from "./components/AdminRoute";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas de Cliente */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="cds" element={<Cds />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="accesorios" element={<Accesorios />} />
          <Route path="vinilos" element={<Vinilos />} />
          <Route path="login" element={<Login />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="producto/:id" element={<ProductoDetalle />} />
          <Route path="registro" element={<Registro />} />
          <Route path="carrito" element={<Carrito />} />
        </Route>

        {/* Rutas de Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminProductos />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
