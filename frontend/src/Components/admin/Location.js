import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";


const Location = () => {
  const [location_city, setLocationcity] = useState("");
  const [location_name, setLocationname] = useState("");
  const [location_status, setLocationstatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      location_city,
      location_name,
      location_status
    }

    api.post("/api/addlocation", userdata)
      .then((res) => {
        console.log(res.data.data);
        navigate("/head/location")
        handleClear();
      })
      .catch((err) => console.log(err))
  };

  const handleClear = () => {
    setLocationcity("");
    setLocationname("");
    setLocationstatus("");
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Add Location</h2>
          <Form
            className="border border-dark p-4 mt-4"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="city" className="fw-bold ms-3"> Enter City</Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter city"
                    type="text"
                    value={location_city}
                    onChange={(e) => setLocationcity(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="name" className="fw-bold ms-3">Enter Building Name</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Name"
                    type="text"
                    value={location_name}
                    onChange={(e) => setLocationname(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <div>
                    <Form.Label className="fw-bold ms-3">Select Status</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Active"
                      name="status"
                      value="active"
                      className="me-4 ms-4 text-dark"
                      checked={location_status === "Active"}
                      onChange={(e) => setLocationstatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={location_status === "Inactive"}
                      onChange={(e) => setLocationstatus(e.target.value)}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Link to="/head/location" className="text-decoration-none">
                  <Button
                    type="button"
                    className="btn btn-danger me-4 px-3 py-2"
                  >
                    Back
                  </Button>
                </Link>
                <Button type="submit" className="btn btn-primary px-3 py-2">
                  Add
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger ms-4"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Location;