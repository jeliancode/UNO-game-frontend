import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { startGame } from "../services/api";
import PlayerIcon from "../assets/cuenta.png";

const Room = () => {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3000/api/sse-players/${gameId}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updatedPlayers = data.players;
      setPlayers(updatedPlayers);
    };

    eventSource.onerror = (error) => {
      console.error("Error en la conexión SSE:", error);
      console.error("Estado de la conexión:", eventSource.readyState);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [gameId]);

  const handleStartGame = async () => {
    try {
      await startGame(gameId);
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.error("Error al iniciar el juego:", error);
      alert("No se pudo iniciar el juego. Inténtalo de nuevo.", error);
    }
  };

  return (
    <div className="room-screen">
      <div className="players-row">
        {players.map((player) => (
          <div key={player.id} className="player-item">
            <img src={PlayerIcon} alt="Player" className="player-icon" />
            <span className="player-username">{player.username}</span>
          </div>
        ))}
      </div>

      <div className="game-id-box">
        <span>Game ID: {gameId}</span>
      </div>

      <button className="start-button" onClick={handleStartGame}>
        START
      </button>
    </div>
  );
};

export default Room;
