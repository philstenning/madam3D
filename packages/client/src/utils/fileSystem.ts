// import { values} from "idb-keyval";
import { db, IFolder } from "../db";

async function loadData(): Promise<IFolder[] | null> {
  try {
    // load dirHandles stored in indexedDB
    const data: IFolder[] = await db.folders.toArray();
    return data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
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
  console.log(permissionState);
  if (permissionState === "prompt") {
    permissionState = await dirHandle.requestPermission();
  }
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
      /** we only want the files
       * it will throw an error if it is a Directory.
       */
      if (entry[1].kind === "file") {
        fileHandles = [...fileHandles, entry[1]];
      }
    } catch (error) {
      console.error(
        `Error: getting files in the folder ${dirHandle.name}`,
        error
      );
    }
  }

  return fileHandles;
};

export { loadData, haveFolderPermission, getFileEntries };
