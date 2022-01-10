import { useState, useEffect } from "react";
import { IFile } from "../../db";
import StlViewer from "../stlViewer/StlViewer";
import "./stlCard.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPart, removePart } from "../../features/folderSelectedItems";
interface Props {
  file: IFile;
  // file: FileSystemHandle;
}

const StlCard = ({ file }: Props) => {
  // add overlay for checkbox if selected

  return (
    <div className="card">
      <StlViewer fileUrl={file.imageUrl} />
      <Overlay file={file} />
    </div>
  );
};

export default StlCard;

// const handleCheckbox = () => {
//   setChecked(!checked);}

const Overlay = ({ file }: Props) => {
  const isChecked = useAppSelector((state) =>
    state.selectedFolderItemsReducer.selectedParts.filter(p=>p.id===file.id).length===1
  );
  const dispatch = useAppDispatch(); 

  const toggleChecked = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isChecked) {
      dispatch(removePart(file.id));
    } else {
      dispatch(addPart({id:file.id,folderId:file.folderId}));
    }
    console.log('clicked')
  };

  return (
    <div className="card-overlay" onClick={(e) => toggleChecked(e)}>
      <div className="overlay-content">
      <p className="card-filename">{file.name}</p>
        <div className="overlay-checkbox">
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
