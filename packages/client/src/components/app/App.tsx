// import { useState} from "react";
// import FolderExplorer from '../folderExplorer/FolderExplorer'
// import Header from "../header/Header";
import { MainProvider } from "../../state/mainContext";
import { BrowserRouter } from "react-router-dom";

import Nav from "../nav/Nav";
import Header from '../header/Header'
import "./app.css";
import Dialog from "../dialog/dialog";

function App() {
  return (
    <>
      <MainProvider>
        <div className="app">
          {/* <Dialog/> */}
          <Header/>
          <BrowserRouter>
            <div className="app-content">
              <Nav />
             
            </div>
          </BrowserRouter>
        </div>
      </MainProvider>
    </>
  );
}
export default App;
