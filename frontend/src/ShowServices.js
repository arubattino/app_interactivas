import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShowServices({ user }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (user && user.isProvider) {
            const token = localStorage.getItem('token');
            axios.get('http://localhost:3005/myServices', {
                headers: { 'Authorization': token }
            })
                .then(response => setServices(response.data))
                .catch(error => console.error('Error fetching services:', error));
        }
    }, [user]);

    const handleEliminar = (serviceId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:3005/services/${serviceId}`, {
                headers: { 'Authorization': token }
            })
                .then(response => {
                    setServices(services.filter(service => service._id !== serviceId));
                    alert('Servicio eliminado');
                })
                .catch(error => console.error('Error eliminando el servicio:', error));
        }
    };

    const handleEditar = (serviceId) => {
        // Aquí puedes redirigir a una página de edición o abrir un modal
        alert(`Editando el servicio con ID: ${serviceId}`);
    };

    if (!user || !user.isProvider) {
        return <div>No autorizado</div>;
    }

    return (
        <div className="show-services-container">
            {services.map((service) => (
                <div key={service._id} className="ms-service-card">
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
                        onClick={() => handleEliminar(service._id)}
                        className="ms-contratar-button"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={() => handleEditar(service._id)}
                        className="ms-contratar-button"
                    >
                        Editar
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ShowServices;
