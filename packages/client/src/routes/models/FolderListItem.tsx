import React, { Dispatch, useEffect, useContext, useState } from "react";
import { IFolder, ICurrentFolder } from "../../db";
import { haveFolderPermission } from "../../utils/fileSystem";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentFolder } from "../../features/folderSlice";
import Badge from '../../components/badge'
type Props = {
  folder: IFolder;
};

const FolderListItem = ({ folder }: Props) => {
  const dispatch = useAppDispatch();
  const parts = useAppSelector(
    (state) => state.selectedFolderItemsReducer.selectedParts
  );

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.stopPropagation();
    // if we don't have permission to read the folder,
    // we need to show the permission dialog and get permission.
    const permState = await haveFolderPermission(folder.handle);
    // if we have permission, we can set the folder as the current folder.
    if (permState) {
      const currentFolder: ICurrentFolder = {
        created: folder.created.toDateString(),
        id: folder.id,
        name: folder.name,
        updated: folder.updated.toDateString(),
        filePath: folder.filePath,
      };
      dispatch(setCurrentFolder(currentFolder));
      // update state
      // setPermission("granted");
    }
  };

  const partsCount = (folderId: string) => {
    return parts.filter((p) => p.folderId === folderId).length;
  };

  const badgeDisplayText=(folder:IFolder)=>{
    // const parts = partsCount(folder.id)
    // if(parts>0){
    //     return `${parts} / ${folder.parts} parts selected`;
    // }
    return `${folder.parts} parts`;
  }
  return (
    <li className="accordion__child-item" onClick={(e) => handleClick(e)}>
      <NavLink
        className={`accordion__link  
       
        accordion__child-link`}
        to={`/folders/${folder.id}`}
      >
        {folder.name}
        <span className="flex-end">
          <Badge type={partsCount(folder.id) > 0 ? "primary" : "secondary"}>
            {badgeDisplayText(folder)} 
          </Badge>
        </span>
        {/* <span >parts: {folder.parts}</span> */}
        {/* <span >path: {folder.filePath}</span> */}
      </NavLink>
    </li>
  );
};

export default FolderListItem;


