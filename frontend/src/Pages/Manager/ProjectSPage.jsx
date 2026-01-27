import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import "./ProjectsPage.css";

const ProjectsPage = () => {

  const navigate = useNavigate();

  const projects = [
    { id: 1, name: "Unilever UI Redesign" },
    { id: 2, name: "HR Portal" }
  ];

  return (
    <DashboardLayout>

      <h2>My Projects</h2>

      <ul className="project-list">
        {projects.map(p => (
          <li key={p.id} onClick={() => navigate(`/manager/project/${p.id}`)}>
            {p.name}
          </li>
        ))}
      </ul>

    </DashboardLayout>
  );
};

export default ProjectsPage;
