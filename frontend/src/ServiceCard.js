import React from "react";

function ServiceCard({ service, user }) {
  const handleContratarClick = async () => {
    if (!user || user.isProvider || user === null) {
        console.log("No logueado o es proveedor");
    } else {
        const confirm = window.confirm(`¿Estás seguro de que deseas contratar el servicio: ${service.tipo_servicio}?`);
        if (confirm) {
            try {
                // Contratar servicio
                const responseContrato = await fetch('http://localhost:3005/hireService', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, // Enviar el token en la cabecera
                    },
                    body: JSON.stringify({
                        serviceId: service._id,
                        userMail: user.mail
                    })
                });

                const dataContrato = await responseContrato.json();
                if (!responseContrato.ok) {
                    throw new Error(`Error al contratar servicio: ${dataContrato.error}`);
                }

                // Enviar mensaje al proveedor
                const responseMensaje = await fetch('http://localhost:3005/sendMessageToProvider', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, // Enviar el token en la cabecera
                    },
                    body: JSON.stringify({
                        serviceId: service._id,
                        userMail: user.mail,
                        serviceType: service.tipo_servicio,
                        price: service.precio,
                        animal: service.tipo_animal,
                        proveedorMail: service.mail_contacto,  // Correo del proveedor
                        mensaje: `El usuario ${user.mail} a solicitado sus servicios.`  // Agrega aquí tu mensaje
                    })
                });

                const dataMensaje = await responseMensaje.json();
                if (!responseMensaje.ok) {
                    throw new Error(`Error al enviar mensaje al proveedor: ${dataMensaje.error}`);
                }

                alert('Servicio contratado exitosamente');
            } catch (error) {
                console.error('Error al contratar el servicio:', error);
                alert('Error al contratar el servicio');
            }
        }
    }
};

  return (
    <div className="ms-service-card">
      <p><strong>Tipo de Servicio:</strong> {service.tipo_servicio}</p>
      <p><strong>Precio:</strong> ${service.precio}</p>
      <p><strong>Frecuencia:</strong> {service.frecuencia}</p>
      <p><strong>Duración:</strong> {service.duracion}</p>
      <p><strong>Tipo de Animal:</strong> {service.tipo_animal}</p>
      <p><strong>Barrio:</strong> {service.barrio}</p>
      <p><strong>Dirección:</strong> {service.direccion}</p>
      <p><strong>Teléfono:</strong> {service.telefono}</p>
      <p><strong>Email de Contacto:</strong> {service.mail_contacto}</p>
      <p><strong>Nombre del Contacto:</strong> {service.nombre_contacto}</p>
      <p><strong>Descripción:</strong> {service.descripcion_general}</p>
      <button
        onClick={handleContratarClick}
        disabled={!user || user.isProvider || user === null}
        className="ms-contratar-button"
      >
        Contratar
      </button>
    </div>
  );
}

export default ServiceCard;
