import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import ManagerHome from "../pages/manager/ManagerHome";
import EmployeeHome from "../pages/employee/EmployeeHome";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import NotFound from "../pages/notfound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ProjectDetailsPage from "../pages/project/ProjectDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRole="manager">
            <ManagerHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="employee">
            <EmployeeHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/project/:projectId"
        element={
          <ProtectedRoute>
            <ProjectDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
