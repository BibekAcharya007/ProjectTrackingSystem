export default function EmployeeInfoCard({ employee }) {
  if (!employee) return null;

  return (
    <div className="content-box">
      <h3 className="section-title">Employee Info</h3>
      <p><b>Name:</b> {employee.emp_name}</p>
      <p><b>Email:</b> {employee.email}</p>
      <p><b>Skill:</b> {employee.skill}</p>
      <p><b>Availability:</b> {employee.availability ? "Available" : "Not Available"}</p>
    </div>
  );
}
