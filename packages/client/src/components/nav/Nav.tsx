import { Link, Route, Routes, NavLink } from "react-router-dom";
import Help from "../../pages/help/Help";
import Folders from "../../pages/folders/Folders";
import Projects from "../../pages/projects/Projects";
import Project from "../../pages/projects/Project";
import Settings from "../../pages/settings/Settings";
import Home from "../../pages/home/Home";
import IconFolder from "~icons/fluent/folder-16-regular";
import IconProjects from "~icons/fluent/briefcase-24-regular";
import IconHome from "~icons/fluent/home-16-regular";
import IconSettings from "~icons/fluent/settings-24-regular";
import IconQuestion from "~icons/fluent/question-circle-24-regular";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { useAppSelector } from "../../app/hooks";
import "./nav.css";
import Temp from "../../pages/temp/temp";
const Nav = () => {
  const allFolders = useLiveQuery(() =>
    db.folders.orderBy("created").reverse().toArray()
  );
  const currentFolderId = useAppSelector(
    (state) => state.folderReducer.currentFolder?.id
  );
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
            <NavLink
              className="menu__link"
              to={currentFolderId ? `/folders/${currentFolderId}` : "/folders"}
            >
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
          <Route path="/folders" element={<Folders allFolders={allFolders} />}>
            <Route path=":folderId" element={<div>ok</div>} />
          </Route>
          <Route path="/projects" element={<Projects />}>
            <Route path=":projectId" element={<Project />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          {/* just a page for working out stuff. */}
          <Route path='temp' element={<Temp/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
};

export default Nav;
