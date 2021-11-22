import { useState, useEffect } from "react";
import StlCard from "../stlCard/StlCard";
import { IFolder, IFile, FileTypes } from "../../db/db";

type Props = {
  folder: IFolder | null;
};

const ModelList = ({ folder }: Props) => {
  if (!folder) return <div>empty</div>;
  const [allFiles, setAllFiles] = useState<IFile[]>([]);
  const [currentPageFiles, setCurrentPageFiles] = useState<IFile[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // console.log("folder name", folder?.name);

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
    console.log("all files filtered...", "total files:", filteredFiles.length);
    return filteredFiles;
  };

  enum SortBy {
    "ASC",
    "DESC",
  }
  /**
   * pagination forwards
   * @param filesToPaginate
   * @param page
   * @param limit
   * @param sort
  //  * @param filters
   */
  const pagination = (
    // you will need to pass in filesToPaginate on the initial mount
    // otherwise allFiles will be empty
    filesToPaginate: IFile[],
    page: number = 0,
    limit: number = 4,
    sort: SortBy = SortBy.ASC
    // filters: any
  ) => {
    console.log(
      "pagination",
      page,
      limit,
      sort,
      "total files:",
      filesToPaginate.length
    );

    const pageFiles = filesToPaginate.slice(page * limit, (page + 1) * limit);
    console.log(JSON.stringify(pageFiles));
    setCurrentPageFiles(pageFiles);
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log("effect");

    (async () => {
      // onMount clear array
      setAllFiles([]);

      const filesList = await filterFiles();

      filesList ? pagination(filesList) : null;
    })();
  }, [folder]);

  return (
    <>
      <Pagination />
      <div className="model-list">
        <button onClick={() => pagination(allFiles, currentPage - 1)}>
          Previous
        </button>
        <button onClick={() => pagination(allFiles, currentPage + 1)}>
          next
        </button>
        {currentPageFiles?.map((file) => (
          <StlCard key={file.imageUrl} fileUrl={file.imageUrl} />
        ))}
      </div>
    </>
  );
};

export default ModelList;

const Pagination = () => {
  return (
    <div className="pagination">
      <button>Previous</button>
      <button>next</button>
    </div>
  );
};
