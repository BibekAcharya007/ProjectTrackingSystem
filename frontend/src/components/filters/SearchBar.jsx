import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [projectId, setProjectId] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!projectId) return alert("Enter Project ID");
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="content-box">
      <h3 className="section-title">Search Project</h3>

      <input
        className="input"
        placeholder="Enter Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <button className="btn" style={{ marginTop: "12px" }} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
