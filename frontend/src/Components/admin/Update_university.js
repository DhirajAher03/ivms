import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Update_university = () => {
  const [universityData, setUniversityData] = useState({});
  const [university_name, setUniversityname] = useState("");
  const [university_status, setUniversitystatus] = useState("");
  const id = localStorage.getItem("updateuniversityid");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      university_name,
      university_status,
    }

    axios
      .put(`http://localhost:8000/updateuniversity/${id}`, userdata)
      .then((res) => {
        alert("Univarsity Details Updated Successfully");
        navigate("/head/university");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error while updating Location:", err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getoneuniversity/${id}`)
      .then((res) => {
        setUniversityData(res.data);
        setUniversityname(res.data.university_name); // Set the initial value for university_name
        setUniversitystatus(res.data.university_status);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const handleClear = () => {
    setUniversityname("");
    setUniversitystatus("");
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Update University</h2>
          <Form
            className="border border-dark p-4 mt-4"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label className="fw-bold ms-3"> University Name</Form.Label>
                  <Form.Control
                    placeholder="Enter name"
                    type="text"
                    value={university_name}
                    onChange={(e) => setUniversityname(e.target.value)}
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
                      checked={university_status === "active"}
                      onChange={(e) => setUniversitystatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={university_status === "inactive"}
                      onChange={(e) => setUniversitystatus(e.target.value)}
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
                <Link to="/head/university" className="text-decoration-none">
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

export default Update_university;