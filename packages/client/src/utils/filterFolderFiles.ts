import {
  IFolder,
  IFile,
  FileTypes,
  addFolderToDb,
  IDatabaseRecordAddResult,
} from "../db";

import md5 from "md5";
import { createFolder } from ".";

export async function filterFolderFiles(folder: IFolder) {
  // create a new array to hold the files from the for loop.
  let filteredFiles: IFile[] = [];
  if (!folder) return filteredFiles;
  for await (const entry of folder.handle.values()) {
    if (entry.kind === "file") {
      if (
        entry.name.toLowerCase().endsWith(".stl") ||
        entry.name.toLowerCase().endsWith(".3mf") ||
        entry.name.toLowerCase().endsWith(".gcode")
      ) {
        const newFile = await _createNewFileEntry(folder, entry);
        if (newFile) {
          filteredFiles.push(newFile);
        }
      }
    }
  }
  return filteredFiles;
}

export async function recursivelyScanLocalDrive(
  folderHandle: FileSystemDirectoryHandle,
  path: string,
  isRoot: boolean = false,
  rootId: string = ""
) {
  console.log(`folder: ${path}`);
  // create a arrays to hold the files and folders from the for async loop.
  let filteredFiles: FileSystemFileHandle[] = [];
  const folders: FileSystemDirectoryHandle[] = [];

  try {
    // iterate over the folder contents all files and folders.
    for await (const entry of folderHandle.values()) {
      if (entry.kind === "directory") {
        folders.push(entry);
      } else if (entry.kind === "file") {
        if (
          entry.name.toLowerCase().endsWith(".stl") ||
          entry.name.toLowerCase().endsWith(".3mf") ||
          entry.name.toLowerCase().endsWith(".gcode")
        ) {
          filteredFiles.push(entry);
        }
      }
    }
  } catch (error) {
    console.error(`Error getting folder entries:\r\n              ${error}`);
  }
  // we now have the files and directories arrays and for this directory
  let currentFolderResult: IDatabaseRecordAddResult<IFolder> | null = null;

  // only add folders with files in them.
  const parts = filteredFiles.length;
  if (parts > 0 || isRoot) {
    console.log(`\tfiles: ${filteredFiles.length}`);
    //create a new folder object
    if (isRoot) {
      const currentFolder = createFolder(folderHandle, path, isRoot, "", parts);
      // update root id now we have it
      currentFolder.rootId = currentFolder.id;
      currentFolderResult = await addFolderToDb(currentFolder);
      rootId = currentFolder.id;
    } else {
      const currentFolder = createFolder(
        folderHandle,
        path,
        isRoot,
        rootId,
        parts
      );
      currentFolderResult = await addFolderToDb(currentFolder);
    }
    // add the folder to the db
  } else {
    console.log(`folder not added ${path}`);
  }

  // call self to recursively scan.
  for await (const folder of folders) {
    await recursivelyScanLocalDrive(
      folder,
      `${path}/${folder.name}`,
      false,
      rootId
    );
  }
  return currentFolderResult;
}

async function _createNewFileEntry(
  folder: IFolder,
  entry: FileSystemFileHandle
) {
  const fileHandle = await folder.handle.getFileHandle(entry.name);
  const file = await fileHandle.getFile();
  const url = URL.createObjectURL(file);
  // console.log(entry.name, url);

  const fileType = GetFileType(file);
  if (fileType !== FileTypes.NOT_SUPPORTED) {
    const newFile: IFile = createFile(
      file,
      fileHandle,
      url,
      folder.id,
      folder.rootId,
      fileType
    );
    return newFile;
  }
  return null;
}

function GetFileType(file: File): FileTypes {
  const fileExtension = file.name.toLowerCase().split(".").pop();
  // console.log(fileExtension, file.name);
  switch (fileExtension) {
    case "stl":
      return FileTypes.STL;
    case "3mf":
      return FileTypes.THREE_MF;
    case "gcode":
      return FileTypes.GCODE;

    default:
      return FileTypes.NOT_SUPPORTED;
  }
}

export function createFile(
  file: File,
  fileHandle: FileSystemFileHandle,
  url: string,
  folderId: string,
  rootId: string,
  fileType: FileTypes
): IFile {
  // md5 hash the file name and folder id together,
  // when we return to the folder it will
  //always give the same value uuid will not work.
  return {
    id: md5(`${file.name}${folderId}`),
    created: new Date(file.lastModified),
    folderId,
    rootId,
    handle: fileHandle,
    name: file.name,
    printed: false,
    size: file.size,
    type: fileType,
    updated: new Date(file.lastModified),
    description: "",
    imageUrl: url,
    projectId: [folderId],
  };
}
