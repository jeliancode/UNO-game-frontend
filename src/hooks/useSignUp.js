import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
  });
  const { setIsAuthenticated, setUser } = useAuth();
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
      const userData = {
        username: formData.username,
        email: formData.email,
        age: formData.age,
        password: formData.password,
      };
      const response = await register(userData);
      if (response.success) {
        const userData = {
          username: response.data.username,
          userId: response.data.userId,
        };
        setUser(userData);
        localStorage.setItem("username", response.data.username);
        setIsAuthenticated(true);
        setError("");
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Error al registrarse");
    }
  };

  return { formData, handleChange, handleSubmit, navigate, error };
};
