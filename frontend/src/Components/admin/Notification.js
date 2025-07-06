import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserTimes, FaUserPlus, FaMoneyCheckAlt } from "react-icons/fa";

const Notification = () => {
  const [visitData, setVisitData] = useState([]);
  const [cancelledVisit, setCancelledVisit] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData || [];
        const inactiveVisits = data.filter((visit) => visit.Visit_accept === "pending");
        setVisitData(inactiveVisits);

        const cancelledVisitData = data.filter((visit) => visit.visit_cancelled === "cancelled");
        setCancelledVisit(cancelledVisitData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const handleSeen = (id) => {
    axios
      .delete(`http://localhost:8000/deletevisit/${id}`)
      .then(() => {
        setCancelledVisit((prev) => prev.filter((v) => v._id !== id));
      })
      .catch((error) => {
        console.error("Error updating notification", error);
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
  };

  return (
    <Container style={{ paddingTop: "15vh", paddingBottom: "5vh", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Row>
        <Col md={10} className="mx-auto">
          <h3 className="mb-4 text-center text-primary fw-bold">Admin Notifications</h3>

          {/* Visit Requests */}
          {visitData.length > 0 ? (
            visitData.map((visit, index) => (
              <div
                key={index}
                className="bg-white shadow-sm border-start border-5 border-info rounded p-3 mb-3 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <FaUserPlus className="text-info me-3" size={24} />
                  <div>
                    <Link to="/head/ivrequest" className="text-decoration-none text-dark fw-semibold">
                      New visit request from <span className="text-primary">{visit.college_name}</span>
                    </Link>
                    <div className="small text-muted mt-1">Visit Date: {formatDate(visit.Date_of_visit)}</div>
                  </div>
                </div>
                <Badge bg="info" className="p-2 rounded-pill">Pending</Badge>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No new visit requests.</p>
          )}

          {/* Cancelled Visits */}
          {cancelledVisit.length > 0 && (
            <div className="mt-5">
              <h5 className="text-danger mb-3">Cancelled Requests</h5>
              {cancelledVisit.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-sm border-start border-5 border-danger rounded p-3 mb-3 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <FaUserTimes className="text-danger me-3" size={24} />
                    <span>
                      Visit request cancelled by <span className="fw-bold text-danger">{item.college_name}</span>
                    </span>
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={() => handleSeen(item._id)}>
                    Confirm
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Paid Fees Confirmation */}
          {visitData.map((visit, index) =>
            visit.fees_status === "paid" ? (
              <div
                key={index}
                className="bg-white shadow-sm border-start border-5 border-success rounded p-3 mb-3 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <FaMoneyCheckAlt className="text-success me-3" size={22} />
                  <div>
                    <div className="fw-semibold text-dark">
                      ₹{visit.fees} paid by <span className="text-success">{visit.college_name}</span>
                    </div>
                    <div className="small text-muted">Visit Date: {formatDate(visit.Date_of_visit)}</div>
                  </div>
                </div>
                <Badge bg="success" className="p-2 rounded-pill">Confirm & Accept</Badge>
              </div>
            ) : null
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Notification;
