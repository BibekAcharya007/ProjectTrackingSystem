export default function DashboardCards({ dashboard }) {
  return (
    <div className="flex-row">
      <div className="card">
        <h3>Total Projects</h3>
        <p>{dashboard?.total_projects ?? 0}</p>
      </div>

      <div className="card">
        <h3>Total Employees</h3>
        <p>{dashboard?.total_employees_under_manager ?? 0}</p>
      </div>

      <div className="card">
        <h3>Assigned Employees</h3>
        <p>{dashboard?.assigned_employees ?? 0}</p>
      </div>

      <div className="card">
        <h3>Unassigned Employees</h3>
        <p>{dashboard?.unassigned_employees ?? 0}</p>
      </div>
    </div>
  );
}
