import React from "react";
import "./folders.css";
import { RiAddLine } from "react-icons/ri"; // icon

import ModelList from "../../components/modelList/ModelList";
import FolderDetails from "./FolderDetails";
import RootList from "./rootList";

import { ConfirmDeleteFolderDialog } from "./ConfirmDeleteFolderDialog";
import FolderListItem from "./FolderListItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentFolder } from "../../features/folderSlice";
import {
  addFolderToDb,
  createSerializableCurrentFolder,
  IFolder,
} from "../../db";
import {
  selectDirectoryOnUsersFileSystem,
  recursivelyScanLocalDrive,
} from "../../utils";

interface IProps {
  allFolders: IFolder[] | undefined;
}

const Folders = ({ allFolders }: IProps) => {
  const storeCurrentFolder = useAppSelector(
    (state) => state.folderReducer.currentFolder
  );
  const dispatch = useAppDispatch();
  // console.log("storeCurrentFolder", storeCurrentFolder?.id);

  async function selectFolder(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const folder = await selectDirectoryOnUsersFileSystem();

    if (folder) {
      const rootFolder = await recursivelyScanLocalDrive(
        folder.handle,
        folder.name,
        true
      );
      if (rootFolder) {
        dispatch(
          setCurrentFolder(createSerializableCurrentFolder(rootFolder.object))
        );
      }
    }
  }

  return (
    <div className="page">
      {/* Dialog */}
      <ConfirmDeleteFolderDialog folder={storeCurrentFolder} />
      {/*   */}
      <header className="aside__header">
        <button className="btn" onClick={(e) => selectFolder(e)}>
          <RiAddLine className="font-size--l" />
          <span className="font-size--m"> Add Folder</span>
        </button>
      </header>
      {/* this is section with the folder list */}
      <div className="aside">
        <RootList folders={allFolders}/>
        {/* <ul className="aside__list folder__list">
          {allFolders &&
            allFolders.map((folder) => (
              <FolderListItem key={folder.id} folder={folder} />
            ))}
        </ul> */}
        <FolderDetails folder={storeCurrentFolder} />
      </div>

      {/* display the results of the project selected. */}
      {storeCurrentFolder && <ModelList folderId={storeCurrentFolder.id} />}
    </div>
  );
};

export default Folders;
