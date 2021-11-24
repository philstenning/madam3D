import React, { useState, useContext } from "react";
import "./folders.css";
import { RiAddLine } from "react-icons/ri";
import { db, IFolder } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";

import ModelList from "../modelList/ModelList";
import FolderDetails from "./FolderDetails";

import { ConfirmDeleteFolderDialog } from "./ConfirmDeleteFolderDialog";
import FolderListItem from "./FolderListItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Folders = () => {
  const currentFolder = useAppSelector(
    (state) => state.folderReducer.currentFolder
  );
  // const { state, dispatch } = useContext(FolderContext);
  // const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);
  // const [dialog, setDialog] = useState(true);
  const allFolders = useLiveQuery(() =>
    db.folders.orderBy("created").reverse().toArray()
  );

  const openFolderPicker = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const dirHandle = await window.showDirectoryPicker({});

      if (dirHandle.kind === "directory") {
        // create the Folder object to be saved in db.
        const createdAt = new Date();
        const folder: IFolder = {
          handle: dirHandle,
          created: createdAt,
          updated: createdAt,
          name: dirHandle.name,
        };
        try {
          // add folder to local database.
          await db.folders.add(folder);

          // this folder should set to the current folder
          // dispatch({ type: "SET_CURRENT_FOLDER", payload: folder });
        } catch (error) {
          console.log(`Error saving folder: ${error}`);
        }
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  return (
    <div className="page">
      {/* Dialog */}
      <ConfirmDeleteFolderDialog folder={currentFolder} />
      {/*   */}
      <header className="aside__header">
        <button className="btn" onClick={(e) => openFolderPicker(e)}>
          <RiAddLine className="font-size--l" />
          <span className="font-size--m"> Add Folder</span>
        </button>
      </header>
      {/* this is section with the folder list */}
      <div className="aside aside--small">
        <ul className="aside__list folder__list">
          {allFolders &&
            allFolders.map((folder) => (
              <FolderListItem
                key={folder.id}
                folder={folder}
                // click={setSelectedFolder}
              />
            ))}
        </ul>

        {/* <p>ok {currentFolder ? currentFolder.name : "no current folder."}</p> */}
        <FolderDetails folder={currentFolder} />
      </div>

      {/* display the results of the project selected. */}
      {/* <Outlet /> */}
      {currentFolder && <ModelList folder={currentFolder} />}
    </div>
  );
};

export default Folders;
