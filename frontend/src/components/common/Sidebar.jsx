import "./Sidebar.css";

export default function Sidebar({ role, manager, setActiveSection }) {
  return (
    <div className="sidebar">
      <h2 className="logo">PTS</h2>

      {/* Manager Info inside Sidebar */}
      {role === "manager" && manager && (
        <div className="sidebar-manager-info">
          <p><b>{manager.name}</b></p>
          <p className="small-email">{manager.email}</p>
        </div>
      )}

      <div className="sidebar-buttons">
        <button
          className="sidebar-btn"
          onClick={() => setActiveSection("dashboard")}
        >
          Dashboard
        </button>

        {role === "manager" && (
          <>
            <button
              className="sidebar-btn"
              onClick={() => setActiveSection("employees")}
            >
              Employees Under Me
            </button>

            {/* <button
              className="sidebar-btn"
              onClick={() => setActiveSection("projects")}
            >
              Projects
            </button> */}
          </>
        )}
      </div>
    </div>
  );
}
