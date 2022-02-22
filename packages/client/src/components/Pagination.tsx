import React from "react";
import { IFile } from "../db";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCursor } from "../features/folderSlice";
type PaginationProps = {
  countOfFiles: number;
  limit: number;
};

export function paginate(
  // total number of files
  countOfFiles: number,
  // positive offset is for next page/pages
  // negative offset is for previous page/pages
  // 0 offset is for current page
  // default offset is 1 (next page)
  offset = 1,

  // current cursor/selection we are on
  cursor: number = 0,
  // the paging limit
  limit = 4
) {
  // cursor must be zero or greater
  let newCursor = cursor + offset > 0 ? cursor + offset : 0;
  //use the ceil function to round up to the nearest whole number
  // to get the total number of pages
  const pageCount = Math.ceil(countOfFiles / limit);

  if (newCursor >= pageCount) {
    // pages is zero based so subtract 1
    newCursor = pageCount - 1;
  }
  return { newCursor };
}
export function sliceFiles(
  filesToPaginate: IFile[],
  cursor: number,
  limit: number
) {
  const pageCount = Math.ceil(filesToPaginate.length / limit);
  if (pageCount === cursor) --cursor;
  return filesToPaginate.slice(cursor * limit, (cursor + 1) * limit);
}

const Pagination = ({ countOfFiles, limit }: PaginationProps) => {
  const cursor = useAppSelector((state) => state.folderReducer.cursor);
  const dispatch = useAppDispatch();
  const pageCount = Math.ceil(countOfFiles / limit);

  const handlePaginate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    offset: number
  ) => {
    e.preventDefault();
    const { newCursor } = paginate(countOfFiles, offset, cursor, limit);
    console.log("cursor", cursor, "newCursor", newCursor);
    dispatch(setCursor(newCursor));
  };

  return (
    <div className="pagination">
      <button
        type="button"
        className="btn pagination__btn"
        onClick={(e) => handlePaginate(e, -1)}
        disabled={cursor === 0}
      >
        Previous
      </button>
      <p className="pagination__txt">
        {(cursor + 1) | 0} of {pageCount}
      </p>
      <button
        type="button"
        className="btn pagination__btn"
        onClick={(e) => handlePaginate(e, 1)}
        disabled={cursor === pageCount - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

