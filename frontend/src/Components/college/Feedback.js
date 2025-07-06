import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import ColHeader from "./Navbar";

const Feedback = () => {
  const [feedback_Visit_Date, setVisitDate] = useState("");
  const [feedback_message, setMessage] = useState("");
  const [visitData, setVisitData] = useState([]);
  const [datedata, setDateData] = useState([]);

  const college_name = localStorage.getItem("CollegeName");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (college_name) {
      const today = new Date();
      const pastWeek = new Date(today);
      pastWeek.setDate(today.getDate() - 30);

      const filteredDate = visitData.filter(
        (item) =>
          item.college_name === college_name &&
          new Date(item.Date_of_visit) <= today &&
          new Date(item.Date_of_visit) >= pastWeek
      );

      setDateData(filteredDate);
    } else {
      setDateData([]);
    }
  }, [college_name, visitData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      college_name,
      feedback_Visit_Date,
      feedback_message,
    };

    axios
      .post("http://localhost:8000/addfeedback", userdata)
      .then((res) => {
        alert("Feedback submitted successfully!");
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  // Clear form data
  const handleClear = () => {
    setVisitDate("");
    setMessage("");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
  };

  return (
    <>
      <ColHeader />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ paddingTop: "5vh", paddingBottom: "5vh" }}
      >
        <Form
          onSubmit={handleSubmit}
          style={{
            width: "360px",
            padding: "30px",
            borderRadius: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{ color: "rgb(7 10 92)", fontWeight: "700" }}
          >
           GIVE FEEDBACK  
          </h2>

          <Form.Group className="mb-4 text-center">
            <Form.Label className="text-dark">Visit Date:</Form.Label>
            <Form.Select
              aria-label="Select Date"
              value={feedback_Visit_Date}
              onChange={(e) => setVisitDate(e.target.value)}
              className="mx-auto mt-3 py-2"
              required
            >
              <option value="">
                -- Select Date -- <FaCaretDown className="ms-2 text-primary" />
              </option>
              {datedata.map((item, index) => (
                <option key={index} value={item.Date_of_visit}>
                  {formatDate(item.Date_of_visit)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4 text-center">
            <Form.Label className="text-dark mb-2">Message:</Form.Label>
            <Form.Control
              id="feedback"
              placeholder="Enter message"
              type="text"
              value={feedback_message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="py-2"
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-info me-3 px-4">
              Submit
            </Button>
            <Button
              type="button"
              className="btn btn-danger px-4"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Feedback;
