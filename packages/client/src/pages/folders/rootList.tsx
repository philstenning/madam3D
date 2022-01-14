import React, { useState, useEffect } from "react";
import { IFolder, createSerializableCurrentFolder } from "../../db";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "../../components/badge/Badge";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setCurrentRootFolder,
  setCurrentFolder,
} from "../../features/folderSlice";
import { haveFolderPermission } from "../../utils/fileSystem";
import FolderListItem from "./FolderListItem";

interface IProps {
  folders: IFolder[] | undefined;
}

const RootList = ({ folders }: IProps) => {
  const [filteredFolders, setFilteredFolders] = useState(folders);

  const storeCurrentRootFolder = useAppSelector(
    (state) => state.folderReducer.currentRootFolder
  );
  const selectedParts = useAppSelector(
    (state) => state.selectedFolderItemsReducer.selectedParts
  );
  const searchText = useAppSelector((state) => state.searchReducer.searchText);
  const dispatch = useAppDispatch();

  // if the search text or folder change, refilter.
  useEffect(() => {
    if (folders) {
      setFilteredFolders(filterFolders(folders, searchText)); 
    }
  }, [searchText, folders]);

  const handleClick = async (folder: IFolder) => {
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

  const subListIsActive = (folder: IFolder) => {
    return storeCurrentRootFolder?.id === folder.rootId ? true : false;
  };
  return (
    <ul className=" accordion__group__list">
      {filteredFolders
        ?.filter((folder) => folder.isRoot)
        .map((folder) => (
          <li
            className="accordion__item"
            onClick={() => handleClick(folder)}
            key={folder.id}
          >
            <NavLink
              className={`accordion__link `}
              to={`/folders/${folder.id}`}
            >
              {folder.name}{" "}
              <span className="flex-end">
                <Badge
                  type={
                    selectedParts.filter((p) => p.rootId === folder.rootId)
                      .length > 0
                      ? "primary"
                      : "secondary"
                  }
                >
                  {filteredFolders.filter((f) => f.rootId === folder.rootId)
                    .length + (folder.parts > 0 ? 0 : -1)}{" "}
                  models
                </Badge>
              </span>
            </NavLink>
            <SubListAccordion
              folders={filteredFolders}
              isActive={subListIsActive(folder)}
              rootFolder={folder}
            />
          </li>
        ))}
    </ul>
  );
};

export default RootList;




  function filterFolders(_folders: IFolder[], _searchText: string) {
    const subFolders = _folders.filter(
      (folder) => folder.name.includes(_searchText) && !folder.isRoot
    );

    // first check it is root folder,
    const rootFolders = _folders
      .filter((folder) => folder.isRoot)
      // then if it search text does not match
      // we set parts to zero to hide in results.
      .map((f) => {
        if (f.name.includes(_searchText)) {
          return { ...f };
        } else {
          return { ...f, parts: 0 };
        }
      })
      // if the entry has no sub folder entries we can now remove it
      .filter(
        (f) =>
          f.parts > 0 ||
          subFolders.filter((sf) => sf.rootId === f.id).length > 0
      );

    // setFilteredFolders([...subFolders, ...rootFolders]);
    return [...subFolders, ...rootFolders];
  }




interface ISubListProps {
  rootFolder: IFolder;
  folders: IFolder[];
  isActive: boolean;
}
const SubListAccordion = ({ rootFolder, folders, isActive }: ISubListProps) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.ul
          style={{
            overflow: "hidden",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
          }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: "tween" }}
          className={`accordion__child-list`}
        >
          {folders
            .filter((f) => f.rootId === rootFolder.rootId)
            .map((folder) => {
              if (folder.parts)
                return <FolderListItem key={uuid()} folder={folder} />;
            })}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
