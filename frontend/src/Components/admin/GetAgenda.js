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
import api from "../../api";

const GetAgenda = () => {
  const [agendaData, setAgendaData] = useState([]);

  useEffect(() => {
    api
      .get("/api/agenda/get_agenda")
      .then((res) => {
        setAgendaData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const deletedata = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this agenda?");
    if (confirmDelete) {
      axios
        .delete(`/api/delete_agenda/${id}`)
        .then((res) => {
          alert("Agenda Deleted Successfully");
          // Optionally, refresh the data here by fetching again
          setAgendaData((prevData) => prevData.filter((agenda) => agenda._id !== id));
        })
        .catch((error) => {
          console.error("Error Deleting Agenda:", error);
        });
    } else {
      alert("Agenda deletion canceled.");
    }
  };


  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "agenda_title",
      "agenda_description",
      "agenda_time",
      "agenda_status",
    ];
    const tableRows = [];

    agendaData.forEach((agenda) => {
      tableRows.push([
        agenda.agenda_title,
        agenda.agenda_description,
        agenda.agenda_time,
        agenda.agenda_status,

      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("agenda_data.pdf");
  };

  // Function to export as Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(agendaData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "agenda Data");
    XLSX.writeFile(workbook, "agenda_data.xlsx");
  };

  const handleUpdate = (_id) => {
    localStorage.setItem('updateagendaid', _id);
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Agenda Data</h2>
      <div className="mb-4 d-flex justify-content-start gap-2  ms-4">
        <Button variant="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="primary" onClick={exportExcel}>
          Export Excel
        </Button>
        <CSVLink data={agendaData} filename="agenda_data.csv">
          <Button variant="primary">Export CSV</Button>
        </CSVLink>
      </div>

      <div className="d-flex justify-content-end me-3 mb-3">
        <Link to="/head/agenda">
          <Button className="btn btn-primary py-2 px-3">Add</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
        <thead className="table_header text-center">
          <tr className="text-center">
            <th>Sr.</th>
            <th> Title</th>
            <th> Description</th>
            <th> Time (in hrs)</th>
            <th> Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {agendaData.map((agenda, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{agenda.agenda_title}</td>
              <td>{agenda.agenda_description}</td>
              <td>{agenda.agenda_time}</td>
              <td>{agenda.agenda_status}</td>
              <td>
                <Link
                  to='/head/update_agenda'
                  onClick={() => handleUpdate(agenda._id)}>
                  <Button className="btn btn-primary me-4 px-2 py-1 ms-4 mb-2 mb-md-0 ms-md-0"><MdModeEdit size={24} /></Button></Link>
                <Button variant="danger"
                  onClick={() => deletedata(agenda._id)} className="btn btn-danger px-2 py-1"><MdDelete size={24} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetAgenda;
