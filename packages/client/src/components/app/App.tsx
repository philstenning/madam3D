// import { useState} from "react";
import "./app.css";
// import FolderExplorer from '../folderExplorer/FolderExplorer'
// import Header from "../header/Header";
import { MainProvider } from "../../state/mainContext";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Help from "../help/Help";
import Folders from "../folders/Folders";

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




export default App;

{
  /* <main>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
           
          </main> */
}
