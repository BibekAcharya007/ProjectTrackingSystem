import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">Manager Panel</h2>

      {/* Navigation buttons */}
      <button
        className="sidebar-btn"
        onClick={() => navigate("/manager/employees")}
      >
        Employees
      </button>

      <button
        className="sidebar-btn"
        onClick={() => navigate("/manager/projects")}
      >
        Projects
      </button>

      <div className="sidebar-spacer"></div>

      {/* Logout */}
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>

    </div>
  );
};

export default Sidebar;
