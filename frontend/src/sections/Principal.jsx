import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../assets/css/Principal.css';
import perro from '../assets/images/perroPpal.png'


const Principal = () => {
  return (
    <section id="principal" className="principal-section">
      <div className="background-image"></div> 
      <Container fluid> 
        <Row>
          <Col xs={12} lg={8} className="align-self-center">
            <h1>
              Bienvenidos a{' '}
              <span className="highlight">Woofly</span>
            </h1>
            <p>La mejor opción para tus hijos de cuatro patas</p>
          </Col>
          
          <Col lg={4} className='d-none d-lg-block'>
            <div className="dog-image">
              <Image src={perro} alt='Dog' fluid></Image>
            </div>
          </Col>
        </Row>
      </Container>
      
    </section>
  );
};

export default Principal;

