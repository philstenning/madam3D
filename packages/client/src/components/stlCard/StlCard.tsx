import { useState, useEffect } from "react";
import { IFile } from "../../db";
import StlViewer from "../stlViewer/StlViewer";
import "./stlCard.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addItem, removeItem } from "../../features/folderSelectedItems";
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
    state.selectedFolderItemsReducer.selectedItems.includes(file.id)
  );
  const dispatch = useAppDispatch(); 

  const toggleChecked = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isChecked) {
      dispatch(removeItem(file.id));
    } else {
      dispatch(addItem(file.id));
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
