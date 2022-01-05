import {
  IFolder,
  IDatabaseRecordAddResult as IDbAddResult,
  db,
  ICurrentFolder,
} from ".";

/**
 * 
 * add the folder to the db and returns a status
 * message, it also checks if the entry already
 * exists in the db.
 * @param folder 
 * @return 
 */
export async function addFolderToDb(folder: IFolder) {
  const status: IDbAddResult<IFolder> = createDbAddResult(folder);
  if (!folder) {
    status.message = "No folder selected";
    return status;
  }
  // get all folders with the same name from the database.
  const existingFolder = await db.folders
    .where({ name: folder.name })
    .toArray();

  //test each folder to see if it is already in the db
  for (const folderToCheck of existingFolder) {
    if (folderToCheck) {
      const doesExist = await folderToCheck.handle.isSameEntry(folder.handle);

      if (!doesExist) {
        status.message = "Folder already exists in database";
        status.result = false;
        return status;
      }
    }
  }
  // if the folder is not in the db, add it.
  try {
    const res = await db.folders.add(folder);
    console.log(`folder added to db: ${res}`);
    status.result = true;
    status.message = res.toString();
    return status;
  } catch (err) {
    console.error("Error saving data to Folders table: ", err);
    status.message = "Error saving data to Folders table";
    return status;
  }
}
/**
 * 
 * @param folder 
 * @param result 
 * @param message 
 * @returns 
 */
export function createDbAddResult(
  folder: IFolder,
  result: boolean = false,
  message: string = ""
): IDbAddResult<IFolder> {
  return {
    result,
    message,
    object: folder || null,
  };
}
/**
 *  returns a serializable current folder for the redux store.
 */
export function createSerializableCurrentFolder(folder: IFolder) {
  const currentFolder: ICurrentFolder = {
    id: folder.id,
    name: folder.name,
    created: folder.created.toLocaleString(),
    updated: folder.updated.toLocaleString(),
  };
  return currentFolder;
}
