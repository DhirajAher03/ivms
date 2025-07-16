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
import api from "../../api"; // Adjust the import based on your project structure

const GetCity = () => {
  const [CityData, setCityData] = useState([]);

  useEffect(() => {
    api
      .get("/api/city/getcity")
      .then((res) => {
        setCityData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const deletedata = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this city?");
    if (confirmDelete) {
      api
        .delete(`/api/city/deletecity/${id}`)
        .then((res) => {
          alert("City Deleted Successfully");
          // Optionally, refresh the data here by fetching again
          setCityData((prevData) => prevData.filter((city) => city._id !== id));
        })
        .catch((error) => {
          console.error("Error Deleting City:", error);
        });
    } else {
      alert("City deletion canceled.");
    }
  };


  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "city_state",
      "city_district",
      "city_name",
      "city_status"
    ];
    const tableRows = [];

    CityData.forEach((city) => {
      tableRows.push([
        city.city_state,
        city.city_district,
        city.city_name,
        city.city_status
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("city_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(CityData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "city Data");
    XLSX.writeFile(workbook, "city_data.xlsx");
  };

  const handleUpdate = (id) => {
    localStorage.setItem('updateid', id);
    // console.log("id",id);
  };

  return (
    <Container>
      <h2 className="my-4 text-center">City Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2 ms-4">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="primary" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={CityData} filename="city_data.csv">
          <Button variant="primary">Export CSV</Button>
        </CSVLink>
      </div>

      <div className="d-flex justify-content-end me-3 mb-3">
        <Link to="/head/addcity">
          <Button className="btn btn-primary py-2 px-3">Add</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
        <thead className="table_header text-center">
          <tr className="text-center">
            <th>Sr.</th>
            <th> State</th>
            <th> District</th>
            <th> Name</th>
            <th> Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {CityData.map((city, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{city.city_state}</td>
              <td>{city.city_district}</td>
              <td>{city.city_name}</td>
              <td>{city.city_status}</td>
              <td>
                <Link
                  to='/head/update_city'
                  onClick={() => handleUpdate(city._id)}>
                  <Button className="btn btn-primary me-4 px-2 py-1 ms-4 mb-2 mb-md-0 ms-md-0"><MdModeEdit size={24} /></Button></Link>

                <Button variant="danger"
                  onClick={() => deletedata(city._id)} className="btn btn-danger px-2 py-1"><MdDelete size={24} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetCity;
