import '../../App.css';
import { Route, Routes } from 'react-router-dom';
// import Homecomponent from './Homecomponent';
import Login from './Login';
// import ForgetPasswordComponent from './ForgotPassword';
// import CollgeVisite from './CollgeVisit';
// import Feedback from './Feedback';
// import Profile from './Profile';
// import Notification from './Notiication';
// import Update_profile from './Update_profile';
// import College_registration from './College_registration';
// import TotalVisit from './TotalVisits';
// import PendingVisit from './PendingVisits';
// import RejectedVisit from './RejectedVisit';
// import Agenda from './Agenda';
// import PendingFee from './PendingFee';
// import CancelledVisit from './CancelledVisit';
// import UpdateProfile from './Update_profile';
// import Gallery from './Gallery';
// import CollegeTotalVisit from './CollegeTotalVisit';
// import Updatevisit from './RescheduledVisit';
// import RejectResceduled from './RejectRescheduleVisit';

function App() {
  return (
    // <BrowserRouter>
      <Routes>
         {/* <Route path="/home" element={<Homecomponent/>} /> */}
         <Route path="/" element={<Login/>} />
         {/* <Route path="/forget" element={<ForgetPasswordComponent/>}/>
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
         <Route path="/rejectrescedulevisit" element={<RejectResceduled/>}/> */}
      </Routes>
      /* </BrowserRouter> */
  );
}

export default App;
