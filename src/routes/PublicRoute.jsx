import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
