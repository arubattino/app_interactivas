import React, { useReducer } from "react";
//import "./styles.css";
import axios from 'axios';
import ServiceCard from "./ServiceCard.js";

// Función para buscar servicios
function searchServices(query) {
  return new Promise((resolve, reject) => {
    // URL del servidor de búsqueda de servicios
    const url = `http://localhost:3005/searchServices?query=${query}`;

    // Realizar solicitud GET para buscar servicios
    axios.get(url)
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
  query: "",
  results: [],
  isLoading: false,
  error: "",
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case "search":
      return {
        ...state,
        isLoading: true,
      };
    case "success":
      return {
        ...state,
        results: action.results,
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

export default function App({ user }) {
  const [searchState, searchDispatch] = useReducer(searchReducer, initialState);
  const { query, results, isLoading, error } = searchState;

  const handleSearch = async (e) => {
    e.preventDefault();

    searchDispatch({ type: "search" });

    try {
      const response = await searchServices(query);
      searchDispatch({ type: "success", results: response });
    } catch (error) {
      searchDispatch({ type: "failure", error: error.response?.data?.message || error.message });
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="background-image"></div>
      <div className="search-container">
        <form className="form" onSubmit={handleSearch}>
          {error && <p className="error">{error}</p>}
          <p>Buscar Servicios:</p>
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) =>
              searchDispatch({
                type: "fieldUpdate",
                field: "query",
                value: e.currentTarget.value,
              })
            }
          />
          <button className="submit" type="submit" disabled={isLoading}>
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </form>
        <div className="results-container">
          {results.length > 0 ? (
            results.map((service, index) => (
              <ServiceCard key={index} service={service} user={user} />
            ))
          ) : (
            <p>No se encontraron servicios.</p>
          )}
        </div>
      </div>
    </div>
  );
}