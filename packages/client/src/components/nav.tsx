import React, { Suspense, lazy } from "react";

import { Route, Routes, NavLink } from "react-router-dom";

const Help = lazy(() => import("../routes/help/help"));
const Project = lazy(() => import("../routes/projects/Project"));
const Projects = lazy(() => import("../routes/projects/projects"));
const Settings = lazy(() => import("../routes/settings/settings"));
const Home = lazy(() => import("../routes/home/home"));
const Folders = React.lazy(() => import("../routes/models/models"));

const IconFolder = lazy(() => import("~icons/fluent/folder-16-regular"));
import IconProjects from "~icons/fluent/briefcase-24-regular";
import IconHome from "~icons/fluent/home-16-regular";
import IconSettings from "~icons/fluent/settings-24-regular";
import IconQuestion from "~icons/fluent/question-circle-24-regular";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import { useAppSelector } from "../app/hooks";
import "./nav.css";
import Temp from "../routes/temp/temp";
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
            <NavLink className="menu__link" data-cy="main-nav-home" to="/">
              <IconHome className="menu__svg" />
              Home
            </NavLink>
          </li>
          <li className="menu__item">
            <Suspense fallback={<div>Loading...</div>}>
              <NavLink
                className="menu__link"
                to={
                  currentFolderId ? `/folders/${currentFolderId}` : "/folders"
                }
                data-cy="main-nav-folders"
              >
                <IconFolder className="menu__svg" />
                Models
              </NavLink>
            </Suspense>
          </li>
          <li className="menu__item">
            <NavLink
              className="menu__link"
              to="/projects"
              data-cy="main-nav-projects"
            >
              <IconProjects className="menu__svg" />
              Collections
            </NavLink>
          </li>
        </ul>
        <ul className="menu__list">
          <li>
            <NavLink
              className="menu__link"
              to="/settings"
              data-cy="main-nav-settings"
            >
              <IconSettings className="menu__svg" />
              Settings
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className="menu__link" to="/help" data-cy="main-nav-help">
              <IconQuestion className="menu__svg" />
              Help
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/help" element={<Help />} />
            <Route
              path="/folders"
              element={<Folders allFolders={allFolders} />}
            >
              <Route path=":folderId" element={<div>ok</div>} />
            </Route>
            <Route path="/projects" element={<Projects />}>
              <Route path=":projectId" element={<Project />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
            {/* just a page for working out stuff. */}
            <Route path="temp" element={<Temp />} />
            <Route path="/" element={<Home />} />
          </Routes>{" "}
        </Suspense>
      </main>
    </>
  );
};

export default Nav;
