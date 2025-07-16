import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../../Stylesadm/CollegeLoginForm.css';
import OwlImage from '../../Images/owlHouse.svg';
import api from "../../api";


const Login = () => {
  const navigate = useNavigate();
  const [reg_college_username, SetCollegeName] = useState("");
  const [reg_password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [visitData, setVisitData] = useState();
  const [TotalVisita, setTotalVisita] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");

    api.post(
      "/api/registration/loginauth",
      { reg_college_username, reg_password },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((response) => {
        const { token } = response.data.token;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userid", response.data._id);
        localStorage.setItem("CollegeName", response.data.collage_name);
        localStorage.setItem("mousigned", response.data.mousigned);
        navigate("/home");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setServerError("Invalid credentials. Please try again later.");
      });
  };

  useEffect(() => {
    api.get("/api/visit/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        setTotalVisita(100 + data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="register-wrapper">
      <div className="content-wrapper">
        {/* Left Owl Side */}
        <div className="owl-column">
          <img src={OwlImage} alt="Owl in house" className="owl-image" />
        </div>

        {/* Right Form Side */}
        <div className="form-column">
          <div className="register-form">
            <div className="d-flex justify-content-between">
              <h4 className="logo-text">College Login</h4>
              <h6 className="register-title">Login</h6>
            </div>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={reg_college_username}
                  onChange={(e) => SetCollegeName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={reg_password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ms-2"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} className="text-primary" />
                    ) : (
                      <FaEye size={20} className="text-primary" />
                    )}
                  </Button>
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className="signup-btn w-100">
                Login →
              </Button>

              <div className="mt-3 text-center">
                <Link to="/forget">Forgot Password?</Link>
              </div>
              <div className="text-center mt-2">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
