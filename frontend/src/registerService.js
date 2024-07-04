import React, { useReducer } from "react";
//import "./styles.css";
import axios from 'axios';

// Función de registro para servicios
function registerService({ mail, password, tipo_servicio, precio, tipo_animal, barrio, direccion, telefono, mail_contacto, frecuencia, duracion, nombre_contacto, descripcion_general }) {
  return new Promise((resolve, reject) => {
    // URL del servidor de registro para servicios
    const url = 'http://localhost:3005/registerService';

    // Realizar solicitud POST para registrar un nuevo servicio
    axios.post(url, { mail, password, tipo_servicio, precio, tipo_animal, barrio, direccion, telefono, mail_contacto, frecuencia, duracion, nombre_contacto, descripcion_general })
      .then(response => {
        // Imprimir la respuesta en la consola
        console.log('Respuesta del backend:', response.data);
        // Si la solicitud es exitosa, resuelve la promesa con los datos de respuesta
        resolve(response.data);
      })
      .catch(error => {
        // Si hay un error, rechaza la promesa con el error
        reject(error);
      });
  });
}

const initialState = {
  mail: "",
  password: "",
  tipo_servicio: "",
  precio: "",
  tipo_animal: "",
  barrio: "",
  direccion: "",
  telefono: "",
  mail_contacto: "",
  frecuencia: "",
  duracion: "",
  nombre_contacto: "",
  descripcion_general: "",
  isLoading: false,
  error: "",
  isRegistered: false,
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case "register":
      return {
        ...state,
        isLoading: true,
      };
    case "success":
      return {
        ...state,
        isRegistered: true,
        isLoading: false,
      };
    case "failure":
      return {
        ...state,
        error: action.error || "Error occurred!",
        isLoading: false,
      };
    case "fieldUpdate":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}


export default function App() {
  const [registerState, registerDispatch] = useReducer(registerReducer, initialState);
  const { mail, password, tipo_servicio, precio, tipo_animal, barrio, direccion, telefono, mail_contacto, frecuencia, duracion, nombre_contacto, descripcion_general, isLoading, error, isRegistered } = registerState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    registerDispatch({ type: "register" });

    try {
      const response = await registerService({ mail, password, tipo_servicio, precio, tipo_animal, barrio, direccion, telefono, mail_contacto, frecuencia, duracion, nombre_contacto, descripcion_general });
      registerDispatch({ type: "success" });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        registerDispatch({ type: "failure", error: 'El correo electrónico ya está registrado' });
      } else {
        registerDispatch({ type: "failure", error: error.response?.data?.message || error.message });
      }
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="background-image"></div> 
      <div className="register-container">
        {isRegistered ? (
          <>
            <h1>Registro Exitoso!</h1>
            <button onClick={() => registerDispatch({ type: "reset" })}>
              Registrar otro Servicio
            </button>
          </>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Registro de Servicios:</p>
            <input
              type="email"
              placeholder="Email del Proveedor"
              value={mail}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "mail",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password del Proveedor"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "password",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Tipo de Servicio"
              value={tipo_servicio}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "tipo_servicio",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "precio",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Tipo de Animal"
              value={tipo_animal}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "tipo_animal",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Barrio"
              value={barrio}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "barrio",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "direccion",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "telefono",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email de Contacto"
              value={mail_contacto}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "mail_contacto",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Frecuencia"
              value={frecuencia}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "frecuencia",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Duración"
              value={duracion}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "duracion",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Nombre del Contacto"
              value={nombre_contacto}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "nombre_contacto",
                  value: e.currentTarget.value,
                })
              }
            />
            <textarea
              placeholder="Descripción General"
              value={descripcion_general}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "descripcion_general",
                  value: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}