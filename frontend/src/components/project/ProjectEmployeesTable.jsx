export default function ProjectEmployeesTable({ employees }) {
  return (
    <div className="content-box">
      <h3 className="section-title">Employees Working on this Project</h3>

      {employees.length === 0 ? (
        <p className="small-text">No employees assigned yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Skill</th>
              <th>Availability</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.emp_name}</td>
                <td>{e.email}</td>
                <td>{e.skill}</td>
                <td>{e.availability ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
