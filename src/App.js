import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./App.css";
import EmailChecker from "./components/EmailChecker";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import AddMaterial from "./components/AddMaterial";

// Initialize Firebase (replace this with your Firebase config)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<EmailChecker />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-material" element={<AddMaterial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
