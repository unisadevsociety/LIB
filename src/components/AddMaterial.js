import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useNavigate } from "react-router-dom";
import Navbar from "./Nav";
import "./styles/AddMaterial.css";
import Footer from "./Footer";

function AddMaterial() {
  const [studentEmail, setStudentEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      !studentEmail ||
      !qualification ||
      !moduleCode ||
      !year ||
      !description ||
      !driveLink
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Verify student email
    if (!studentEmail.endsWith("@mylife.unisa.ac.za")) {
      setErrorMessage("Please write a valid unisa student email");
      return;
    } else {
      setErrorMessage("");
    }

    const libraryFile = {
      studentEmail,
      qualification,
      moduleCode,
      year,
      description,
      link: driveLink,
    };

    // Initialize Firebase if not already initialized
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();
    const materialsRef = database.ref("zmaterials");

    materialsRef
      .push(libraryFile)
      .then(() => {
        console.log("Data stored successfully!");
        setStudentEmail("");
        setQualification("");
        setModuleCode("");
        setYear("");
        setDescription("");
        setDriveLink("");
        // Redirect to the welcome dashboard
        navigate("/welcome");
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="addmaterialcontainer">
        <h2 className="addmaterialtoptext">Add Material</h2>
        <form>
          <div className="qulificationdiv">
            <label>Qualification:</label>
            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="selectqulificationtab"
            >
              <option value="">Select Qualification</option>
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
            </select>
          </div>
          <div className="formfromaddmaterial">
            <div>
              <label></label>
              <input
                className="nameTag"
                placeholder="Enter The Module Code:"
                type="text"
                value={moduleCode}
                onChange={(e) => setModuleCode(e.target.value)}
              />
            </div>

            <div>
              <label></label>
              <input
                className="nameTag"
                placeholder="Enter the Google Drive Link:"
                type="text"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
              />
            </div>
            <div>
              <label></label>
              <input
                className="nameTag"
                placeholder="Enter your Student Email:"
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="yeardivaddmaterial">
            <label className="yearlabeladdmaterial">Year:</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>
          <div>
            <label></label>
            <textarea
              className="textareaaddmaterial"
              placeholder="Write the content Description:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="fixbuttondiv buttonunderlinedtext">
            <button type="button" onClick={handleSubmit}>
              <div className="submitbuttonaddmateril">Submit</div>
            </button>
          </div>
        </form>

        {/* Button to navigate to materials */}

        <button
          onClick={() => navigate("/welcome")}
          className="buttonunderlinedtext"
        >
          <div className="gotomaterialbutton">Go to Materials</div>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default AddMaterial;
