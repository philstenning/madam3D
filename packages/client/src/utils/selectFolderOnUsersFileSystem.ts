import { IFolder } from "../db";
import md5 from "md5";

export async function selectDirectoryOnUsersFileSystem() {
  try {
    // we get back a dirHandle or undefined if user cancels the dialog.
    const dirHandle = await window.showDirectoryPicker({});
    // we only want a folder not files
    if (dirHandle.kind === "directory") {
      // create the Folder object to be saved in db.
      return createFolder(dirHandle);
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return null;
}

export function createFolder(
  dirHandle: FileSystemDirectoryHandle,
  filePath: string = "/",
  isRoot: boolean = false,
  rootId:string='',
  parts:number=0,
): IFolder {
  const createdAt = new Date();
  // TODO perhaps we should use a guid.
  // the id uses the current time to generate a unique id,
  // as we could have multiple folders with the same name.
  const folder: IFolder = {
    id: md5(dirHandle.name + createdAt.toISOString()),
    handle: dirHandle,
    created: createdAt,
    updated: createdAt,
    name: dirHandle.name,
    isRoot,
    filePath,
    rootId,
    parts
  };
  return folder;
}
