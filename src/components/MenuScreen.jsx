import { useMenu } from "../hooks/useMenu";

const MenuScreen = () => {
  const {
    joinFormData,
    createFormData,
    showCreateForm,
    showJoinForm,
    handleCreateCancel,
    handleCreateChange,
    handleCreateGameClick,
    handleCreateSubmit,
    handleJoinCancel,
    handleJoinChange,
    handleJoinGameClick,
    handleJoinSubmit,
    handleLogout,
  } = useMenu();
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
          onClick={!showCreateForm ? handleCreateGameClick : undefined}
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
          onClick={!showJoinForm ? handleJoinGameClick : undefined}
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
