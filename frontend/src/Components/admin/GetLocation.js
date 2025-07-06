import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // For exporting CSV
import jsPDF from "jspdf"; // For exporting PDF
import "jspdf-autotable";
import * as XLSX from "xlsx"; // For exporting Excel
import { Table, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const GetLocation = () => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getlocation")
      .then((res) => {
        setLocationData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const deletedata = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this location?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/deletelocation/${id}`)
        .then((res) => {
          alert("Location Deleted Successfully");
          // Optionally, refresh the data here by fetching again
          setLocationData((prevData) => prevData.filter((location) => location._id !== id));
        })
        .catch((error) => {
          console.error("Error Deleting Location:", error);
        });
    } else {
      alert("Location deletion canceled.");
    }
  };


  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "location_city",
      "location_name",
      "location_status",
    ];
    const tableRows = [];

    locationData.forEach((location) => {
      tableRows.push([
        location.location_city,
        location.location_name,
        location.location_status,
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("location_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(locationData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "location Data");
    XLSX.writeFile(workbook, "location_data.xlsx");
  };

  const handleUpdate = (id) => {
    localStorage.setItem('updatelocationid', id);
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Location Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2  ms-4">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="primary" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={locationData} filename="visit_data.csv">
          <Button variant="primary">Export CSV</Button>
        </CSVLink>
      </div>

      <div className="d-flex justify-content-end me-3 mb-3">
        <Link to="/head/addlocation">
          <Button className="btn btn-primary py-2 px-3">Add</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
        <thead className="table_header text-center">
          <tr className="text-center">
            <th>Sr.</th>
            <th> Name</th>
            <th> City</th>
            <th> Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {locationData.map((location, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{location.location_name}</td>
              <td>{location.location_city}</td>
              <td>{location.location_status}</td>
              <td>
                <Link
                  to='/head/update_location'
                  onClick={() => handleUpdate(location._id)}>
                  <Button className="btn btn-primary me-4 px-2 py-1 ms-4 mb-2 mb-md-0 ms-md-0"><MdModeEdit size={24} /></Button></Link>
                <Button variant="danger"
                  onClick={() => deletedata(location._id)} className="btn btn-danger px-2 py-1"><MdDelete size={24} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetLocation;
