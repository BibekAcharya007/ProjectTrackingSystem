export default function ProjectDropdown({ projects, selectedProjectId, setSelectedProjectId }) {
  return (
    <div className="content-box">
      <h3 className="section-title">Project Dropdown</h3>

      <select
        className="input"
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
      >
        <option value="">-- Select Project --</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.project_name} ({p.client_name})
          </option>
        ))}
      </select>
    </div>
  );
}
