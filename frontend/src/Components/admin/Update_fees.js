import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Update_fees = () => {
  const [feesData, setFeesData] = useState({});
  const [fees_title, setFees_title] = useState("");
  const [fees_amount, setFees_amount] = useState("");
  const [fees_status, setFees_status] = useState("");
  const id = localStorage.getItem("updatefeesid");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      fees_title,
      fees_amount,
      fees_status
    }

    api
      .put(`/api/fees/update_fees/${id}`, userdata)
      .then((res) => {
        alert("fees Details Updated Successfully");
        navigate("/head/getfees")
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error while updating fees:", err);
      });
  };

  useEffect(() => {
    api
      .get(`/api/fees/get_fees_one/${id}`)
      .then((res) => {
        setFeesData(res.data.data);
        const data = res.data.data;
        setFees_title(data.fees_title || ""); // Set the initial value for university_name
        setFees_amount(data.fees_amount || "");
        setFees_status(data.fees_status || "");
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Update fees</h2>
          <Form
            className="border border-dark p-4 mt-4"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="city" className="fw-bold ms-3"> Enter Title</Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter title"
                    type="text"
                    value={fees_title}
                    onChange={(e) => setFees_title(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="name" className="fw-bold ms-3">Enter Amount</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter Amount"
                    type="text"
                    value={fees_amount}
                    onChange={(e) => setFees_amount(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="start">
                  <div>
                    <Form.Label className="fw-bold ms-3">Select Status</Form.Label>

                    <Form.Check
                      type="radio"
                      label="Active"
                      name="status"
                      value={fees_status}
                      className="me-4 ms-4"
                      checked={fees_status === "Active"}
                      onChange={(e) => setFees_status(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value={fees_status}
                      checked={fees_status === "Inactive"}
                      onChange={(e) => setFees_status(e.target.value)}
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
                <Link to="/head/getfees" className="text-decoration-none">
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

export default Update_fees;