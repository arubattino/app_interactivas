import React, { useReducer } from "react";
//import "./styles.css";
import axios from 'axios';

// Función de registro para proveedores de servicios
function RegisterProvider({ nombre, apellido, mail, password, descripcion, pais, provincia, ciudad, barrio, direccion }) {
  return new Promise((resolve, reject) => {
    // URL del servidor de registro para proveedores
    const url = 'http://localhost:3005/registerProvider';

    // Realizar solicitud POST para registrar un nuevo proveedor de servicios
    axios.post(url, { nombre, apellido, mail, password, descripcion, pais, provincia, ciudad, barrio, direccion })
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
  nombre: "",
  apellido: "",
  mail: "",
  password: "",
  descripcion: "",
  pais: "",
  provincia: "",
  ciudad: "",
  barrio: "",
  direccion: "",
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
    case 'reset':
      return initialState; // Resetea el estado del formulario
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
  const { nombre, apellido, mail, password, descripcion, pais, provincia, ciudad, barrio, direccion, isLoading, error, isRegistered } = registerState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    registerDispatch({ type: "register" });

    try {
      const response = await RegisterProvider({ nombre, apellido, mail, password, descripcion, pais, provincia, ciudad, barrio, direccion });
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
              Registrar otro Proveedor
            </button>
          </>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Registro de Proveedores:</p>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "nombre",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "apellido",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
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
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "descripcion",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="País"
              value={pais}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "pais",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Provincia"
              value={provincia}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "provincia",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={ciudad}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "ciudad",
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
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

