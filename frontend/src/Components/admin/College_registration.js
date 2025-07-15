import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import api from "../../api";
// import { useNavigate } from "react-router-dom";

const College_registration = () => {
  const [collage_name, setCollage_name] = useState("");
  const [reg_state, setReg_state] = useState("");
  const [reg_district, setReg_district] = useState("");
  const [reg_city, setReg_city] = useState("");
  const [reg_university_name, setReg_university_name] = useState("");
  const [reg_principal_name, setReg_principal_name] = useState("");
  const [reg_contact_person, setReg_contact_person] = useState("");
  const [reg_contact_person_contact1, setReg_contact_person_contact1] = useState("");
  const [reg_contact_person_contact2, setReg_contact_person_contact2] = useState("");
  const [reg_college_email_id, setReg_college_email_id] = useState("");
  const [reg_college_username, setReg_college_username] = useState("");
  const [reg_password, setReg_password] = useState("");
  const [reg_confirm_password, setReg_confirm_password] = useState("");
  // const [reg_visit_location, setReg_visit_location] = useState("");
  const [reg_mou_sign, setReg_mou_sign] = useState("");
  const [reg_status, setstatus] = useState("");
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [city, setCity] = useState([]);
  const [university, setUniversity] = useState([]);
  // const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!collage_name) {
      isValid = false;
      errors["collage_name"] = "College name is required";
    } else if (!/^[a-zA-Z]+$/.test(collage_name)) {
      isValid = false;
      errors["collage_name"] = "College name is invalid";
    }
    if (!reg_state.trim()) {
      isValid = false;
      errors["reg_state"] = "State is required.";
    }

    if (!reg_district.trim()) {
      isValid = false;
      errors["reg_district"] = "District is required.";
    }

    if (!reg_city.trim()) {
      isValid = false;
      errors["reg_city"] = "City is required.";
    }

    if (!reg_university_name.trim()) {
      isValid = false;
      errors["reg_university_name"] = "University is required.";
    }
    if (!reg_principal_name.trim()) {
      isValid = false;
      errors["reg_principal_name"] = "Principal name is required.";
    }

    if (!reg_college_email_id) {
      isValid = false;
      errors["reg_college_email_id"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(reg_college_email_id)) {
      isValid = false;
      errors["reg_college_email_id"] = "Email is invalid";
    }

    if (!reg_college_username.trim()) {
      isValid = false;
      errors["reg_college_username"] = "Username is required.";
    }

    if (!reg_password.trim()) {
      isValid = false;
      errors["reg_password"] = "Password is required.";
    }

    if (!/^[a-zA-Z]+$/.test(reg_contact_person)) {
      isValid = false;
      errors["reg_contact_person"] = "First name must contain only letters";
    }

    if (!reg_contact_person_contact1) {
      isValid = false;
      errors["reg_contact_person_contact1"] = "Mobile number is required";
    } else if (!/^\d{10}$/.test(reg_contact_person_contact1)) {
      isValid = false;
      errors["reg_contact_person_contact1"] = "Enter a valid 10-digit mobile number";
    }

    if (!reg_mou_sign.trim()) {
      isValid = false;
      errors["reg_mou_sign"] = "MoU status is required.";
    }


    setErrors(errors);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const userdata = {
      collage_name,
      reg_state,
      reg_district,
      reg_city,
      reg_university_name,
      reg_principal_name,
      reg_contact_person,
      reg_contact_person_contact1,
      reg_contact_person_contact2,
      reg_college_email_id,
      reg_college_username,
      reg_password,
      reg_confirm_password,

      reg_mou_sign,
      reg_status,
    };

    try {
      axios
        .post("/api/add_registration", userdata)
        .then((res) => {
          // navigate('/Dashboard');
          console.log("hiiiiiiii", res.data.data);
          handleClear();
        })
    }

    catch (err) {
      console.error("Error while registration", err);
    }
  };


  const handleClear = () => {
    setCollage_name("");
    setReg_state("");
    setReg_district("");
    setReg_city("");
    setReg_university_name("");
    setReg_principal_name("");
    setReg_contact_person("");
    setReg_contact_person_contact1("");
    setReg_contact_person_contact2("");
    setReg_college_email_id("");
    setReg_college_username("");
    setReg_password("");
    setReg_confirm_password("");
    setReg_mou_sign("");
    setstatus("");
  };

  // Get State
  useEffect(() => {
    axios
      .get("/api/getstate")
      .then((res) => {
        const data = res.data.data;
        const activestate = data.filter(
          (a) => a.state_status === "active"
        )
        setState(activestate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // Get District
  useEffect(() => {
    axios
      .get("/api/getdistrict")
      .then((res) => {
        const data = res.data.data;
        const activedistrict = data.filter(
          (a) => a.district_status === "active"
        )
        setDistrict(activedistrict);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter Districts When State Changes
  useEffect(() => {
    console.log(reg_state)
    if (reg_state) {

      const filtered = district.filter(
        (district) => district.district_state === reg_state
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]); // Reset if no state is selected
    }
  }, [reg_state, district]);


  // Get City
  useEffect(() => {
    axios
      .get("/api/getcity")
      .then((res) => {
        const data = res.data.data;
        const activecity = data.filter(
          (a) => a.city_status === "active"
        )
        setCity(activecity);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter City When District Changes
  useEffect(() => {
    console.log(reg_district)
    if (reg_district) {

      const filtered = city.filter(
        (city) => city.city_district === reg_district
      );
      setFilteredCity(filtered);
    } else {
      setFilteredCity([]); // Reset if no state is selected
    }
  }, [reg_district, city]);

  //   Get University
  useEffect(() => {
    axios
      .get("/api/getuniversity")
      .then((res) => {
        const data = res.data.data;
        const activeuniversity = data.filter(
          (a) => a.university_status === "active"
        )
        setUniversity(activeuniversity);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-light py-3">
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <div className="shadow p-4 rounded-5 bg-white border ">
              <h3 className="text-center mb-4 " style={{ color: "rgb(24 41 114)" }}>🏫 College Registration</h3>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="collageName">
                      <Form.Label>College Name</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="text"
                        value={collage_name}
                        onChange={(e) => setCollage_name(e.target.value)}
                        isInvalid={!!errors.collage_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.collage_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        className="rounded-5"
                        value={reg_state}
                        onChange={(e) => setReg_state(e.target.value)}
                        isInvalid={!!errors.reg_state}
                      >
                        <option value="">Select State</option>
                        {state.map((s) => (
                          <option key={s._id} value={s.state_name}>
                            {s.state_name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="district">
                      <Form.Label>District</Form.Label>
                      <Form.Select
                        className="rounded-5"
                        value={reg_district}
                        onChange={(e) => setReg_district(e.target.value)}
                        isInvalid={!!errors.reg_district}
                      >
                        <option value="">Select District</option>
                        {filteredDistricts.map((d) => (
                          <option key={d._id} value={d.district_name}>
                            {d.district_name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_district}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        className="rounded-5"
                        value={reg_city}
                        onChange={(e) => setReg_city(e.target.value)}
                        isInvalid={!!errors.reg_city}
                      >
                        <option value="">Select City</option>
                        {filteredCity.map((c) => (
                          <option key={c._id} value={c.city_name}>
                            {c.city_name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="university">
                      <Form.Label>University Name</Form.Label>
                      <Form.Select
                        className="rounded-5"
                        value={reg_university_name}
                        onChange={(e) => setReg_university_name(e.target.value)}
                        isInvalid={!!errors.reg_university_name}
                      >
                        <option value="">Select University</option>
                        {university.map((u) => (
                          <option key={u._id} value={u.university_name}>
                            {u.university_name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_university_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="principalName">
                      <Form.Label>Principal Name</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="text"
                        value={reg_principal_name}
                        onChange={(e) => setReg_principal_name(e.target.value)}
                        isInvalid={!!errors.reg_principal_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_principal_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactPerson">
                      <Form.Label>Contact Person</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="text"
                        value={reg_contact_person}
                        onChange={(e) => setReg_contact_person(e.target.value)}
                        isInvalid={!!errors.reg_contact_person}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_contact_person}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contact1">
                      <Form.Label>Contact No. 1</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="text"
                        value={reg_contact_person_contact1}
                        onChange={(e) => setReg_contact_person_contact1(e.target.value)}
                        isInvalid={!!errors.reg_contact_person_contact1}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_contact_person_contact1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contact2">
                      <Form.Label>Contact No. 2</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="text"
                        value={reg_contact_person_contact2}
                        onChange={(e) => setReg_contact_person_contact2(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="email"
                        value={reg_college_email_id}
                        onChange={(e) => setReg_college_email_id(e.target.value)}
                        isInvalid={!!errors.reg_college_email_id}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_college_email_id}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="text"
                        value={reg_college_username}
                        onChange={(e) => setReg_college_username(e.target.value)}
                        isInvalid={!!errors.reg_college_username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_college_username}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="password"
                        value={reg_password}
                        onChange={(e) => setReg_password(e.target.value)}
                        isInvalid={!!errors.reg_password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        className="rounded-5"
                        type="password"
                        value={reg_confirm_password}
                        onChange={(e) => setReg_confirm_password(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="mouSign">
                      <Form.Label>MoU Signed?</Form.Label>
                      <Form.Select
                        className="rounded-5"
                        value={reg_mou_sign}
                        onChange={(e) => setReg_mou_sign(e.target.value)}
                        isInvalid={!!errors.reg_mou_sign}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.reg_mou_sign}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-3 mt-4">
                  <Button variant="secondary" className="rounded-5" onClick={handleClear}>
                    Clear
                  </Button>
                  <Button variant="primary" type="submit" className="rounded-5"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );

};

export default College_registration;