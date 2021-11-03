// import { useState} from "react";
import "./app.css";
// import FolderExplorer from '../folderExplorer/FolderExplorer'
// import Header from "../header/Header";

import { MainProvider } from "../../state/mainContext";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import IconAccessibility from "~icons/tabler/folders";
import IconHelp from "~icons/ic/outline-live-help";
function App() {
  return (
    <>
      <MainProvider>
        <Router>
          <div className="main-layout">
            <nav>
              <ul>
                <li className="nav-menu__item">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-menu__item">
                  <Link to="/folders">Folders</Link>
                </li>
                <li className="nav-menu__item">
                  <Link to="/projects">Projects</Link>
                </li>
                <li className="nav-menu__item">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="nav-menu__item">
                  <Link to="/Help">help</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/projects">
                <Projects />
              </Route>
              <Route path="/folders">
                <Folders />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/help">
                <Help />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </MainProvider>
    </>
  );
}

function Home() {
  return (
    <>
      <h2>Home</h2>
    </>
  );
}

function Settings() {
  return (
    <>
      <div className="details">details</div>
      <h2>Settings</h2>
    </>
  );
}
function Projects() {
  return (
    <>
      <div className="details">details</div>
      <h2>Projects</h2>
    </>
  );
}

function Folders() {
  return (
    <>
      <div className="details">
        <h3>folders</h3>
        <ul>
          <li>
            <Link to="/folder/foo">folder 1</Link>
          </li>
          <li>
            <Link to="/folder/foo">folder 2</Link>
          </li>
          <li>
            <Link to="/folder/foo">folder 3</Link>
          </li>
        </ul>
      </div>
      {/* <div className="details">details</div> */}
      <div>
        <h2>Folders</h2>
        <div>
          {/* <IconAccessibility /> */}
          <p>
            <a href="https://github.com/antfu/unplugin-icons">
              icons https://github.com/antfu/unplugin-icons
            </a>
            <br />
            <a href="https://icon-sets.iconify.design/?query=remove">
              info https://icon-sets.iconify.design/?query=remove
            </a>
          </p>
          <IconHelp style={{ fontSize: "2rem", color: "green" }} />
          <IconAccessibility />
        </div>
      </div>
    </>
  );
}
function Help() {
  return (
    <>
      {/* <div className="details">details</div> */}
      <h2>Help</h2>
    </>
  );
}

export default App;

{
  /* <main>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
           
          </main> */
}
