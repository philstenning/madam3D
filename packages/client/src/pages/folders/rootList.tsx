import React, {useState, useEffect} from "react";
import { IFolder, createSerializableCurrentFolder } from "../../db";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "../../components/badge/Badge";
import { v4 as uuid } from "uuid";
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
  const [filteredFolders,setFilteredFolders] = useState(folders)

  const storeCurrentRootFolder = useAppSelector(
    (state) => state.folderReducer.currentRootFolder
  );
  const selectedParts = useAppSelector(
    (state) => state.selectedFolderItemsReducer.selectedParts
  );


  useEffect(() => {
   setFilteredFolders(folders)
  }, [folders])

  // console.clear()
  const searchText = useAppSelector((state) => state.searchReducer.searchText);
  
  if (searchText.length > 3 && folders) {
    console.log(searchText);
   
    const rootFolders = folders.filter((folder) => folder.isRoot);

    const subFolders = folders.filter((folder) =>
    folder.name.includes(searchText)
    );
    
    let tempRoot: IFolder[] = [];
   
    subFolders?.forEach((folder) => {
      rootFolders?.forEach((rootFolder) => {
        if (rootFolder.id === folder.rootId) {
          // we need to remove this folder from the displayed folders 
          // if is name does not match the search text so we set the 
          // parts to zero.
          if (!rootFolder.name.includes(searchText)){
            
            // rootFolder.parts = 0;
          } 
          let t =[...tempRoot,{...rootFolder,parts:0}]
      //  if (!rootFolder.name.includes(searchText)){

      //    tempRoot.push(rootFolder );
      //  }
      //  else{
      //    tempRoot.push(rootFolder)
      //  }
          // remove duplicate entries.
          tempRoot = [...new Set(t)];
        }
      });
    });
    const fff = [...subFolders, ...tempRoot];
    // folders = [...new Set(folders)];
    setFilteredFolders([...new Set(fff)])
    // if(tempRoot)folders = []
    folders?.forEach((f, idx) =>
      console.log(idx + 1, " name: ", f.name, f.rootId)
    );
    console.log("root folders");
    rootFolders?.forEach((f, idx) =>
      console.log(idx + 1, " name: ", f.name, f.id)
    );

    console.log("/////// temp root folders");
    tempRoot?.forEach((f, idx) =>
      console.log(idx + 1, " name: ", f.name, f.id)
    );
  }

  const dispatch = useAppDispatch();

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
                  {
                    filteredFolders.filter((f) => f.rootId === folder.rootId)
                      .length
                  }{" "}
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
