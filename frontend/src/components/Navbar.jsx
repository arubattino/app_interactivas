import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Navbar.css'; 
import logo from '../assets/images/Logo.png'
import LoginPage from './LoginPage';

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

export default MyNavbar;
