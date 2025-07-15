import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
// import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Update_district = () => {
  const [district_state, setDistrictstate] = useState("");
  const [district_name, setDistrictname] = useState("");
  const [district_status, setDistrictstatus] = useState("");
  const [statedata, setStatedata] = useState([]); // Store all states
  const [districrtdata, setDistrictdata] = useState({}); // Data of the city to update
  const navigate = useNavigate();

  const id = localStorage.getItem("updatedistrictid");

  // Fetch city data for updating
  useEffect(() => {
    api
      .get(`/api/getonedistrict/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setDistrictdata(response.data);
        setDistrictstate(response.data.district_state);
        setDistrictname(response.data.district_name);
        setDistrictstatus(response.data.district_status);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //   get API for state
  useEffect(() => {
    api
      .get("/api/getstate")
      .then((res) => {
        const filtestate = res.data.data.filter((state) => state.state_status === "active")
        setStatedata(filtestate);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClear = () => {
    setDistrictname("");
    setDistrictstate("");
    setDistrictstatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      district_name,
      district_state,
      district_status,
    };

    api
      .put(`/api/updatedistrict/${id}`, userdata)
      .then(() => {
        console.log("City updated successfully");
        navigate("/head/district");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Update District</h2>
          <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
            {/* State Dropdown */}
            <Form.Group controlId="stateDropdown" className="mb-3">
              <Form.Label className="fw-bold ms-3">State</Form.Label>
              <div className="position-relative">
                <Form.Control
                  as="select"
                  value={district_state}
                  onChange={(e) => setDistrictstate(e.target.value)}
                  className="py-2"
                  required
                >
                  <option value="">-- Select State --</option>
                  {statedata.map((state) => (
                    <option key={state.id} value={state.state_name}>
                      {state.state_name}
                    </option>
                  ))}
                </Form.Control>
                <FaCaretDown
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            </Form.Group>

            {/* District Dropdown */}
            <Form.Group controlId="districtName" className="mb-3">
              <Form.Label className="fw-bold ms-3">District Name</Form.Label>
              <Form.Control
                type="text"
                value={district_name}
                onChange={(e) => setDistrictname(e.target.value)}
                placeholder="Enter District Name"
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
                  checked={district_status === "active"}
                  onChange={(e) => setDistrictstatus(e.target.value)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="inactive"
                  checked={district_status === "inactive"}
                  onChange={(e) => setDistrictstatus(e.target.value)}
                  inline
                />
              </div>
            </Form.Group>

            {/* Buttons */}
            <div className="text-center">
              <Button type="submit" className="btn btn-primary me-3">
                Update
              </Button>
              <Link to="/head/district" className="text-decoration-none">
                <Button type="button" className="btn btn-danger ms-5 px-3 py-2">
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

export default Update_district;
