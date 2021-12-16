import React, { Dispatch, useEffect, useContext, useState } from "react";
import { IFolder, ICurrentFolder } from "../../db";
import { haveFolderPermission } from "../../utils/fileSystem";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentFolder } from "../../features/folderSlice";

type Props = {
  folder: IFolder;
};

const FolderListItem = ({ folder }: Props) => {
  const dispatch = useAppDispatch();
  const [permission, setPermission] = useState<string>();

  useEffect(() => {
    // get the permissions for the folder.
    // and set it in the state.
    // it is used for the css class query.
    folder.handle.queryPermission().then((res) => setPermission(res));
  }, [folder]);

  const handleClick = async () => {
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
      setPermission("granted");
    }
  };

  return (
    <li className="folder__item" onClick={handleClick}>
      <NavLink
        className={`folder__link folder__item--${permission}`}
        to={`/folders/${folder.id}`}
      >
        {folder.name}
      </NavLink>
    </li>
  );
};

export default FolderListItem;
