interface IFolderBase {
  id?: string;
  name: string;
  created: Date;
  updated: Date;
  // optional
  filePath?: string;
}
export interface ICurrentFolder {
  id: string;
  name: string;
  created: string;
  updated: string;
  // optional
  filePath?: string;
}
export interface IFolderCreate extends IFolderBase {
  handle: FileSystemDirectoryHandle;
}

export interface IFolder extends IFolderCreate {
  id: string;
  readonly created: Date;
}

export interface IProject {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  itemIds: string[];
  // optional
  description?: string;
  createdBy?: string;
  osFilePath?: string;
  gitUrl?: string;
}

export interface IFile {
  id: string;
  folderId: string;
  name: string;
  handle: FileSystemFileHandle;
  size: number;
  type: FileTypes;
  created: Date;
  updated: Date;
  printed: boolean;
  // optional
  description?: string;
  projectId?: string[];
  osFilePath?: string;
  imageUrl?: string;
}

export enum FileTypes {
  STL,
  OBJ,
  GCODE,
}

export interface IDatabaseRecordAddResult<RecordType> {
  result: boolean;
  message: string;
  object: RecordType;
}
