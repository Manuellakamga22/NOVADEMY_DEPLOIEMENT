import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const raw   = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!raw || !token) return <Navigate to="/login" replace />;

  let user;
  try {
    user = JSON.parse(raw);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "student") return <Navigate to="/student/dashboard" replace />;
    if (user.role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
    if (user.role === "admin")   return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
