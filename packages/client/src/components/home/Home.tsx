import React, { useState, useEffect } from "react";
import { get, set, entries, values, clear } from "idb-keyval";
/*
https://web.dev/file-system-access/
https://web.dev/browser-fs-access/

https://www.npmjs.com/package/idb-keyval
*/
import {loadData, getFileEntries} from '../../utils/fileSystem'
/*  
TODO:
When a folder is opened it's handle is stored in a 
useState array so we have access to it at a later stage.

TODO:
When we click on a folder link/name we can view all the
files in that folder, that we can view with the app.

TODO:
add a filter to the window to view only files that
we want to see eg: stl/obj/gcode etc.


*/
const Home = () => {
  // used to store all known folder handles
  const [dirHandles, setDirHandles] = useState<FileSystemDirectoryHandle[]>([]);
  const [selectedDir, setSelectedDir] =
    useState<FileSystemDirectoryHandle | null>(null);
  const [dirFiles, setDirFiles] = useState<FileSystemHandle[] | null>(null);
  // temp for dev
  // const [string, setString] = useState("");


  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
try{


    const dirHandle = await window.showDirectoryPicker({});
    if (dirHandle.kind === "directory") {
      // save the name for updating the ui
      // setString(dirHandle.name);
      // add it to the list of known directories.
      setDirHandles((currentHandles) => [...currentHandles, dirHandle]);
      setSelectedDir(dirHandle)
      
      set(dirHandle.name, dirHandle);
    }}catch(err){
      console.error(`Error: ${err}`)
    }
  };

  
  
  useEffect(() => {
    async function init() {
      const data = await loadData();
      if(data){
        setDirHandles(data)
      }}
      init()
  }, []);
 

  const selectDirectory = async (dirHandle: FileSystemDirectoryHandle) => {
    setSelectedDir(dirHandle);

    let files = await getFileEntries(dirHandle);
    if(files){
      files = files.filter((file) => file.name.endsWith(".stl"));
       setDirFiles(files)
    }
  };

  return (
    <div>
      <h1>home</h1>
      <button onClick={(e) => handleClick(e)}>Add Folder</button>
      <button onClick={()=>clear()}>clear</button>
      {/* {string && <h2>you opened: {string}</h2>} */}
      <ul>
        {dirHandles.map((handle) => (
          <li key={handle.name} onClick={() => selectDirectory(handle)}>
            {handle.name} {}
          </li>
        ))}
      </ul>
      <p>total: {dirFiles?.length||0}</p>
      <ul>
        {selectedDir &&
          dirFiles?.map((file) => <li key={file.name}>{file.name}</li>)}
      </ul>
    </div>
  );
};

export default Home;






 /**
   * Get all the FileSystemHandles for the files/directories in the supplied folderHandle.
   * @param FileSystemDirectoryHandle
   * @returns Promise FileSystemHandle[]
   */

  /**
   * open the second dir that was saved
   * @param dirHandle
   * @returns
   */
  // const openSecondDir = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {

  //   e.stopPropagation();
  //   const dir = dirHandles[1];
  //   const permissionState = await dir.queryPermission();
  //   console.log(`permission state: ${permissionState}`);
  //   if (await dir.requestPermission({ mode: "read" })) {
  //     console.log("true");
  //   } else {
  //     console.log("false");
  //     return;
  //   }
  //   console.log("started working on: ", dir.name);
  //   if (dir) {
  //     console.log("doing");
  //     const a = getFileEntries(dir);
  //   }
  // };