import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setIsAuthenticated, setUser, setAccessToken } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        username: formData.username,
        password: formData.password,
      };
      const response = await login(credentials);

      if (response.success) {
        setAccessToken(response.data.access_token);
        const userData = {
          username: response.data.username,
          userId: response.data.userId,
        };
        setUser(userData);
        localStorage.setItem("username", response.data.username);
        setIsAuthenticated(true);
        setError("");
        navigate("/");
      } else {
        setError(response.error.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return { formData, handleChange, handleSubmit, navigate, error };
};
