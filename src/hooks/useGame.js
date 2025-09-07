import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  initializeDeck,
  dealCards,
  getGameState,
  initializeDiscardPile,
  getCardDetails,
  getPlayerTurn,
} from "../services/api";

export const useGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerCards, setPlayerCards] = useState([]);
  const [discardCard, setDiscardCard] = useState(null);
  const [opponentsCards, setOpponentsCards] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [direction, setDirection] = useState("clockwise");
  const [timer, setTimer] = useState(10);
  const intervalRef = useRef(null);

  const storedUsername = localStorage.getItem("username") || "";
  const [username] = useState(storedUsername);

  const handleNextTurn = async () => {
    try {
      const gameState = await getGameState(id);
      if (!gameState.success) {
        console.error("Error al obtener el estado del juego");
        return;
      }

      const { currentPlayerIndex, direction } = gameState.data;

      if (currentPlayerIndex === null || currentPlayerIndex === undefined) {
        console.error("currentPlayerIndex es null o undefined");
        return;
      }

      const turnData = {
        direction: direction,
        currentPlayerIndex: currentPlayerIndex,
        step: 1,
      };

      const response = await getPlayerTurn(turnData, id);
      if (response.success) {
        setCurrentPlayerIndex(response.data.currentPlayerIndex);
        setDirection(response.data.direction);
        resetTimer(); // Reinicia el temporizador
      }
    } catch (error) {
      console.error("Error al avanzar el turno:", error);
    }
  };

  // Reiniciar el temporizador y llamar a `handleNextTurn` automáticamente
  const resetTimer = () => {
    setTimer(10);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleNextTurn(); // Llama automáticamente al siguiente turno
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const startGame = async () => {
      try {
        await initializeDeck(id);
        await initializeDiscardPile(id);
        await dealCards(id, 7);

        const gameState = await getGameState(id);
        if (gameState.success) {
          updateGameState(gameState.data);
        }
      } catch (error) {
        console.error("Error al iniciar el juego:", error);
      }
    };

    const updateGameState = async (gameState) => {
      const { players, discardPile, currentPlayerIndex, direction } = gameState;

      setCurrentPlayerIndex(currentPlayerIndex);
      setDirection(direction);

      const currentPlayer = players.find((p) => p.username === username);
      if (!currentPlayer) {
        alert("El usuario no está en la partida.");
        return;
      }

      const playerCardsDetails = await Promise.all(
        currentPlayer.hand.map(async (cardId) => {
          const response = await getCardDetails(cardId);
          return response.data;
        })
      );
      setPlayerCards(playerCardsDetails);

      if (discardPile.length > 0) {
        const discardCardResponse = await getCardDetails(
          discardPile[discardPile.length - 1]
        );
        setDiscardCard(discardCardResponse.data);
      } else {
        setDiscardCard(null);
      }

      const filteredOpponents = players
        .map((p, index) => ({
          username: p.username,
          cards: p.hand.length,
          isTurn: index === currentPlayerIndex,
        }))
        .filter((p) => p.username !== username);

      setOpponentsCards(filteredOpponents);

      resetTimer();
    };

    startGame();

    const eventSource = new EventSource(
      `http://localhost:3000/api/sse-game/${id}`
    );

    eventSource.onmessage = async (event) => {
      try {
        const gameState = JSON.parse(event.data);
        await updateGameState(gameState);
      } catch (error) {
        console.error("Error procesando datos SSE:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error en la conexión SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id, username]);

  return {
    navigate,
    playerCards,
    discardCard,
    opponentsCards,
    currentPlayerIndex,
    timer,
  };
};
