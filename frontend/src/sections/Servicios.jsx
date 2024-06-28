import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../assets/css/Servicios.css';

const Servicios = () => {
  return (
    <Container className="services-container" id='servicios'>
      <h1 className="title text-center">Nuestros Servicios</h1>
      <p className="text-center">
        Contamos con una amplia gama de servicios para brindarles una mejor calidad de vida a tus mascotas
      </p>
      <Row className="justify-content-center">
        {/* Primera Card */}
        <Col xs={12} md={6} lg={3} >
          <Card className="service-card fondo">
            <Card.Body>
              <Card.Title className="services-title">Petsitting</Card.Title>
              <Card.Text className='services-text'>
                ¡Ahora puedes viajar tranquilo! De tus mascotas se encarga <span className="highlight">Woofly</span>
              </Card.Text>
              <Button variant="primary" className="service-button">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Segunda Card */}
        <Col xs={12} md={6} lg={3} >
          <Card className="service-card fondo">
            <Card.Body>
              <Card.Title className="services-title">Baños</Card.Title>
              <Card.Text className='services-text'>
                Tus mascotas mas limpias y con mejor olor gracias a <span className="highlight">Woofly</span>.
              </Card.Text>
              <Button variant="primary" className="service-button">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Tercera Card */}
        <Col xs={12} md={6} lg={3} >
          <Card className="service-card fondo">
            <Card.Body>
              <Card.Title className="services-title">Paseos</Card.Title>
              <Card.Text className='services-text'>
                Deja su diversión en manos de <span className="highlight">Woofly</span>. Tus mascotas más sociables y relajadas en las noches.
              </Card.Text>
              <Button variant="primary" className="service-button">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Cuarta Card */}
        <Col xs={12} md={6} lg={3} >
          <Card className="service-card fondo">
            <Card.Body>
              <Card.Title className="services-title">Adiestramiento</Card.Title>
              <Card.Text className='services-text'>
              Junto a <span className="highlight">Woofly</span> lograras que tu mascota sea mas sociable
              </Card.Text>
              <Button variant="primary" className="service-button">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Servicios;
