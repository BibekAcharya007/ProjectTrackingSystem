import { Routes, Route } from "react-router-dom";

import LoginPage from "../Pages/Login/LoginPages";

import ManagerHome from "../Pages/Manager/ManagerHome";
import ProjectsPage from "../Pages/Manager/ProjectSPage";
import ProjectDetails from "../Pages/Manager/ProjectDetails";
import EmployeesPage from "../Pages/Manager/EmployeePage";

import EmployeeHome from "../Pages/Employee/EmployeeHome";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<LoginPage />} />

      {/* Manager Routes */}
      <Route path="/manager/dashboard" element={<ManagerHome />} />
      <Route path="/manager/projects" element={<ProjectsPage />} />
      <Route path="/manager/project/:id" element={<ProjectDetails />} />
      <Route path="/manager/employees" element={<EmployeesPage />} />

      {/* Employee Routes */}
      <Route path="/employee/dashboard" element={<EmployeeHome />} />

    </Routes>
  );
};

export default AppRoutes;
