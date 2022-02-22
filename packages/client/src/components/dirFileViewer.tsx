import { useState, useEffect } from "react";
import { IFolder } from "../db";
import { getFileEntries } from "../utils/fileSystem";
type Props = {
  selectedFolder: IFolder;
};
const DirFileViewer = ({ selectedFolder}: Props) => {
  const [dirFiles, setDirFiles] = useState<FileSystemHandle[] | null>(null);

  const filterFiles = async () => {
    const files = await getFileEntries(selectedFolder.handle);
    if (files) {
      /**
       * TODO
       * this will need to be changed to include
       * more file types later...
       */
      setDirFiles(files.filter((file) => file.name.endsWith(".stl")));
    }
  };
  useEffect(() => {
    filterFiles();
  }, [selectedFolder]);

  return (
      <>
        <p>total: {dirFiles?.length||0}</p>
      <ul>
        {dirFiles &&
          dirFiles?.map((file) => <li key={file.name}>{file.name}</li>)}
      </ul>
      </>
  );
};

export default DirFileViewer;
