import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShowContrats({ user }) {
    const [contrats, setContrats] = useState([]);

    useEffect(() => {
        if (user && !user.isProvider) {
            const token = localStorage.getItem('token');
            axios.get('http://localhost:3005/contratos', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                setContrats(response.data);
            })
            .catch(error => console.error('Error fetching contracts:', error));
        }
    }, [user]);

    const handleCancelar = (contratId) => {
        if (window.confirm('¿Estás seguro de que quieres cancelar este contrato?')) {
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:3005/contratos/${contratId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => {
                    setContrats(contrats.filter(contrat => contrat._id !== contratId));
                    alert('Contrato cancelado');
                })
                .catch(error => console.error('Error cancelando el contrato:', error));
        }
    };

    if (!user || user.isProvider) {
        return <div>No autorizado</div>;
    }

    return (
        <div className="show-contrats-container">
            {contrats.length === 0 ? (
                <p>No tienes contratos aún.</p>
            ) : (
                contrats.map((contrat) => (
                    <div key={contrat._id} className="ms-contrat-card">
                        <p><strong>Tipo de Servicio:</strong> {contrat.servicio.tipo_servicio}</p>
                        <p><strong>Precio:</strong> ${contrat.servicio.precio}</p>
                        <p><strong>Frecuencia:</strong> {contrat.servicio.frecuencia}</p>
                        <p><strong>Duración:</strong> {contrat.servicio.duracion}</p>
                        <p><strong>Tipo de Animal:</strong> {contrat.servicio.tipo_animal}</p>
                        <p><strong>Barrio:</strong> {contrat.servicio.barrio}</p>
                        <p><strong>Dirección:</strong> {contrat.servicio.direccion}</p>
                        <p><strong>Teléfono:</strong> {contrat.servicio.telefono}</p>
                        <p><strong>Email de Contacto:</strong> {contrat.servicio.mail_contacto}</p>
                        <p><strong>Nombre del Contacto:</strong> {contrat.servicio.nombre_contacto}</p>
                        <p><strong>Descripción:</strong> {contrat.servicio.descripcion_general}</p>
                        <button
                            onClick={() => handleCancelar(contrat._id)}
                            className="ms-contratar-button"
                        >
                            Cancelar
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ShowContrats;