import { useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import "./ProjectDetails.css";

const ProjectDetails = () => {

  const project = {
    id: 1,
    name: "Unilever UI Redesign",
    status: "Active",
    start: "Jan 2026",
    end: "April 2026"
  };

  const allEmployees = [
    { id: 1, name: "Rahul", skill: "React" },
    { id: 2, name: "Anita", skill: "Python" },
    { id: 3, name: "Suresh", skill: "Java" }
  ];

  const [assignedEmployees, setAssignedEmployees] = useState([
    {
      id: 1,
      name: "Rahul",
      skill: "React",
      from: "Jan",
      to: "March",
      hours: "9–6"
    }
  ]);

  const [showModal, setShowModal] = useState(false);

  const [selectedEmp, setSelectedEmp] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [hours, setHours] = useState("");

  const handleAddEmployee = (e) => {
    e.preventDefault();

    const emp = allEmployees.find(e => e.id === Number(selectedEmp));

    const newAssignment = {
      id: Date.now(),
      name: emp.name,
      skill: emp.skill,
      from: fromDate,
      to: toDate,
      hours
    };

    setAssignedEmployees([...assignedEmployees, newAssignment]);

    setSelectedEmp("");
    setFromDate("");
    setToDate("");
    setHours("");
    setShowModal(false);
  };

  return (
    <DashboardLayout>

      <h2>{project.name}</h2>

      <div className="project-info">
        <p><b>Status:</b> {project.status}</p>
        <p><b>Start:</b> {project.start}</p>
        <p><b>End:</b> {project.end}</p>
      </div>

      <h3>Employees Working</h3>

      {/* TABLE */}
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
          {assignedEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.skill}</td>
              <td>{emp.hours}</td>
              <td>{emp.from}</td>
              <td>{emp.to}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD BUTTON */}
      <button
        type="button"
        className="add-emp-btn"
        onClick={() => {
          console.log("ADD EMP CLICKED");
          setShowModal(true);
        }}
      >
        + Add Employee
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h3>Add Employee to Project</h3>

            <form onSubmit={handleAddEmployee}>

              <label>Select Employee</label>
              <select
                value={selectedEmp}
                onChange={(e) => setSelectedEmp(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                {allEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.skill})
                  </option>
                ))}
              </select>

              <label>Assigned From</label>
              <input
                type="text"
                placeholder="From"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />

              <label>Assigned To</label>
              <input
                type="text"
                placeholder="To"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Working Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Assign
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default ProjectDetails;
