import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const GetFees = () => {
  const [feesData, setFeesData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/get_fees")
      .then((res) => {
        setFeesData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching fees data:", error);
      });
  }, []);

  const deletedata = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this fees?");
    if (confirmDelete) {
      axios
        .delete(`/api/delete_fees/${id}`)
        .then((res) => {
          alert("Fees Deleted Successfully");
          // Optionally, refresh the data here by fetching again
          setFeesData((prevData) => prevData.filter((fees) => fees._id !== id));
        })
        .catch((error) => {
          console.error("Error Deleting Fees:", error);
        });
    } else {
      alert("Fees deletion canceled.");
    }
  };


  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "fees_title",
      "fees_amount",
      "fees_status",
    ];
    const tableRows = [];

    feesData.forEach((fees) => {
      tableRows.push([
        fees.fees_title,
        fees.fees_amount,
        fees.fees_status,

      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("fees_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(feesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "fees Data");
    XLSX.writeFile(workbook, "fees_data.xlsx");
  };

  const handleUpdate = (_id) => {
    localStorage.setItem('updatefeesid', _id);
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Fees Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2  ms-4">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="primary" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={feesData} filename="fees_data.csv">
          <Button variant="primary">Export CSV</Button>
        </CSVLink>
      </div>

      <div className="d-flex justify-content-end me-3 mb-3">
        <Link to="/head/fees">
          <Button className="btn btn-primary py-2 px-3">Add</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
        <thead className="table_header text-center">
          <tr className="text-center">
            <th>Sr.</th>
            <th> Title</th>
            <th> Amount</th>
            <th> Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {feesData.map((fees, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{fees.fees_title}</td>
              <td>{fees.fees_amount}</td>
              <td>{fees.fees_status}</td>
              <td>
                <Link
                  to='/head/update_fees'
                  onClick={() => handleUpdate(fees._id)}>
                  <Button className="btn btn-primary me-4 px-2 py-1 ms-4 mb-2 mb-md-0 ms-md-0"><MdModeEdit size={24} /></Button></Link>
                <Button variant="danger"
                  onClick={() => deletedata(fees._id)} className="btn btn-danger px-2 py-1"><MdDelete size={24} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetFees;
