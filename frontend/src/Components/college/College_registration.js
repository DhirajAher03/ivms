import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../Images/logo-light.png";

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
  const [reg_visit_location, setReg_visit_location] = useState("");
  const [reg_mou_sign, setReg_mou_sign] = useState("");
  const [reg_status, setstatus] = useState("");
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [city, setCity] = useState([]);
  const [university, setUniversity] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let errors = {};
    let isValid = true;


    if (!collage_name.trim()) {
      isValid = false;
      errors["collage_name"] = "State is required.";
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

    if (!reg_contact_person.trim()) {
      isValid = false;
      errors["reg_contact_person"] = "Contact name must contain only letters.";
    }
    // if (!/^[a-zA-Z]+$/.test(reg_contact_person)) {
    //   isValid = false;
    //   errors["reg_contact_person"] = "First name must contain only letters";
    // }

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
      reg_visit_location,
      reg_mou_sign,
      reg_status,
    };

    try {
      axios
        .post("/api/add_registration", userdata)
        .then((res) => {
          navigate('/')
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
    setReg_visit_location("");
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
    <>
      <div style={{ backgroundColor: "#eaf3fb", minHeight: "100vh", paddingTop: "30px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm border border-1 border-primary-subtle">
                <h2 className="text-center text-primary mb-4 fw-bold">Registration Form</h2>
                <Form>
                  <Row className="g-3">
                    {/* College Name */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupCollege">
                        <Form.Label>College Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={collage_name}
                          onChange={(e) => setCollage_name(e.target.value)}
                          placeholder="Enter College Name"
                        />
                        {errors.collage_name && <p className="text-danger">{errors.collage_name}</p>}
                      </Form.Group>
                    </Col>

                    {/* State */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupState">
                        <Form.Label>State</Form.Label>
                        <Form.Select
                          required
                          value={reg_state}
                          onChange={(e) => setReg_state(e.target.value)}
                        >
                          <option value="">Select State</option>
                          {state.map((item) => (
                            <option key={item._id} value={item.state_name}>
                              {item.state_name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.reg_state && <p className="text-danger">{errors.reg_state}</p>}
                      </Form.Group>
                    </Col>

                    {/* District */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupDistrict">
                        <Form.Label>District</Form.Label>
                        <Form.Select
                          required
                          value={reg_district}
                          onChange={(e) => setReg_district(e.target.value)}
                        >
                          <option value="">Select District</option>
                          {filteredDistricts.map((item) => (
                            <option key={item._id} value={item.district_name}>
                              {item.district_name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.reg_district && <p className="text-danger">{errors.reg_district}</p>}
                      </Form.Group>
                    </Col>

                    {/* City */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupCity">
                        <Form.Label>City</Form.Label>
                        <Form.Select
                          required
                          value={reg_city}
                          onChange={(e) => setReg_city(e.target.value)}
                        >
                          <option value="">Select City</option>
                          {filteredCity.map((item) => (
                            <option key={item._id} value={item.city_name}>
                              {item.city_name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.reg_city && <p className="text-danger">{errors.reg_city}</p>}
                      </Form.Group>
                    </Col>

                    {/* University */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupUniversity">
                        <Form.Label>University Name</Form.Label>
                        <Form.Select
                          required
                          value={reg_university_name}
                          onChange={(e) => setReg_university_name(e.target.value)}
                        >
                          <option value="">Select University</option>
                          {university.map((item) => (
                            <option key={item._id} value={item.university_name}>
                              {item.university_name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.reg_university_name && <p className="text-danger">{errors.reg_university_name}</p>}
                      </Form.Group>
                    </Col>

                    {/* Principal Name */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupPrincipalName">
                        <Form.Label>Principal Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={reg_principal_name}
                          onChange={(e) => setReg_principal_name(e.target.value)}
                          placeholder="Enter Principal Name"
                        />
                        {errors.reg_principal_name && <p className="text-danger">{errors.reg_principal_name}</p>}
                      </Form.Group>
                    </Col>

                    {/* Contact Person */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupContactPerson">
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={reg_contact_person}
                          onChange={(e) => setReg_contact_person(e.target.value)}
                          placeholder="Enter Contact Person"
                        />
                        {errors.reg_contact_person && <p className="text-danger">{errors.reg_contact_person}</p>}
                      </Form.Group>
                    </Col>

                    {/* Contact Numbers */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupContact1">
                        <Form.Label>Contact Person Contact 1</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          value={reg_contact_person_contact1}
                          onChange={(e) => setReg_contact_person_contact1(e.target.value)}
                          pattern="^\d{10}$"
                          placeholder="Enter 10-digit Contact Number"
                        />
                        {errors.reg_contact_person_contact1 && <p className="text-danger">{errors.reg_contact_person_contact1}</p>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="formGroupContact2">
                        <Form.Label>Contact Person Contact 2</Form.Label>
                        <Form.Control
                          type="tel"
                          value={reg_contact_person_contact2}
                          onChange={(e) => setReg_contact_person_contact2(e.target.value)}
                          pattern="^\d{10}$"
                          placeholder="Optional"
                        />
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          value={reg_college_email_id}
                          onChange={(e) => setReg_college_email_id(e.target.value)}
                          placeholder="Enter Email ID"
                        />
                        {errors.reg_college_email_id && <p className="text-danger">{errors.reg_college_email_id}</p>}
                      </Form.Group>
                    </Col>

                    {/* Username */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={reg_college_username}
                          onChange={(e) => setReg_college_username(e.target.value)}
                          placeholder="Enter Username"
                        />
                        {errors.reg_college_username && <p className="text-danger">{errors.reg_college_username}</p>}
                      </Form.Group>
                    </Col>

                    {/* Passwords */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          minLength={8}
                          value={reg_password}
                          onChange={(e) => setReg_password(e.target.value)}
                          placeholder="Enter Password"
                        />
                        {errors.reg_password && <p className="text-danger">{errors.reg_password}</p>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          value={reg_confirm_password}
                          onChange={(e) => setReg_confirm_password(e.target.value)}
                          isInvalid={reg_password !== reg_confirm_password}
                          placeholder="Confirm Password"
                        />
                        <Form.Control.Feedback type="invalid">
                          Passwords do not match.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* MOU Signed */}
                    <Col md={6}>
                      <Form.Group controlId="formGroupMOU">
                        <Form.Label>MOU Signed</Form.Label>
                        <Form.Select
                          required
                          value={reg_mou_sign}
                          onChange={(e) => setReg_mou_sign(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                        {errors.reg_mou_sign && <p className="text-danger">{errors.reg_mou_sign}</p>}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Submit and Clear */}
                  <div className="text-center mt-4">
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                    <Button variant="outline-danger" className="ms-4" onClick={handleClear}>
                      Clear
                    </Button>
                  </div>

                  {/* Login Redirect */}
                  <div className="text-center mt-3">
                    <p className="text-secondary">
                      Already have an account?
                      <Link to="/" className="ms-1 text-decoration-none fw-semibold text-primary">
                        Login
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </>
  );
};

export default College_registration;