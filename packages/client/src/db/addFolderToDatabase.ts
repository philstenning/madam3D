
import { IFolder, IDatabaseRecordAddResult,db ,ICurrentFolder} from "../db";

export async function addFolderToDatabase(folder: IFolder) {
  const status: IDatabaseRecordAddResult<IFolder> = {
    result: false,
    message: "",
    object: folder || null,
  };
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


export function createCurrentFolder(folder: IFolder) {
  const currentFolder: ICurrentFolder = {
    id: folder.id,
    name: folder.name,
    created: folder.created.toLocaleString(),
    updated: folder.updated.toLocaleString(),
  };
  return currentFolder;
}
