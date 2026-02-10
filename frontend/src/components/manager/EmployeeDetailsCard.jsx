export default function EmployeeDetailsCard({ employee, managerName }) {
  if (!employee) return null;

  return (
    <div className="content-box">
      <h3 className="section-title">Employee Details</h3>

      <p><b>Name:</b> {employee.emp_name}</p>
      <p><b>Email:</b> {employee.email}</p>
      <p><b>Skill:</b> {employee.skill}</p>
      <p><b>Availability:</b> {employee.availability ? "Available" : "Not Available"}</p>
      <p><b>Project Assigned:</b> {employee.project_id ? employee.project_id : "Unassigned"}</p>
      <p><b>Billable Hours:</b> 120 (dummy)</p>
      <p><b>Manager:</b> {managerName}</p>
    </div>
  );
}
