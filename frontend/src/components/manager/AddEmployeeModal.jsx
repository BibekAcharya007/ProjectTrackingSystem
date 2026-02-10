import { useState } from "react";
import Modal from "../common/Modal";
import { createEmployeeApi } from "../../Api/employeeapi";

export default function AddEmployeeModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    emp_name: "",
    email: "",
    password: "",
    skill: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createEmployeeApi({
        ...form,
        availability: form.availability === "true" || form.availability === true,
      });

      alert("Employee created successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to create employee");
    }
  };

  return (
    <Modal title="Add Employee" isOpen={isOpen} onClose={onClose}>
      <label className="label">Employee Name</label>
      <input className="input" name="emp_name" value={form.emp_name} onChange={handleChange} />

      <label className="label">Email</label>
      <input className="input" name="email" value={form.email} onChange={handleChange} />

      <label className="label">Password</label>
      <input className="input" type="password" name="password" value={form.password} onChange={handleChange} />

      <label className="label">Skill</label>
      <input className="input" name="skill" value={form.skill} onChange={handleChange} />

      <label className="label">Availability</label>
      <select className="input" name="availability" value={form.availability} onChange={handleChange}>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>

      <button className="btn" style={{ marginTop: "15px" }} onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
}
