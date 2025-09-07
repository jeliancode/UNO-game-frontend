import GoOutImage from "../assets/go-out.png";
import { useGame } from "../hooks/useGame";

const GameScreen = () => {
  const {
    navigate,
    playerCards,
    discardCard,
    opponentsCards,
    currentPlayerIndex,
    direction,
    timer,
  } = useGame();

  return (
    <div className="game-container">
      {/* Temporizador en la esquina superior derecha */}
      <div className="timer-container">
        <p>Tiempo restante: {timer} segundos</p>
      </div>

      {/* Oponentes */}
      <div className="opponents-container">
        {opponentsCards.map((opponent, index) => {
          let opponentClass = "";
          if (index === 0) opponentClass = "opponent-top";
          if (index === 1) opponentClass = "opponent-left";
          if (index === 2) opponentClass = "opponent-right";

          return (
            <div
              key={index}
              className={`opponent ${opponentClass} ${
                opponent.isTurn ? "highlight-turn" : ""
              }`}
            >
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
      <div
        className={`player-hand ${
          currentPlayerIndex === opponentsCards.length ? "highlight-turn" : ""
        }`}
      >
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
