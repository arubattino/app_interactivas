import React from "react";

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <p><strong>Tipo de Servicio:</strong> {service.tipo_servicio}</p>
      <p><strong>Precio:</strong> ${service.precio}</p>
      <p><strong>Tipo de Animal:</strong> {service.tipo_animal}</p>
      <p><strong>Barrio:</strong> {service.barrio}</p>
      <p><strong>Dirección:</strong> {service.direccion}</p>
      <p><strong>Teléfono:</strong> {service.telefono}</p>
      <p><strong>Email de Contacto:</strong> {service.mail_contacto}</p>
      <p><strong>Nombre del Contacto:</strong> {service.nombre_contacto}</p>
      <p><strong>Descripción:</strong> {service.descripcion_general}</p>
    </div>
  );
}

export default ServiceCard;
