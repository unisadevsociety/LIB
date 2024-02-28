// Home.js - Component for handling email input
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleCheckEmail = () => {
    // Check if email exists in the database (implement Firebase logic here)
    const emailExistsInDatabase = true; // Replace with actual Firebase logic

    if (emailExistsInDatabase) {
      navigate(`/welcome/${email}`);
    } else {
      navigate("/register");
    }
  };

  return (
    <div>
      <h2>Enter your email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCheckEmail}>Check Email</button>
    </div>
  );
}

export default Home;
