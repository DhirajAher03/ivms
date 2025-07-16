import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ColHeader from "./Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import api from "../../api";


const ColLogin = () => {
  const [number_of_students, setNumberofStudent] = useState("");
  const [Date_of_visit, setStartDate] = useState(new Date());
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [number_of_faculty, setNumberOffaculty] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visting_location, setVisitingLocation] = useState("");
  const [student_details, setStudentDetails] = useState(null);
  const [faculty_details, setFacultyDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [visitData, setVisitData] = useState([]);
  const college_name = localStorage.getItem("CollegeName");
  const mousigned = localStorage.getItem("mousigned");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/location/getlocation").then((res) => {
      const data = res.data.data;
      const stateData = data.filter(
        (state) => state.location_status === "active"
      );
      setLocationData(stateData);
    });
  }, []);

  useEffect(() => {
    api.get("/api/visit/getvisit").then((res) => {
      setVisitData(res.data.userData);
    });
  }, []);

  const handleClear = () => {
    setNumberofStudent("");
    setStartDate(new Date());
    setStartTime("");
    setEndTime("");
    setNumberOffaculty("");
    setPurpose("");
    setVisitingLocation("");
    setStudentDetails(null);
    setFacultyDetails(null);
    setComment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDateTime = new Date(Date_of_visit);
    startDateTime.setHours(start_time.getHours(), start_time.getMinutes(), 0, 0);

    const endDateTime = new Date(Date_of_visit);
    endDateTime.setHours(end_time.getHours(), end_time.getMinutes(), 0, 0);

    const isTimeConflict = visitData.some((visit) => {
      const existingStartTime = new Date(visit.start_time);
      const existingEndTime = new Date(existingStartTime);
      existingEndTime.setHours(existingStartTime.getHours() + 2);

      return (
        startDateTime < existingEndTime &&
        endDateTime > existingStartTime &&
        visit.visting_location === visting_location
      );
    });

    if (isTimeConflict) {
      alert("Schedule is busy.");
      return;
    }

    const formData = new FormData();
    formData.append("college_name", college_name);
    formData.append("number_of_students", number_of_students);
    formData.append("Date_of_visit", Date_of_visit.toISOString().split("T")[0]);
    formData.append("start_time", startDateTime.toISOString());
    formData.append("end_time", endDateTime.toISOString());
    formData.append("number_of_faculty", number_of_faculty);
    formData.append("purpose", purpose);
    formData.append("visting_location", visting_location);
    formData.append("student_details", student_details);
    formData.append("faculty_details", faculty_details);
    formData.append("comment", comment);
    formData.append("mousigned", mousigned);

    api
      .post("/api/visit/addvisit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Visit successfully added!");
        navigate("/collegetotalvisit");
        handleClear();
      })
      .catch((err) => {
        alert("Failed to add visit. Please try again.");
      });
  };

  return (
    <>
      <ColHeader />
      <Container fluid style={{ paddingTop: "15vh" }}>
        <div className="d-flex justify-content-end mt-3 me-5">
          <Link to="/collegetotalvisit">
            <Button className="btn btn-info mb-2">
              <span className="text-white">
                <IoMdArrowRoundBack size={24} />
              </span>
            </Button>
          </Link>
        </div>
        <Container className="d-flex justify-content-center">
          <Form
            className="w-75 p-5 rounded-5 shadow-lg bg-light border border-primary border-2"
            onSubmit={handleSubmit}
          >
            <h3 className="text-center mb-4 fw-bold" style={{ color: "rgb(7, 10, 92)" }}>
              Add Visit
            </h3>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Number of Students:</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={number_of_students}
                  placeholder="Enter Number of students"
                  onChange={(e) => setNumberofStudent(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Number of Faculty:</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={number_of_faculty}
                  placeholder="Enter Number of Faculty"
                  onChange={(e) => setNumberOffaculty(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Date of Visit:</Form.Label>
                <DatePicker
                  selected={Date_of_visit}
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                  required
                  minDate={new Date()}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Start Time:</Form.Label>
                <DatePicker
                  selected={start_time}
                  onChange={(time) => {
                    setStartTime(time);
                    const endTime = new Date(time);
                    endTime.setHours(time.getHours() + 2);
                    setEndTime(endTime);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
                  className="form-control"
                  required
                  minTime={new Date().setHours(9, 0, 0, 0)}
                  maxTime={new Date().setHours(15, 0, 0, 0)}
                />
              </Col>
              <Col md={4}>
                <Form.Label>End Time:</Form.Label>
                <DatePicker
                  selected={end_time}
                  onChange={(time) => setEndTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={120}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
                  className="form-control"
                  required
                  minTime={start_time || new Date().setHours(0, 0, 0, 0)}
                  maxTime={new Date().setHours(23, 30, 0, 0)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Visiting Location:</Form.Label>
                <Form.Select
                  value={visting_location}
                  onChange={(e) => setVisitingLocation(e.target.value)}
                  required
                >
                  <option value="">Select City</option>
                  {locationData.map((item) => (
                    <option key={item._id} value={item.location_city}>
                      {item.location_city}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Purpose of Visit:</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={purpose}
                  placeholder="Enter Purpose"
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Student Details:</Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={(e) => setStudentDetails(e.target.files[0])}
                  accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Faculty Details:</Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={(e) => setFacultyDetails(e.target.files[0])}
                  accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Any Comments:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Any comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button variant="info" className="me-4" type="submit">
                Submit
              </Button>
              <Button variant="danger" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </Form>
        </Container>
      </Container>
    </>
  );
};

export default ColLogin;
