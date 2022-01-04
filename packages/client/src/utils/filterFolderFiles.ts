import { IFolder, IFile, FileTypes } from "../db";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import md5 from "md5";

export async function filterFolderFiles(folder: IFolder) {
  // create a new array to hold the files from the for loop.
  let filteredFiles: IFile[] = [];
  if (!folder) return filteredFiles;
  for await (const entry of folder.handle.values()) {
    // filter dir we only need stl at the moment
    if (entry.kind === "file" && entry.name.endsWith(".stl")) {
      const newFile: IFile = await _createNewFileEntry(folder, entry);

      filteredFiles.push(newFile);
    }
  }
  return filteredFiles;
}

export async function ff2(folderHandle: FileSystemDirectoryHandle,path:string) {
  // create a new array to hold the files from the for loop.
  let filteredFiles: string[] = [];
  for await (const entry of folderHandle.values()) {
    // filter dir we only need stl at the moment
   if (entry.kind === "directory") {
      try {
        // const folder = await folderHandle.getDirectory(entry.name);
        path = path + "/" + entry.name;
        const files = await ff2(entry,path);
        if(files.length > 0) {
          console.log(`${path}/${entry.name}`);
          console.log(`count: ${files.length}`);
        }
      } catch (error) {
        console.log(error);
      }
    }else  if (entry.kind === "file" && entry.name.endsWith(".stl")) {
      console.log(`\t ${path}/${entry.name}`);

      filteredFiles.push(entry.name);
    } 
  }
  return filteredFiles;
}

async function _createNewFileEntry(
  folder: IFolder,
  entry: FileSystemFileHandle
) {
  const fileHandle = await folder.handle.getFileHandle(entry.name);
  const file = await fileHandle.getFile();
  const url = URL.createObjectURL(file);
  // console.log(entry.name, url);
  const newFile: IFile = createFile(file, fileHandle, url, folder.id);
  return newFile;
}

export function createFile(
  file: File,
  fileHandle: FileSystemFileHandle,
  url: string,
  folderId: string,
  fileType: FileTypes = FileTypes.STL
): IFile {
  // md5 hash the file name and folder id together,
  // when we return to the folder it will
  //always give the same value uuid will not work.
  return {
    id: md5(`${file.name}${folderId}`),
    created: new Date(file.lastModified),
    folderId: folderId,
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
