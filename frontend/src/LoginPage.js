import React, { useReducer } from 'react';
//import './styles.css';
import axios from 'axios';

function login({ mail, password }) {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3005/login';

    axios.post(url, { mail, password })
      .then(response => {
        console.log('Respuesta del backend:', response.data);
        resolve(response.data);
      })
      .catch(error => {
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
        isProvider: action.isProvider,
        nombre: action.nombre,
        apellido: action.apellido,
        mail: action.mail,
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

export default function LoginPage({ onLoginSuccess }) {
const [loginState, loginDispatch] = useReducer(loginReducer, initialState);
const { mail, password, isLoading, error, isLoggedIn, token, isProvider, nombre, apellido } = loginState;

const onSubmit = async (e) => {
  e.preventDefault();
  loginDispatch({ type: 'login' });
  try {
    const response = await login({ mail, password });
    loginDispatch({
      type: 'success',
      token: response.token,
      isProvider: response.isProvider,
      nombre: response.nombre,
      apellido: response.apellido,
      mail: response.mail,
    });
    onLoginSuccess(response);
  } catch (error) {
    loginDispatch({ type: 'failure' });
  }
};

return (
  <div className="App">
    <div className="background-image"></div>
    <div className="login-container">
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
    </div>
  </div>
);
}