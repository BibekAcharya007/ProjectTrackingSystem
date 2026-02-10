import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import "../../styles/dashboard.css";

import { getEmployeeMe, getEmployeeManager, getEmployeeProject } from "../../Api/employeeapi";
import EmployeeInfoCard from "../../components/employee/EmployeeInfoCard";
import EmployeeProjectCard from "../../components/employee/EmployeeProjectCard";
import ManagerInfoCard from "../../components/employee/ManagerInfoCard";

export default function EmployeeHome() {
  const [employee, setEmployee] = useState(null);
  const [project, setProject] = useState(null);
  const [manager, setManager] = useState(null);

  const loadData = async () => {
    const emp = await getEmployeeMe();
    const proj = await getEmployeeProject();
    const mgr = await getEmployeeManager();

    setEmployee(emp);
    setProject(proj);
    setManager(mgr);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar role="employee" />

      <div className="dashboard-main">
        <Navbar title="Employee Dashboard" />

        <EmployeeInfoCard employee={employee} />

        <EmployeeProjectCard project={project} />

        <ManagerInfoCard manager={manager} />

        <div className="content-box">
          <h3 className="section-title">Hours</h3>
          <p><b>Available Hours:</b> 160 (dummy)</p>
          <p><b>Billable Hours:</b> 120 (dummy)</p>
        </div>
      </div>
    </div>
  );
}
