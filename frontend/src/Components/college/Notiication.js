import React, { useEffect, useState } from "react";
import axios from "axios";
import ColHeader from "./Navbar";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const Notification = () => {
  const [visitData, setVisitData] = useState([]);
  const collegename = localStorage.getItem("CollegeName");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const today = new Date().toISOString().split("T")[0];
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.Date_of_visit >= today &&
            visit.notification_status !== "seen"
        );
        console.log("🚀 Filtered Visit Data:", filteredData);
        setVisitData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const handleSeen = (id) => {
    const fetchData = { notification_status: "seen" };
    axios
      .put(`http://localhost:8000/updatevisit/${id}`, fetchData)
      .then(() => {
        setVisitData((prevState) =>
          prevState.map((visit) =>
            visit._id === id ? { ...visit, notification_status: "seen" } : visit
          )
        );
      })
      .catch((err) => {
        console.error("Error updating notification status:", err);
      });
  };

  const handleReschedule = (id) => {
    localStorage.setItem("rejectresceduleid", id);
    navigate("/rejectrescedulevisit");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", {
      month: "short",
    })}-${d.getFullYear()}`;
  };

  const getIcon = (status) => {
    if (status === "accept")
      return <FaCheckCircle className="text-success me-2" size={20} />;
    if (status === "reject")
      return <FaTimesCircle className="text-danger me-2" size={20} />;
    return <FaClock className="text-warning me-2" size={20} />;
  };

  return (
    <div>
      <ColHeader />
      <div className="container mt-5 pt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3 pt-5">
          <h3 className="text-primary fw-bold">Notifications</h3>
          <Link className="text-decoration-none" to="/home">
            <IoMdClose className="text-dark" size={30} />
          </Link>
        </div>

        {visitData.length === 0 ? (
          <p className="text-muted text-center">No notifications to display.</p>
        ) : (
          visitData.map((visit) => {
            const visitDate = formatDate(visit.Date_of_visit);
            return (
              <div
                key={visit._id}
                className="bg-white shadow-sm border-start border-4 rounded p-3 mb-3 d-flex justify-content-between align-items-center"
                style={{
                  borderColor:
                    visit.Visit_accept === "accept"
                      ? "#198754"
                      : visit.Visit_accept === "reject"
                      ? "#dc3545"
                      : "#ffc107",
                }}
              >
                <div className="d-flex align-items-start">
                  {getIcon(visit.Visit_accept)}
                  <div>
                    {visit.Visit_accept === "accept" ? (
                      <p className="mb-1">
                        Your visit on <strong>{visitDate}</strong> has been{" "}
                        <span className="text-success fw-semibold">accepted</span>.
                      </p>
                    ) : visit.Visit_accept === "reject" ? (
                      <p className="mb-1">
                        Your visit on <strong>{visitDate}</strong> has been{" "}
                        <span className="text-danger fw-semibold">rejected</span>.
                        <br />
                        Reason: <strong>{visit.reason}</strong>
                      </p>
                    ) : (
                      <p className="mb-1">
                        Pending status for your visit on <strong>{visitDate}</strong>.
                      </p>
                    )}
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end">
                  {visit.Visit_accept === "reject" &&
                    visit.fees_received === "complete" && (
                      <Button
                        variant="info"
                        size="sm"
                        className="mb-2"
                        onClick={() => handleReschedule(visit._id)}
                      >
                        Reschedule
                      </Button>
                    )}
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSeen(visit._id)}
                    disabled={visit.Visit_accept === "pending"}
                  >
                    Seen
                  </Button>
                </div>
              </div>
            );
          })
        )}

        {/* ✅ Fees Unpaid Notice (Works even if MOU is signed) */}
        {visitData.map(
          (visit, index) =>
            visit.fees_status?.toLowerCase() === "unpaid" &&
            visit.fees && (
              <div
                key={index}
                className="bg-white shadow-sm border-start border-4 border-danger rounded p-3 mb-3 d-flex justify-content-between align-items-center"
              >
                <div>
                  Pay fees ₹{visit.fees} to confirm visit on{" "}
                  <strong>{formatDate(visit.Date_of_visit)}</strong>.
                </div>
                <Button
                  className="ms-3 px-3 py-1"
                  variant="danger"
                  onClick={() => navigate("/pendingfees")}
                >
                  Pay Now
                </Button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Notification;
