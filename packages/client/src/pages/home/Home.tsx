import React, { useState } from "react";
import { db, IFolder, IFolderCreate } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";
/*
https://web.dev/file-system-access/
https://web.dev/browser-fs-access/
*/
// import { loadData, getFileEntries } from "../../utils/fileSystem";
import DirFileViewer from "../../components/dirFileViewer/DirFileViewer";
const Home = () => {
  // used to store all known folder handles
  // const [knownFolders, setKnownFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);

  const allFolders = useLiveQuery(() =>
    db.folders.orderBy("created").reverse().toArray()
  );
  // const [dirFiles, setDirFiles] = useState<FileSystemHandle[] | null>(null);

  const openFolderPicker = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const dirHandle = await window.showDirectoryPicker({});

      if (dirHandle.kind === "directory") {
        // create the Folder object to be saved in db.
        const createdAt = new Date();
        const folder: IFolderCreate = {
          handle: dirHandle,
          created: createdAt,
          updated: createdAt,
          name: dirHandle.name,
        };

        try {
          // add folder to local database.
         let res= await db.folders.add(folder as IFolder);
   
          // this folder should set to the current folder
          setSelectedFolder(folder as IFolder);
        } catch (error) {
          console.log(`Error saving folder: ${error}`);
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


  return (
    <div>
      <h1>home</h1>
      <button onClick={(e) => openFolderPicker(e)}>Add Folder</button>
      <button onClick={() => console.log("TODO")}>clear</button>

      <ul>
        {allFolders &&
          allFolders.map((folder) => (
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