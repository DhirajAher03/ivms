import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Table } from "react-bootstrap";
import {
  School,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
} from "lucide-react";
import LastFiveCollegesCard from "./LastFiveCollegesCard";
import VisitsGraph from "./VisitsGraph";
import api from "../../api";

const WaveSVG = ({ fill }) => (
  <svg
    viewBox="0 0 540 100"
    preserveAspectRatio="none"
    className="position-absolute bottom-0 start-0 w-100"
    style={{ height: 60, zIndex: 0 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#38b000", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#a2f3e2", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#ff8f61", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#ffc3a0", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#f06292", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#d1a7d6", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#1976d2", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#4fc3f7", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#ffb74d", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#ffe0b2", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#4db6ac", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#b2dfdb", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M0,40 
         C60,80 120,0 180,40 
         C240,80 300,0 360,40 
         C420,80 480,0 540,40 
         L540,100 L0,100 Z"
      fill={fill}
    />
  </svg>
);

const Card = ({ count, label, icon, color }) => (
  <div
    className="card rounded-4 overflow-hidden text-dark shadow-sm mb-4"
    style={{
      height: 180,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      position: "relative",
    }}
  >
    <div className="card-body position-relative z-1 d-flex justify-content-between align-items-start">
      <div>
        <h4 className="fw-bold mb-1" style={{ wordBreak: "break-word" }}>
          {count}
        </h4>
        <p className="mb-0 text-secondary">{label}</p>
      </div>
      <div className="fs-3 text-dark">{icon}</div>
    </div>
    <WaveSVG fill={color} />
  </div>
);



const Dashboard = () => {
  const [visitData, setVisitData] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [currentWeekVisits, setCurrentWeekVisits] = useState(0);
  const [currentMonthVisits, setCurrentMonthVisits] = useState(0);
  const [collegeData, setCollegeData] = useState([]);
  const [totalColleges, setTotalColleges] = useState(0);
  const [mouSigned, setMouSigned] = useState(0);
  const [noMouSigned, setNoMouSigned] = useState(0);
  const [lastColleges, setLastColleges] = useState([]);
  const [totalUpcomingVisitsCount, setUpcomingVisitsCount] = useState(0);
  const [cancelledVisitCount, setCancelledVisitCount] = useState(0);

  useEffect(() => {
    api.get("/api/get_registration")
      .then((res) => {
        const data = res.data.data;
        setCollegeData(data);

        // total colleges
        setTotalColleges(data.length);

        // mou signed count
        setMouSigned(data.filter((c) => c.reg_mou_sign === "Yes").length);

        // non mou signed count
        setNoMouSigned(data.filter((c) => c.reg_mou_sign === "No").length);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api.get("/api/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);

        // cancelled visit count
        setCancelledVisitCount(data.filter((v) => v.visit_cancelled === "cancelled").length);

        // total visits
        setTotalVisits(data.length);

        const now = new Date();

        // current week visits
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const currentWeekVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= startOfWeek && visitDate <= endOfWeek;
        });
        setCurrentWeekVisits(currentWeekVisits.length);

        // current month visits
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        const currentMonthVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= startOfMonth && visitDate <= endOfMonth;
        });
        setCurrentMonthVisits(currentMonthVisits.length);

        // last 5 visited colleges
        const lastFiveColleges = [...new Set(data.map((v) => v.college_name))].slice(-5);
        setLastColleges(lastFiveColleges);

        // upcoming visits count
        const upcomingVisits = data.filter((visit) => {
          const visitDate = new Date(visit.Date_of_visit);
          return visitDate >= new Date();
        });
        setUpcomingVisitsCount(upcomingVisits.length);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container className="mt-4">
      <Row xs={1} sm={2} xl={4}>
        <Col>
          <Card count={totalVisits} label="Total Visits" icon={<Clock />} color="url(#grad1)" />
        </Col>
        <Col>
          <Card
            count={totalColleges}
            label="Total Registered Colleges"
            icon={<School />}
            color="url(#grad5)"
          />
        </Col>
        <Col>
          <Card
            count={mouSigned}
            label="MOU Signed Colleges"
            icon={<CheckCircle2 />}
            color="url(#grad6)"
          />
        </Col>
        <Col>
          <Card
            count={totalUpcomingVisitsCount}
            label="Upcoming Visits"
            icon={<Layers />}
            color="url(#grad2)"
          />
        </Col>
        {/* <Col>
        <Card
          count={cancelledVisitCount}
          label="Cancelled Visits"
          icon={<XCircle />}
          color="url(#grad4)"
        />
      </Col> */}
        {/* <Col>
        <Card
          count={currentWeekVisits}
          label="Current Week Visits"
          icon={<CalendarCheck />}
          color="url(#grad2)"
        />
         {/* <Card.Footer className="text-center border border-0">
              <Card.Link href="/head/totalvisits">
                <Button className="btn btn-primary">Details</Button>
              </Card.Link>
            </Card.Footer>  
      </Col> */}
        {/* <Col>
        <Card
          count={currentMonthVisits}
          label="Current Month Visits"
          icon={<CalendarCheck />}
          color="url(#grad3)"
        />
      </Col>
      <Col>
        <Card
          count={cancelledVisitCount}
          label="Cancelled Visits"
          icon={<XCircle />}
          color="url(#grad4)"
        />
      </Col> */}


        {/* <Col>
        <Card
          count={noMouSigned}
          label="Non MOU Signed Colleges"
          icon={<XCircle />}
          color="url(#grad1)"
        />
      </Col> */}

      </Row>
      <VisitsGraph />
      <LastFiveCollegesCard />

    </Container>
  );
};

export default Dashboard