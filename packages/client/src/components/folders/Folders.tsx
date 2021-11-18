import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import "./folders.css";
import { RiAddLine } from "react-icons/ri";
import { db, IFolder } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";
// import useMeasure from "react-use-measure";
import { Outlet, NavLink } from "react-router-dom";
import ModelList from "../modelList/ModelList";


const Folders = () => {
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);
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
          setSelectedFolder(folder);

          
        } catch (error) {
          console.log(`Error saving folder: ${error}`);
        }
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  const removeFolder = async (folder: IFolder) => {
    try {
      if (folder.id) {
        await db.folders.delete(folder.id);
      }
    } catch (error) {
      console.log(`Error deleting Known folder: ${folder.name}`);
    }
  };
  const removeAllFolders = async () => {
    //TODO remove All folder from db.
  };

  return (
    <div className="page">
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
                click={setSelectedFolder}
              />
            ))}
        </ul>
        <div className="aside__details">
          <ul>
            <li>{selectedFolder?.filePath || selectedFolder?.handle.keys.length}</li>
            <li>{selectedFolder?.id}</li>
            <li>{selectedFolder?.created.toLocaleDateString()}</li>
            {/* <li>fff {selectedFolder?getFolderPermissions(selectedFolder):'null'}</li> */}
          </ul>
        </div>
      </div>

      {/* display the results of the project selected. */}
      {/* <Outlet /> */}
      <ModelList folder={selectedFolder} />
    </div>
  );
};

export default Folders;

type Props = {
  folder: IFolder;
  // Todo: not good! any...
  click: Dispatch<SetStateAction<IFolder | null>>;
};

const FolderListItem = ({ folder, click }: Props) => {
  const [permission, setPermission] = useState<string>();

  useEffect(() => {
    folder.handle.queryPermission().then((res) => setPermission(res));
  }, [folder]);
  return (
    <li className="folder__item" onClick={() => click(folder)}>
      <NavLink
        className={`folder__link permission--${permission}`}
        to={`/folders/${folder.id}`}
      >
        {folder.name}
        {permission}
      </NavLink>
    </li>
  );
};
