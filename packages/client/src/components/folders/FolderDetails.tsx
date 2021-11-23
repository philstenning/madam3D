import React from "react";
import { IFolder } from "../../db/db";

interface IFolderDetailsProps {
  folder: IFolder | null;
}

const FolderDetails = ({ folder }: IFolderDetailsProps) => {
  return (
    <div className="aside__details">
      <div>
        <button>delete</button>
      </div>
    
      <ul>
        <li>{folder?.filePath || folder?.handle.keys.length}</li>
        <li>{folder?.id} one</li>
        <li>{folder?.created.toLocaleDateString()}</li>
      </ul>
    </div>
  );
};

export default FolderDetails;
