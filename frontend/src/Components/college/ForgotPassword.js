import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api";


const ForgetPasswordComponent = () => {
  const [data, setData] = useState([]);
  const [reg_college_email_id, setEmail] = useState('');
  const [reg_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch the list of emails from the database
  useEffect(() => {
    api
      .get('/api/registration/get_registration')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Check if the entered email exists in the database
  const checkEmail = async () => {
    const user = data.find((user) => user.reg_college_email_id === reg_college_email_id);
    if (user) {
      try {
        // Send verification email
        await api.post('/api/registration/updateemail', {
          email: reg_college_email_id,
          link: `http://localhost:3000/forget?email=${encodeURIComponent(
            reg_college_email_id
          )}`,
        });
        setEmailExists(true);
        setErrorMessage('');
        setSuccessMessage('Verification email sent. Please check your inbox.');
      } catch (err) {
        console.error(err);
        setErrorMessage('Failed to send verification email.');
      }
    } else {
      setEmailExists(false);
      setErrorMessage('Email not available. Please register.');
    }
  };

  // Handle password update
  const updatePassword = async (e) => {
    e.preventDefault();

    // Password validation regex: At least one uppercase, one digit, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(reg_password)) {
      setErrorMessage(
        'Password must contain at least one uppercase letter, one digit, and one special character.'
      );
      return;
    }

    if (reg_password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await api.put(`/api/registration/forget`, {
        reg_college_email_id,
        reg_password,
      });

      navigate('/');
      setSuccessMessage('Password updated successfully.');
      setErrorMessage('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setEmailExists(false);
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: 'linear-gradient(135deg, #145a76, #1d809f, #67b7d1)' }}
    >
      <Container>
        <Row>
          <Col md={4} className="mx-auto bg-white border border-dark p-3 shadow shadow-md">
            <h3 className="text-center text-primary fs-3">Forgot Password</h3>
            <Form>
              {!emailExists ? (
                <>
                  {/* Email Field */}
                  <Form.Group className="mt-4">
                    <Form.Control
                      type="email"
                      className="py-2"
                      placeholder="Enter email"
                      value={reg_college_email_id}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-center mt-3">
                    <Button className="btn btn-primary mt-3" onClick={checkEmail}>
                      Verify Email
                    </Button>
                    <Link to="/" className="text-decoration-none">
                      <Button className="btn btn-danger mt-3 ms-5">Cancel</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* Password Fields */}
                  <Form.Group>
                    <Form.Label>Enter new password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={reg_password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="mt-2">Confirm new password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button className="btn btn-primary mt-3" onClick={updatePassword}>
                      Reset Password
                    </Button>
                    <Link to="/" className="text-decoration-none">
                      <Button className="btn btn-danger mt-3 ms-5">Cancel</Button>
                    </Link>
                  </div>
                </>
              )}
            </Form>
            {/* Error and Success Messages */}
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
            {successMessage && <p className="text-success mt-3">{successMessage}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPasswordComponent;
