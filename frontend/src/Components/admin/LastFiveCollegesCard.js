import React, { useState, useEffect } from "react";
import axios from "axios";
import "jspdf-autotable";
import { Table, Container } from "react-bootstrap";
import "../../App.css";
import "../../Stylesadm/LastFiveCollegesCard.css";
import api from "../../api";

const CollegeTotalVisit = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    api.get('/api/visit/getvisit')
      .then(res => {
        const lastFive = res.data.userData.slice(-5).reverse();
        setColleges(lastFive);
      })
      .catch(err => {
        console.error('Error fetching visits:', err);
      });
  }, []);

  return (
    <div>
      <Container className="shadow rounded-4" style={{ backgroundColor: "white" }}>
        <div style={{ padding: "4vh 1vw 5vh 1vw" }}>
          <h2
            className="text-start fw-bold mb-4"
            style={{
              color: "rgb(7, 10, 92)",
              fontSize: "1.5rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            Scheduled Visits
          </h2>

          {/* Visit Table */}
          <Table striped bordered hover responsive className="shadow-sm rounded-table custom-professional-table">
            <thead className="table_header text-center">
              <tr>
                <th>Sr.No</th>
                <th>College</th>
                <th>Date of Visit</th>
                <th>Students</th>
                <th>Faculty</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {colleges.map((visit, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{visit.college_name || 'N/A'}</td>
                  <td>{visit.Date_of_visit || 'N/A'}</td>
                  <td>{visit.number_of_students || 'N/A'}</td>
                  <td>{visit.number_of_faculty || 'N/A'}</td>
                  <td>{visit.mousigned || 'N/A'}</td>
                  <td>{visit.visting_location || 'N/A'}</td>
                  <td>{visit.Visit_accept}</td>
                  {/* <td>
                    <span
                      className={`badge ${visit.reg_status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}
                    >
                      {visit.reg_status || 'Pending'}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default CollegeTotalVisit;
