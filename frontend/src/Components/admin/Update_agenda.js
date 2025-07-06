import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Update_agenda = () => {
  const [agendaData, setagendaData] = useState({});
  const [agenda_title, setAgenda_title] = useState("");
  const [agenda_description, setAgenda_description] = useState("");
  const [agenda_time, setAgenda_time] = useState("");
  const [agenda_status, setAgenda_status] = useState("");
  const navigate = useNavigate();

  const id = localStorage.getItem("updateagendaid");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      agenda_title,
      agenda_description,
      agenda_time,
      agenda_status
    }

    axios
      .put(`http://localhost:8000/update_agenda/${id}`, userdata)
      .then((res) => {
        alert("agenda Details Updated Successfully");
        navigate("/head/getagenda")
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error while updating agenda:", err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_agenda_one/${id}`)
      .then((res) => {
        console.log("API Response:", res.data);
        // setagendaData(res.data);
        const data = res.data.userData;
        setAgenda_title(data.agenda_title || "");
        setAgenda_description(data.agenda_description || "");
        setAgenda_time(data.agenda_time || "");
        setAgenda_status(data.agenda_status || "");
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Update agenda</h2>
          <Form
            className="border border-dark p-4 mt-4"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="city" className="fw-bold ms-3"> Title</Form.Label>
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
                  <Form.Label htmlFor="name" className="fw-bold ms-3">Description</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Name"
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
                  <Form.Label htmlFor="name" className="fw-bold ms-3">Time</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Name"
                    type="text"
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
                      className="me-4 ms-4"
                      value={agenda_status}
                      checked={agenda_status === "active"}
                      onChange={(e) => setAgenda_status(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value={agenda_status}
                      checked={agenda_status === "inactive"}
                      onChange={(e) => setAgenda_status(e.target.value)}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Button type="submit" className="btn btn-primary">
                  Update
                </Button>
                <Link to="/head/getagenda" className="text-decoration-none">
                  <Button
                    type="button"
                    className="btn btn-danger ms-5 px-3 py-2"
                  >
                    Back
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Update_agenda;