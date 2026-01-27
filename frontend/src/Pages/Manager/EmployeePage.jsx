import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import "./EmployeePage.css";

const EmployeesPage = () => {
  return (
    <DashboardLayout>

      <h2>All Employees</h2>

      <table className="emp-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skill</th>
            <th>Project</th>
            <th>Available Till</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anita</td>
            <td>Python</td>
            <td>HR Portal</td>
            <td>15 May</td>
          </tr>
        </tbody>
      </table>

    </DashboardLayout>
  );
};

export default EmployeesPage;
