import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../api";

const CurrentMonthVisits = () => {
  const [visitData, setVisitData] = useState([]);
  const [currentMonthVisits, setCurrentMonthVisits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const visitsPerPage = 10; // Number of rows per page

  useEffect(() => {
    api.get("/api/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        const currentMonthVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= startOfMonth && visitDate <= endOfMonth;
        });

        setCurrentMonthVisits(currentMonthVisits);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr.No",
      "College Name",
      "Number of Students",
      "Date of Visit",
      "Start Time",
      "End Time",
      "Number of Faculty",
      "Visiting Location",
      "Visit Accept",
      "Visit Status"
    ];
    const tableRows = [];

    currentMonthVisits.forEach((visit, index) => {
      tableRows.push([
        index + 1,
        visit.college_name,
        visit.number_of_students,
        formatDate(visit.Date_of_visit),
        formatTime(visit.start_time),
        formatTime(visit.end_time),
        visit.number_of_faculty,
        visit.visting_location,
        visit.Visit_accept,
        visit.Visit_status
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("current_month_visits.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(currentMonthVisits);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Current Month Visits");
    XLSX.writeFile(workbook, "current_month_visits.xlsx");
  };

  // Pagination logic
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
    <Container>
      <h2 className="mt-4 text-center mb-4">Current Month Visit Data</h2>
      <div className="d-flex justify-content-end">
        <Link className="text-decoration-none" to="/head/dashboard"><Button className="text-primary"><span className="text-white">Back</span></Button></Link>
      </div>
      <div className="mb-4 d-flex justify-content-start gap-2  ms-4">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="primary" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={currentMonthVisits} filename="current_month_visits.csv">
          <Button variant="primary">Export CSV</Button>
        </CSVLink>
      </div>

      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr className="text-center">
            <th>Sr.</th>
            <th>College Name</th>
            <th>Number of Students</th>
            <th>Number of Faculty</th>
            <th>Date of Visit</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Visiting Location</th>
            <th>Visit Status</th>
            <th>Visit Completed Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentVisits.map((visit, index) => (
            <tr key={visit._id}>
              <td>{index + 1}</td>
              <td>{visit.college_name}</td>
              <td>{visit.number_of_students}</td>
              <td>{visit.number_of_faculty}</td>
              <td>{formatDate(visit.Date_of_visit)}</td>
              <td>{formatTime(visit.start_time)}</td>
              <td>{formatTime(visit.end_time)}</td>
              <td>{visit.visting_location}</td>
              <td>{visit.Visit_accept}</td>
              <td>{visit.Visit_status}</td>
            </tr>
          ))}
        </tbody>
      </Table>


      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-end">
          <Pagination.Prev disabled={currentPage === 1} onClick={handlePrevPage} />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default CurrentMonthVisits;
