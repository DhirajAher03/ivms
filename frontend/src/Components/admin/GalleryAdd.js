import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../Stylesadm/GalleryAdd.css"; // Importing external CSS for bubbles
import api from "../../api";

const GalleryAdd = () => {
  const [visitData, setVisitData] = useState([]);
  const [college_name, setCollegeName] = useState("");
  const [Date_of_visit, setDateOfVisit] = useState("");
  const [galleryimage, setGalleryImage] = useState([]);
  const [collegeData, setColleData] = useState([]);
  const [datedata, setDateData] = useState([]);

  const handleClear = () => {
    setCollegeName("");
    setDateOfVisit("");
    setGalleryImage([]);
    setDateData([]);
  };

  useEffect(() => {
    api
      .get("/api/visit/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        const filteredCollege = [
          ...new Set(data.map((item) => item.college_name)),
        ];
        setColleData(filteredCollege);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (college_name) {
      const today = new Date();
      const pastWeek = new Date(today);
      pastWeek.setDate(today.getDate() - 7);

      const filteredDate = visitData
        .filter(
          (item) =>
            item.college_name === college_name &&
            new Date(item.Date_of_visit) <= today &&
            new Date(item.Date_of_visit) >= pastWeek &&
            item.Visit_status === "completed"
        )
        .map((item) => ({ date: item.Date_of_visit, id: item._id }));

      setDateData(filteredDate);
    } else {
      setDateData([]);
    }
  }, [college_name, visitData]);

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setGalleryImage(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("college_name", college_name);
    formdata.append("Date_of_visit", Date_of_visit);

    galleryimage.forEach((file) => {
      formdata.append("galleryimage", file);
    });

    axios
      .post(`/api/gallery/addgallery`, formdata)
      .then(() => {
        handleClear();
        alert("Gallery added successfully!");
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", {
      month: "short",
    })}-${d.getFullYear()}`;
  };

  return (
    <div className="gallery-wrapper">
      <ul className="bubbles">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      <div className="glass-card">
        <Container style={{ position: "relative", zIndex: 1 }}>
          <Row>
            <Col>
              <h2 className="text-center mb-4 text-white fw-bold">
                Media Files Add
              </h2>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit} className="border-0">
            <Row className="mb-4 text-start">
              <Form.Group controlId="collegeDropdown">
                <Form.Label className="form-label-custom">College</Form.Label>
                <Form.Select
                  value={college_name}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="form-select-custom"
                >
                  <option value="">-- Select College --</option>
                  {collegeData.map((college, index) => (
                    <option key={index} value={college}>
                      {college}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-4 text-start">
              <Form.Group controlId="dateDropdown">
                <Form.Label className="form-label-custom">Date of Visit</Form.Label>
                <Form.Select
                  value={Date_of_visit}
                  onChange={(e) => setDateOfVisit(e.target.value)}
                  disabled={!college_name}
                  className="form-select-custom"
                >
                  <option value="">-- Select Date of Visit --</option>
                  {datedata.map((item, index) => (
                    <option key={index} value={item.date}>
                      {formatDate(item.date)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Group>
                  <Form.Label className="form-label-custom">
                    Add Images (max 5)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Button type="submit" className="btn-custom me-3">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  className="btn-clear"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default GalleryAdd;
