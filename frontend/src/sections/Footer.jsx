import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3}>
            <h5>Sobre Nosotros</h5>
            <p>
              Somos una empresa dedicada a ofrecer los mejores servicios para tus mascotas.
            </p>
          </Col>
          <Col md={3}>
            <h5>Enlaces Rápidos</h5>
            <Nav className="flex-column">
              <Nav.Link href="#nosotros">Nosotros</Nav.Link>
              <Nav.Link href="#servicios">Servicios</Nav.Link>
              <Nav.Link href="#contact">Contacto</Nav.Link>
            </Nav>
          </Col>
          <Col md={3}>
            <h5>Soporte</h5>
            <Nav className="flex-column">
              <Nav.Link href="#faq">Preguntas Frecuentes</Nav.Link>
              <Nav.Link href="#terminos">Términos y Condiciones</Nav.Link>
              <Nav.Link href="#privacidad">Política de Privacidad</Nav.Link>
            </Nav>
          </Col>
          <Col md={3}>
            <h5>Contacto</h5>
            <p>
              Email: info@woofly.com<br />
              Teléfono: +123 456 7890<br />
              Dirección: Calle Falsa 123, CABA, Argentina
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p className="footer-text">© 2024 Woofly. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
