import React from "react";

function ServiceCard({ service, user }) {
    //console.log("Usuario es:", user ? user.isProvider : 'No logueado');

  const handleContratarClick = () => {
    if (!user || user.isProvider || user === null) {
      console.log("No logueado o es proveedor");
    } else {
      console.log("Usuario es:", user.isProvider);
      // Aquí puedes realizar la acción de contratar el servicio
      alert(`Contratando el servicio: ${service.tipo_servicio}`);
    }
  };
  console.log("Usuario ServiceCard:", user ? user.isProvider : 'No logueado');

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