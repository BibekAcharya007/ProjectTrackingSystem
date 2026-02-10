import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import "../../styles/dashboard.css";
import EmployeeDetailsModal from "../../components/manager/EmployeeDetailsModal";



import {
  getManagerDashboard,
  getManagerEmployees,
  getManagerMe,
  getManagerProjects
} from "../../Api/managerapi";

import { filterProjectsByDateApi, getProjectEmployeesApi } from "../../Api/projectapi";

import DashboardCards from "../../components/manager/DashboardCards";
import EmployeeDetailsCard from "../../components/manager/EmployeeDetailsCard";
import DateRangeFilter from "../../components/filters/DateRangeFilter";
import ProjectDropdown from "../../components/filters/ProjectDropdown";

import AddProjectModal from "../../components/manager/AddProjectModal";
import AddEmployeeModal from "../../components/manager/AddEmployeeModal";
import AssignEmployeeModal from "../../components/manager/AssignEmployeeModal";

export default function ManagerHome() {
  const [manager, setManager] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [projectEmployees, setProjectEmployees] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAssignEmployee, setShowAssignEmployee] = useState(false);

  // NEW: sidebar section control
  const [activeSection, setActiveSection] = useState("dashboard");

  const loadData = async () => {
    const m = await getManagerMe();
    const d = await getManagerDashboard();
    const emp = await getManagerEmployees();
    const proj = await getManagerProjects();

    setManager(m);
    setDashboard(d);
    setEmployees(emp);
    setProjects(proj);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterProjects = async () => {
    if (!startDate || !endDate) return alert("Select start and end date");

    try {
      const filtered = await filterProjectsByDateApi(startDate, endDate);
      setProjects(filtered);
      setSelectedProjectId("");
      setProjectEmployees([]);
    } catch (err) {
      alert("Failed to filter projects");
    }
  };

  const handleProjectSelect = async (projectId) => {
    setSelectedProjectId(projectId);
    if (!projectId) return setProjectEmployees([]);

    try {
      const data = await getProjectEmployeesApi(projectId);
      setProjectEmployees(data);
    } catch (err) {
      alert("Failed to load project employees");
    }
  };

  useEffect(() => {
    handleProjectSelect(selectedProjectId);
  }, [selectedProjectId]);

  return (
    <div className="dashboard-layout">
      <Sidebar
        role="manager"
        manager={manager}
        setActiveSection={setActiveSection}
      />

      <div className="dashboard-main">
        <Navbar title="Manager Dashboard" />

        {/* DASHBOARD SECTION */}
        {activeSection === "dashboard" && (
          <>
            <div className="content-box">
              <DashboardCards dashboard={dashboard} />
            </div>

            <div className="content-box">
              <h3 className="section-title">Manager Actions</h3>

              <div className="flex-row">
                <button className="btn" onClick={() => setShowAddProject(true)}>
                  Add Project
                </button>
                <button className="btn" onClick={() => setShowAddEmployee(true)}>
                  Add Employee
                </button>
                <button className="btn" onClick={() => setShowAssignEmployee(true)}>
                  Assign Employee
                </button>
              </div>
            </div>

            <div className="flex-row">
              <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onFilter={handleFilterProjects}
              />

              <div className="content-box">
                <h3 className="section-title">Project Dropdown</h3>

                <ProjectDropdown
                  projects={projects}
                  selectedProjectId={selectedProjectId}
                  setSelectedProjectId={setSelectedProjectId}
                />

                <button
                  className="btn"
                  style={{ marginTop: "15px", width: "100%" }}
                  onClick={() => {
                    if (!selectedProjectId) {
                      alert("Please select a project first!");
                      return;
                    }
                    window.location.href = `/project/${selectedProjectId}`;
                  }}
                >
                  Search / View Project Details
                </button>
              </div>
            </div>

            <div className="content-box">
              <h3 className="section-title">Employees Under Selected Project</h3>

              {projectEmployees.length === 0 ? (
                <p className="small-text">No employees assigned to this project.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Skill</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectEmployees.map((e) => (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.emp_name}</td>
                        <td>{e.email}</td>
                        <td>{e.skill}</td>
                        <td>{e.availability ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* EMPLOYEES UNDER ME SECTION */}
        {activeSection === "employees" && (
          <div className="content-box">
            <h3 className="section-title">View Employees Under Me</h3>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Skill</th>
                  <th>Availability</th>
                  <th>Project</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.emp_name}</td>
                    <td>{e.email}</td>
                    <td>{e.skill}</td>
                    <td>{e.availability ? "Yes" : "No"}</td>
                    <td>{e.project_id ? e.project_id : "Unassigned"}</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedEmployee(e)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

           <EmployeeDetailsModal
  employee={selectedEmployee}
  managerName={manager?.name}
  onClose={() => setSelectedEmployee(null)}
/>

          </div>
        )}

        {/* MODALS */}
        <AddProjectModal
          isOpen={showAddProject}
          onClose={() => setShowAddProject(false)}
          onSuccess={loadData}
        />

        <AddEmployeeModal
          isOpen={showAddEmployee}
          onClose={() => setShowAddEmployee(false)}
          onSuccess={loadData}
        />

        <AssignEmployeeModal
          isOpen={showAssignEmployee}
          onClose={() => setShowAssignEmployee(false)}
          employees={employees}
          projects={projects}
          onSuccess={loadData}
        />
      </div>
    </div>
  );
}
