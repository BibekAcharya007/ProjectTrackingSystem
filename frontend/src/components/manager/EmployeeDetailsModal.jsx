import "./EmployeeDetailsModal.css";

export default function EmployeeDetailsModal({ employee, managerName, onClose }) {
  if (!employee) return null;

  return (
    <div className="emp-modal-overlay">
      <div className="emp-modal">
        <div className="emp-modal-header">
          <h2>Employee Details</h2>
          <button className="emp-close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="emp-modal-body">
          <p><b>Manager:</b> {managerName}</p>
          <p><b>ID:</b> {employee.id}</p>
          <p><b>Name:</b> {employee.emp_name}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Skill:</b> {employee.skill}</p>
          <p><b>Availability:</b> {employee.availability ? "Yes" : "No"}</p>
          <p><b>Project ID:</b> {employee.project_id ? employee.project_id : "Unassigned"}</p>
        </div>
      </div>
    </div>
  );
}
