import Dexie from "dexie";

export interface IFolder {
  id?: number;
  name: string;
  created: Date;
  updated: Date;
  handle: FileSystemDirectoryHandle;
  // optional
  filePath?: string;
}

export interface IProject {
  id?: number;
  name: string;
  created: Date;
  updated: Date;
  itemId: [number];
  // optional
  description?: string;
  createdBy?: string;
  osFilePath?: string;
  gitUrl?: string;
}

export interface IFile {
  id?: number;
  folderId: number;
  name: string;
  handle: FileSystemFileHandle;
  size: number;
  type: FileTypes;
  created: Date;
  updated: Date;
  printed: boolean;
  // optional
  description?: string;
  projectId?: number[];
  osFilePath?: string;
  imageUrl?: string;
}

export enum FileTypes {
  STL,
  OBJ,
  GCODE,
}

export class AppDatabase extends Dexie {
  folders: Dexie.Table<IFolder, number>;
  projects: Dexie.Table<IProject, number>;
  files: Dexie.Table<IFile, number>;
  constructor() {
    super("myAppDb");
    this.version(1).stores({
      folders: "++id, name, filePath,created",
      projects: "++id, name, created, updated",
      files: "++id,name, folderId, type, size, created",
    });
    this.folders = this.table("folders");
    this.projects = this.table("projects");
    this.files = this.table("files");
  }
}

export let db: AppDatabase;

export function createDatabase() {
  db = new AppDatabase();
}
