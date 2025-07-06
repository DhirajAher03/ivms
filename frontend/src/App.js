import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/home/HomePage";
import AdminApp from "./Components/admin/AdminApp";
import CollegeApp from "./Components/college/CollegeApp";
import Head from "./Components/admin/Head";
import Homecomponent from "./Components/college/Homecomponent";

import ForgetPasswordComponent from './Components/college/ForgotPassword';
import CollgeVisite from './Components/college/CollgeVisit';
import Feedback from './Components/college/Feedback';
import Profile from './Components/college/Profile';
import Notification from './Components/college/Notiication';
// import Update_profile from './Components/college/Update_profile';
import College_registration from './Components/college/College_registration';
import TotalVisit from './Components/college/TotalVisits';
import PendingVisit from './Components/college/PendingVisits';
import RejectedVisit from './Components/college/RejectedVisit';
import Agenda from './Components/college/Agenda';
import PendingFee from './Components/college/PendingFee';
import CancelledVisit from './Components/college/CancelledVisit';
import UpdateProfile from './Components/college/Update_profile';
import Gallery from './Components/college/Gallery';
import CollegeTotalVisit from './Components/college/CollegeTotalVisit';
import Updatevisit from './Components/college/RescheduledVisit';
import RejectResceduled from './Components/college/RejectRescheduleVisit';
const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/college" element={<CollegeApp />} />
        <Route path="/head/*" element={<Head/>} />

         <Route path="/home" element={<Homecomponent/>} />
         <Route path="/forget" element={<ForgetPasswordComponent/>}/>
         <Route path="/addvisit" element={<CollgeVisite/>} />
         <Route path="/feedback" element={<Feedback/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path='/notifications' element={<Notification></Notification>}/>
         <Route path="/gallery" element={<Gallery></Gallery>}/>
         <Route path="/register" element={<College_registration/>}/>
         <Route path="/pendingfees" element={<PendingFee/>}/>
         <Route path="/agenda" element={<Agenda/>}/>
         <Route path="/totalvisit" element={<TotalVisit/>}/>
         <Route path="/pendingvisit" element={<PendingVisit/>}/>
         <Route path="/rejectedvisit" element={<RejectedVisit/>}/>
         <Route path="/visitcancelled" element={<CancelledVisit/>}/>
         <Route path='/update_profile' element={<UpdateProfile/>}/>
         <Route path='/collegetotalvisit' element={<CollegeTotalVisit/>}/>
         <Route path="/reschedulevisit" element={<Updatevisit/>}/>
         <Route path="/rejectrescedulevisit" element={<RejectResceduled/>}/>

      </Routes>
    </BrowserRouter> 
  );
};

export default App;
