import React from "react";
import EmailChecker from "./components/EmailChecker";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import AddMaterial from "./components/AddMaterial";
import db from "./components/firebase";

function App() {
  return (
    <div className="App">
      <EmailChecker />
      <Register />
      <Welcome />
      <AddMaterial />
    </div>
  );
}

export default App;
