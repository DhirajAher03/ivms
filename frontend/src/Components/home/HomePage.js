import React, { useState } from 'react';
import { Button, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../ClgImage/hero-bg1.png';
import './HomePage.css';

const HomePage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-page" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="overlay">

        {/* Navbar */}
        <Navbar bg="transparent" expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand href="/" className="logo-text">IVMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: "#fff" }} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
                <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
                <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
                <div className="login-box-nav">
                  <Button
                    variant="light"
                    className="login-button"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    Login
                  </Button>
                  {showOptions && (
                    <div className="dropdown-menu-custom">
                      <Button
                        variant="outline-light"
                        className="dropdown-btn"
                        onClick={() => navigate("/admin")}
                      >
                        Admin Login
                      </Button>
                      <Button
                        variant="outline-light"
                        className="dropdown-btn"
                        onClick={() => navigate("/college")}
                      >
                        College Login
                      </Button>
                    </div>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Centered Hero Content */}
        <Container fluid className="hero-content">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="main-title">Welcome to IVMS</h1>
              <p className="subtitle">Intelligent Visitor Management System for modern institutions.</p>
              <p className="subtag">Secure, Smart, and Seamless entry across all campuses.</p>
            </Col>
          </Row>
        </Container>

        {/* Footer */}
        <footer className="footer">
          <Container>
            {/* <Row>
              <Col md={4}>
                <h6>IVMS</h6>
                <p>Next-gen visitor management solution.</p>
              </Col>
              <Col md={4}>
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </Col>
              <Col md={4}>
                <h6>Contact</h6>
                <p>Email: info@ivms.com</p>
                <p>Phone: +91-9876543210</p>
              </Col>
            </Row> */}
          
            <p className="text-center">© {new Date().getFullYear()} IVMS. All rights reserved.</p>
          </Container>
        </footer>

      </div>
    </div>
  );
};

export default HomePage;
