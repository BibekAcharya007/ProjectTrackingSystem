import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ title }) {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <h2>{title}</h2>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
