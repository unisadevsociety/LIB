import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "./images/usd_only.png"; // import your logo image
import { Link } from "react-router-dom";
import USDFAV from "./images/usd_icon.png";
import "./styles/Footer.css";

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="50" // Increase logo height
            className="d-inline-block align-top logo mr-3"
            alt="Logo"
          />
        </Navbar.Brand>
        <div className="black-text">
          {" "}
          <img src={USDFAV} className="usdicon" /> UNISA Developer Society
        </div>
        <div className="black-text">
          © All rights reserved to UNISA Developer Society
        </div>
        <div className="notnotaffliated">not affiliated with unisa src</div>
      </Container>
    </Navbar>
  );
}

export default Footer;
