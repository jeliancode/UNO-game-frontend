import axios from 'axios';

// Obtén la URL de la API desde las variables de entorno
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Usamos la URL del .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getGames = async () => {
  try {
    const response = await api.get('/games');  // Aquí pon la ruta que quieres consultar
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

export const createGame = async (gameData) => {
  try {
    const response = await api.post('/games', gameData);  // Ruta para crear un juego
    return response.data;
  } catch (error) {
    console.error("Error creating game:", error);
  }
};
