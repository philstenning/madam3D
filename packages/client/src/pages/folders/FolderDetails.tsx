// import React from "react";
import { ICurrentFolder } from "../../db/db";
import { useAppDispatch } from "../../app/hooks";
import { showDeleteFolderDialog } from "../../features/folderSlice";
interface IFolderDetailsProps {
  folder: ICurrentFolder | null;
}

const FolderDetails = ({ folder }: IFolderDetailsProps) => {
  const dispatch = useAppDispatch();
  if (typeof folder === "undefined") return null;
  const handleDelete = () => {
    if (folder?.id) dispatch(showDeleteFolderDialog());
  };
  return (
    <div className="aside__details">
      <div>
        <button onClick={handleDelete}>delete</button>
      </div>

      <ul>
        <li>{folder?.filePath || folder?.name}</li>
        <li>{folder?.id} one</li>
        <li>{folder?.created}</li>
      </ul>
    </div>
  );
};

export default FolderDetails;
