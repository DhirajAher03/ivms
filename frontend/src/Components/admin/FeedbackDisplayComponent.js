import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Pagination, Table } from 'react-bootstrap';
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { CSVLink } from "react-csv"; // For exporting CSV
import api from "../../api";

const FeedbackDisplayComponent = () => {

  const [feedbackData, setFeeddbackdata] = useState([]);

  useEffect(() => {
    api
      .get("/api/getfeedback")
      .then((res) => {
        setFeeddbackdata(res.data.data);
      })
      .catch((err) => console.log(err));

  })

  const [currentPage, setCurrentPage] = useState(1);
  const visitsPerPage = 10;

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr.No",
      "College Name",
      "Date of Visit",
      "Feedback"
    ];
    const tableRows = [];

    feedbackData.forEach((state, index) => {
      tableRows.push([
        index + 1,
        state.college_name,
        formatDate(state.feedback_Visit_Date),
        state.feedback_message,
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("feedback_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(feedbackData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "feedback Data");
    XLSX.writeFile(workbook, "feedback_data.xlsx");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };

  // Pagination logic
  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = feedbackData.slice(indexOfFirstVisit, indexOfLastVisit);

  const totalPages = Math.ceil(feedbackData.length / visitsPerPage);

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
      <Container>
        <h2 className="mt-4 text-center mb-3">Feedback</h2>
        <div className="mb-4 d-flex justify-content-start gap-2 ms-4">
          <Button variant="primary" onClick={exportPDF}>
            Export PDF
          </Button>
          <Button variant="primary" onClick={exportExcel}>
            Export Excel
          </Button>
          <CSVLink data={feedbackData} filename="state_data.csv">
            <Button variant="primary">Export CSV</Button>
          </CSVLink>
        </div>

        <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
          <thead className="table_header text-center">
            <tr className="text-center">
              <th>Sr.</th>
              <th>College Name</th>
              <th>Feedback Date</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentVisits.map((state, index) => (
              <tr key={state._id}>
                <td>{indexOfFirstVisit + index + 1}</td>
                <td>{state.college_name}</td>
                <td>{formatDate(state.feedback_Visit_Date)}</td>
                <td>{state.feedback_message}</td>
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
    </div>
  )
}

export default FeedbackDisplayComponent



