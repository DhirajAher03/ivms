import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const State = () => {
  const [state_name, setStatename] = useState("");
  const [state_status, setStatestatus] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      state_name,
      state_status,
    }

    api.post("/api/state/addstate", userdata)
      .then((res) => {
        console.log(res.data.data);
        navigate("/head/getstate");
        handleClear();
      })
      .catch((err) => console.log(err))
  };

  const handleClear = () => {
    setStatename("");
    setStatestatus("");
  };

  return (
    <>
      <Container className="mt-4" fluid>
        <Row>
          <Col xl={6} className="mx-auto">
            <h2 className="text-center">Add State</h2>
            <Form
              className="border border-dark p-4 mt-4"
              onSubmit={handleSubmit}
            >

              <Row className="mb-3">
                <Col>
                  <Form.Group className="text-start">
                    <Form.Label htmlFor="name" className="fw-bold ms-3">Enter Name</Form.Label>
                    <Form.Control
                      id="name"
                      placeholder="Enter Name"
                      type="text"
                      value={state_name}
                      onChange={(e) => setStatename(e.target.value)}
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
                        checked={state_status === "Active"}
                        onChange={(e) => setStatestatus(e.target.value)}
                        inline
                      />
                      <Form.Check
                        type="radio"
                        label="Inactive"
                        name="status"
                        value="inactive"
                        checked={state_status === "Inactive"}
                        onChange={(e) => setStatestatus(e.target.value)}
                        inline
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="text-center mt-4">
                <Col>
                  <Link to="/head/getstate" className="text-decoration-none">
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
    </>
  )
}

export default State