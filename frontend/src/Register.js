import React, { useReducer } from "react";
//import "./styles.css";
import axios from 'axios';

// Función de registro
function register({ nombre, apellido, mail, password, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion }) {
  return new Promise((resolve, reject) => {
    // URL del servidor de registro
    const url = 'http://localhost:3005/registerUser';

    // Realizar solicitud POST para registrar un nuevo usuario
    axios.post(url, { nombre, apellido, mail, password, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion })
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
  mascota: "",
  edad_mascota: "",
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
    default:
      return state;
  }
}

export default function App() {
  const [registerState, registerDispatch] = useReducer(registerReducer, initialState);
  const { nombre, apellido, mail, password, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion, isLoading, error, isRegistered } = registerState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    registerDispatch({ type: "register" });

    try {
      const response = await register({ nombre, apellido, mail, password, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion });
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
      <div className="register-container">
        {isRegistered ? (
          <>
            <h1>Registration Successful!</h1>
            <button onClick={() => registerDispatch({ type: "reset" })}>
              Register Another User
            </button>
          </>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Registro de Nuevo Usuario:</p>
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
              placeholder="Mascota"
              value={mascota}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "mascota",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Edad de la Mascota"
              value={edad_mascota}
              onChange={(e) =>
                registerDispatch({
                  type: "fieldUpdate",
                  field: "edad_mascota",
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
