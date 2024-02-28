import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import "./styles/Register.css";
import Navbar from "./Nav";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !fieldOfStudy) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!agree) {
      setErrorMessage(
        "You must agree to affiliate and to our T&C's to register."
      );
      return;
    }

    if (!email.endsWith("@mylife.unisa.ac.za")) {
      setErrorMessage("Please enter a valid Unisa student email.");
      return;
    }

    const usersRef = firebase.database().ref("users");
    try {
      // Check if the email already exists
      const snapshot = await usersRef
        .orderByChild("studentEmail")
        .equalTo(email)
        .once("value");
      if (snapshot.exists()) {
        setErrorMessage("User with this email already exists.");
        return;
      }

      // If email does not exist, proceed with registration
      await usersRef.push({
        name,
        surname,
        studentEmail: email,
        fieldOfStudy,
      });

      // Clear form fields after successful submission
      setName("");
      setSurname("");
      setEmail("");
      setFieldOfStudy("");

      // Navigate to the EmailChecker page after successful registration
      navigate("/");
    } catch (error) {
      console.error("Error adding user data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registerPagewrap">
        <div className="registerwrapcontainer">
          <h2 className="registerpagetext">Register</h2>
          <form onSubmit={handleSubmit} className="registerpageform">
            <div>
              <label></label>
              <input
                className="nameTag"
                type="text"
                value={name}
                placeholder="Enter your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label></label>
              <input
                className="nameTag"
                type="text"
                placeholder="Enter your Surname:"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div>
              <label></label>
              <input
                className="nameTag"
                type="email"
                placeholder="Enter your Student Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="fieldofstudydiv">
              <label>Field of Study:</label>
              <select
                className="fieldofstudydivdropdown"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
              >
                <option value="">Select Field of Study</option>
                <option value="Accounting Sciences">Accounting Sciences</option>
                <option value="Agriculture & Environmental Sciences">
                  Agriculture & Environmental Sciences
                </option>
                <option value="Economic & Management Sciences">
                  Economic & Management Sciences
                </option>
                <option value="Education">Education</option>
                <option value="Human Sciences">Human Sciences</option>
                <option value="Law">Law</option>
                <option value="Science, Engineering & Technology">
                  Science, Engineering & Technology
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="ckeckboxfortcsandcsdiv">
              <label className="checkboxtctext">
                Do you agree to affiliate with UDS and the T&Cs:
              </label>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="radiobuttonTcs"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="registerpageButton">
              <button type="submit">Register</button>
            </div>
            <div className="">
              Already in registered?
              <Link to="/" className="Logintexttext">
                <button className="Logintexttext">LogIn</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
