import { useState, useEffect } from "react";
import StlCard from "../stlCard/StlCard";
import { IFolder, IFile, FileTypes } from "../../db/db";
import './modelList.css'
import useMeasure from 'react-use-measure'


type Props = {
  folder: IFolder | null;
};

const ModelList = ({ folder }: Props) => {
  if (!folder) return <></>;
  const [allFiles, setAllFiles] = useState<IFile[]>([]);
  const [currentPageFiles, setCurrentPageFiles] = useState<IFile[]>([]);
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(4);

  const [ref, bounds] = useMeasure();

  // console.log("folder name", folder?.name);
//  console.log('ddddddddddddddddddddddddddd',bounds.width, bounds.height);
  const filterFiles = async () => {
    if (!folder) return;
    let filteredFiles = [];
    for await (const entry of folder.handle.values()) {
      if (entry.kind === "file" && entry.name.endsWith(".stl")) {
        const fileHandle = await folder.handle.getFileHandle(entry.name);

        const file = await fileHandle.getFile();
        const url = URL.createObjectURL(file);
        // console.log(entry.name, url);
        const newFile: IFile = {
          created: new Date(file.lastModified),
          folderId: 0,
          handle: fileHandle,
          name: file.name,
          printed: false,
          size: file.size,
          type: FileTypes.STL,
          updated: new Date(file.lastModified),
          description: "",
          imageUrl: url,
          projectId: [folder.id || 0],
        };
        // setAllFiles((old) => [...old, newFile]);
        filteredFiles.push(newFile);
      }
    }
    setAllFiles(filteredFiles);
    // console.log("all files filtered...", "total files:", filteredFiles.length);
    return filteredFiles;
  };

  enum SortBy {
    "ASC",
    "DESC",
  }
  /**
   * pagination forwards
   * @param offset
   * @param filesToPaginate
   * @param page
  //  * @param limit
  //  * @param sort
  //  * @param filters
   */
  const pagination = (
    offset: number = 0,
    // you will need to pass in filesToPaginate on the initial mount
    // otherwise allFiles will be empty
    filesToPaginate: IFile[] = allFiles,
    page: number = cursor + offset
    // limit: number = 4
    // sort: SortBy = SortBy.ASC
    // filters: any
  ) => {
    // // limit can't be zero
    // limit <= 0 ? (limit = 1) : limit;

    // cursor can't be less than zero
    if (page + offset < 0) {
      setCursor(0);
      page = 0;
      //use the ceil function to round up to the nearest whole number
      // to get the total number of pages
    } else if (page >= Math.ceil(filesToPaginate.length / limit)) {
      // pages is zero based so subtract 1
      page = Math.ceil(filesToPaginate.length / limit) - 1;
      console.log("page", page);
    }
    console.log("offset floor", Math.ceil(filesToPaginate.length / limit));
    console.log(
      "pagination",
      "page:",
      page,
      "limit:",
      limit,
      "offSet:",
      offset,
      "total files:",
      filesToPaginate.length
    );

    const pageFiles = filesToPaginate.slice(page * limit, (page + 1) * limit);
    // console.log(JSON.stringify(pageFiles));
    setCurrentPageFiles(pageFiles);
    setCursor(page);
  };

  useEffect(() => {
    console.log("effect");

    (async () => {
      // onMount clear array
      setAllFiles([]);

      const filesList = await filterFiles();

      filesList ? pagination(0, filesList, 0) : null;
    })();
  }, [folder]);

  return (
    <>
     {folder && <Pagination
        paginate={pagination}
        currentPage={cursor + 1}
        totalPages={Math.ceil(allFiles.length / (limit ))}
      />} 
   
      <div className="model-list" ref={ref}>
        {currentPageFiles?.map((file) => (
          <StlCard key={file.imageUrl} fileUrl={file.imageUrl} />
        ))}
      </div>
    </>
  );
};

type PaginationProps = {
  // allFiles: IFile[];
  currentPage: number;
  totalPages: number;
  paginate: (offset: number) => void;
};

export default ModelList;

const Pagination = ({ currentPage, paginate, totalPages }: PaginationProps) => {
  return (
    <div className="pagination">
      <button className="btn pagination__btn" onClick={() => paginate(-1)}>
        Previous
      </button>
      <p className="pagination__txt">
        {currentPage | 0} of {totalPages | 0}
      </p>
      <button className="btn pagination__btn" onClick={() => paginate(1)}>
        next
      </button>
    </div>
  );
};
