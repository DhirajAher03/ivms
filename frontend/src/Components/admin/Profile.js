import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ColHeader from "./Navbar";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  const id = localStorage.getItem("userid");
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_registration_one/${id}`)
      .then((res) => {
        setProfileData(res.data.userData);
        console.log("hi", res.data.userData);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <>
      <ColHeader />
      <Container>
        <Row>
          <Col md={9} className="mx-auto">
            <h2 className="text-center mt-3 mb-3">Profile Details</h2>
            <Container className="border border-dark mb-4 ">
              <Table hover className="text-center">
                <tbody>
                  <tr>
                    <th>College Name:</th>
                    <td>{profileData.collage_name}</td>
                  </tr>
                  <tr>
                    <th>State:</th>
                    <td>{profileData.reg_state}</td>
                  </tr>
                  <tr>
                    <th>District:</th>
                    <td>{profileData.reg_district}</td>
                  </tr>
                  <tr>
                    <th>City:</th>
                    <td>{profileData.reg_city}</td>
                  </tr>
                  <tr>
                    <th>University Name:</th>
                    <td>{profileData.reg_university_name}</td>
                  </tr>
                  <tr>
                    <th>Principal Name:</th>
                    <td>{profileData.reg_principal_name}</td>
                  </tr>
                  <tr>
                    <th>Contact Person:</th>
                    <td>{profileData.reg_contact_person}</td>
                  </tr>
                  <tr>
                    <th>Contact Number 1:</th>
                    <td>{profileData.reg_contact_person_contact1}</td>
                  </tr>
                  <tr>
                    <th>Contact Number 2:</th>
                    <td>{profileData.reg_contact_person_contact2}</td>
                  </tr>
                  <tr>
                    <th>College Email ID:</th>
                    <td>{profileData.reg_college_email_id}</td>
                  </tr>
                  <tr>
                    <th>Username:</th>
                    <td>{profileData.reg_college_username}</td>
                  </tr>

                  <tr>
                    <th>MOU Signed:</th>
                    <td>{profileData.reg_mou_sign}</td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
