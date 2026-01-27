import { useState } from "react";
import axios from "axios";
import "./AddProjectModal.css";

const AddProjectModal = ({ onClose, onProjectAdded }) => {

  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/projects", {
        name,
        client,
        start_date: startDate,
        end_date: endDate,
        status
      });

      // Notify parent to refresh projects
      onProjectAdded();

      // Close modal
      onClose();

    } catch (err) {
      alert("Failed to add project");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Add New Project</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Client Name"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />

          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddProjectModal;
