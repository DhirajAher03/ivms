import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Fees = () => {
  const [agenda_title, setAgenda_title] = useState("");
  const [agenda_description, setAgenda_description] = useState("");
  const [agenda_time, setAgenda_time] = useState("");
  const [agenda_status, setAgenda_status] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      agenda_title,
      agenda_description,
      agenda_time,
      agenda_status,

    }

    api.post("/api/agenda/add_agenda", userdata)
      .then((res) => {
        console.log(res.data.data);
        navigate("/head/getagenda")
        handleClear();
      })
      .catch((err) => console.log(err))
  };

  const handleClear = () => {
    setAgenda_title("");
    setAgenda_description("");
    setAgenda_time("");
    setAgenda_status("");
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Add Agenda</h2>
          <Form
            className="border border-dark p-4 mt-4"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="city" className="fw-bold ms-3">  Agenda Title</Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter title"
                    type="text"
                    value={agenda_title}
                    onChange={(e) => setAgenda_title(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="name" className="fw-bold ms-3">Agenda Description</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Description"
                    type="text"
                    value={agenda_description}
                    onChange={(e) => setAgenda_description(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="name" className="fw-bold ms-3">Agenda Time</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Time"
                    type="datetime"
                    value={agenda_time}
                    onChange={(e) => setAgenda_time(e.target.value)}
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
                      checked={agenda_status === "Active"}
                      onChange={(e) => setAgenda_status(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={agenda_status === "Inactive"}
                      onChange={(e) => setAgenda_status(e.target.value)}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Link to="/head/getagenda" className="text-decoration-none">
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

export default Fees;