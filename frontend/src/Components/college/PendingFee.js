import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import ColHeader from "./Navbar";
import { useNavigate } from "react-router-dom";

const PendingFee = () => {
  const [datedata, setDateData] = useState([]);
  const [selectedFee, setSelectedFee] = useState("");
  const [id, setId] = useState("");
  const collegename = localStorage.getItem("CollegeName");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const data = response.data.userData || [];
        const filtered = data.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.fees !== 0 &&
            visit.fees_status === "unpaid"
        );

        const today = new Date().toISOString().split("T")[0];
        const futureVisits = filtered
          .filter((item) => item.Date_of_visit >= today)
          .map((item) => ({
            date: item.Date_of_visit,
            fees: item.fees,
            id: item._id,
          }));

        setDateData(futureVisits);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", {
      month: "short",
    })}-${d.getFullYear()}`;
  };

  const handleDateChange = (event) => {
    const selectedIndex = Number(event.target.value);
    const selectedItem = datedata[selectedIndex];

    if (selectedItem) {
      setSelectedFee(selectedItem.fees);
      setId(selectedItem.id);
    } else {
      setSelectedFee("");
      setId("");
    }
  };

  const handlePayment = async () => {
    const amount = selectedFee;

    if (!amount || !id) {
      alert("⚠️ Please select a valid visit date.");
      return;
    }

    try {
      const { data: order } = await axios.post("http://localhost:8000/create-order", {
        amount,
      });

      const options = {
        key: "rzp_test_ioSCePMTKfRXoV",
        amount: order.amount,
        currency: order.currency,
        name: "IVMS Portal",
        description: "College Visit Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            // ✅ Update payment status in backend
            await axios.put(`http://localhost:8000/updatevisit/${id}`, {
              fees_status: "paid",
              transaction_id: response.razorpay_payment_id,
            });

            alert("✅ Payment successful & status updated!");
            navigate("/pendingvisit");
          } catch (err) {
            console.error("Error updating fee status:", err);
            alert("Payment done but failed to update status.");
          }
        },
        prefill: {
          name: "Dhiraj Aher",
          email: "dhirajaheraher@gmail.com",
          contact: "9607774918",
        },
        theme: {
          color: "#198754",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Payment Failed:", error);
      alert("Payment failed, please try again.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center mt-5"
      style={{ height: "100vh" }}
    >
      <Row style={{ width: "100%", maxWidth: "600px" }}>
        <ColHeader />
        <Col>
          <Form
            className="p-4 shadow rounded-5"
            style={{ backgroundColor: "#fff" }}
          >
            <h3
              className="text-center mb-4 fw-bold"
              style={{ color: "rgb(7 10 92)" }}
            >
              PAY FEES
            </h3>

            <Form.Group className="mb-3 text-center">
              <Form.Label className="text-dark">College Name:</Form.Label>
              <Form.Control
                type="text"
                value={collegename}
                readOnly
                className="py-2"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark">Date of Visit:</Form.Label>
                  <Form.Select onChange={handleDateChange}>
                    <option value="">Select Date</option>
                    {datedata.map((item, idx) => (
                      <option key={idx} value={idx}>
                        {formatDate(item.date)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="text-center">
                  <Form.Label className="text-dark">Fees:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedFee}
                    readOnly
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button
                variant="success"
                className="mt-4 px-5"
                onClick={handlePayment}
              >
                Pay ₹{selectedFee || "0"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingFee;
