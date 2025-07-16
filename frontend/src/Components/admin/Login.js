import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../../Stylesadm/CollegeLoginForm.css'; // Ensure this path is correct
import OwlImage from '../../Images/owlHouse.svg';
import api from "../../api";


const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    api.post("/api/admin/adminlogin",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((response) => {
        const token = response.data.token;
        const adminName = response.data.admin_name;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("admin_name", adminName);

        navigate("/head/dashboard");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setServerError("Invalid credentials. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

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
              <h4 className="logo-text">Admin Login</h4>
              <h6 className="register-title"></h6>
            </div>
            {serverError && <Alert variant="danger">{serverError}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="adminUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="adminPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
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
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="signup-btn w-100"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Login →"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
