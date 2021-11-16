import React, { useState, useEffect } from "react";
import { db, IFolder } from "../../db/db";
// import { get, set, entries, values, clear } from "idb-keyval";
/*
https://web.dev/file-system-access/
https://web.dev/browser-fs-access/
*/
import { loadData, getFileEntries } from "../../utils/fileSystem";
import DirFileViewer from "../dirFileViewer/DirFileViewer";
const Home = () => {
  // used to store all known folder handles
  const [knownFolders, setKnownFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);

  // const [dirFiles, setDirFiles] = useState<FileSystemHandle[] | null>(null);

  const openFolderPicker = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const dirHandle = await window.showDirectoryPicker({});
      if (dirHandle.kind === "directory") {
        // add it to the list of known directories.
        const createdAt = new Date();
        const folder: IFolder = {
          handle: dirHandle,
          created: createdAt,
          updated: createdAt,
          name: dirHandle.name,
        };
      

        try {
          const result = await db.folders.add(folder)
          console.log(result)
          setKnownFolders((currentHandles) => [...currentHandles, folder]);
          // this folder should now be the current folder
          setSelectedFolder(folder);
        } catch (error) {
          console.log(`Error saving folder: ${error}`)
        }
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  const removeFolder = async () => {
    //TODO remove selected folder from db.
  };
  const removeAllFolders = async () => {
    //TODO remove All folder from db.
  };

  useEffect(() => {
    async function init() {
      const data = await loadData();
      if (data) {
        setKnownFolders(data);
      }
    }
    init();
  }, []);

  return (
    <div>
      <h1>home</h1>
      <button onClick={(e) => openFolderPicker(e)}>Add Folder</button>
      <button onClick={() => console.log("TODO")}>clear</button>

      <ul>
        {knownFolders.map((folder) => (
          <li key={folder.name} onClick={() => setSelectedFolder(folder)}>
            {folder.name} {folder.updated.toLocaleDateString()}
          </li>
        ))}
      </ul>
      {selectedFolder && <DirFileViewer selectedFolder={selectedFolder} />}
    </div>
  );
};

export default Home;
