import axios from "axios";
import {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  GAME_ENDPOINTS,
  DECKS_ENPOINTS,
  CARD_ENDPOINTS,
} from "../config/api";

const getToken = () => {
  return localStorage.getItem("access_token");
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error en el servidor:", error.response);
      throw error.response.data;
    } else {
      throw new Error("Error de conexión con el servidor");
    }
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    if (error.response) {
      console.error("Error en el servidor:", error.response);
      throw error.response.data;
    } else {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
};

export const logout = async () => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfile = async (userId) => {
  try {
    const response = await api.get(`${AUTH_ENDPOINTS.PROFILE}/${userId}`);
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createGame = async (gameData) => {
  try {
    const response = await api.post(GAME_ENDPOINTS.CREATE_GAME, gameData);
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw (
        error.response?.data || new Error("Error de conexión con el servidor")
      );
    }
  }
};

export const joinGame = async (gameId) => {
  try {
    const response = await api.post(`${GAME_ENDPOINTS.JOIN_GAME}/${gameId}`);
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Error de conexión con el servidor");
    }
  }
};

export const getGamePlayers = async (gameId) => {
  try {
    const response = await api.get(`${GAME_ENDPOINTS.GET_PLAYERS}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los jugadores:", error);
    throw error;
  }
};

export const startGame = async (gameId) => {
  try {
    const response = await api.patch(`${GAME_ENDPOINTS.START_GAME}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
    throw error;
  }
};

export const initializeDeck = async (gameId) => {
  try {
    const response = await api.post(
      `${DECKS_ENPOINTS.INITIALIZE_DECK}/${gameId}`
    );
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    console.error("Error al iniciar el mazo", error);
    throw error;
  }
};

export const dealCards = async (gameId, cardsPerPlayer) => {
  try {
    const response = await api.post(`${DECKS_ENPOINTS.DEAL_CARDS}/${gameId}`, {
      cardsPerPlayer,
    });
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    console.error("Error al repartir las cartas", error);
    throw error;
  }
};

export const getGameState = async (gameId) => {
  try {
    const response = await api.get(`${GAME_ENDPOINTS.GET_STATE}/${gameId}`);
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    console.error("Error obtener los datos del juego ", error);
    throw error;
  }
};

export const initializeDiscardPile = async (gameId) => {
  try {
    const response = await api.post(
      `${DECKS_ENPOINTS.INITIALIZE_DISCARD_PILE}/${gameId}`
    );
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    console.error("Error iniciar el mazo de descartes ", error);
    throw error;
  }
};

export default api;

export const getCardDetails = async (cardId) => {
  try {
    const response = await api.get(
      `${CARD_ENDPOINTS.GET_CARD_BY_ID}/${cardId}`
    );
    if (!response || !response.data) {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
    return response.data;
  } catch (error) {
    console.error("Error al obtener carta ", error);
    throw error;
  }
};
