import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userData) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
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

export const login = async (credentials) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Error desconocido");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
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
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
