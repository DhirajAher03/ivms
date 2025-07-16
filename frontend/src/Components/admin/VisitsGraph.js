import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Col, Row } from "react-bootstrap";
import "../../App.css";
import api from "../../api";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const VisitsGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [visitStatusData, setVisitStatusData] = useState({
    planned: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    api.get("/api/visit/getvisit")
      .then((response) => {
        const visitsArray = response.data.userData || [];
        const lastFiveVisits = visitsArray.slice(-5);

        // Bar Chart Data (Last 5)
        const labels = lastFiveVisits.map((visit) => visit.college_name || "N/A");
        const data = lastFiveVisits.map((visit) =>
          parseInt(visit.number_of_students) || 0
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Students",
              data,
              backgroundColor: "rgba(63, 65, 141)",
              borderColor: "rgb(63, 65, 141)",
              borderWidth: 1,
              barThickness: 25,
              borderRadius: 6,
              hoverBackgroundColor: "rgba(43, 45, 109)",
            },
          ],
        });

        // Pie Chart Data (Visit Status)
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        let planned = 0;
        let ongoing = 0;
        let completed = 0;
        let cancelled = 0;

        visitsArray.forEach((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          visitDate.setHours(0, 0, 0, 0);

          if (visit.visit_cancelled === "cancelled") {
            cancelled++;
          } else if (visitDate.getTime() > now.getTime()) {
            planned++;
          } else if (visitDate.getTime() === now.getTime()) {
            ongoing++;
          } else if (visitDate.getTime() < now.getTime()) {
            completed++;
          }
        });

        setVisitStatusData({ planned, ongoing, completed, cancelled });
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Last 5 Visited Colleges - Students Count",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(199, 194, 194, 0.2)",
        },
        ticks: {
          stepSize: 5,
        },
      },
    },
  };


  const pieData = {
    labels: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          visitStatusData.planned,
          visitStatusData.ongoing,
          visitStatusData.completed,
          visitStatusData.cancelled,
        ],
        backgroundColor: ["#0d6efd", "#ffc107", "#198754", "#dc3545"],
      },
    ],
  };

  return (
    <Row>
      {/* Bar Chart */}
      <Col lg={6}>
        <div className="shadow-lg mb-4 p-3 rounded-4" style={{ backgroundColor: "white" }}>
          <Card.Body>
            <h3 className="mb-4">Visits Graph</h3>
            <div style={{ height: "300px" }}>
              {chartData ? (
                <Bar data={chartData} options={barOptions} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </Card.Body>
        </div>
      </Col>

      {/* Pie Chart */}
      {/* Updated Pie Chart */}
      <Col md={6}>
        <Card className="reportCard border-0 shadow rounded-4" style={{ backgroundColor: "white" }}>
          <Card.Body>
            <Card.Title>Visit Status</Card.Title>
            <Pie data={pieData} height={200} />
          </Card.Body>
        </Card>
      </Col>

    </Row>
  );
};

export default VisitsGraph;