import { useState, useEffect } from "react";
import { FileTypes, IFile } from "../../db";
import StlViewer from "../stlViewer/StlViewer";
import ThreeMFViewer from "../threeMFViewer/ThreeMFViewer";
import "./stlCard.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPart, removePart } from "../../features/folderSelectedItems";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  file: IFile;
}

const StlCard = ({ file }: Props) => {
  return (
    <div className="card">

    { file.type===FileTypes.STL && <StlViewer fileUrl={file.imageUrl} />}  
    { file.type===FileTypes.THREE_MF && <ThreeMFViewer fileUrl={file.imageUrl} />}  
      <Overlay file={file} />
    </div>
  );
};

export default StlCard;

// const handleCheckbox = () => {
//   setChecked(!checked);}

const Overlay = ({ file }: Props) => {
  const isChecked = useAppSelector(
    (state) =>
      state.selectedFolderItemsReducer.selectedParts.filter(
        (p) => p.id === file.id
      ).length === 1
  );
  const { folderId, id, rootId, name } = file;
  const dispatch = useAppDispatch();

  const toggleChecked = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isChecked) {
      dispatch(removePart(id));
    } else {
      dispatch(addPart({ id, folderId, rootId }));
    }
    // console.log("clicked");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        className="card-overlay"
        onClick={(e) => toggleChecked(e)}
      >
        <div className="overlay-content">
          <p className="card-filename">{name}</p>
          <div className="overlay-checkbox">
            <input type="checkbox" checked={isChecked} readOnly />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
