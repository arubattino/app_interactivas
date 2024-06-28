import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/Nosotros.css';

const Nosotros = () => {
  return (
    <section id="nosotros" className="section">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={12}>
            <h1>Nosotros</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <p className="text">
              "En Woofly nos comprometemos a cuidar y atender a cada tipo de mascota con el mismo amor y dedicación. Desde perros y gatos, hasta aves, conejos y reptiles, nuestra prioridad es garantizar su felicidad, seguridad y bienestar, en cada interacción y servicio que ofrecemos. Tu mascota es nuestra principal motivación, y nos esforzamos por brindarle la mejor experiencia posible junto a profesionales altamente capacitados y dispuestos."
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col>
            <p className="footer-text">
              <span className="highlight">Woofly</span> Desde 2018 brindándote la tranquilidad que mereces
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Nosotros;