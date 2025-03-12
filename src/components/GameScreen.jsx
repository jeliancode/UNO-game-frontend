import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  initializeDeck,
  dealCards,
  getGameState,
  initializeDiscardPile,
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
          const { players, discardPile } = gameState.data;

          const currentPlayer = players.find((p) => p.username === username);
          if (!currentPlayer) {
            alert("El usuario no está en la partida.");
            return;
          }
          setPlayerCards(currentPlayer?.hand || []);

          setDiscardCard(
            discardPile.length > 0 ? discardPile[discardPile.length - 1] : null
          );

          const filteredOpponents = players
            .filter((p) => p.username !== username)
            .map((opponent) => ({
              username: opponent.username,
              cards: opponent.hand.length,
            }));

          setOpponentsCards(filteredOpponents);
        }
      } catch (error) {
        console.error("Error al iniciar el juego:", error);
      }
    };

    startGame();
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
                    <div key={i} className="card back"></div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Área central */}
      <div className="center-cards">
        <div className="deck-area">
          <div className="card deck">Mazo</div>
          <div className="card discard">
            {discardCard ? discardCard.value : "Vacío"}
          </div>
        </div>
        <button className="uno-button">SAY UNO!</button>
      </div>

      {/* Cartas del jugador */}
      <div className="player-hand">
        {playerCards.map((card, index) => (
          <div key={index} className="card">
            {card.value}
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
