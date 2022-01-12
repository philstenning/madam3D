import React from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showDeleteFolderDialog } from "../../features/folderSlice";
import {
  toggleStl,
  toggle3mf,
  toggleGcode,
  setPartFilter,
  PartsFilter,
  toggleSettingsDetails
} from "../../features/settingsSlice";
import { AnimatePresence, motion } from "framer-motion";
import "./folderDetail.css";
import { IFolder } from "../../db";
import Badge from "../../components/badge/Badge";
interface IProps {
  folders: IFolder[] | undefined;
}
const FolderDetails = ({ folders }: IProps) => {

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
        onClick={() => dispatch(toggleSettingsDetails())}
      >
        filter
      </button>
      <DetailsFilter  />
    </div>
  );
};

export default FolderDetails;



const DetailsFilter = () => {
  const settings = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();

  function handleClick(
    e: React.MouseEvent<HTMLInputElement>,
    selected: PartsFilter
  ) {
    e.stopPropagation();
    dispatch(setPartFilter(selected));
  }
  return (
    <AnimatePresence>
      {settings.folder.settingDetailsIsOpen && (
        <motion.ul
          style={{ overflow: "hidden" }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "fit-content" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: "tween" }}
          className="fd__more"
        >
          <li className="flex flex-column">
            <div>
              <label className="pr-0" htmlFor="all">
                all files
              </label>
              <input
                onClick={(e) => handleClick(e, "allFiles")}
                type="radio"
                id="all"
                name="selected"
                value="all"
                checked={settings.partsFilter === "allFiles"}
              />
            </div>
            <div>
              <label className="pr-0" htmlFor="selected">
                selected files only
              </label>
              <input
                type="radio"
                id="selected"
                name="selected"
                value="selected"
                checked={settings.partsFilter === "selectedFiles"}
                onClick={(e) => handleClick(e, "selectedFiles")}
              />
            </div>
            <div>
              <label className="pr-0" htmlFor="unselected">
                unselected files only
              </label>
              <input
                onClick={(e) => handleClick(e, "unSelectedFiles")}
                type="radio"
                id="unselected"
                name="selected"
                value="unselected"
                checked={settings.partsFilter === "unSelectedFiles"}
              />
            </div>
          </li>
          <li>
            {" "}
            <label className="pr-0" htmlFor="stl">
              .stl{" "}
            </label>
            <input
              id="stl"
              type="checkbox"
              checked={settings.show.stl}
              onClick={() => dispatch(toggleStl())}
            />
          </li>
          <li>
            {" "}
            <label className="pr-0" htmlFor="3MF">
              .3MF{" "}
            </label>
            <input
              id="3MF"
              type="checkbox"
              checked={settings.show.threeMF}
              onClick={() => dispatch(toggle3mf())}
            />{" "}
          </li>
          <li>
            {" "}
            <label className="pr-0" htmlFor="gcode">
              .gcode{" "}
            </label>
            <input
              id="gcode"
              type="checkbox"
              checked={settings.show.gcode}
              onClick={() => dispatch(toggleGcode())}
            />{" "}
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
