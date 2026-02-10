import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import "../../styles/dashboard.css";

import { getProjectByIdApi, getProjectEmployeesApi } from "../../Api/projectapi";
import ProjectDetailsCard from "../../components/project/ProjectDetailsCard";
import ProjectEmployeesTable from "../../components/project/ProjectEmployeesTable";
import RevenueCard from "../../components/project/RevenueCard";
import { exportToCSV } from "../../utils/csvExport";
import { getRole } from "../../utils/tokenHelper";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);

  const role = getRole();

  const loadData = async () => {
    try {
      const proj = await getProjectByIdApi(projectId);
      const emp = await getProjectEmployeesApi(projectId);

      setProject(proj);
      setEmployees(emp);
    } catch (err) {
      alert("Project not found!");
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  return (
    <div className="dashboard-layout">
      <Sidebar role={role} />

      <div className="dashboard-main">
        <Navbar title="Project Details Page" />

        <ProjectDetailsCard project={project} />

        <RevenueCard employeesCount={employees.length} />

        <button
          className="btn"
          style={{ marginTop: "10px" }}
          onClick={() => exportToCSV(employees, `project_${projectId}_employees.csv`)}
        >
          Export CSV
        </button>

        <ProjectEmployeesTable employees={employees} />
      </div>
    </div>
  );
}
