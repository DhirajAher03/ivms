import React, { useState, useEffect } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Stylesadm/calendarCustom.css";
import api from "../../api";

const Calender = () => {
  const [bookedData, setBookedData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(time).toLocaleString("en-US", options);
  };

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await api.get("/api/getvisit");
        const data = response.data.userData;

        const bookings = data.reduce((acc, visit) => {
          const visitDate = formatDate(visit.start_time);
          if (!acc[visitDate]) acc[visitDate] = [];
          acc[visitDate].push({
            start_time: formatTime(visit.start_time),
            end_time: formatTime(visit.end_time),
            visiting_location: visit.visting_location,
          });
          return acc;
        }, {});
        setBookedData(bookings);

        // Set today's booked slots
        const today = formatDate(new Date());
        setBookedSlots(bookings[today] || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, []);

  const handleDateClick = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(date);
    setBookedSlots(bookedData[formattedDate] || []);
    setShowModal(true);
  };

  const tileClassName = ({ date, view }) => {
    const formattedDate = formatDate(date);
    const today = formatDate(new Date());

    if (view === "month") {
      if (formattedDate === today) return "current-day";
      if (bookedData[formattedDate]) return "booked-slot";
    }
    return null;
  };

  const closeModal = () => setShowModal(false);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/head/totalvisits");
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-left">
        <h1 className="calendar-date">{selectedDate.getDate()}</h1>
        <h2 className="calendar-day">{selectedDate.toLocaleDateString("en-US", { weekday: "long" })}</h2>

        <div className="calendar-events">
          <p>Current Events</p>
          {bookedSlots.length > 0 ? (
            <ul>
              {bookedSlots.map((slot, i) => (
                <li key={i}>
                  {slot.start_time} - {slot.end_time} at {slot.visiting_location}
                </li>
              ))}
            </ul>
          ) : (
            <p>No booked slots.</p>
          )}
          <p className="see-events" onClick={handleNavigate}>See past events</p>
        </div>

        <Button className="create-event-button" onClick={handleNavigate}>
          + Create an Event
        </Button>
      </div>

      <div className="calendar-right">
        <Calendar 
          locale="en-US"
          value={selectedDate}
          onClickDay={handleDateClick} 
          tileClassName={tileClassName} 
        />
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booked Slots on {formatDate(selectedDate)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookedSlots.length > 0 ? (
            <ul>
              {bookedSlots.map((slot, index) => (
                <li key={index}>
                  {slot.start_time} - {slot.end_time} at {slot.visiting_location}
                </li>
              ))}
            </ul>
          ) : (
            <p>No booked slots for this date.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary px-3 py-2 me-3" onClick={handleNavigate}>
            View All Visits
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calender;
