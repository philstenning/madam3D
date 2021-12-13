import React, { useState, useEffect } from "react";
import "./folders.css";
import { RiAddLine } from "react-icons/ri";
import { db, ICurrentFolder, IFolder, IFolderCreate } from "../../db/db";
// import { useLiveQuery } from "dexie-react-hooks";

import ModelList from "../modelList/ModelList";
import FolderDetails from "./FolderDetails";

import { ConfirmDeleteFolderDialog } from "./ConfirmDeleteFolderDialog";
import FolderListItem from "./FolderListItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentFolder } from "../../features/folderSlice";

interface IProps{
  allFolders:IFolder[]|undefined
}


const Folders = ({allFolders}:IProps) => {
  // const [currentFolder, setCurrentFolder] = useState<IFolder | null>(null);
  const storeCurrentFolder = useAppSelector(
    (state) => state.folderReducer.currentFolder
  );
  const dispatch = useAppDispatch();
  // const allFolders = useLiveQuery(() =>
  //   db.folders.orderBy("created").reverse().toArray()
  // );
  console.log("storeCurrentFolder", storeCurrentFolder?.id);


  // useEffect(() => {
 
  //   const res = allFolders?.find((d) => d.id === storeCurrentFolder?.id);
  //   if (res) {
  //     setCurrentFolder(res);
  //   }
  // }, [storeCurrentFolder]);

  const openFolderPicker = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const dirHandle = await window.showDirectoryPicker({});

      if (dirHandle.kind === "directory") {
        // create the Folder object to be saved in db.
        const createdAt = new Date();

        // 
        const folder: IFolderCreate = {
          handle: dirHandle,
          created: createdAt,
          updated: createdAt,
          name: dirHandle.name,
        };
        try {
          // add folder to local database.
         const folderId= await db.folders.add(folder as IFolder);
          //  dispatch()
          // this folder should set to the current folder
          if(folderId>0){
            // we need a object to create the currently selected folder.
            const createCurrentFolder:ICurrentFolder = {
              id: folderId,
              name: dirHandle.name,
              created: createdAt.toLocaleString(),
              updated: createdAt.toLocaleString(),
              
          }
          dispatch(setCurrentFolder(createCurrentFolder));

          }

          // dispatch({ type: "SET_CURRENT_FOLDER", payload: folderId });
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
      <ConfirmDeleteFolderDialog folder={storeCurrentFolder} />
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
        <FolderDetails folder={storeCurrentFolder} />
      </div>

      {/* display the results of the project selected. */}
      {/* <Outlet /> */}
      {storeCurrentFolder && <ModelList folderId={storeCurrentFolder.id} />}
    </div>
  );
};

export default Folders;
