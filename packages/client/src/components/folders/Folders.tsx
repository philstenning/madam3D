import React from "react";
import FolderExplorer from "../folderExplorer/FolderExplorer";
import AddFolder from './addFolder'
const Folders = () => {
  return (
    <>
      <div className="details"><h2>Folders</h2>
        <AddFolder />
     
      
      </div>
      <div>
        <h1>Folder</h1>
        <FolderExplorer />
      </div>
    </>
  );
};

export default Folders;
