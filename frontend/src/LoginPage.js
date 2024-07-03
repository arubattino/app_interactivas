import React, { useReducer } from 'react';
//import './styles.css';
import axios from 'axios';

function login({ mail, password }) {
    return new Promise((resolve, reject) => {
      // URL del servidor de autenticación
      const url = 'http://localhost:3005/login';
  
      // Realizar solicitud POST para iniciar sesión
      axios.post(url, { mail, password })
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
  mail: '',
  password: '',
  isProvider: false,
  isLoading: false,
  error: '',
  isLoggedIn: false,
  token: null,
};

function loginReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoading: true,
      };
    case 'success':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        token: action.token,
        isProvider: action.isProvider
      };
    case 'failure':
      return {
        ...state,
        error: 'Incorrect mail or password!',
        isLoading: false,
      };
    case 'logout':
      return initialState;
    case 'fieldUpdate':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}

export default function LoginPage() {
  const [loginState, loginDispatch] = useReducer(loginReducer, initialState);
  const { mail, password, isLoading, error, isLoggedIn, token, isProvider } = loginState;

  const onSubmit = async (e) => {
    e.preventDefault();
    loginDispatch({ type: 'login' });
    try {
      const response = await login({ mail, password });
      loginDispatch({ type: 'success', token: response.token, isProvider: response.isProvider });
    } catch (error) {
      loginDispatch({ type: 'failure' });
    }
  };

  
  // LA LINEA DEL TOKEN ESTA COMENTADA PARA QUE NO SE IMPRIMA EN PANTALLA, ELIMINAR O DESMARCAR !!
  return (
    <div className="App">
      <div className="login-container">
      {isLoggedIn ? (
            <>
                <h1>Bienvenidos {isProvider ? 'Proveedor' : 'Usuario'}!</h1>
                {/* <p>Token: {token}</p> */}
                <button onClick={() => loginDispatch({ type: 'logout' })}>Log Out</button>
            </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Inicio de Sesión</p>
            <input
              type="email"
              placeholder="email"
              value={mail}
              onChange={(e) =>
                loginDispatch({
                  type: 'fieldUpdate',
                  field: 'mail',
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                loginDispatch({
                  type: 'fieldUpdate',
                  field: 'password',
                  value: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}