import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import '../assets/css/Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Configuración para enviar el correo con EmailJS
    const serviceID = 'service_01pgmtr'; 
    const templateID = 'template_zjzormv'; 
    const userID = 'mvVtztDFzWOnOJKyH'; 

    // Prepara los datos para enviar según la plantilla de EmailJS
    const templateParams = {
      name: formData.nombre,
      email: formData.email,
      message: formData.mensaje
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Correo enviado:', response.status, response.text);
      }, (error) => {
        console.error('Error al enviar el correo:', error);
      });

    // Limpiar el formulario después del envío
    setFormData({
      nombre: '',
      email: '',
      mensaje: ''
    });
  };

  return (
    <Container className="contacto-container" id='contacto'>
      <h1 className="text-center">Contacto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre" name="nombre" onChange={handleChange} value={formData.nombre} required />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu email" name="email" onChange={handleChange} value={formData.email} required />
        </Form.Group>

        <Form.Group controlId="formMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Escribe tu mensaje aquí" name="mensaje" onChange={handleChange} value={formData.mensaje} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default Contacto;
