import React from "react";
import SkipImage from "../assets/skip.png";
import ReverseImage from "../assets/reverse.png";
import PlusTwoImage from "../assets/plus-two.png";
import PlusFourImage from "../assets/plus-four.png";
import WildCardImage from "../assets/change-color.png";
import GoOutImage from "../assets/go-out.png";

const GameScreen = () => {
  // Datos de ejemplo para las cartas del jugador y la carta en el descarte
  const playerCards = [
    { color: "red", value: 5 },
    { color: "blue", value: 2 },
    { color: "green", value: "0", image: SkipImage }, // Símbolo para Skip
    { color: "yellow", value: "⇆", image: ReverseImage }, // Símbolo para Reverse
    { color: "blue", value: "+2", image: PlusTwoImage },
    { color: "black", value: "+4", image: PlusFourImage },
    { color: "black", value: "🎨​", image: WildCardImage }, // Símbolo para Wild
  ];

  const discardCard = { color: "red", value: "7" };

  // Datos de ejemplo para las cartas de los rivales
  const opponentsCards = [
    { player: "opponent1", cards: 5 },
    { player: "opponent2", cards: 3 },
    { player: "opponent3", cards: 4 },
  ];

  return (
    <div className="game-screen">
      {/* Botón en la esquina superior derecha */}
      <button className="go-out-button">
        <img src={GoOutImage} alt="Go Out" />
      </button>

      {/* Contenedor principal */}
      <div className="game-container">
        {/* Mazo de cartas y descarte */}
        <div className="center-cards">
          {/* Mazo de cartas (negro con la palabra UNO) */}
          <div className="deck-card">
            <span>UNO</span>
          </div>

          {/* Botón circular "SAY UNO" */}
          <button className="uno-button">
            SAY UNO
          </button>

          {/* Cuadro de descartes */}
          <div className="discard-card" style={{ backgroundColor: discardCard.color }}>
            <span className="card-value top-left">{discardCard.value}</span>
            <span className="card-value center">{discardCard.value}</span>
            <span className="card-value bottom-right">{discardCard.value}</span>
          </div>
        </div>

        {/* Cartas de los rivales */}
        <div className="opponents-cards">
          {/* Jugador superior */}
          <div className="opponent-group top">
            {Array.from({ length: opponentsCards[0].cards }).map((_, index) => (
              <div key={index} className="opponent-card">
                <span>UNO</span>
              </div>
            ))}
            {/* Botón "CHALLENGE" para el jugador superior */}
            <button className="challenge-button top">
              CHALLENGE
            </button>
          </div>

          {/* Jugador izquierdo */}
          <div className="opponent-group left">
            {Array.from({ length: opponentsCards[1].cards }).map((_, index) => (
              <div key={index} className="opponent-card">
                <span>UNO</span>
              </div>
            ))}
            {/* Botón "CHALLENGE" para el jugador izquierdo */}
            <button className="challenge-button left">
              CHALLENGE
            </button>
          </div>

          {/* Jugador derecho */}
          <div className="opponent-group right">
            {Array.from({ length: opponentsCards[2].cards }).map((_, index) => (
              <div key={index} className="opponent-card">
                <span>UNO</span>
              </div>
            ))}
            {/* Botón "CHALLENGE" para el jugador derecho */}
            <button className="challenge-button right">
              CHALLENGE
            </button>
          </div>
        </div>

        {/* Mazo del jugador principal*/}
        <div className="player-cards">
          {playerCards.map((card, index) => (
            <div
              key={index}
              className="player-card"
              style={{ backgroundColor: card.color }}
            >
              {/* Mostrar el valor en las esquinas */}
              <span className="card-value top-left">{card.value}</span>
              <span className="card-value bottom-right">{card.value}</span>
              {/* Mostrar la imagen en el centro si es una carta especial */}
              <span className="card-value center">
                {card.image ? <img src={card.image} alt={card.value} /> : card.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;