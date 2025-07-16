import React, { useEffect, useState } from "react";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { IoIosNotificationsOutline } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import axios from "axios";

const HeaderComponent = () => {
  const [visitData, setVisitData] = useState([]);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("admin_name");
    if (name) {
      setAdminName(name);
    }

    axios
      .get("/api/visit/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        const count = data.filter(
          (visit) =>
            visit.Visit_accept === "pending" || visit.visit_cancelled === "cancelled"
        ).length;
        setInactiveCount(count);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_name");
    navigate("/");
  };

  return (
    <Navbar expand="sm" className="px-3" style={{ marginBottom: 0, background: "linear-gradient(135deg, #ffffff, #9ef4f2)" }}>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="ms-auto"
        style={{ borderColor: "white", color: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        {/* <h3 className="text-dark fs-4 ms-5 d-flex">
          <h4>Hello, 👋 Admin</h4>&nbsp;
        </h3> */}

        <Nav className="ms-auto d-flex align-items-center">
          {/* <Link to="/head/calender" className="text-decoration-none">
            <SlCalender size={24} className="text-secondary me-4" />
          </Link> */}

          <Nav.Link href="/head/notification" className="position-relative">
            <IoIosNotificationsOutline className="me-4 text-dark fw-bold" size={30} />
            {inactiveCount > 0 && (
              <span className="position-absolute translate-middle badge rounded-pill bg-primary text-white" style={{ top: "15px", right: "5px" }}>
                {inactiveCount}
              </span>
            )}
          </Nav.Link>

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center px-3 py-1">
              <FaRegUser className="me-2" />
              {adminName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderComponent;
