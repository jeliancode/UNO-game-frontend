import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/MenuScreen";
import Room from "./components/Room";
import GameScreen from "./components/GameScreen";
import "./index.css";
import "./gameScreen.css";
import "./menuScreen.css";
import "./room.css";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/games/:id" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
