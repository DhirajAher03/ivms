import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Table,
  Modal,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FeesVerification = () => {
  const [visitData, setVisitData] = useState([]);
  const [feesReceived, setFeesStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const visitsPerPage = 10;
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const filteredData =
          response.data?.userData?.filter(
            (visit) =>
              visit.fees_received === "incomplete" &&
              visit.mousigned === "No"
          ) || [];
        setVisitData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
        alert("Failed to fetch visit data.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = { fees_received: feesReceived };

    axios
      .put(`http://localhost:8000/updatevisit/${id}`, userdata)
      .then(() => {
        alert("Fee status updated successfully!");
        navigate("/head/ivrequest");
        setShowModal(false);
        setId("");
        setFeesStatus("");
      })
      .catch((err) => {
        console.error("Error updating fee status:", err);
        alert("Error updating fee status. Please try again.");
      });
  };

  const handleOpenModal = (visit) => {
    setId(visit._id);
    setFeesStatus(visit.fees_received);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setId("");
    setFeesStatus("");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", {
      month: "short",
    })}-${d.getFullYear()}`;
  };

  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = visitData.slice(indexOfFirstVisit, indexOfLastVisit);
  const totalPages = Math.ceil(visitData.length / visitsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <h3 className="mt-4 mb-4 text-center">Fees Confirmation</h3>
          <Table
            striped
            bordered
            hover
            responsive
            className="shadow-sm rounded-table custom-professional-table"
          >
            <thead className="table_header text-center">
              <tr className="text-center" style={{ background: "#000", color: "#fff" }}>
                <th>College Name</th>
                <th>Date of Visit</th>
                <th>Visiting Location</th>
                <th>Mou Signed</th>
                <th>Fees Status</th>
                <th>Fees Received</th>
                <th>Transaction ID</th>
                <th>Confirm Fees Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentVisits.map((visit, index) => (
                <tr key={index}>
                  <td>{visit.college_name}</td>
                  <td>{formatDate(visit.Date_of_visit)}</td>
                  <td>{visit.visting_location}</td>
                  <td>{visit.mousigned}</td>
                  <td>{visit.fees_status}</td>
                  <td>{visit.fees_received}</td>
                  <td>{visit.transaction_id}</td>
                  <td>
                    {visit.fees_status === "paid" ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleOpenModal(visit)}
                      >
                        Add
                      </button>
                    ) : (
                      <span className="text-muted">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-end">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              />
            </Pagination>
          )}
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Fee Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="feesReceived">
              <Form.Label>Fee Status</Form.Label>
              <Form.Control
                as="select"
                value={feesReceived}
                onChange={(e) => setFeesStatus(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Fee Status
                </option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeesVerification;
