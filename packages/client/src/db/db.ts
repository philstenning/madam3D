import Dexie from "dexie";
import { IFolder, IProject, IFile } from "./types";
import { v4 as uuid } from "uuid";
import generate from "project-name-generator";
export class AppDatabase extends Dexie {
  folders: Dexie.Table<IFolder, string>;
  projects: Dexie.Table<IProject, string>;
  files: Dexie.Table<IFile, string>;
  constructor(name: string = "AppDb") {
    super(name);
    this.version(1).stores({
      folders: "id, name, filePath,created",
      projects: "id, name, created, updated",
      files: "id,name, folderId, type, size, created",
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

export const createProject = async (
  name: string = "",
  fileIds: string[] = []
) => {
  const createdAt = new Date();
  const project: IProject = {
    id: uuid(),
    created: createdAt,
    updated: createdAt,
    name,
    itemIds: fileIds,
  };

  // save to db
  try {
    if (project.name === "") {
      project.name = generate({ words: 3 }).dashed;
    }
    await db.projects.add(project);
    return project;
  } catch (err) {
    console.error('error adding project to database: ', err)
  }

  // we don't want blank projects names
  // so create a default one:- 'Project 123'

  return project;
};
