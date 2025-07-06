import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import ColHeader from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const CancelledVisit = () => {
  const [visitData, setVisitData] = useState({});
  // const [selectedDate, setSelectedDate] = useState("");
  const [visit_cancelled, setVisitStatus] = useState("");
  const collegename = localStorage.getItem("CollegeName");
  const id = localStorage.getItem("cancelvisitid");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getvisitone/${id}`)
      .then((res) => {
        setVisitData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };

  const cancelid = visitData._id;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (visitData?.Visit_accept === "accept") {
      localStorage.setItem("resceduledid", cancelid);
      navigate("/reschedulevisit");
    } else if (visitData?.Visit_accept === "pending") {
      const userdata = {
        visit_cancelled,
      };
      axios
        .put(`http://localhost:8000/updatevisit/${cancelid}`, userdata)
        .then((res) => {
          alert("Visit cancelled successfully");
          navigate("/collegetotalvisit")
        })
        .catch((err) => {
          console.error("Error cancelling visit:", err);
          alert("Error cancelling visit");
        });
    }
  };

  return (
    <div  style={{ marginTop:"18vh" }}>
      <ColHeader />
      <Container>
    
      <div className="d-flex justify-content-end mb-4 me-5">
          <Link to="/collegetotalvisit">
          <Button className="btn btn-info"><span className="text-white"><IoMdArrowRoundBack size={24}/></span></Button>
        </Link>
        </div>
      <Col md={4} className="mx-auto">
        <div className="container">
          
          <form className="shadow shadow-md rounded-5 p-3" onSubmit={handleSubmit}>
          <h3 className="text-center text-primary mb-4 mt-4">Cancel Visit</h3>
            <div className="mb-3 text-center">
              <label htmlFor="collegeName" className="form-label">
                College Name
              </label>
              <input
                type="text"
                className="form-control"
                id="collegeName"
                value={collegename}
                disabled
              />
            </div>

            <div className="mb-3 text-center">
              <label htmlFor="visitDate" className="form-label">
                Visit Date
              </label>
              <Form.Control
                type="text"
                value={formatDate(visitData.Date_of_visit)}
                readOnly
              ></Form.Control>
            </div>

            <div className="mb-3 text-center">
              <label className="form-label">Select Visit Status</label>
              <Form.Select
                aria-label="Select Visit Status"
                value={visit_cancelled}
                onChange={(e) => setVisitStatus(e.target.value)}
              >
                <option value="">Select status</option>
                {visitData.fees_status === "paid" && (
                  <option value="rescheduled">Rescheduled</option>
                  
                )}

                {visitData.fees_status === "unpaid" && (
                  <option value="cancelled">Cancelled</option>
                )}
              </Form.Select>
            </div>

            <div className="mb-3 text-center">
              <Button variant="info" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Col>
      </Container>
    </div>
  );
};

export default CancelledVisit;
