import { Link, Route, Routes, NavLink } from "react-router-dom";
import Help from "../help/Help";
import Folders from "../folders/Folders";
import Projects from "../projects/Projects";
import Project from "../projects/Project";
import Settings from "../settings/Settings";
import Home from "../home/Home";
import IconFolder from "~icons/fluent/folder-16-regular";
import IconProjects from "~icons/fluent/briefcase-24-regular";
import IconHome from "~icons/fluent/home-16-regular";
import IconSettings from "~icons/fluent/settings-24-regular";
import IconQuestion from "~icons/fluent/question-circle-24-regular";
import ModelList from '../modelList/ModelList'
import "./nav.css";
const Nav = () => {
  return (
    <>
      <nav className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink className="menu__link" to="/">
              <IconHome className="menu__svg" />
              Home
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className="menu__link" to="/folders">
              <IconFolder className="menu__svg" />
              Folders
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className="menu__link" to="/projects">
              <IconProjects className="menu__svg" />
              Projects
            </NavLink>
          </li>
        </ul>
        <ul className="menu__list">
          <li>
            <NavLink className="menu__link" to="/settings">
              <IconSettings className="menu__svg" />
              Settings
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className="menu__link" to="/help">
              <IconQuestion className="menu__svg" />
              Help
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/help" element={<Help />} />
          <Route path="/folders" element={<Folders />}>
            <Route path=":folderId" element={<div>ok</div>} />
          </Route>
          <Route path="/projects" element={<Projects />}>
            <Route path=":projectId" element={<Project />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
};

export default Nav;
