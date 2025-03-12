import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  initializeDeck,
  dealCards,
  getGameState,
  initializeDiscardPile,
  getCardDetails,
} from "../services/api";
import GoOutImage from "../assets/go-out.png";

const GameScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerCards, setPlayerCards] = useState([]);
  const [discardCard, setDiscardCard] = useState(null);
  const [opponentsCards, setOpponentsCards] = useState([]);
  const storedUsername = localStorage.getItem("username") || "";
  const [username] = useState(storedUsername);

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
      const { players, discardPile } = gameState;

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
        .filter((p) => p.username !== username)
        .map((opponent) => ({
          username: opponent.username,
          cards: opponent.hand.length,
        }));

      setOpponentsCards(filteredOpponents);
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
    };
  }, [id, username]);

  return (
    <div className="game-container">
      {/* Oponentes */}
      <div className="opponents-container">
        {opponentsCards.map((opponent, index) => {
          let opponentClass = "";
          if (index === 0) opponentClass = "opponent-top";
          if (index === 1) opponentClass = "opponent-left";
          if (index === 2) opponentClass = "opponent-right";

          return (
            <div key={index} className={`opponent ${opponentClass}`}>
              <p>{opponent.username}</p>
              <div className="opponent-hand">
                {Array(opponent.cards)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="card back">
                      UNO
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Área central */}
      <div className="center-cards">
        <div className="deck-area">
          <div className="card deck">UNO</div>
          {discardCard && (
            <div
              className="card discard"
              style={{ backgroundColor: discardCard.color }}
            >
              <p>{discardCard.value}</p>
              {discardCard.symbol && <p>{discardCard.symbol}</p>}
            </div>
          )}
        </div>
        <button className="uno-button">SAY UNO!</button>
      </div>

      {/* Cartas del jugador */}
      <div className="player-hand">
        {playerCards.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{ backgroundColor: card.color }}
          >
            <p>{card.value}</p>
            {card.symbol && <p>{card.symbol}</p>}
          </div>
        ))}
      </div>

      {/* Botón para salir */}
      <div className="exit-button" onClick={() => navigate("/")}>
        <img src={GoOutImage} alt="Salir" />
      </div>
    </div>
  );
};

export default GameScreen;
