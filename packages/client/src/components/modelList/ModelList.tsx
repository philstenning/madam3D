import { useState, useEffect } from "react";
import StlCard from "../stlCard/StlCard";
import { useParams } from "react-router-dom";
import { db, IFolder, IFile, FileTypes } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getFileEntries } from "../../utils/fileSystem";
type Props = {
  folder: IFolder | null;
};

const ModelList = ({ folder }: Props) => {
  if (!folder) return <div>empty</div>;
  const [allFiles, setAllFiles] = useState<IFile[]>([]);
  // let { folderId } = useParams();

  // const folders = useLiveQuery(() =>
  //   db.folders.where("id").equals(parseInt(folderId?folderId:'0', 10)).first()
  // );
  console.log("folder name", folder?.name);
  // console.log(folder?.name)

  const filterFiles = async () => {
    console.log("\n\n woeking");
    if (!folder) return;
    console.log("\n \n");
    // let allFiles = [];
    for await (const entry of folder.handle.values()) {
      if (entry.kind === "file" && entry.name.endsWith(".stl")) {
        const fileHandle = await folder.handle.getFileHandle(entry.name);

        const file = await fileHandle.getFile();
        const url = URL.createObjectURL(file);
        console.log(entry.name, url);
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
        setAllFiles(old=>[...old,newFile])
      }
    }
    //  const files = await getFileEntries(folder.handle);

    //  setDirFiles(files.filter((file) => file.name.endsWith(".stl")));
    //  const f= files.filter((file) => file.name.endsWith(".stl"))
  };
  useEffect(() => {
    console.log("effect");
    setAllFiles([])
    filterFiles();
  }, [folder]);

  return (
    <div className="model-list">
      {/* {folder?.name}
      <p>total: {allFiles?.length || 0}</p> */}
      {/* <ul> */}
      {allFiles && allFiles?.map((file) => <StlCard key={file.imageUrl} fileUrl={file.imageUrl}/>)}
      {/* allFiles?.map((file) => <li key={file.name}>{file.name}</li>)} */}
      {/* </ul> */}
      {/* {allFolders && allFolders.} */}
      {/* <StlCard />
      <StlCard fileUrl="http://localhost:3000/src/images/mm.stl" />
      <StlCard />
      <StlCard />
      <StlCard />
      <StlCard />
      <StlCard />
      <StlCard /> */}
    </div>
  );
};

export default ModelList;
