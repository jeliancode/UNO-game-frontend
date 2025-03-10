import React from "react";

const Room = () => {
  const gameId = "67c65f155afdaba4cb7c13f2"; // Ejemplo de ID del juego

  return (
    <div className="room-container">
      <div className="players-container">
        <div className="player-icon"></div>
        <div className="player-icon"></div>
        <div className="player-icon"></div>
        <div className="player-icon"></div>
      </div>
      <div className="game-id-container">
        <input type="text" value={gameId} readOnly className="game-id-input" />
      </div>
      <button className="start-button">Start</button>
    </div>
  );
};

export default Room;
