import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentAssignments from "../pages/student/StudentAssignments";
import Pendings from "../pages/student/Pendings";
import Submitted from "../pages/student/Submitted";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Assignments from "../pages/admin/Assignments";
import Students from "../pages/admin/Students";
import Progress from "../pages/admin/Progress";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../Layout/Outlet";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="students" element={<Students />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="student" />}>
          <Route path="/student" element={<Layout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="pendings" element={<Pendings />} />
            <Route path="submitted" element={<Submitted />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
