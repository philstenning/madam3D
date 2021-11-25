import { useState, useEffect } from "react";
import StlCard from "../stlCard/StlCard";
import { IFolder, IFile, FileTypes } from "../../db/db";
import "./modelList.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCursor } from "../../features/folderSlice";

type Props = {
  folder: IFolder | null;
};

const ModelList = ({ folder }: Props) => {
  if (!folder) return <></>;
  const cursor = useAppSelector((state) => state.folderReducer.cursor);
  const dispatch = useAppDispatch();
  const [allFiles, setAllFiles] = useState<IFile[]>([]);
  const [currentPageFiles, setCurrentPageFiles] = useState<IFile[]>([]);

  const [limit, setLimit] = useState(4);

  // const [ref, bounds] = useMeasure();

  const filterFiles = async () => {
    if (!folder) return;
    // create a new array to hold the files from the for loop.
    let filteredFiles = [];
    for await (const entry of folder.handle.values()) {
      //
      if (entry.kind === "file" && entry.name.endsWith(".stl")) {
        const fileHandle = await folder.handle.getFileHandle(entry.name);

        const file = await fileHandle.getFile();
        const url = URL.createObjectURL(file);
        // console.log(entry.name, url);
        const newFile: IFile = createFile(file, fileHandle, url);

        filteredFiles.push(newFile);
      }
    }

    return filteredFiles;
    /**
     *
     * @param file
     * @param fileHandle
     * @param url
     * @returns IFile
     */
    function createFile(
      file: File,
      fileHandle: FileSystemFileHandle,
      url: string
    ): IFile {
      return {
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
        projectId: [folder?.id || 0],
      };
    }
  };



  const pagination = (
    // positive offset is for next page/pages
    // negative offset is for previous page/pages
    // 0 offset is for current page
    offset = 1,

    // current cursor/page number
    cursor: number = 0,
    // you will need to pass in filesToPaginate on the initial mount
    // otherwise allFiles will be empty
    filesToPaginate: IFile[] = allFiles
  ) => {
    let page = cursor + offset;
    // cursor can't be less than zero
    if (page + offset < 0) {
      dispatch(setCursor(0));
      page = 0;
      //use the ceil function to round up to the nearest whole number
      // to get the total number of pages
    } else if (page >= Math.ceil(filesToPaginate.length / limit)) {
      // pages is zero based so subtract 1
      page = Math.ceil(filesToPaginate.length / limit) - 1;
      console.log("page", page);
    }
    // slice the array to get the current page
    const pageFiles = filesToPaginate.slice(page * limit, (page + 1) * limit);

    setCurrentPageFiles(pageFiles);
    dispatch(setCursor(page));
  };
  console.log("page molellist", cursor);


  useEffect(() => {
    console.log("effect gggg");
    
    (async () => {
      // onMount clear array
      setAllFiles([]);
      
      // const f= async()=>{

      const filteredFiles = await filterFiles();
      // if we have a fileList calculate the
      // number of pages for pagination
      if (filteredFiles) {
        console.log("effect vvvvvvvvvvvvv", filterFiles.length, ' ' ,allFiles.length);
        setAllFiles(filteredFiles);
        pagination(0,0);
      }
    // }
      // f();

      // filteredFiles ? pagination(0, filteredFiles, 0) : null;
    })();
  }, [folder]);

  return (
    <>
      {folder && (
        <Pagination
          paginate={pagination}
          currentPage={cursor }
          totalPages={Math.ceil(allFiles.length / limit)}
        />
      )}

      <div className="model-list">
        {currentPageFiles?.map((file) => (
          <StlCard key={file.imageUrl} fileUrl={file.imageUrl} />
        ))}
      </div>
    </>
  );
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: (offset: number, cursor: number) => void;
};

export default ModelList;

const Pagination = ({ currentPage, paginate, totalPages }: PaginationProps) => {
  return (
    <div className="pagination">
      <button
        className="btn pagination__btn"
        onClick={() => paginate(-1, currentPage)}
      >
        Previous
      </button>
      <p className="pagination__txt">
        {(currentPage + 1) | 0} of {totalPages | 0}
      </p>
      <button
        className="btn pagination__btn"
        onClick={() => paginate(1, currentPage)}
      >
        next
      </button>
    </div>
  );
};
