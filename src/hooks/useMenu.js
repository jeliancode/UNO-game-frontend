import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, joinGame, logout } from "../services/api";

export const useMenu = () => {
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

  return {
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
  };
};
