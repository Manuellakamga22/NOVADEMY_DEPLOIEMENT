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
import TrialRequest from "./pages/TrialRequest";
import TeacherRequests from "./pages/TeacherRequests";
import Chat from "./pages/Chat";
import PackProposal from "./pages/PackProposal";
import Payment from "./pages/Payment";

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
        <Route path="/trial-request" element={<TrialRequest />} />
        <Route path="/teacher/requests" element={<TeacherRequests />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/pack-proposal" element={<PackProposal />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;