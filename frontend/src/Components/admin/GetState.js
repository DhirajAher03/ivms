import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetCity from "./GetCity";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import api from "../../api"; // Adjust the import based on your project structure

const GetState = () => {
  const [StateData, setStateData] = useState([]);

  useEffect(() => {
    api
      .get("/api/state/getstate")
      .then((res) => {
        setStateData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const deletedata = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this state?");
    if (confirmDelete) {
      api
        .delete(`/api/state/deletestate/${id}`)
        .then((res) => {
          alert("State Deleted Successfully");
          // Optionally, refresh the data here by fetching again
          setStateData((prevData) => prevData.filter((state) => state._id !== id));
        })
        .catch((error) => {
          console.error("Error Deleting State:", error);
        });
    } else {
      alert("State deletion canceled.");
    }
  };


  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "state_name",
      "state_status"
    ];
    const tableRows = [];

    StateData.forEach((state) => {
      tableRows.push([
        state.state_name,
        state.state_status,
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("state_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(StateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "state Data");
    XLSX.writeFile(workbook, "state_data.xlsx");
  };

  const handleUpdate = (_id) => {
    localStorage.setItem('updatestateid', _id);
  };

  return (
    <Container>
      <h2 className="my-4 text-center">State Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2 ms-4">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="primary" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={StateData} filename="state_data.csv">
          <Button variant="primary">Export CSV</Button>
        </CSVLink>
      </div>

      <div className="d-flex justify-content-end me-3 mb-3">
        <Link to="/head/state">
          <Button className="btn btn-primary py-2 px-3">Add</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
        <thead className="table_header text-center">
          <tr className="text-center">
            <th>Sr.</th>
            <th> Name</th>
            <th> Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {StateData.map((state, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{state.state_name}</td>
              <td>{state.state_status}</td>
              <td>
                <Link
                  to='/head/update_state'
                  onClick={() => handleUpdate(state._id)}>
                  <Button className="btn btn-primary me-4 px-2 py-1"><MdModeEdit size={24} /></Button></Link>
                <Button variant="danger"
                  onClick={() => deletedata(state._id)} className="btn btn-danger px-2 py-1"><MdDelete size={24} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetState;
