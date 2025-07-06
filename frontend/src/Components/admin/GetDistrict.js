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

const GetDistrict = () => {
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getdistrict")
      .then((res) => {
        setDistrictData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);


  const deletedata = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this district?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/deletedistrict/${id}`)
        .then((res) => {
          alert("District Deleted Successfully");
          // Optionally, refresh the data here by fetching again
          setDistrictData((prevData) => prevData.filter((district) => district._id !== id));
        })
        .catch((error) => {
          console.error("Error Deleting District:", error);
        });
    } else {
      alert("District deletion canceled.");
    }
  };

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "district_state",
      "district_name",
      "district_status",
    ];
    const tableRows = [];

    districtData.forEach((district) => {
      tableRows.push([
        district.district_state,
        district.district_name,
        district.district_status,
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("distict_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(districtData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "district Data");
    XLSX.writeFile(workbook, "district_data.xlsx");
  };

  const handleUpdate = (id) => {
    localStorage.setItem('updatedistrictid', id);
  };
  return (
    <Container>
      <h2 className="my-4 text-center">District Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2 ms-4">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="primary" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={districtData} filename="visit_data.csv">
          <Button variant="primary">Export CSV</Button>
        </CSVLink>
      </div>

      <div className="d-flex justify-content-end me-3 mb-3">
        <Link to="/head/adddistrict">
          <Button className="btn btn-primary py-2 px-3">Add</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
        <thead className="table_header text-center">
          <tr className="text-center">
            <th>Sr.</th>
            <th> State</th>
            <th> Name</th>
            <th> Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {districtData.map((district, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{district.district_state}</td>
              <td>{district.district_name}</td>
              <td>{district.district_status}</td>
              <td>
                <Link
                  to='/head/update_district'
                  onClick={() => handleUpdate(district._id)}>
                  <Button className="btn btn-primary me-4 px-2 py-1 ms-4 mb-2 mb-md-0 ms-md-0"><MdModeEdit size={24} /></Button></Link>
                <Button variant="danger"
                  onClick={() => deletedata(district._id)} className="btn btn-danger px-2 py-1"><MdDelete size={24} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default GetDistrict;
