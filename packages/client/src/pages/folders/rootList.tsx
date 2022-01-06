import React, { useState } from "react";
import { IFolder, ICurrentFolder } from "../../db";
import { NavLink } from "react-router-dom";
interface IProps {
  folders: IFolder[] | undefined;
}
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentRootFolder } from "../../features/folderSlice";
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
      e.stopPropagation()
      e.preventDefault()
    // if we don't have permission to read the folder,
    // we need to show the permission dialog and get permission.
    const permState = await haveFolderPermission(folder.handle);
    // if we have permission, we can set the folder as the current folder.
    if (folder.id === storeCurrentRootFolder?.id) {
      dispatch(setCurrentRootFolder(null));
      return
    }

    if (permState) {
      const currentFolder: ICurrentFolder = {
        created: folder.created.toDateString(),
        id: folder.id,
        name: folder.name,
        updated: folder.updated.toDateString(),
        filePath: folder.filePath,
      };
      dispatch(setCurrentRootFolder(currentFolder));
    }
  };
  const subListIsActive = (folder: IFolder) => {
   return storeCurrentRootFolder?.id === folder.rootId
      ? "folder-sub-list--active"
      : "";
  };
  return (
    <nav className="folder__group">
      <ul className="aside__list folder__group__list">
        {folders
          ?.filter((folder) => folder.isRoot)
          .map((folder) => (
            <li className="folder__item" onClick={(e) => handleClick(folder ,e)}>
              <NavLink className={`folder__link `} to={`/folders/${folder.id}`}>
                {folder.name}{" "}
                <span className="badge badge__link">
                  {folders.filter((f) => f.rootId === folder.rootId).length}{" "}
                  models
                </span>
              </NavLink>
              <ul
                className={`folder-sub-list ${
                  storeCurrentRootFolder?.id === folder.rootId
                    ? "folder-sub-list--active"
                    : ""
                }`}
              >
                {folders
                  .filter((f) => f.rootId === folder.rootId)
                  .map((f) => (
                    <FolderListItem key={folder.id} folder={f} />
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default RootList;
