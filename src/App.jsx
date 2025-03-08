import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MenuScreen from "./components/MenuScreen";
import GameScreen from "./components/GameScreen";
import "./index.css";
import "./menuScreen.css"
import "./gameScreen.css"

function App() {
  return (
    <div className="App">

      <GameScreen/>
    </div>
  );
}

export default App;