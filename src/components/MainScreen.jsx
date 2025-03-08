import React from "react";

const MainScreen = () => {
  return (
    <div className="main-screen">
      {/* Icono de perfil en la esquina superior izquierda */}
      <div className="profile-icon">
        <span role="img" aria-label="profile">
          👤
        </span>
      </div>

      {/* Botón de logout en la esquina superior derecha */}
      <div className="logout-button">
        <button>Logout</button>
      </div>

      {/* Contenedor de las opciones del juego */}
      <div className="game-options">
        {/* Opción "Create Game" */}
        <div className="game-option create-game">
          <h2>Create Game</h2>
        </div>

        {/* Opción "Join Game" */}
        <div className="game-option join-game">
          <h2>Join Game</h2>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;