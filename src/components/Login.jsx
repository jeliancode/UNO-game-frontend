import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/api";

const Login = ({ toggleView }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setIsAuthenticated, setUser } = useAuth();
  const [error, setError] = useState("");

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
    setUser(response.user);
    setIsAuthenticated(true);
    setError("");
  } catch (error) {
    setError(error.message || "Error al iniciar sesión");
  }
};

  return (
    <div className="app-container">
      <div className="title-container">
        <h1>UNO</h1>
        <p className="or-text">or:</p>
        <button className="nav-button" onClick={toggleView}>Sign-up</button>
      </div>
      <div className="form-container">
        <div className="signup-container">
          <h2>Login</h2>
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
            <button type="submit" className="submit-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;