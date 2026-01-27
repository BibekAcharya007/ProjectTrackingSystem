import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import "./ManagerHome.css";

const ManagerHome = () => {
  const dummyProject = {
    id: 0,
    name: "UI Redesign",
    client: "Unilever",
    status: "Active",
    start_date: "2026-01-01",
    end_date: "2026-04-30"
  };

  const [projects, setProjects] = useState([dummyProject]);
  const [showForm, setShowForm] = useState(false);
  
  // Grouped state for the form
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    start: "",
    end: ""
  });

  const loadProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/projects");
      setProjects([dummyProject, ...res.data]);
    } catch (err) {
      console.log("Backend offline, using dummy data");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/projects", {
        ...formData,
        start_date: formData.start,
        end_date: formData.end,
        status: "Active"
      });

      setProjects([...projects, res.data]);
      setFormData({ name: "", client: "", start: "", end: "" });
      setShowForm(false);
    } catch (err) {
      alert("Backend error: Project not saved");
    }
  };

  return (
    <DashboardLayout>
      <div className="header">
        <h1>Welcome, Manager</h1>
        <button 
          className="add-project-btn" 
          onClick={() => setShowForm(!showForm)} // Toggle behavior
        >
          {showForm ? "Close Form" : "+ Add New Project"}
        </button>
      </div>

      {/* ADD PROJECT FORM - Wrapped in a specific container */}
      {showForm && (
        <div className="form-overlay-container">
          <div className="project-card form-card">
            <h3>Add New Project</h3>
            <form onSubmit={handleAddProject}>
              <input
                type="text"
                placeholder="Project Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Client Name"
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                required
              />
              <div className="date-inputs">
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.start}
                    onChange={(e) => setFormData({...formData, start: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.end}
                    onChange={(e) => setFormData({...formData, end: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">Save Project</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <hr className="divider" />
      <h2>Ongoing Projects</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h3>{project.name}</h3>
            <p><b>Client:</b> {project.client}</p>
            <p><span className="status-badge">{project.status}</span></p>
            <div className="timeline">
              <p><b>Start:</b> {project.start_date}</p>
              <p><b>End:</b> {project.end_date}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ManagerHome;