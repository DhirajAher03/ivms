import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  Table,
  Button,
  Container,
  Row,
  Form,
  Modal,
  Pagination,
} from "react-bootstrap";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaFilePdf,
  FaFileExcel,
  FaFileCsv,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

const IVRequest = () => {
  const [visitData, setVisitData] = useState([]);
  const [collegeName, setCollegeName] = useState("");
  const [Visit_accept, setVisitAccept] = useState("");
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);

  // New for Add/Edit Fees
  const [editFeeId, setEditFeeId] = useState(null);
  const [feeInput, setFeeInput] = useState("");

  const visitsPerPage = 10;

  const handleClose = () => setShow(false);

  const handleClear = () => {
    setCollegeName("");
    setVisitAccept("");
    setReason("");
  };

  const handleOpenModal = (visit, type) => {
    setId(visit._id);
    setCollegeName(visit.college_name);
    setModalType(type);
    setShow(true);
  };

  const fetchVisitData = () => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        const pending = data.filter(
          (visit) => visit.Visit_accept === "pending"
        );
        const formatted = pending.map((visit) => {
          const startTime = new Date(visit.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const endTime = new Date(visit.end_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return {
            ...visit,
            Date_of_visit: visit.Date_of_visit.split("T")[0],
            start_time: startTime,
            end_time: endTime,
          };
        });
        setVisitData(formatted);
      })
      .catch((error) => console.error("Error fetching visit data:", error));
  };

  useEffect(() => {
    fetchVisitData();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "College Name",
      "Number of Students",
      "Date of Visit",
      "Start Time",
      "End Time",
      "Number of Faculty",
      "Purpose",
      "Visiting Location",
      "Fees",
      "Visit Accept",
      "Visit Status",
    ];
    const tableRows = visitData.map((visit) => [
      visit.college_name,
      visit.number_of_students,
      visit.Date_of_visit,
      visit.start_time,
      visit.end_time,
      visit.number_of_faculty,
      visit.purpose,
      visit.visiting_location,
      visit.fees || "-",
      visit.Visit_accept,
      visit.Visit_status,
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("visit_data.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(visitData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visit Data");
    XLSX.writeFile(workbook, "visit_data.xlsx");
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/updatevisit/${id}`, {
        college_name: collegeName,
        Visit_accept,
      })
      .then(() => {
        handleClose();
        fetchVisitData();
      })
      .catch((err) => console.error("Error updating visit:", err));
  };

  const handleReject = () => {
    axios
      .put(`http://localhost:8000/updatevisit/${id}`, {
        college_name: collegeName,
        reason,
        Visit_accept,
      })
      .then(() => {
        handleClose();
        handleClear();
        fetchVisitData();
      })
      .catch((err) => console.error("Error updating visit:", err));
  };

  const handleFeeSubmit = (visitId) => {
    const parsedFee = parseInt(feeInput);
    if (isNaN(parsedFee) || parsedFee < 0) {
      alert("❌ Please enter a valid fee amount.");
      return;
    }

    axios
      .put(`http://localhost:8000/updatevisit/${visitId}`, { fees: parsedFee })
      .then(() => {
        alert("✅ Fees updated successfully!");
        setEditFeeId(null);
        setFeeInput("");
        fetchVisitData();
      })
      .catch((err) => {
        console.error("Error updating fee:", err);
        alert("❌ Failed to update fees.");
      });
  };

  const renderModalContent = () => (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalType === "accept" ? "Visit Accept" : "Visit Reject"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>College Name</Form.Label>
            <Form.Control type="text" value={collegeName} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Visit Accept</Form.Label>
            <Form.Select
              value={Visit_accept}
              onChange={(e) => setVisitAccept(e.target.value)}
            >
              <option value="">Select here...</option>
              <option value="accept">Accept</option>
              {modalType === "reject" && (
                <option value="reject">Reject</option>
              )}
            </Form.Select>
          </Form.Group>
          {modalType === "reject" && (
            <Form.Group className="mb-3">
              <Form.Label>Reason for Rejection</Form.Label>
              <Form.Control
                as="textarea"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant={modalType === "accept" ? "primary" : "danger"}
          onClick={modalType === "accept" ? handleUpdate : handleReject}
        >
          {modalType === "accept" ? "Accept" : "Reject"}
        </Button>
      </Modal.Footer>
    </>
  );

  const toggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = visitData.slice(indexOfFirstVisit, indexOfLastVisit);
  const totalPages = Math.ceil(visitData.length / visitsPerPage);

  return (
    <Container>
      <h2 className="my-4 text-center fw-bold text-primary">SCHEDULED VISITS</h2>

      <Row>
        <div className="mb-4 d-flex justify-content-start gap-2 ms-4">
          <Button variant="outline-danger" onClick={exportPDF} className="d-flex align-items-center gap-2">
            <FaFilePdf /> Export PDF
          </Button>
          <Button variant="outline-success" onClick={exportExcel} className="d-flex align-items-center gap-2">
            <FaFileExcel /> Export Excel
          </Button>
          <CSVLink data={visitData} filename="visit_data.csv" className="btn btn-outline-primary d-flex align-items-center gap-2">
            <FaFileCsv /> Export CSV
          </CSVLink>
        </div>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead className="table-dark text-center">
            <tr className="text-center fw-bold">
              <th>+</th>
              <th>College Name</th>
              <th>Students</th>
              <th>Faculty</th>
              <th>Visit Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Purpose</th>
              <th>Location</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentVisits.map((visit) => (
              <React.Fragment key={visit._id}>
                <tr>
                  <td>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => toggleRow(visit._id)}
                    >
                      {expandedRow === visit._id ? <FaMinus /> : <FaPlus />}
                    </Button>
                  </td>
                  <td>{visit.college_name}</td>
                  <td>{visit.number_of_students}</td>
                  <td>{visit.number_of_faculty}</td>
                  <td>{visit.Date_of_visit}</td>
                  <td>{visit.start_time}</td>
                  <td>{visit.end_time}</td>
                  <td>{visit.purpose}</td>
                  <td>{visit.visiting_location}</td>
                  <td>
                    {editFeeId === visit._id ? (
                      <div className="d-flex justify-content-center gap-2">
                        <Form.Control
                          type="number"
                          size="sm"
                          style={{ width: "80px" }}
                          value={feeInput}
                          onChange={(e) => setFeeInput(e.target.value)}
                        />
                        <Button size="sm" variant="success" onClick={() => handleFeeSubmit(visit._id)}>Save</Button>
                        <Button size="sm" variant="outline-secondary" onClick={() => setEditFeeId(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <>
                        ₹{visit.fees || "0"}{" "}
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="ms-1"
                          onClick={() => {
                            setEditFeeId(visit._id);
                            setFeeInput(visit.fees || "");
                          }}
                        >
                          {visit.fees ? "Edit" : "Add Fees"}
                        </Button>
                      </>
                    )}
                  </td>
                  <td>{visit.Visit_accept}</td>
                  <td>
                    <Button
                      variant="outline-success"
                      className="me-2"
                      onClick={() => handleOpenModal(visit, "accept")}
                    >
                      <FaRegThumbsUp />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleOpenModal(visit, "reject")}
                    >
                      <FaRegThumbsDown />
                    </Button>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRow === visit._id && (
                  <tr>
                    <td colSpan="12">
                      <div className="text-start px-3 py-2" style={{ backgroundColor: "#f9f9f9" }}>
                        <strong>Extra Info:</strong>
                        <ul>
                          <li><strong>Fees Status:</strong> {visit.fees_status || "Not Available"}</li>
                          <li><strong>Transaction ID:</strong> {visit.transaction_id || "Not Available"}</li>
                          {visit.mou_sign_status && <li><strong>MOU Sign Status:</strong> {visit.mou_sign_status}</li>}
                          {visit.agenda && <li><strong>Agenda:</strong> {visit.agenda}</li>}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination className="justify-content-end">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </Pagination>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        {renderModalContent()}
      </Modal>
    </Container>
  );
};

export default IVRequest;
