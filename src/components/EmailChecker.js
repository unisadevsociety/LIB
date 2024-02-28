import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useNavigate } from "react-router-dom";
import Navbar from "./Nav";
import "./styles/EmailChecker.css";
import USDLogo from "./images/usd_icon.png";
import Footer from "./Footer";

const EmailChecker = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkEmailExists = async () => {
    const usersRef = firebase.database().ref("users");
    const snapshot = await usersRef
      .orderByChild("studentEmail")
      .equalTo(email)
      .once("value");

    if (snapshot.exists()) {
      let foundMatch = false;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const { name: userName, surname: userSurname } = userData;
        if (userName === name && userSurname === surname) {
          foundMatch = true;
          // Pass name and surname as URL parameters when navigating
          navigate("/welcome", { state: { name, surname } });
        }
      });
      if (!foundMatch) {
        setError("Student details do not match.");
      } else {
        setError(""); // Reset the error if a match is found
      }
    } else {
      setError("Email does not exist.");
    }

    // Check if email ends with "@mylife.unisa.ac.za"
    if (!email.endsWith("@mylife.unisa.ac.za")) {
      setError("Please enter a valid UNISA student email.");
    }
  };

  // Reset error when input fields change
  const handleInputChange = () => {
    setError("");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <Navbar />
      <div className="emailCheckcontainer">
        <div className="middleContainer">
          <div className="usdicon">
            <img
              src={USDLogo}
              height="50" // Increase logo height
              className="d-inline-block align-top logo mr-3"
              alt="Logo"
            />
          </div>
          <div>
            <h2>UDS student share-center</h2>
          </div>
          <div className="formdiv">
            <form
              className="formFormdiv"
              onSubmit={(e) => {
                e.preventDefault();
                checkEmailExists();
              }}
            >
              <div>
                <label></label>
                <input
                  type="text"
                  className="nameTag"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              <div>
                <label></label>
                <input
                  className="nameTag"
                  type="text"
                  placeholder="Enter your surname"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              <div>
                <label></label>
                <input
                  className="nameTag"
                  type="email"
                  placeholder="Enter your Unisa Student email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}

              <button type="submit" disabled={error}>
                <div className="loginformbutton buttonunderlinedtext">
                  LogIn
                </div>
              </button>
            </form>
            <div>OR</div>

            <button
              onClick={handleRegisterClick}
              className="registerBut buttonunderlinedtext"
            >
              <div className="regiasterbuttonform">Register</div>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailChecker;
