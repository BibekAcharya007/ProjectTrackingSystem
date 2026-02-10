import { useState } from "react";
import Modal from "../common/Modal";
import { assignEmployeeApi } from "../../Api/managerapi";

export default function AssignEmployeeModal({ isOpen, onClose, employees, projects, onSuccess }) {
  const [employeeId, setEmployeeId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleAssign = async () => {
    if (!employeeId || !projectId) return alert("Select employee and project");

    try {
      await assignEmployeeApi({
        employee_id: Number(employeeId),
        project_id: Number(projectId),
      });

      alert("Employee assigned successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to assign employee");
    }
  };

  return (
    <Modal title="Assign Employee to Project" isOpen={isOpen} onClose={onClose}>
      <label className="label">Select Employee</label>
      <select className="input" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
        <option value="">-- Select Employee --</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.emp_name} ({e.skill})
          </option>
        ))}
      </select>

      <label className="label">Select Project</label>
      <select className="input" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
        <option value="">-- Select Project --</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.project_name}
          </option>
        ))}
      </select>

      <button className="btn" style={{ marginTop: "15px" }} onClick={handleAssign}>
        Assign
      </button>
    </Modal>
  );
}
