export default function EmployeeProjectCard({ project }) {
  return (
    <div className="content-box">
      <h3 className="section-title">Project Details</h3>

      {!project || project.project === null ? (
        <p className="small-text">No project assigned.</p>
      ) : (
        <>
          <p><b>Project Name:</b> {project.project_name}</p>
          <p><b>Client:</b> {project.client_name}</p>
          <p><b>Skill Required:</b> {project.skill_req}</p>
        </>
      )}
    </div>
  );
}
