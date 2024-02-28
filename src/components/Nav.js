import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "./images/usd_only.png"; // import your logo image
import { Link } from "react-router-dom";

function MyNavbar() {
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="https://unisadevsociety.github.io/site/"
              rel="noopener noreferrer"
            >
              Official Webpage
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              to="https://chat.whatsapp.com/KHqV67GD14W6tTQAbMJ08u"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="https://www.instagram.com/invites/contact/?i=1jv0y69hgenlh&utm_content=twz8c62"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="https://www.linkedin.com/company/unisadevsociety/"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
