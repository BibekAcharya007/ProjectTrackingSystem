import { formatDate } from "../../utils/dateHelper";

export default function ProjectDetailsCard({ project }) {
  if (!project) return null;

  return (
    <div className="content-box">
      <h3 className="section-title">Project Info</h3>
      <p><b>Project Name:</b> {project.project_name}</p>
      <p><b>Client:</b> {project.client_name}</p>
      <p><b>Skill Required:</b> {project.skill_req}</p>
      <p><b>Employees Required:</b> {project.no_of_emp_req}</p>
      <p><b>Start Date:</b> {formatDate(project.start_date)}</p>
      <p><b>End Date:</b> {formatDate(project.end_date)}</p>
    </div>
  );
}
