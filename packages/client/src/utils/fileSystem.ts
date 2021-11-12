import { get, set, entries, values, clear } from "idb-keyval";
function printSomething() {
  return "working on it";
}

async function loadData():Promise<FileSystemDirectoryHandle[] | null > {
  try {
    // load dirHandles stored in indexedDB
    const data: FileSystemDirectoryHandle[] = await values();
   return data
    
  } catch (error) {
    console.log("error", error);
  }
  return null
}

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

async function getDirectoryHandle (){


    const dirHandle = await window.showDirectoryPicker({});
    // console.log(dirHandle);
    if (dirHandle.kind === "directory") {
      // save the name for updating the ui
     return dirHandle
    }
    return null
  };



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
      } catch (error) {
        console.error(`Error: getting folder files`, error);
      }
    }

    return fileHandles;
  };

export { printSomething , loadData , haveFolderPermission , getFileEntries, getDirectoryHandle};
