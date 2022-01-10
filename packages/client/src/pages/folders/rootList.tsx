import React, { useState } from "react";
import { IFolder, createSerializableCurrentFolder } from "../../db";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
interface IProps {
  folders: IFolder[] | undefined;
}
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setCurrentRootFolder,
  setCurrentFolder,
} from "../../features/folderSlice";
import { haveFolderPermission } from "../../utils/fileSystem";
import FolderListItem from "./FolderListItem";

const RootList = ({ folders }: IProps) => {
  const storeCurrentRootFolder = useAppSelector(
    (state) => state.folderReducer.currentRootFolder
  );
  // const [isActive,setIsActive] = useState()
  const dispatch = useAppDispatch();

  const handleClick = async (
    folder: IFolder,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    // e.stopPropagation();
    // e.preventDefault();

    // if folder is already active then close it and set to null
    if (folder.id === storeCurrentRootFolder?.id) {
      dispatch(setCurrentRootFolder(null));
      dispatch(setCurrentFolder(null));
      return;
    }

    // if we don't have permission to read the folder,
    // we need to show the permission dialog and get permission.
    const folderHasPermission = await haveFolderPermission(folder.handle);

    // if we have permission, we can set the folder as the current root folder.
    if (folderHasPermission) {
      const currentFolder = createSerializableCurrentFolder(folder);
      dispatch(setCurrentRootFolder(currentFolder));
      dispatch(setCurrentFolder(currentFolder));
    }
  };

  // const subListIsActive = (folder: IFolder) => {
  //   return storeCurrentRootFolder?.id === folder.rootId
  //     ? "folder-sub-list--active"
  //     : "";
  // };
  const subListIsActive = (folder: IFolder) => {
    return storeCurrentRootFolder?.id === folder.rootId
      ? true
      : false;
  };
  return (
    <nav className="folder__group">
      <ul className="aside__list folder__group__list">
        {folders
          ?.filter((folder) => folder.isRoot)
          .map((folder) => (
            <li
              className="folder__item"
              onClick={(e) => handleClick(folder, e)}
              key={folder.id}
            >
              <NavLink className={`folder__link `} to={`/folders/${folder.id}`}>
                {folder.name}{" "}
                <div className="badge">
                  <span className="badge__link">
                    {folders.filter((f) => f.rootId === folder.rootId).length}{" "}
                    <span className="badge__text--small">models</span>
                  </span>
                </div>
              </NavLink>
              <SubListAccordion
                folders={folders}
                isActive={subListIsActive(folder)}
                rootFolder={folder}
              />
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default RootList;

interface ISubListProps{
  rootFolder:IFolder,
  folders:IFolder[],
  isActive:boolean
}
const  SubListAccordion =({rootFolder,folders , isActive}:ISubListProps)=>{

  return (
          <AnimatePresence>
              { isActive && (<motion.ul
                  style={{ overflow: "hidden", display:'flex',gap:'0.5rem', flexDirection:'column' }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{type:'tween' }}
                  className={`folder-sub-list`}
                >
                  {folders
                    .filter((f) => f.rootId === rootFolder.rootId)
                    .map((f,i) => (
                      // Add the index i to prevent key collision
                      <FolderListItem key={`${rootFolder.id}${i}`} folder={f} />
                    ))}
                </motion.ul>)}
              </AnimatePresence>
  )

}                