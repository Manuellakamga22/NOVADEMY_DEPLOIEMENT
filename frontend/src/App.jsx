import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemp from "./pages/HomeTemp";
import LoginTemp from "./pages/LoginTemp";
import RegisterTemp from "./pages/RegisterTemp";
import StudentRegisterTemp from "./pages/StudentRegisterTemp";
import TeacherRegisterTemp from "./pages/TeacherRegisterTemp";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import SearchTeachers from "./pages/SearchTeachers";
import TeacherProfile from "./pages/TeacherProfile";
import StudentProfile from "./pages/StudentProfile";
import StudentPlanning from "./pages/StudentPlanning";
import TrialRequest from "./pages/TrialRequest";
import TeacherRequests from "./pages/TeacherRequests";
import StudentChat from "./pages/StudentChat";
import PackProposal from "./pages/PackProposal";
import Payment from "./pages/Payment";
import ForgotPassword from "./pages/ForgotPassword";
import TeacherPlanning from "./pages/TeacherPlanning";
import TeacherAnnouncements from "./pages/TeacherAnnouncements";
import TeacherRevenue from "./pages/TeacherRevenue";
import StudentRequests from "./pages/StudentRequests";
import StudentCourses from "./pages/StudentCourses";
import StudentReview from "./pages/StudentReview";
import ResetPassword from "./pages/ResetPassword";
import StudentPacks from "./pages/StudentPacks";
import NosFormules from "./pages/NosFormules";
import DonnerDesCours from "./pages/DonnerDesCours";
import Aide from "./pages/Aide";
import TeacherProposeFormula from "./pages/TeacherProposeFormula";
import TeacherCollectiveClasses from "./pages/TeacherCollectiveClasses";
import AdminTeachers from "./pages/AdminTeachers";
import AdminStudents from "./pages/AdminStudents";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminPayments from "./pages/AdminPayments";
import AdminTrials from "./pages/AdminTrials";
import AdminStats from "./pages/AdminStats";
import AdminSettings from "./pages/AdminSettings";
import AdminReviews from "./pages/AdminReviews";
import TeacherStudents from "./pages/TeacherStudents";
import StudentTeachers from "./pages/StudentTeachers";
import StudentPayments from "./pages/StudentPayments";

import AnnouncementDetails from "./pages/AnnouncementDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemp />} />
        <Route path="/login" element={<LoginTemp />} />
        <Route path="/register" element={<RegisterTemp />} />
        <Route path="/register/student" element={<StudentRegisterTemp />} />
        <Route path="/register/teacher" element={<TeacherRegisterTemp />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/search" element={<SearchTeachers />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/planning" element={<StudentPlanning />} />
        <Route path="/trial-request" element={<TrialRequest />} />
        <Route path="/teacher/requests" element={<TeacherRequests />} />
        <Route path="/chat" element={<StudentChat />} />
        <Route path="/student/chat" element={<StudentChat />} />
        <Route path="/pack-proposal" element={<PackProposal />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/teacher/planning" element={<TeacherPlanning />} />
        <Route path="/teacher/announcements" element={<TeacherAnnouncements />} />
        <Route path="/teacher/revenue" element={<TeacherRevenue />} />
        <Route path="/student/requests" element={<StudentRequests />} />
        <Route path="/student/review" element={<StudentReview />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/student/packs" element={<StudentPacks />} />
        <Route path="/nos-formules" element={<NosFormules />} />
        <Route path="/donner-cours" element={<DonnerDesCours />} />
        <Route path="/aide" element={<Aide />} />
        <Route path="/teacher/propose/formula" element={<TeacherProposeFormula />} />
        <Route path="/teacher/collective/classes" element={<TeacherCollectiveClasses />} />
        <Route path="/admin/teachers" element={<AdminTeachers />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/trials" element={<AdminTrials />} />
        <Route path="/admin/stats" element={<AdminStats />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/student/teachers" element={<StudentTeachers />} />
        <Route path="/student/payments" element={<StudentPayments />} />
        <Route path="/announcement/:id" element={<AnnouncementDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;