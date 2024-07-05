import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage.js';
import Register from './Register.js';
import RegisterProvider from './registerProvider.js';
import RegisterService from './registerService.js';
import SearchService from './searchService.js';
import ShowServices from './ShowServices.js'
import ShowContrats from './ShowContrats.js'
import MyComponent from './MyComponent.js';

import "./styles.css";
import "./index.css"

import Principal from './sections/Principal.jsx';
import Nosotros from './sections/Nosotros.jsx';
import Servicios from './sections/Servicios.jsx';
import Contacto from './sections/Contacto.jsx';
import Footer from './sections/Footer.jsx';
import "./assets/css/Home.css"

//import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';



function MyNavbar2({ navigate, user, onLogout }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // Estado para almacenar el mensaje seleccionado

  useEffect(() => {
    if (user && user.isProvider) {
      axios.get(`http://localhost:3005/messages/${user.mail}`, {
        headers: { 'Authorization': localStorage.getItem('token') }
      })
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
    }
  }, [user]);


  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="nav-button" onClick={() => navigate('/')}>Home</button>
      </div>
      <button className="nav-button" onClick={() => navigate('/searchService')} style={{ marginLeft: 'auto' }}>Buscar</button>

      {user && user.isProvider && (
        <>
          <button className="nav-button" onClick={() => navigate('/registerService')} style={{ marginLeft: 'auto' }}>Nuevos Servicios</button>
          <button className="nav-button" onClick={() => navigate('/myServices')} style={{ marginLeft: 'auto' }}>Mis Servicios</button>
          {messages.length > 0 && (
          <button className="nav-button" onClick={() => navigate('/myComponent')} style={{ marginLeft: 'auto', backgroundColor: 'red', color: 'white' }}>
          {`Messages (${messages.length})`}
          </button>
            
          )}
        </>
      )}

      {!user && (
        <>
          <button className="nav-button" onClick={() => navigate('/registerProvider')} style={{ marginLeft: 'auto' }}>Proveedores</button>
          <button className="nav-button" onClick={() => navigate('/register')} style={{ marginLeft: 'auto' }}>Registrarme</button>
          <button className="nav-button" onClick={() => navigate('/login')} style={{ marginLeft: 'auto' }}>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </button>
        </>
      )}

      {user && (
        <>
          {!user.isProvider && (
            <button className="nav-button" onClick={() => navigate('/myContrats')} style={{ marginLeft: 'auto' }}>Mis Contrataciones</button>
          )}
          <button id="logout" className="nav-button" onClick={onLogout} style={{ marginLeft: 'auto' }}>Logout</button>
          <span className="user-info">{user.isProvider ? `Proveedor: ${user.nombre} ${user.apellido}` : `Usuario: ${user.nombre} ${user.apellido}`}</span>
        </>
      )}
    </div>
  );
}


function MainPage() {
  return (
    <div className="main-container">

    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState('/');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('token', userData.token); // Guardar el token en localStorage
    setUser(userData);
    setRoute('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    setUser(null);
    setRoute('/');
  };

  const renderPage = () => {
    switch (route) {
      case '/':
        return <MainPage user={user} />;
      case '/login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case '/register':
        return <Register />;
      case '/registerProvider':
        return <RegisterProvider />;
      case '/registerService':
        return <RegisterService user={user}/>;
      case '/myServices':
        return <ShowServices user={user}/>;
      case '/searchService':
        return <SearchService user={user} />;
      case '/myContrats':
        return <ShowContrats user={user} />;
      case '/myComponent':
          return <MyComponent user={user} />;
      default:
        return <div>Página no encontrada</div>;
    }
  };

  const showSections = route === '/';

  return (
    <div className='gradient-background'>
      <MyNavbar2 navigate={setRoute} user={user} onLogout={handleLogout} />
      {showSections && <Principal />}
      {showSections && <Servicios />}
      {showSections && <Nosotros />}
      {showSections && <Contacto />}
      {showSections && <Footer />}
      {renderPage()}
    </div>
  );
}

