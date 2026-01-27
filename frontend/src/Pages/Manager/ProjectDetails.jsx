import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  return (
    <DashboardLayout>

      <h2>Unilever UI Redesign</h2>

      <div className="project-info">
        <p><b>Status:</b> Active</p>
        <p><b>Start:</b> Jan 2026</p>
        <p><b>End:</b> April 2026</p>
      </div>

      <h3>Employees Working</h3>

      <table className="emp-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skill</th>
            <th>Working Hours</th>
            <th>Assigned From</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rahul</td>
            <td>React</td>
            <td>9–6</td>
            <td>Jan</td>
            <td>March</td>
          </tr>
        </tbody>
      </table>

      <button className="add-emp-btn">+ Add Employee</button>

    </DashboardLayout>
  );
};

export default ProjectDetails;
