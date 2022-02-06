import { db, IProject } from "../../db";
import { RiDeleteBinLine, RiEditBoxLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
type Props = {
  project: IProject;
};
const ProjectCard = ({ project }: Props) => {
  const deleteProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (project.id) {
      const res = await db.projects.delete(project.id);
    }
  };
  return (
    <NavLink
      to={`/projects/${project.id}`}
    //   key={project.id}
      className="project-card"
    >
      <div className="project-card__overlay">
        <button
          className="project-card__action"
          onClick={(e) => deleteProject(e)}
        >
          <RiDeleteBinLine />
        </button>
        <button className="project-card__action">
          <RiEditBoxLine />
        </button>
      </div>

      <header className="project-card__header"> {project.name}</header>
      <img
        src="https://source.unsplash.com/featured?technology"
        style={{ width: "100%" }}
        alt=""
      />
      <ul className="project-card__list">
        <li className="project-card__list-item">
          Files: {project.itemIds.length}
        </li>
        <li className="project-card__list-item">
          Created: {project.created.toLocaleDateString()}
        </li>
      </ul>
    </NavLink>
  );
};

export default ProjectCard;
