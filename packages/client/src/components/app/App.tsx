// import { useState} from "react";
// import "./app.css";
// import FolderExplorer from '../folderExplorer/FolderExplorer'
// import Header from "../header/Header";
import { MainProvider } from "../../state/mainContext";
import { BrowserRouter , Link, Route, Routes } from "react-router-dom";
import Help from "../help/Help";
import Folders from "../folders/Folders";
import Projects from '../projects/Projects'

function App() {
    
  return (
    <>
      <MainProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Help/>} />
      </Routes>
      </BrowserRouter>
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
// function Projects() {
//   return (
//     <>
//       <div className="details">details</div>
//       <h2>Projects</h2>
//     </>
//   );
// }

export default App;

{
  /* <main>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
           
          </main> */
}
