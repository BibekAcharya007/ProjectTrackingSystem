import "./EmployeeHome.css";

const EmployeeHome = () => {
  return (
    <div className="employee-container">

      <h1 className="employee-title">Welcome Employee</h1>

      <div className="project-card">

        <h2 className="project-name">UI Redesign Project</h2>

        <div className="project-info">
          <p><b>Status:</b> Active</p>
          <p><b>Client:</b> Unilever</p>
        </div>

        <div className="timeline">
          <p><b>Start:</b> Jan 2026</p>
          <p><b>End:</b> April 2026</p>
        </div>

        <div className="work-info">
          <p><b>Working Hours:</b> 9 AM – 6 PM</p>
          <p><b>Role:</b> Frontend Developer</p>
        </div>

      </div>

    </div>
  );
};

export default EmployeeHome;
