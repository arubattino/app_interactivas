import React, { useState } from 'react';
import LoginPage from './LoginPage.js';
import Register from './Register.js';
import RegisterProvider from './registerProvider.js';
import RegisterService from './registerService.js';
import SearchService from './searchService.js';
import "./styles.css";

function Navbar({ navigate }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="nav-button" onClick={toggleMenu}>Home</button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => { navigate('/'); setMenuOpen(false); }}>Página Principal</button>
            <button className="dropdown-item" onClick={() => { navigate('/'); setMenuOpen(false); }}>Otras Opciones</button>
            {/* más opciones aca */}
          </div>
        )}
      </div>
      <button className="nav-button" onClick={() => navigate('/searchService')} style={{ marginLeft: 'auto' }}>Buscar</button>
      <button className="nav-button" onClick={() => navigate('/registerService')} style={{ marginLeft: 'auto' }}>Nuevos Servicio</button>
      <button className="nav-button" onClick={() => navigate('/registerProvider')} style={{ marginLeft: 'auto' }}>Proveedores</button>
      <button className="nav-button" onClick={() => navigate('/register')} style={{ marginLeft: 'auto' }}>Registrarme</button>
      <button className="nav-button" onClick={() => navigate('/login')} style={{ marginLeft: 'auto' }}>Login</button>
    </div>
  );
}

function MainPage() {
  return (
    <div className="main-container">
      <h1>Bienvenido a nuestro servicio de Petsitting</h1>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState('/');

  const renderPage = () => {
    switch (route) {
      case '/':
        return <MainPage />;
      case '/login':
        return <LoginPage />;
      case '/register':
          return <Register />;
      case '/registerProvider':
          return <RegisterProvider />;
      case '/registerService':
          return <RegisterService />;
      case '/searchService':
          return <SearchService />;
      default:
        return <div>Página no encontrada</div>;
    }
  };

  return (
    <div>
      <Navbar navigate={setRoute} />
      {renderPage()}
    </div>
  );
}