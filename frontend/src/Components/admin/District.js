import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";

const District = () => {
  const [district_state, setDistrictState] = useState("");
  const [district_name, setDistrictame] = useState("");
  const [district_status, setstatus] = useState("");
  const [statedata, setData] = useState([]);
  const navigate = useNavigate();

  //   get api
  useEffect(() => {
    axios
      .get("http://localhost:8000/getstate")
      .then((res) => {
        const data = res.data.data;
        const stateData = data.filter(
          (state) => state.state_status === "active"
        );
        setData(stateData);
      })
      .catch((err) => console.log(err));
  }, []);

  //   add data api
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      district_state,
      district_name,
      district_status,
    };

    axios
      .post("http://localhost:8000/adddistrict", userdata)
      .then((res) => {
        console.log(res.data.data);
        navigate("/head/district");
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  const handleClear = () => {
    setDistrictState("");
    setDistrictame("");
    setDistrictState("");
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col xl={6} className="mx-auto">
          <h2 className="text-center">Add District</h2>
          <Form className="border border-dark p-4 mt-4" onSubmit={handleSubmit}>
            <Row className="mb-3 text-start">
              <Form.Group controlId="categoryDropdown" className="mt-4">
                <Form.Label className="fw-bold ms-3">State</Form.Label>
                <div className="position-relative mx-auto dropdown-width">
                  <Form.Control
                    as="select"
                    value={district_state}
                    onChange={(e) => setDistrictState(e.target.value)}
                    className="py-2"
                  >
                    <option value="">-- Select State --</option>
                    {statedata.map((item) => (
                      <option key={item._id} value={item.state_name}>
                        {item.state_name}
                      </option>
                    ))}
                  </Form.Control>
                  <FaCaretDown
                    className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary"
                    style={{ pointerEvents: "none" }}
                  />
                </div>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Label htmlFor="city" className="fw-bold ms-3">
                    {" "}
                    Enter District
                  </Form.Label>
                  <Form.Control
                    id="district"
                    placeholder="Enter district"
                    type="text"
                    value={district_name}
                    onChange={(e) => setDistrictame(e.target.value)}
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
                      checked={district_status === "Active"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Inactive"
                      name="status"
                      value="inactive"
                      checked={district_status === "Inactive"}
                      onChange={(e) => setstatus(e.target.value)}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col>
                <Link to="/head/district" className="text-decoration-none">
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

export default District;
