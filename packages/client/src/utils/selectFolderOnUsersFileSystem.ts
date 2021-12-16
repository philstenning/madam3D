import { IFolder } from "../db";
import md5  from 'md5'

export async function selectFolderOnUsersFileSystem() {
  try {
    // we get back a dirHandle or undefined if user cancels the dialog.
    const dirHandle = await window.showDirectoryPicker({});
    // we only want a folder not files
    if (dirHandle.kind === "directory") {
      // create the Folder object to be saved in db.
      const createdAt = new Date();
      const folder: IFolder = {
        id:md5(dirHandle.name + createdAt.toISOString()),
        handle: dirHandle,
        created: createdAt,
        updated: createdAt,
        name: dirHandle.name,
      };
      return folder
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return null;

}




//   // add folder to local database.
//       const folderId = await db.folders.add(folder as IFolder);
//       // this folder should set to the current folder
//       if (folderId > 0) {
//         // we need a serialized object to create the currently
//         // selected folder for our data store.
//         const createCurrentFolder: ICurrentFolder = {
//           id: folderId,
//           name: dirHandle.name,
//           created: createdAt.toLocaleString(),
//           updated: createdAt.toLocaleString(),
//         };
//         return createCurrentFolder;
