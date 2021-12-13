import { useState, useEffect } from "react";
import StlCard from "../stlCard/StlCard";
import { IFolder, IFile, FileTypes, db } from "../../db/db";
import "./modelList.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCursor } from "../../features/folderSlice";
import { v4 as uuidv4 } from "uuid";
// import { useLiveQuery } from "dexie-react-hooks";


type Props = {
  folderId: number;
};

const ModelList = ({ folderId }: Props) => {
  // console.log('folderId',folderId);
  // if (folderId > 0) return <></>;
  const [folder,setFolder] = useState<IFolder | null>(null)

  const cursor = useAppSelector((state) => state.folderReducer.cursor);
  const dispatch = useAppDispatch();
  const [allFiles, setAllFiles] = useState<IFile[]>([]);
  const [currentPageFiles, setCurrentPageFiles] = useState<IFile[]>([]);
  // const folder = useLiveQuery(() =>
  //   db.folders.where({id:folderId}).first()
  // );

 
  const [limit, setLimit] = useState(4);

  // const [ref, bounds] = useMeasure();

  const filterFiles = async (folder:IFolder) => {
    
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
        id: uuidv4(),
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
        projectId: [folderId ],
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
  console.log("page modelList cursor", cursor);

  useEffect(() => {
    

    (async () => {
      // const f= async()=>{
      const c_folder = await db.folders.where({id:folderId}).first()
      if(!c_folder)return
      const filteredFiles = await filterFiles(c_folder);
      // if we have a fileList calculate the
      // number of pages for pagination
      if (filteredFiles) {
        // console.log(
        //   "effect vvvvvvvvvvvvv",
        //   filteredFiles.length,
        //   " ",
        //   allFiles.length
        // );
        setAllFiles(filteredFiles);
        pagination(0, 0, filteredFiles);
      } else {
        // onMount clear array
        setAllFiles([]);
      }
    })();
  }, [folderId]);

  return (
    <>
      {folderId && (
        <Pagination
          paginate={pagination}
          currentPage={cursor}
          totalPages={Math.ceil(allFiles.length / limit)}
        />
      )}

      <div className="model-list">
        {currentPageFiles?.map((file) => (
          <StlCard key={file.imageUrl} file={file} />
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
