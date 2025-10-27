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

function Layout() {
  return (
    <>
      <Header />  
      
      <Outlet />  
      
      <Footer />  
    </>
  );
}

// Rutas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route index element={<Inicio />} /> 
          
          <Route path="cds" element={<Cds />} />

          <Route path="contacto" element={<Contacto />} />
          
          <Route path="accesorios" element={<Accesorios />} />

          <Route path="vinilos" element={<Vinilos />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;