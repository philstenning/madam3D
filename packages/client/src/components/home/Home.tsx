import React, { useState, useEffect } from "react";
import { get, set, entries, values, clear } from "idb-keyval";
/*
https://web.dev/file-system-access/
https://web.dev/browser-fs-access/

https://www.npmjs.com/package/idb-keyval
*/

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
  const [string, setString] = useState("");

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const dirHandle = await window.showDirectoryPicker();
    console.log(dirHandle);
    if (dirHandle.kind === "directory") {
      // save the name for updating the ui
      setString(dirHandle.name);
      // add it to the list of known directories.
      setDirHandles((currentHandles) => [...currentHandles, dirHandle]);
      // const entries = await getEntries(dirHandle);
      set(dirHandle.name, dirHandle);
    }
  };

  // load dirHandles stored in indexedDB

  type data = {
    name: string;
    handle: FileSystemDirectoryHandle;
  };

  useEffect(() => {
    async function loadData() {
      try {
        const b: FileSystemDirectoryHandle[] = await values();
        // const b:[IDBValidKey, FileSystemDirectoryHandle][] = await values()
        setDirHandles(b);
        console.log(b);
      } catch (error) {
        console.log("error", error);
      }
    }
    loadData();
  }, []);
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
  const openSecondDir = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // e.preventDefault()
    e.stopPropagation();
    const dir = dirHandles[1];
    const permissionState = await dir.queryPermission();
    console.log(`permission state: ${permissionState}`);
    if (await dir.requestPermission({ mode: "read" })) {
      console.log("true");
    } else {
      console.log("false");
      return;
    }
    console.log("started working on: ", dir.name);
    if (dir) {
      console.log("doing");
      const a = getFileEntries(dir);
    }
  };
  /**
   * If the return value is false the user denied access to the folder.
   * @param dirHandle
   * @returns boolean
   */
  async function haveFolderPermission(
    dirHandle: FileSystemDirectoryHandle
  ): Promise<boolean> {
    let permissionState = await dirHandle.queryPermission();
    if (permissionState === "granted") {
      return true;
    }
    permissionState = await dirHandle.requestPermission();
    if (permissionState === "granted") {
      return true;
    }

    return false;
  }

  /**
   * @param dirHandle
   * @returns FileSystemHandle[]
   * @description Get the entries for a given directory.
   */
  const getFileEntries = async (dirHandle: FileSystemDirectoryHandle) => {
    // check we have permission to use the folder.
    if ((await haveFolderPermission(dirHandle)) === false) return;

    // create an empty array for the try block.
    let fileHandles: FileSystemHandle[] = [];

    for await (const entry of dirHandle.entries()) {
      try {
        const fileHandle = await dirHandle.getFileHandle(entry[0]);
        if (fileHandle.kind === "file") {
          fileHandles = [...fileHandles, fileHandle];
        }

        //   if (fileHandle.kind === "file") {
        // const file = await fileHandle.getFile();
        // console.log(
        //   file.name,
        //   file.size
        //   // file.webkitRelativePath,
        //   // file.lastModified
        // );
        //   }
      } catch (error) {
        console.error(`Error: getting folder files`, error);
      }
    }

    return fileHandles;
  };

  async function clearAllKnownDirs(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    await clear();
  }

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
      <button onClick={(e) => openSecondDir(e)}>second</button>
      <button onClick={(e) => clearAllKnownDirs(e)}>clear</button>
      {string && <h2>you opened: {string}</h2>}
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
