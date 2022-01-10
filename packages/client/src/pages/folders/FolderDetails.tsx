// import React from "react";

import { useAppDispatch ,useAppSelector} from "../../app/hooks";
import { showDeleteFolderDialog } from "../../features/folderSlice";
import './folderDetail.css'

const FolderDetails = () => {
   const currentFolder = useAppSelector((state) => state.folderReducer.currentFolder);
  const dispatch = useAppDispatch();
  if (typeof currentFolder === "undefined") return null;
  const handleDelete = () => {
    if (currentFolder?.id) dispatch(showDeleteFolderDialog());
  };
  return (
    <div className="fd">
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <ul className="fd__list">
        <li>{currentFolder?.filePath || currentFolder?.name}</li>
        {/* <li>{currentFolder?.id} one</li> */}
        <li>{currentFolder?.created}</li>
      </ul>
    </div>
  );
};

export default FolderDetails;
