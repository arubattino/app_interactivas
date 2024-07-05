import React, { useState } from 'react';
import axios from 'axios';

function MyComponent({ user }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const showMessageContent = () => {
    axios.get(`http://localhost:3005/messages/${user.mail}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      if (response.data && response.data.length > 0) {
        setMessages(response.data);  // Almacena todos los mensajes en el estado
        setError(null); // Limpia cualquier error previo
      } else {
        setMessages([]); // Limpia los mensajes en caso de que no haya ninguno
        setError('No messages found');
      }
    })
    .catch(error => {
      console.error('Error al obtener mensajes:', error);
      setError('Error al obtener mensajes. Inténtelo nuevamente más tarde.');
      setMessages([]); // Limpia los mensajes en caso de error
    });
  };

  return (
    <div className="ms-components-card">
        <div className="background-image"></div>
      <button onClick={showMessageContent} className="ms-components-button">Mostrar Mensajes</button>
      <br></br>
      {error && <p>{error}</p>}

      {messages.length > 0 && (
        messages.map(message => (
          <div key={message.id}>
            <h2>Nuevo Pedido de Servicio:</h2>
            <p>Proveedor: {message.proveedorMail}</p>
            <p>Contenido: {message.mensaje}</p>
            <p>Servicio: {message.serviceType}</p>
            <p>Precio: ${message.price}</p>
            <p>Mascota: {message.animal}</p>
            <p>Fecha de Pedido: {message.fecha_envio}</p>
            <br></br>
          </div>
        ))
      )}
    </div>
  );
}

export default MyComponent;