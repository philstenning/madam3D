import { useState, useEffect, CSSProperties } from "react";
import StlCard from "./stlCard";
import { IFile, db } from "../db";
import "./modelList.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCursor } from "../features/folderSlice";
import { filterFolderFiles } from "../utils";
import { v4 as uuid } from "uuid";
import Pagination, { paginate, sliceFiles } from "./Pagination";
import useMeasure from "react-use-measure";

function calculateVariables(): {
  style: { "--model-list-columns": number; "--model-list-rows": number };
  listQuantity: number;
} {
  const { innerHeight, innerWidth } = window;
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const calculatedWidth = Math.floor(innerWidth - 19.6 * rem);
  const calculatedHeight = Math.floor(innerHeight - 8 * rem);
  // console.log("width", calculatedWidth, innerWidth);
  const heightMultiplier = calculatedHeight > 490 ? 2 : 1;
  let style = {
    "--model-list-columns": 4,
    "--model-list-rows": heightMultiplier,
  };
  let listQuantity = 2;
  if (calculatedWidth > 950) {
    listQuantity = 3 * heightMultiplier;

    style["--model-list-columns"] = 3;
  } else if (calculatedWidth > 500) {
    listQuantity = 2 * heightMultiplier;

    style["--model-list-columns"] = 2;
  } else if (calculatedWidth < 500) {
    listQuantity = 1 * heightMultiplier;
    style["--model-list-columns"] = 1;
  }

  return {
    style,
    listQuantity,
  };
}

const ModelList = () => {
  const { cursor, currentFolder } = useAppSelector(
    (state) => state.folderReducer
  );

  const folderId = currentFolder?.id;
  const dispatch = useAppDispatch();
  // all files in the current folder
  const [allFiles, setAllFiles] = useState<IFile[]>([]);

  // the files in the current paginated page
  const [currentPageFiles, setCurrentPageFiles] = useState<IFile[]>([]);
  // limit is used to paginate the files
  const [limit, setLimit] = useState(4);
// used to inject the style into the modelList div.
  const [listStyle, setListStyle] = useState<CSSProperties>();

  const [ref, { width, height }] = useMeasure();
  /**
   * when the veiwport changes dimensions, we need to recalculate the
   * quantity of model items on view, this also need a css variable to
   * be  updated.
   */
  useEffect(() => {
    // filter the displayed files  when the cursor,height or width changes
    const { listQuantity, style } = calculateVariables();
    setListStyle(style as CSSProperties);
    setLimit(listQuantity);
    const pageFiles = sliceFiles(allFiles, cursor, listQuantity);
    setCurrentPageFiles(pageFiles);
  }, [cursor, width, height]);

  useEffect(() => {
    const { listQuantity } = calculateVariables();
    // get all files in the current folder when the folderId changes.
    (async () => {
      // we need to wrap in this if block, folderId might not exist,
      // and will throw a key error.
      if (folderId) {
        const _current_folder = await db.folders
          .where({ id: folderId })
          .first();
        if (!_current_folder) return;
        const _filteredFiles = await filterFolderFiles(_current_folder);
        // if we have a fileList, calculate the
        // number of pages for pagination
        if (_filteredFiles) {
          setAllFiles(_filteredFiles);
          const { newCursor: _newCursor } = paginate(
            _filteredFiles.length,
            0,
            0,
            listQuantity
          );
          const _pageFiles = sliceFiles(
            _filteredFiles,
            _newCursor,
            listQuantity
          );
          setCurrentPageFiles(_pageFiles);
          dispatch(setCursor(0));
        } else {
          // onMount clear array
          setAllFiles([]);
        }
      }
    })();
  }, [folderId]);

  return (
    <>
      {folderId && <Pagination countOfFiles={allFiles.length} limit={limit} />}

      {folderId && (
        <div ref={ref} style={listStyle} className="model-list">
          {currentPageFiles?.map((file) => (
            <StlCard key={uuid()} file={file} />
          ))}
        </div>
      )}
    </>
  );
};

export default ModelList;
