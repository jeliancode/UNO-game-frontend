import React, { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import SkipImage from "../assets/skip.png";
import ReverseImage from "../assets/reverse.png";
import PlusTwoImage from "../assets/plus-two.png";
import PlusFourImage from "../assets/plus-four.png";
import WildCardImage from "../assets/change-color.png";
import GoOutImage from "../assets/go-out.png";

const WS_URL = "ws://localhost:3000";

const GameScreen = () => {
  const { messages, sendMessage } = useWebSocket(WS_URL);
  const [discardCard, setDiscardCard] = useState({ color: "red", value: "7" });
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) return;

    switch (lastMessage.event) {
      case "card_played":
        setDiscardCard(lastMessage.card);
        break;

      case "next_turn":
        setCurrentPlayer(lastMessage.nextPlayer);
        setTimer(lastMessage.timeLeft); // ⏳ Recibir tiempo del backend
        break;

      case "turn_timeout":
        alert(`⏳ Tiempo agotado! Cambio de turno.`);
        setCurrentPlayer(lastMessage.nextPlayer);
        setTimer(lastMessage.timeLeft);
        break;

      case "timer_update":
        setTimer(lastMessage.timeLeft); // ⏳ Actualizar tiempo dinámicamente
        break;

      default:
        break;
    }
  }, [messages]);

  const playCard = (card) => {
    sendMessage({
      type: "PLAY_CARD",
      gameId: "67c65f155afdaba4cb7c13f2",
      playerId: "67b92379277b3e9968d21eb6",
      card,
    });
  };

  return (
    <div className="game-screen">
      <button className="go-out-button">
        <img src={GoOutImage} alt="Go Out" />
      </button>

      {/* Temporizador sincronizado con backend */}
      <div className="timer">{timer} s</div>

      <div className="game-container">
        <div className="game-info">
          <h3>Jugador actual: {currentPlayer}</h3>
          <p>Tiempo restante: {timer} segundos</p>
        </div>

        <div className="center-cards">
          <div className="deck-card">
            <span>UNO</span>
          </div>

          <button className="uno-button">SAY UNO</button>

          <div
            className="discard-card"
            style={{ backgroundColor: discardCard.color }}
          >
            <span className="card-value">{discardCard.value}</span>
          </div>
        </div>

        <div className="player-cards">
          {[
            { color: "red", value: 5 },
            { color: "blue", value: 2 },
            { color: "green", value: "0", image: SkipImage },
          ].map((card, index) => (
            <div
              key={index}
              className="player-card"
              style={{ backgroundColor: card.color }}
              onClick={() => playCard(card)}
            >
              <span className="card-value">{card.value}</span>
              {card.image && <img src={card.image} alt={card.value} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
