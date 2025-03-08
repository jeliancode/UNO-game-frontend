import React, { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./index.css";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      {showLogin ? <Login toggleView={toggleView} /> : <SignUp toggleView={toggleView} />}
    </div>
  );
}

export default App;
