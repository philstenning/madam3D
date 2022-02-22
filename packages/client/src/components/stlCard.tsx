import { useState, useEffect } from "react";
import { FileTypes, IFile } from "../db";
import StlViewer from "./threeViewers/stlViewers";
import ThreeMFViewer from "./threeViewers/ThreeMFViewer";
import GcodeViewer from "./threeViewers/gcodeViewer";

import "./stlCard.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addPart, removePart } from "../features/folderSelectedItems";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  file: IFile;
}

const StlCard = ({ file }: Props) => {
  return (
    <div className="card">
      {file.type === FileTypes.STL && <StlViewer fileUrl={file.imageUrl} />}
      {file.type === FileTypes.THREE_MF && (
        <ThreeMFViewer fileUrl={file.imageUrl} />
      )}
      {file.type === FileTypes.GCODE && <GcodeViewer fileUrl={file.imageUrl} />}

      <Overlay file={file} />
    </div>
  );
};

export default StlCard;

const Overlay = ({ file }: Props) => {
  const [url, setUrl] = useState<string>("");
  const isChecked = useAppSelector(
    (state) =>
      state.selectedFolderItemsReducer.selectedParts.filter(
        (p) => p.id === file.id
      ).length === 1
  );
  const { folderId, id, rootId, name } = file;
  const dispatch = useAppDispatch();

  const toggleChecked = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
    if (isChecked) {
      dispatch(removePart(id));
    } else {
      dispatch(addPart({ id, folderId, rootId }));
    }
    // console.log("clicked");
  };

  useEffect(() => {
    const url = async () => {
      const _file = await file.handle.getFile();
      const _url = URL.createObjectURL(_file);
      setUrl(_url);
    };
    url();
  }, [file]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="card-overlay"
      >
        <label
          htmlFor={`model-selected-ck-${file.id}`}
          className="card-overlay__filename"
        >
          <input
            id={`model-selected-ck-${file.id}`}
            type="checkbox"
            checked={isChecked}
            readOnly
            onClick={(e) => toggleChecked(e)}
          />
          {name}
        </label>
        <a
          href={url}
          download={file.name}
          className="btn card-overlay__open-in-native-app"
        >
          {file.type === FileTypes.GCODE ? "Print" : "Slice"}
        </a>
      </motion.div>
    </AnimatePresence>
  );
};
