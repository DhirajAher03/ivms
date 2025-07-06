import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ColHeader from "./Navbar";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [visitDates, setVisitDates] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  const collegename = localStorage.getItem("CollegeName");

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getgallery")
      .then((res) => {
        const data = res.data.userData;

        setGalleryData(data);

        // Extract unique visit dates
        const uniqueDates = [...new Set(data.map((item) => item.Date_of_visit))];
        setVisitDates(uniqueDates);

        // Extract unique colleges
        const uniqueColleges = [...new Set(data.map((item) => item.college_name))];
        setColleges(uniqueColleges);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter data based on selected college and date
  const filteredGallery = galleryData.filter((item) => {
    const matchesCollege = selectedCollege ? item.college_name === selectedCollege : true;
    const matchesDate = selectedDate ? new Date(item.Date_of_visit).toISOString() === selectedDate : true;
    return matchesCollege && matchesDate;
  });

  // Flatten images from filtered data
  const allImages = filteredGallery.flatMap((item) => item.galleryimage);

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const imageFolder = zip.folder("Gallery_Images");

    const imagePromises = allImages.map((image) =>
      axios
        .get(`http://localhost:8000/images/${image}`, { responseType: "blob" })
        .then((response) => {
          imageFolder.file(image, response.data);
        })
    );

    await Promise.all(imagePromises);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "Gallery_Images.zip");
    });
  };

  return (
    <>
      <ColHeader />
      <Container
        fluid
        style={{  paddingTop: "15vh",paddingLeft: "50px", paddingRight: "50px" }}
      >
       <h2 className="text-center mb-4 fw-bold" style={{ color: "rgb(7, 10, 92)" }}>
            GALLERY
       </h2>


        {/* Filter Row */}
        <Row className="mb-3 gx-4 align-items-center">
          {/* Sort By College - Left Side */}
          <Col md={4} className="text-start">
            <Form.Group controlId="collegeDropdown">
              <Form.Label className="fw-semibold">Sort By College:</Form.Label>
              <Form.Select
                aria-label="Select College"
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
              >
                <option value="">-- Show All Colleges --</option>
                {colleges.map((college, index) => (
                  <option key={index} value={college}>
                    {college}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sort By Date - Right Side */}
          <Col md={4} className="text-end ms-auto">
            <Form.Group controlId="visitDateDropdown">
              <Form.Label className="fw-semibold">Sort By Date:</Form.Label>
              <Form.Select
                aria-label="Select Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">-- Show All Dates --</option>
                {visitDates.map((date, index) => (
                  <option key={index} value={new Date(date).toISOString()}>
                    {formatDate(date)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Download Button */}
        {allImages.length > 0 && (
          <Row className="mb-3 justify-content-end gx-4">
            <Col md={4} className="text-end">
              <Button variant="info" onClick={handleDownloadAll}>
                Download All
              </Button>
            </Col>
          </Row>
        )}

        {/* Gallery Images */}
        <Row className="gx-4">
          {allImages.length > 0 ? (
            allImages.map((image, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <a
                    href={`http://localhost:8000/images/${image}`}
                    download={`Gallery_Item_${index + 1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8000/images/${image}`}
                      alt={`Gallery Item ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                      className="rounded-4"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                  </a>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No images available to display.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Gallery;
