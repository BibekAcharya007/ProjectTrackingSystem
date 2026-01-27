import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar-wrapper">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;
