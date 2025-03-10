import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGamePlayers, startGame } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../room.css";

const Room = () => {
  const { gameId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getGamePlayers(gameId);
        if (response.success) {
          setPlayers(response.players);
          setCreator(response.creator);
        }
      } catch (error) {
        console.error("Error al obtener jugadores:", error.message);
      }
    };

    fetchPlayers();
  }, [gameId]);

  const handleStartGame = async () => {
    try {
      const response = await startGame(gameId);
      if (response.success) {
        navigate(`/game/${gameId}`);
      } else {
        alert("Error al iniciar el juego");
      }
    } catch (error) {
      console.error("Error al iniciar el juego:", error.message);
    }
  };

  return (
    <div className="room-container">
      <h2>Sala de espera</h2>
      {/* Mostrar jugadores en fila */}
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id} className="player-icon">
            {player.username[0].toUpperCase()}
          </div>
        ))}
      </div>

      {/* Cuadro de texto para el ID del juego */}
      <div className="game-id-container">
        <input type="text" value={gameId} readOnly className="game-id-input" />
      </div>

      {/* Botón de inicio */}
      {user.id === creator && (
        <button className="start-button" onClick={handleStartGame}>
          Iniciar juego
        </button>
      )}
    </div>
  );
};

export default Room;
