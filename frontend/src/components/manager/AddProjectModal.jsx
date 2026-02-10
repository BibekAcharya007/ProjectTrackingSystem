import { useState } from "react";
import Modal from "../common/Modal";
import { createProjectApi } from "../../Api/projectapi";

export default function AddProjectModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    project_name: "",
    client_name: "",
    skill_req: "",
    no_of_emp_req: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createProjectApi({
        ...form,
        no_of_emp_req: Number(form.no_of_emp_req),
      });
      alert("Project created successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to create project");
    }
  };

  return (
    <Modal title="Add Project" isOpen={isOpen} onClose={onClose}>
      <label className="label">Project Name</label>
      <input className="input" name="project_name" value={form.project_name} onChange={handleChange} />

      <label className="label">Client Name</label>
      <input className="input" name="client_name" value={form.client_name} onChange={handleChange} />

      <label className="label">Skill Required</label>
      <input className="input" name="skill_req" value={form.skill_req} onChange={handleChange} />

      <label className="label">No of Employees Required</label>
      <input className="input" type="number" name="no_of_emp_req" value={form.no_of_emp_req} onChange={handleChange} />

      <label className="label">Start Date</label>
      <input className="input" type="date" name="start_date" value={form.start_date} onChange={handleChange} />

      <label className="label">End Date</label>
      <input className="input" type="date" name="end_date" value={form.end_date} onChange={handleChange} />

      <button className="btn" style={{ marginTop: "15px" }} onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
}
