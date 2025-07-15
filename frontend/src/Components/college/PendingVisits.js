import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import ColHeader from "./Navbar";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import api from "../../api";


const PendingVisit = () => {
  const [pendingiv, setPendingiv] = useState([]);
  const collegename = localStorage.getItem("CollegeName");
  // const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    api.get("/api/getvisit")
      .then((res) => {
        // setCollegeData(res.data.userData);
        const data = res.data.userData;
        console.log("data", data)

        // total IV
        const totalIV = data.filter(
          (TIV) => TIV.college_name === collegename
        );
        const IVdata = totalIV;

        const pendingIV = IVdata.filter(
          (PIV) => PIV.Visit_accept === "pending"
        );
        setPendingiv(pendingIV);
      })
  }, []
  );
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}-${d.getFullYear()}`;
  };

  return (
    <div style={{ paddingTop: '15vh' }}>
      <ColHeader></ColHeader>
      <Container>
        <h2 className="my-3 text-primary text-center">Pending Visits</h2>
        <div className="d-flex justify-content-end mb-4">
          <Link to="/home">
            <Button
              className="btn btn-info"><span className="text-white"><IoMdArrowRoundBack size={24} /></span></Button>
          </Link>
        </div>
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr className="text-center">
              <th>Sr.</th>
              <th>Number of student</th>
              <th>Number of faculty</th>
              <th>Date of visit</th>
              <th>Visiting Location</th>
              <th>Fees Status</th>
              <th>Visit Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pendingiv.map((IV, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{IV.number_of_students}</td>
                <td>{IV.number_of_faculty}</td>
                <td>{formatDate(IV.Date_of_visit)}</td>
                <td>{IV.visting_location}</td>
                <td>{IV.fees_status}</td>
                <td>{IV.Visit_accept}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
export default PendingVisit;

