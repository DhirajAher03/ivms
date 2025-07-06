import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const City = () => {
  const [city_state, setCityState] = useState("");
  const [city_district, setCityDistrict] = useState("");
  const [city_name, setCityame] = useState("");
  const [city_status, setstatus] = useState("");
  const [statedata, setData] = useState([]);
  const [districtdata, setDistrictdata] = useState([]);
  const navigate = useNavigate();


  //   get API for state
  useEffect(() => {
    axios
      .get("http://localhost:8000/getstate")
      .then((res) => {
        const data = res.data.data;
        const stateData = data.filter((state) => state.state_status === "active")
        setData(stateData);
      })
      .catch((err) => console.log(err));
  }, []);

  // get API for district based on selected state
  useEffect(() => {
    if (city_state) {
      axios
        .get("http://localhost:8000/getdistrict")
        .then((res) => {
          const filteredDistricts = res.data.data.filter(
            (district) => district.district_state === city_state && district.district_status === "active"
          );
          setDistrictdata(filteredDistricts);
        })
        .catch((err) => console.log(err));
    }
  }, [city_state]);

  //   add data API
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      city_state,
      city_district,
      city_name,
      city_status,
    };

    axios
      .post("http://localhost:8000/addcity", userdata)
      .then((res) => {
        handleClear();
        navigate("/head/city");

      })
      .catch((err) => console.log(err));

  };

  const handleClear = () => {
    setCityState("");
    setCityDistrict("");
    setCityame("");
    setstatus("");
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Add City</h2>
          <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
            <Row className="mb-3 text-start">
              <Form.Group controlId="categoryDropdown" className="">
                <Form.Label className="fw-bold ms-3">State</Form.Label>
                <div className="position-relative">
                  <Form.Select
                    aria-label="Select State"
                    value={city_state}
                    onChange={(e) => setCityState(e.target.value)}
                    className="mx-auto  py-2 dropdown-width"
                  >
                    <option value="">
                      -- Select State --{" "}
                      <FaCaretDown
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary"
                        style={{ pointerEvents: "none" }}
                      />
                    </option>
                    {statedata.map((item, index) => {
                      return (
                        <option key={item._id} value={item.state_name}>
                          {item.state_name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              </Form.Group>
            </Row>

            <Row className="mb-3 text-start">
              <Form.Group controlId="categoryDropdown" className="">
                <Form.Label className="fw-bold ms-3">District</Form.Label>
                <Form.Select
                  aria-label="Select District"
                  value={city_district}
                  onChange={(e) => setCityDistrict(e.target.value)}
                  className="mx-auto  py-2 dropdown-width"
                >
                  <option value="">
                    -- Select District --{" "}
                    <FaCaretDown className="ms-2 text-primary" />
                  </option>
                  {districtdata.map((item, index) => {
                    return (
                      <option key={item._id} value={item.district_name}>
                        {item.district_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>


            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="city" className="fw-bold ms-3">
                    Enter City
                  </Form.Label>
                  <Form.Control
                    id="city"
                    placeholder="Enter City"
                    type="text"
                    value={city_name}
                    onChange={(e) => setCityame(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <div>
                    <Form.Label className="fw-bold ms-3">
                      Select Status
                    </Form.Label>

                    <Form.Check
                      type="radio"
                      label="Active"
                      name="status"
                      value="active"
                      className="me-4 ms-4 text-dark"
                      checked={city_status === "Active"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={city_status === "Inactive"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Link to="/head/city" className="text-decoration-none">
                  <Button
                    type="button"
                    className="btn btn-danger me-4 px-3 py-2"
                  >
                    Back
                  </Button>
                </Link>
                <Button type="submit" className="btn btn-primary px-3 py-2">
                  Add
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger ms-4"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default City;
