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
import AdminAlertIA from "./pages/AdminAlertIA";
import Notifications from "./pages/Notifications";
import StudentCollectiveClasses from "./pages/StudentCollectiveClasses";
import CookieBanner from "./components/common/CookieBanner";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import AccountActivation from "./pages/AccountActivation";

function App() {
  return (
    <BrowserRouter>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<HomeTemp />} />
        <Route path="/login" element={<LoginTemp />} />
        <Route path="/register" element={<RegisterTemp />} />
        <Route path="/register/student" element={<StudentRegisterTemp />} />
        <Route path="/register/teacher" element={<TeacherRegisterTemp />} />
        <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRole="teacher"><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchTeachers /></ProtectedRoute>} />
        <Route path="/teacher/profile" element={<ProtectedRoute allowedRole="teacher"><TeacherProfile /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRole="student"><StudentProfile /></ProtectedRoute>} />
        <Route path="/student/planning" element={<ProtectedRoute allowedRole="student"><StudentPlanning /></ProtectedRoute>} />
        <Route path="/trial-request" element={<ProtectedRoute allowedRole="student"><TrialRequest /></ProtectedRoute>} />
        <Route path="/teacher/requests" element={<ProtectedRoute allowedRole="teacher"><TeacherRequests /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><StudentChat /></ProtectedRoute>} />
        <Route path="/student/chat" element={<ProtectedRoute allowedRole="student"><StudentChat /></ProtectedRoute>} />
        <Route path="/teacher/chat" element={<ProtectedRoute allowedRole="teacher"><StudentChat /></ProtectedRoute>} />
        <Route path="/pack-proposal" element={<ProtectedRoute allowedRole="teacher"><PackProposal /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute allowedRole="student"><Payment /></ProtectedRoute>} />
        <Route path="/payment/success" element={<ProtectedRoute allowedRole="student"><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/teacher/planning" element={<ProtectedRoute allowedRole="teacher"><TeacherPlanning /></ProtectedRoute>} />
        <Route path="/teacher/announcements" element={<ProtectedRoute allowedRole="teacher"><TeacherAnnouncements /></ProtectedRoute>} />
        <Route path="/teacher/revenue" element={<ProtectedRoute allowedRole="teacher"><TeacherRevenue /></ProtectedRoute>} />
        <Route path="/student/requests" element={<ProtectedRoute allowedRole="student"><StudentRequests /></ProtectedRoute>} />
        <Route path="/student/review" element={<ProtectedRoute allowedRole="student"><StudentReview /></ProtectedRoute>} />
        <Route path="/student/courses" element={<ProtectedRoute allowedRole="student"><StudentCourses /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/activate/:token" element={<AccountActivation />} />
        <Route path="/student/packs" element={<ProtectedRoute allowedRole="student"><StudentPacks /></ProtectedRoute>} />
        <Route path="/nos-formules" element={<NosFormules />} />
        <Route path="/donner-cours" element={<DonnerDesCours />} />
        <Route path="/aide" element={<Aide />} />
        <Route path="/teacher/propose/formula" element={<ProtectedRoute allowedRole="teacher"><TeacherProposeFormula /></ProtectedRoute>} />
        <Route path="/teacher/collective/classes" element={<ProtectedRoute allowedRole="teacher"><TeacherCollectiveClasses /></ProtectedRoute>} />
        <Route path="/student/collective/classes" element={<ProtectedRoute allowedRole="student"><StudentCollectiveClasses /></ProtectedRoute>} />
        <Route path="/admin/teachers" element={<ProtectedRoute allowedRole="admin"><AdminTeachers /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute allowedRole="admin"><AdminStudents /></ProtectedRoute>} />
        <Route path="/admin/announcements" element={<ProtectedRoute allowedRole="admin"><AdminAnnouncements /></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute allowedRole="admin"><AdminPayments /></ProtectedRoute>} />
        <Route path="/admin/trials" element={<ProtectedRoute allowedRole="admin"><AdminTrials /></ProtectedRoute>} />
        <Route path="/admin/stats" element={<ProtectedRoute allowedRole="admin"><AdminStats /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRole="admin"><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute allowedRole="admin"><AdminReviews /></ProtectedRoute>} />
        <Route path="/teacher/students" element={<ProtectedRoute allowedRole="teacher"><TeacherStudents /></ProtectedRoute>} />
        <Route path="/student/teachers" element={<ProtectedRoute allowedRole="student"><StudentTeachers /></ProtectedRoute>} />
        <Route path="/student/payments" element={<ProtectedRoute allowedRole="student"><StudentPayments /></ProtectedRoute>} />
        <Route path="/announcement/:id" element={<ProtectedRoute><AnnouncementDetails /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/admin/alerts" element={<ProtectedRoute allowedRole="admin"><AdminAlertIA /></ProtectedRoute>} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;