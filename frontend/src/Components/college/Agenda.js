import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ColHeader from "./Navbar";
import agenda from "../../Images/Agenda.jpg";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import api from "../../api";


const Agenda = () => {
  const [agendaData, setAgendaData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    api
      .get("/api/get_agenda")
      .then((res) => {
        const data = res.data.data;
        const activeAgenda = data.filter((a) => a.agenda_status === "active");
        setAgendaData(activeAgenda);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleScroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const cardWidth = scrollContainer.firstChild?.offsetWidth || 0;
      scrollContainer.scrollLeft += direction === "left" ? -cardWidth : cardWidth;
    }
  };

  return (
    <>
      <ColHeader />
      <Container fluid className="pt-5 mt-5">
        <Row className="align-items-center mt-4">
          <Col md={6} className="text-center">
            <img
              src={agenda}
              alt="Agenda"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </Col>

          <Col md={6} className="mt-4 mt-md-0">
            <h2 className="text-center text-primary fw-bold mb-4">Agenda</h2>
            <div className="d-flex align-items-center justify-content-center">
              {/* Left Button */}
              <Button
                variant="outline-primary"
                className="me-3 rounded-circle"
                style={{ width: "45px", height: "45px" }}
                onClick={() => handleScroll("left")}
              >
                <IoMdArrowRoundBack size={24} />
              </Button>

              {/* Scrollable Agenda Cards */}
              <div
                ref={scrollRef}
                style={{
                  display: "flex",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  scrollBehavior: "smooth",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                {agendaData.length > 0 ? (
                  agendaData.map((agenda, index) => (
                    <Card
                      key={index}
                      className="shadow-lg rounded-4 p-2 text-center mx-2"
                      style={{
                        minWidth: "100%",
                        scrollSnapAlign: "start",
                        flexShrink: 0,
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <Card.Body>
                        <Card.Title className="text-primary fs-4 fw-bold mb-3">
                          {agenda.agenda_title}
                        </Card.Title>
                        <Card.Text className="text-dark">
                          <p className="mb-2">
                            <strong>#{index + 1}</strong>
                          </p>
                          <p>
                            <strong>Description:</strong><br />
                            {agenda.agenda_description}
                          </p>
                          <p>
                            <strong>Duration:</strong><br />
                            {agenda.agenda_time}
                          </p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <div>No agenda data available</div>
                )}
              </div>

              {/* Right Button */}
              <Button
                variant="outline-primary"
                className="ms-3 rounded-circle"
                style={{ width: "45px", height: "45px" }}
                onClick={() => handleScroll("right")}
              >
                <IoMdArrowRoundForward size={24} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Agenda;
