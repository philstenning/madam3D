import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showDeleteFolderDialog } from "../../features/folderSlice";
import {
  toggleStl,
  toggle3mf,
  toggleGcode,
  setPartFilter,
} from "../../features/settingsSlice";
import { AnimatePresence, motion } from "framer-motion";
import "./folderDetail.css";
import { IFolder } from "../../db";
import Badge from "../../components/badge/Badge";
interface IProps {
  folders: IFolder[] | undefined;
}
const FolderDetails = ({ folders }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const currentFolder = useAppSelector(
    (state) => state.folderReducer.currentFolder
  );
  const selectedParts = useAppSelector(
    (state) => state.selectedFolderItemsReducer.selectedParts
  );

  const dispatch = useAppDispatch();
  if (typeof currentFolder === "undefined") return null;
  const handleDelete = () => {
    if (currentFolder?.id) dispatch(showDeleteFolderDialog());
  };

  function countParts() {
    return selectedParts.filter((sp) => sp.folderId === currentFolder?.id)
      .length;
  }

  return (
    <div className="fd">
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <ul className="fd__list">
        <li>path: {currentFolder?.filePath || currentFolder?.name}</li>
        <li>added: {currentFolder?.created}</li>
        {/* <li>parts: {folders?.filter(f=>f.id === currentFolder?.id)[0].parts}</li> */}
        <li className="flex-start">
          selected:{" "}
          <Badge type={countParts() ? "primary" : "secondary"}>
            {countParts()}
          </Badge>
        </li>
      </ul>
      <button
        role="button"
        className="btn badge"
        onClick={() => setIsVisible(!isVisible)}
      >
        filter
      </button>
      <DetailsFilter isVisible={isVisible} />
    </div>
  );
};

export default FolderDetails;

interface IDetailsProps {
  isVisible: boolean;
}

const DetailsFilter = ({ isVisible }: IDetailsProps) => {
  const settings = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.ul
          style={{ overflow: "hidden" }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "fit-content" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: "tween" }}
          className="fd__more"
        >
          <li>
          <input type="radio" id='all' name='all' value='344' />
          <label htmlFor="all">All</label>

          <input type="radio" id='selected' name='selected' value='534' />
          <label htmlFor="selected">selected</label>

          <input type="radio" id='unselected' name='unselected' value='ok' />
          <label htmlFor="unselected">unselected</label>
          </li>
          <li>
            {" "}
            <label htmlFor="stl">
              .stl{" "}
              <input
                id="stl"
                type="checkbox"
                checked={settings.show.stl}
                onClick={() => dispatch(toggleStl())}
              />
            </label>
          </li>
          <li>
            {" "}
            <label htmlFor="3MF">
              .3MF{" "}
              <input
                id="3MF"
                type="checkbox"
                checked={settings.show.threeMF}
                onClick={() => dispatch(toggle3mf())}
              />{" "}
            </label>
          </li>
          <li>
            {" "}
            <label htmlFor="gcode">
              .gcode{" "}
              <input
                id="gcode"
                type="checkbox"
                checked={settings.show.gcode}
                onClick={() => dispatch(toggleGcode())}
              />{" "}
            </label>
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
