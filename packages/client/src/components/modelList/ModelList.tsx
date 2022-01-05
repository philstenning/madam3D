import { useState, useEffect } from "react";
import StlCard from "../stlCard/StlCard";
import { IFolder, IFile, FileTypes, db } from "../../db";
import "./modelList.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCursor } from "../../features/folderSlice";
import { filterFolderFiles, recursivelyScanLocalDrive } from "../../utils";

import Pagination, { paginate, sliceFiles } from "../pagination/Pagination";

type Props = {
  folderId: string;
};

const ModelList = ({ folderId }: Props) => {
  const dispatch = useAppDispatch();
  // all files in the current folder
  const [allFiles, setAllFiles] = useState<IFile[]>([]);

  // the files in the current paginated page
  const [currentPageFiles, setCurrentPageFiles] = useState<IFile[]>([]);
  // cursor and limit are used to paginate the files
  const cursor = useAppSelector((state) => state.folderReducer.cursor);
  const [limit, setLimit] = useState(4);
  // !TODO: fix useMeasure to change the limit

  useEffect(() => {
    // filter the displayed files  when the cursor changes
    const pageFiles = sliceFiles(allFiles, cursor, limit);
    setCurrentPageFiles(pageFiles);
  }, [cursor]);

  useEffect(() => {
    // get all files in the current folder when the folderId changes.
    (async () => {
      const _current_folder = await db.folders.where({ id: folderId }).first();
      if (!_current_folder) return;
      const _filteredFiles = await filterFolderFiles(_current_folder);
      // console.clear();
     
      // if we have a fileList calculate the
      // number of pages for pagination
      if (_filteredFiles) {
        setAllFiles(_filteredFiles);
        const { newCursor: _newCursor } = paginate(
          _filteredFiles.length,
          0,
          0,
          limit
        );
        const _pageFiles = sliceFiles(_filteredFiles, _newCursor, limit);
        setCurrentPageFiles(_pageFiles);
        dispatch(setCursor(0));
      } else {
        // onMount clear array
        setAllFiles([]);
      }
    })();
  }, [folderId]);

  return (
    <>
      {folderId && <Pagination countOfFiles={allFiles.length} limit={limit} />}

      <div className="model-list">
        {currentPageFiles?.map((file) => (
          <StlCard key={file.imageUrl} file={file} />
        ))}
      </div>
    </>
  );
};

export default ModelList;
