import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { BsBarChartLineFill } from "react-icons/bs";
import { FaUserPlus, FaMoneyBillWave, FaMapMarkerAlt, FaGraduationCap, FaMapPin } from "react-icons/fa";
import { MdAppRegistration, MdOutlineFeedback, MdLocationOn } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbReport, TbMessageUser } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import { LuCalendarCheck } from "react-icons/lu";
import { PiImageSquare } from "react-icons/pi";
import { IoIosArrowDropdown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

// ✅ Use correct source like shown below
import reva from "../../Images/IVMSLOGO.png";
import '../../Stylesadm/Sidebar.css'; // Ensure this path is correct

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const closeSidebar = () => setShow(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const renderSidebarContent = () => (
    <>
      <div className="d-flex flex-column row-gap-2">
        <div className="img d-flex justify-content-center">
          <img className="Iconimg" src={reva} alt="Logo" />
        </div>
        <div className="profileName mb-4 mt-4 d-flex column-gap-3 align-items-center">
          {/* <img className="Profile-Pic" src={reva} alt="profile" /> */}
          <span className="fw-bold"></span>
        </div>
      </div>

      <Col className="menuList pb-4 d-flex flex-column gap-3">
        <Link to="/head/dashboard" className="Sidebar-menu" onClick={closeSidebar}>
          <BsBarChartLineFill className="me-3 fs-5 text-primary" /> Dashboard
        </Link>
        <Link to="/head/college_registarion" className="Sidebar-menu" onClick={closeSidebar}>
          <FaUserPlus className="me-3 fs-5 text-success" /> College Registration
        </Link>

        <div>
          <div
            className="Sidebar-menu d-flex justify-content-between align-items-center"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            <span>
              <MdAppRegistration className="me-2 fs-5 text-info" /> Master
            </span>
            <IoIosArrowDropdown size={22} />
          </div>
          {showDropdown && (
            <div className="d-flex flex-column gap-2 ps-4 pt-2 text-dark">
              <Link to="/head/location" className="Sidebar-menu" onClick={closeSidebar}>
                <FaMapMarkerAlt className="me-2 text-secondary" /> Location
              </Link>
              <Link to="/head/university" className="Sidebar-menu" onClick={closeSidebar}>
                <FaGraduationCap className="me-2 text-danger" /> University
              </Link>
              <Link to="/head/getstate" className="Sidebar-menu" onClick={closeSidebar}>
                <MdLocationOn className="me-2 text-info" /> State
              </Link>
              <Link to="/head/district" className="Sidebar-menu" onClick={closeSidebar}>
                <FaMapPin className="me-2 text-warning" /> District
              </Link>
              <Link to="/head/city" className="Sidebar-menu" onClick={closeSidebar}>
                <FaMapPin className="me-2 text-success" /> City
              </Link>
            </div>
          )}
        </div>

        <Link to="/head/getagenda" className="Sidebar-menu" onClick={closeSidebar}>
          <AiOutlineCalendar className="me-3 fs-5 text-success" /> Agenda
        </Link>
        <Link to="/head/getfees" className="Sidebar-menu" onClick={closeSidebar}>
          <FaMoneyBillWave className="me-3 fs-5 text-primary" /> Fees
        </Link>
        <Link to="/head/report" className="Sidebar-menu" onClick={closeSidebar}>
          <TbReport className="me-3 fs-5 text-danger" /> Report
        </Link>
        <Link to="/head/ivrequest" className="Sidebar-menu" onClick={closeSidebar}>
          <TbMessageUser className="me-3 fs-5 text-warning" /> IV Requests
        </Link>
        <Link to="/head/feeverification" className="Sidebar-menu" onClick={closeSidebar}>
          <GiConfirmed className="me-3 fs-5 text-secondary" /> Confirm Fees
        </Link>
        <Link to="/head/visitcomplete" className="Sidebar-menu" onClick={closeSidebar}>
          <LuCalendarCheck className="me-3 fs-5 text-info" /> Visited Colleges
        </Link>
        <Link to="/head/media" className="Sidebar-menu" onClick={closeSidebar}>
          <PiImageSquare className="me-3 fs-5 text-info" /> Add Media
        </Link>
        <Link to="/head/feedback" className="Sidebar-menu" onClick={closeSidebar}>
          <MdOutlineFeedback className="me-3 fs-5 text-success" /> Feedback
        </Link>
        <Link to="/head/calender" className="Sidebar-menu" onClick={closeSidebar}>
          <SlCalender className="me-3 fs-5 text-success" /> Calendar
        </Link>
      </Col>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay d-md-none ${show ? "show" : ""}`}>
        <div className="mobile-sidebar shadow p-3">
          <button className="btn-close mb-3" onClick={closeSidebar}></button>
          <Row className="mt-4 d-flex flex-column h-100">{renderSidebarContent()}</Row>
        </div>
        <div className="overlay-backdrop" onClick={closeSidebar}></div>
      </div>

      {/* Desktop Sidebar */}
      <Row className="Sidebar pt-4 pb-3 z-1 d-none d-md-block">{renderSidebarContent()}</Row>

      {/* Toggle Button */}
      <Button
        variant="primary"
        className="d-md-none"
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: 2000 }}
        onClick={() => setShow(true)}
      >
        ☰
      </Button>
    </>
  );
};

export default Sidebar;
