import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Navbar from "./Nav";
import "./styles/Welcome.css";
import Footer from "./Footer";
import db from "./firebase";

const Welcome = () => {
  const location = useLocation();
  const { name, surname } = location.state || {};

  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const firebaseConfig = {
      // Your Firebase config here
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();
    const materialsRef = database.ref("zmaterials");

    materialsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const materialList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setMaterials(materialList);
      }
    });

    return () => materialsRef.off("value");
  }, []);

  useEffect(() => {
    let filtered = materials;

    if (selectedQualification) {
      filtered = filtered.filter(
        (material) => material.qualification === selectedQualification
      );
    }

    if (selectedYear) {
      filtered = filtered.filter(
        (material) => material.year.toString() === selectedYear
      );
    }

    setFilteredMaterials(filtered);
  }, [selectedQualification, selectedYear, materials]);

  const handleLike = (materialId) => {
    const database = firebase.database();
    const materialRef = database.ref(`zmaterials/${materialId}`);
    materialRef.transaction((material) => {
      if (material) {
        if (!material.likes) {
          material.likes = 1;
        } else {
          material.likes++;
        }
      }
      return material;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="welcomecontainer">
        <h2>
          Hi, {name} {surname}.
        </h2>
        <p className="sharingtextwelcomepage">
          Sharing educational content can significantly enhance the learning
          experience, providing valuable resources and support for students on
          their academic journey.
        </p>
        <Link to="/add-material" className="buttonunderlinedtext">
          <div className="addmaterialbuttondiv">
            <button>Add Material</button>
          </div>
        </Link>
        <div className="mb-3 filterqulifictaion">
          <label htmlFor="qualificationFilter" className="form-label">
            Filter by Qualification:
          </label>
          <select
            id="qualificationFilter"
            className="form-select"
            value={selectedQualification}
            onChange={(e) => setSelectedQualification(e.target.value)}
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

        <div className="mb-3">
          <label htmlFor="yearFilter" className="form-label">
            Filter by Year:
          </label>
          <select
            id="yearFilter"
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>

        <div>
          <h3 className="materialstexttop">Materials:</h3>
          <div className="row">
            {filteredMaterials.map((material) => (
              <div className="col-md-4" key={material.id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <p className="card-text">
                      Module Code: {material.moduleCode}
                    </p>
                    <p className="card-text">Year: {material.year}</p>
                    <p className="card-text">
                      Description: {material.description}
                    </p>
                    <p className="card-text">
                      Link:{" "}
                      <a
                        href={material.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {material.link}
                      </a>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleLike(material.id)}
                      >
                        Like
                      </button>
                      <span>Likes: {material.likes || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to="/add-material" className="buttonunderlinedtext">
          <div className="btnbtnbottom">
            <button className="">Add Material</button>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;
