export const API_BASE_URL = "http://localhost:3000/api";

export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  PROFILE: "/auth/profile",
};

export const GAME_ENDPOINTS = {
  CREATE_GAME: "/games/create",
  JOIN_GAME: "/games/join",
  START_GAME: "/games/start",
  GET_PLAYERS: "/games/players",
  GET_STATE: "/games/state",
};

export const DECKS_ENPOINTS = {
  INITIALIZE_DECK: "/decks/initialize",
  DEAL_CARDS: "/decks/deal",
  INITIALIZE_DISCARD_PILE: "/decks/discard-pile",
};

export const CARD_ENDPOINTS = {
  GET_CARD_BY_ID: "/cards",
};

export const TURNS_ROUTES = {
  GET_PLAYER_TURN: "/turns/playerTurn",
};
