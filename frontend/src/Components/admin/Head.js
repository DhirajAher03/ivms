import React from "react";
import '../../App.css'
import { Container, Row,} from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import HeaderComponent from "./HeaderComponent";
import Fees from "./Fees";
import Agenda from "./Agenda";
import Location from "./Location";
import University from "./University";
import State from "./State";
import District from "./District";
import City from "./City";
import College_registration from "./College_registration";
import Notification from "./Notification";
import IVReequest from "./IVReequest";
import GetLocation from "./GetLocation";
import GetCity from "./GetCity";
import GetUniversity from "./GetUniversity";
import GetState from "./GetState";
import GetDistrict from "./GetDistrict";
import Update_city from "./Update_city";
import Update_district from "./Update_district";
import Update_state from "./Update_state";
import Update_location from "./Update_location";
import Update_university from "./Update_university";
import VisitCompleted from "./VisitCompleted";
import GalleryAdd from "./GalleryAdd";
import Total_Visits from "./Total_Visits";
import CurrentWeekVisits from "./Current_Week_Visits";
import CurrentMonthVisits from "./CurrentMonthVisits";
import TotalCollege from "./TotalCollegeData";
import MouSigned from "./MouSignedColleges";
import NonMouSigned from "./NonMouSignedCollege";
import UpcomingVisits from "./UpcomingVisits";
import Report from "./Report";
import FeesVerification from "./FeesVerification";
import FeedbackDisplayComponent from "./FeedbackDisplayComponent";
import GetAgenda from "./GetAgenda";
import GetFees from "./GetFees";
import Update_agenda from "./Update_agenda";
import Update_fees from "./Update_fees";
import CancelledVisits from "./CancelledVisit";
import Calender from "./Calender";


const Head = () => {
  return (
    <div className="d-flex">
      <div className="">
      {/* Sidebar */}
      <Sidebar />
      </div>
      {/* Main Content */}
      <div className="content-container flex-grow-1 min-vh-100" style={{ backgroundColor: "rgb(246 247 243)" }}> 
          <HeaderComponent />
        <Container>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/location" element={<GetLocation />} />
            <Route path="/university" element={<GetUniversity/>} />
            <Route path="/state" element={<State />} />
            <Route path="/adddistrict" element={<District/>}/>
            <Route path="/city" element={<GetCity/>}/>
            <Route path="/college_registarion" element={<College_registration/>}/>
            <Route path="/notification" element={<Notification></Notification>}/>
            <Route path="/ivrequest" element={<IVReequest></IVReequest>}/>
            <Route path="/addlocation" element={<Location></Location>}/>
            <Route path="/addcity" element={<City/>}/>
            <Route path="/adduniversity" element={<University/>}/>
            <Route path="/getstate" element={<GetState/>}/>
            <Route path="/district" element={<GetDistrict/>}/>
            <Route path="/update_city" element={<Update_city/>}/>
            <Route path="/update_district" element={<Update_district/>}/>
            <Route path="/update_state" element={<Update_state/>}/>
            <Route path="/update_location" element={<Update_location/>}/>
            <Route path="/update_university" element={<Update_university/>}/>
            <Route path="/update_agenda" element={<Update_agenda/>}/>
            <Route path="/update_fees" element={<Update_fees/>}/>
            <Route path="/visitcomplete" element={<VisitCompleted></VisitCompleted>}/>
            <Route path="/media" element={<GalleryAdd/>}/>
            <Route path="/totalvisits" element={<Total_Visits/>}/>
            <Route path="/currentweekvisits" element={<CurrentWeekVisits/>}/>
            <Route path="/currentmonthvisists" element={<CurrentMonthVisits/>}/>
            <Route path="/totalcollege" element={<TotalCollege/>}/>
            <Route path="/mousigned" element={<MouSigned/>}/>
            <Route path="/nonmousigned" element={<NonMouSigned/>}/>
            <Route path="/upcomingVisits" element={<UpcomingVisits/>}/>
            <Route path="/report" element={<Report/>}/>
            <Route path="/feeverification" element={<FeesVerification/>}/>
            <Route path="/feedback" element={<FeedbackDisplayComponent/>}/>
            <Route path="/getagenda" element={<GetAgenda/>}/>
            <Route path="/getfees" element={<GetFees/>}/>
            <Route path="/cancelledvisit" element={<CancelledVisits/>}/>
            <Route path="/calender" element={<Calender/>}/>
  
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Head;
