import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, joinGame, logout } from "../services/api";

const MenuScreen = () => {
  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    title: "",
    rules: "",
    maxPlayers: "",
  });
  const [joinFormData, setJoinFormData] = useState({
    idGame: "",
  });

  const handleCreateGameClick = () => {
    setShowCreateForm(!showCreateForm);
  };
  const handleJoinGameClick = () => {
    setShowJoinForm(!showJoinForm);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({
      ...createFormData,
      [name]: value,
    });
  };

  const handleJoinChange = (e) => {
    const { name, value } = e.target;
    setJoinFormData({
      ...joinFormData,
      [name]: value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createGame(createFormData);
      if (response.success) {
        const gameId = response.data.gameId;
        joinGame(gameId);
        navigate(`/room/${gameId}`);
      } else {
        console.error("Error al crear el juego:", response.error);
        alert("Error al crear el juego. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al crear el juego:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await joinGame(joinFormData.idGame);
      if (response.success) {
        navigate(`/room/${joinFormData.idGame}`);
      } else {
        console.error("Error al unirse al juego:", response.error);
        alert("Error al unirse al juego. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al unirse al juego:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      } else {
        alert("Error al cerrar sesión:", response.error.message);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  const handleJoinCancel = () => {
    setShowJoinForm(false);
  };

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
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Contenedor de las opciones del juego */}
      <div className="game-options">
        {/* Opción "Create Game" */}
        <div
          className="game-option create-game"
          onClick={!showCreateForm ? handleCreateGameClick : undefined} // Solo manejar clic si el formulario no está visible
        >
          {showCreateForm ? (
            <form onSubmit={handleCreateSubmit} className="create-form">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={createFormData.title}
                  onChange={handleCreateChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rules">Rules:</label>
                <textarea
                  id="rules"
                  name="rules"
                  value={createFormData.rules}
                  onChange={handleCreateChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxPlayers">Max Players:</label>
                <input
                  type="number"
                  id="maxPlayers"
                  name="maxPlayers"
                  value={createFormData.maxPlayers}
                  onChange={handleCreateChange}
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  Create
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCreateCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h2>Create Game</h2>
          )}
        </div>

        {/* Opción "Join Game" */}
        <div
          className="game-option join-game"
          onClick={!showJoinForm ? handleJoinGameClick : undefined} // Solo manejar clic si el formulario no está visible
        >
          {showJoinForm ? (
            <form onSubmit={handleJoinSubmit} className="join-form">
              <div className="form-group">
                <label htmlFor="idGame">Game ID:</label>
                <input
                  type="text"
                  id="idGame"
                  name="idGame"
                  value={joinFormData.idGame}
                  onChange={handleJoinChange}
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  Join
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleJoinCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h2>Join Game</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
