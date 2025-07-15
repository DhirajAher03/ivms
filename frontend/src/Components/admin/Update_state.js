import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
// import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Update_state = () => {
  const [state_data, setStatedata] = useState("");
  const [state_name, setStatename] = useState("");
  const [state_status, setStatus] = useState("");
  const navigate = useNavigate();

  const id = localStorage.getItem("updatestateid");

  //   get API for state
  useEffect(() => {
    api
      .get(`/api/getonestate/${id}`)
      .then((res) => {
        setStatedata(res.data.data);
        setStatename(res.data.state_name);
        setStatus(res.data.state_status);
      })
      .catch((err) => console.log(err));
  }, []);


  const handleClear = () => {
    setStatename("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      state_name,
      state_status,
    };

    api
      .put(`/api/updatestate/${id}`, userdata)
      .then(() => {
        console.log("State updated successfully");
        navigate("/head/getstate");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Update State</h2>
          <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
            {/* State Dropdown */}
            <Form.Group controlId="stateName" className="mb-3">
              <Form.Label className="fw-bold ms-3">State Name</Form.Label>
              <Form.Control
                type="text"
                value={state_name}
                onChange={(e) => setStatename(e.target.value)}
                placeholder="Update State Name"
                required
              />
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3">
              <div>
                <Form.Label className="fw-bold ms-3">Status</Form.Label>

                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  value="active"
                  className="me-4 ms-4"
                  checked={state_status === "active"}
                  onChange={(e) => setStatus(e.target.value)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="inactive"
                  checked={state_status === "inactive"}
                  onChange={(e) => setStatus(e.target.value)}
                  inline
                />
              </div>
            </Form.Group>

            {/* Buttons */}
            <div className="text-center">
              <Button type="submit" className="btn btn-primary me-3">
                Update
              </Button>
              <Link to="/head/getstate" className="text-decoration-none">
                <Button
                  type="button"
                  className="btn btn-danger ms-5 px-3 py-2"
                >
                  Back
                </Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Update_state;
