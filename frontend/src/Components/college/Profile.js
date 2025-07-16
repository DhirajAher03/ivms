import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ColHeader from "./Navbar";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import agenda from "../../Images/Agenda.jpg";
import profile from "../../Images/profile.jpg"
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import api from "../../api";


const Profile = () => {
  const [profileData, setProfileData] = useState({});

  const id = localStorage.getItem("userid");

  useEffect(() => {
    api
      .get(`/api/registration/get_registration_one/${id}`)
      .then((res) => {
        setProfileData(res.data.userData);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="min-vh-100" style={{ paddingTop: '15vh' }}>
      <ColHeader />
      <Container>
        <Row>
          <Col md={6} className="mt-5">
            <img
              src={profile}
              alt="Agenda"
              className="mt-5 ms-4 rounded-2"
              style={{ height: "600px", width: "600px" }}
            />
          </Col>
          <Col md={6} className="">
            <div className="d-flex justify-content-end mb-2">
              <Link to="/home">
                <Button className="btn btn-info"><span className="text-white">{<IoMdArrowRoundBack size={24} />}</span></Button>
              </Link>
            </div>
            <Container className="shadow shadow-md rounded-5 mt-5 p-4">
              <h2 className="text-center mt-1 mb-5  text-primary">Profile Details</h2>
              <Row>
                <Col>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>College Name:</b>
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          value={profileData.collage_name || ""}
                          readOnly
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>State:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_state || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>District:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_district || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>City:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_city || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>University Name:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_university_name || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>Principal Name:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_principal_name || ""}
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>Contact Person:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_contact_person || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column>
                        <b>Contact Number 1:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_contact_person_contact1 || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>Contact Number 2:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_contact_person_contact2 || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>College Email ID:</b>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={profileData.reg_college_email_id || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column >
                        <b>Username:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_college_username || ""}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className="">
                      <Form.Label column >
                        <b>MOU Signed:</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.reg_mou_sign || ""}
                        readOnly
                      />
                    </Form.Group>

                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;