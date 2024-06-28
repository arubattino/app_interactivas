import React, { useState } from 'react';
import LoginPage from './LoginPage.js';
import Register from './Register.js';
import RegisterProvider from './registerProvider.js';
import RegisterService from './registerService.js';
import SearchService from './searchService.js';
import "./styles.css";
import "./index.css"

import Principal from './sections/Principal.jsx';
import Nosotros from './sections/Nosotros.jsx';
import Servicios from './sections/Servicios.jsx';
import Contacto from './sections/Contacto.jsx';
import Footer from './sections/Footer.jsx';
import "./assets/css/Home.css"

import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './assets/css/Navbar.css'; 
import logo from './assets/images/Logo.png'


const MyNavbar = () => {
  return (
    <Navbar fixed="top" bg="custom" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#principal">
          <img
            src={logo}
            width="65"
            height="65"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto">
            <NavDropdown title="Servicios" id="basic-nav-dropdown" className="custom-dropdown nav-item-padding">
              <NavDropdown.Item href="#action/3.1">Petsitting</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Baños</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Adiestramiento</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Paseos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#nosotros" className='nav-item-padding'>Nosotros</Nav.Link>
            <Nav.Link href="#contacto" className='nav-item-padding'>Contacto</Nav.Link>
            <Form className="d-flex nav-item-padding" inline>
              <FormControl
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-custom">Buscar</Button>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link href="#login"><FontAwesomeIcon icon={faUser} className="user-icon" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function MyNavbar2({ navigate }) {
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
      <button className="nav-button" onClick={() => navigate('/login')} style={{ marginLeft: 'auto' }}>
        <FontAwesomeIcon icon={faUser} className="user-icon" />
      </button>
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

  const showSections = route === '/';

  return (
    <div className='gradient-background'>
      <MyNavbar2 navigate={setRoute} />
      {showSections && <Principal />}
      {showSections && <Servicios />}
      {showSections && <Nosotros />}
      {showSections && <Contacto />}
      {showSections && <Footer />}
      {renderPage()}
    </div>
  );
}