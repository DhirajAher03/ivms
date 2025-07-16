import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
// import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Update_city = () => {
  const [city_state, setCityState] = useState("");
  const [city_district, setCityDistrict] = useState("");
  const [city_name, setCityname] = useState("");
  const [city_status, setStatus] = useState("");
  const [statedata, setStatedata] = useState([]); // Store all states
  const [districtdata, setDistrictdata] = useState([]); // Store districts of selected state
  const [citydata, setCitydata] = useState({}); // Data of the city to update
  const navigate = useNavigate();

  const id = localStorage.getItem("updateid");

  // Fetch city data for updating
  useEffect(() => {
    api
      .get(`/api/city/getonecity/${id}`)
      .then((response) => {
        setCitydata(response.data);
        setCityState(response.data.city_state);
        setCityDistrict(response.data.city_district);
        setCityname(response.data.city_name);
        setStatus(response.data.city_status);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //   get API for state
  useEffect(() => {
    api
      .get("/api/state/getstate")
      .then((res) => {
        const filtestate = res.data.data.filter((state) => state.state_status === "active")
        setStatedata(filtestate);
      })
      .catch((err) => console.log(err));
  }, []);

  // get API for district based on selected state
  useEffect(() => {
    if (city_state) {
      api
        .get("/api/district/getdistrict")
        .then((res) => {
          const filteredDistricts = res.data.data.filter(
            (district) => district.district_state === city_state && district.district_status == "active"
          );
          setDistrictdata(filteredDistricts);
        })
        .catch((err) => console.log(err));
    }
  }, [city_state]);


  const handleClear = () => {
    setCityname("");
    setCityDistrict("");
    setCityState("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      city_name,
      city_district,
      city_state,
      city_status,
    };

    api
      .put(`/api/city/updatecity/${id}`, userdata)
      .then(() => {
        console.log("City updated successfully");
        navigate("/head/city");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Update City</h2>
          <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
            {/* State Dropdown */}
            <Form.Group controlId="stateDropdown" className="mb-3">
              <Form.Label className="fw-bold ms-3">State</Form.Label>
              <Form.Select
                aria-label="Select State"
                value={city_state}
                onChange={(e) => setCityState(e.target.value)}
                required
              >
                <option value="">-- Select State --</option>
                {statedata.map((state) => (
                  <option key={state.id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* District Dropdown */}
            <Form.Group controlId="districtDropdown" className="mb-3">
              <Form.Label className="fw-bold ms-3">District</Form.Label>
              <Form.Select
                aria-label="Select District"
                value={city_district}
                onChange={(e) => setCityDistrict(e.target.value)}
                required
              >
                <option value="">-- Select District --</option>
                {districtdata.map((district) => (
                  <option key={district._id} value={district.district_name}>
                    {district.district_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* City Name */}
            <Form.Group controlId="cityName" className="mb-3">
              <Form.Label className="fw-bold ms-3">City Name</Form.Label>
              <Form.Control
                type="text"
                value={city_name}
                onChange={(e) => setCityname(e.target.value)}
                placeholder="Enter City Name"
                required
              />
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3">
              <div>
                <Form.Label className="fw-bold ms-3">Status</Form.Label>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  value="active"
                  className="ms-4 me-4"
                  checked={city_status === "active"}
                  onChange={(e) => setStatus(e.target.value)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="inactive"
                  checked={city_status === "inactive"}
                  onChange={(e) => setStatus(e.target.value)}
                  inline
                />
              </div>
            </Form.Group>

            {/* Buttons */}
            <div className="text-center">
              <Button type="submit" className="btn btn-primary me-3">
                Update
              </Button>
              <Link to="/head/city" className="text-decoration-none">
                <Button
                  type="button"
                  className="btn btn-danger ms-5 px-3 py-2"
                >
                  Back
                </Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Update_city;
