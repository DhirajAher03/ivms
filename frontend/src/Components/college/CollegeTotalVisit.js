import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Table, Button, Container, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import ColHeader from "./Navbar";
import { MdDelete, MdPictureAsPdf, MdFileDownload, MdAddCircle } from "react-icons/md";

const CollegeTotalVisit = () => {
  const [ivcount, setIvcount] = useState([]);
  const collegename = localStorage.getItem("CollegeName");
  const [currentPage, setCurrentPage] = useState(1);
  const visitsPerPage = 10;

  useEffect(() => {
    axios.get("http://localhost:8000/getvisit").then((res) => {
      const data = res.data.userData;
      const totalIV = data.filter(
        (TIV) =>
          TIV.college_name === collegename && TIV.Visit_status === "incomplete"
      );
      setIvcount(totalIV);
    });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = ivcount.slice(indexOfFirstVisit, indexOfLastVisit);
  const totalPages = Math.ceil(ivcount.length / visitsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["College name", "Number Of Student", "Number of faculty", "Date of visit", "Visiting Location", "Visit Status"];
    const tableRows = ivcount.map((university) => [
      university.college_name,
      university.number_of_students,
      university.number_of_faculty,
      formatDate(university.Date_of_visit),
      university.visting_location,
      university.Visit_status,
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("university_data.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(ivcount);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "university Data");
    XLSX.writeFile(workbook, "university_data.xlsx");
  };

  const handleUpdate = (id) => {
    localStorage.setItem("cancelvisitid", id);
  };

  return (
    <div>
      <ColHeader />
      <Container fluid>
        <div style={{ padding: "15vh 5vw 5vh 5vw" }}>
          <h2
            className="text-center fw-bold mb-4"
            style={{
              color: "rgb(7, 10, 92)",
              fontSize: "2.5rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            Scheduled Visits
          </h2>

          {/* All Buttons Right-Aligned in Single Line */}
          <div className="d-flex justify-content-end gap-2 flex-wrap mb-4">
            <Button variant="outline-danger" onClick={exportPDF}>
              <MdPictureAsPdf size={20} className="me-2" />
              Export PDF
            </Button>

            <Button variant="outline-success" onClick={exportExcel}>
              <MdFileDownload size={20} className="me-2" />
              Export Excel
            </Button>

            <CSVLink data={ivcount} filename="visit_data.csv">
              <Button variant="outline-primary">
                <MdFileDownload size={20} className="me-2" />
                Export CSV
              </Button>
            </CSVLink>

            <Link to="/addvisit">
              <Button className="btn btn-success">
                <MdAddCircle className="me-2" size={20} />
                Add Visit
              </Button>
            </Link>
          </div>

          {/* Visit Table */}
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>Sr.No</th>
                <th>Students</th>
                <th>Faculty</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentVisits.map((IV, index) => (
                <tr key={index}>
                  <td>{indexOfFirstVisit + index + 1}</td>
                  <td>{IV.number_of_students}</td>
                  <td>{IV.number_of_faculty}</td>
                  <td>{formatDate(IV.Date_of_visit)}</td>
                  <td>{formatTime(IV.start_time)}</td>
                  <td>{formatTime(IV.end_time)}</td>
                  <td>{IV.visting_location}</td>
                  <td>{IV.Visit_accept}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleUpdate(IV._id)} href="/visitcancelled">
                      <MdDelete size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-end">
              <Pagination.Prev disabled={currentPage === 1} onClick={handlePrevPage} />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                  {page}
                </Pagination.Item>
              ))}
              <Pagination.Next disabled={currentPage === totalPages} onClick={handleNextPage} />
            </Pagination>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CollegeTotalVisit;
