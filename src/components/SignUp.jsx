import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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

  return (
    <div className="app-container">
      <div className="title-container">
        <h1>UNO</h1>
        <p className="or-text">or:</p>
        <button className="nav-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      <div className="form-container">
        <div className="signup-container">
          <h2>Sign-up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Sign-up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
