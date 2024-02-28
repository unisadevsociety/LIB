import React, { useState } from "react";
import EmailChecker from "./components/EmailChecker";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import AddMaterial from "./components/AddMaterial";
import db from "./components/firebase";
import "./App.css";

function App() {
  const [step, setStep] = useState(1); // State to track the current step

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1); // Increment the step
  };

  return (
    <div className="App">
      {step === 1 && <EmailChecker onNextStep={handleNextStep} />}
      {step === 2 && <Register onNextStep={handleNextStep} />}
      {step === 3 && <Welcome onNextStep={handleNextStep} />}
      {step === 4 && <AddMaterial />}
    </div>
  );
}

export default App;
