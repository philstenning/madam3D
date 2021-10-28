// import { useState} from "react";
import "./styles/App.css";
import FolderExplorer from './components/FolderExplorer'
import Header from "./components/Header";

import {MainProvider} from './components/state/mainContext'
function App() {


  return (
    <main className="App">
      <MainProvider>

      <Header />
      <FolderExplorer/>
      </MainProvider>
    </main>
  );
}

export default App;