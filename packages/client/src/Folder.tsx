import React, { useState } from "react";
import Box from "./Box2";
type FolderFiles = {
  filename: string;
};
const Folder = () => {
  const [fileList, setFileList] = useState<FolderFiles[]>([]);
  const [currentDirHandle, setCurrentDirHandle] =
    useState<FileSystemDirectoryHandle>();

  const [fileList1, setFileList1] = useState<File[]>([]);
  const [selectedItem, setSelectedItem] = useState<File>();
  const [fileUrl, setFileUrl] = useState(
    "http://localhost:3000/src/images/mm.stl"
  );



async function test(){
    // const root = await navigator.storage.getDirectory();
    // console.log(root.)
}

  async function getDirectoryFiles() {
    const dirHandle = await window.showDirectoryPicker();

    // save directory handle in state
    if (dirHandle) {
      setCurrentDirHandle(dirHandle);
    //   console.log(`dirname ${ await dirHandle.} `);
      // reset fileList to default state.
      setFileList([]);
    }

    // filter the results  to only .stl files.
    for await (const entry of dirHandle.values()) {
      if (entry.kind === "file" && entry.name.includes(".stl")) {
        setFileList((items) => [...items, { filename: entry.name }]);
      }
      if (entry.kind === 'directory'){
        //   console.log(`permission ${await entry.queryPermission()} ${await entry.resolve('')}`)
          const res = await dirHandle.getDirectoryHandle(entry.name)
          const pre=await res.queryPermission()
          console.log(`folder:${entry.name} = ${pre}`)
          
        //    for await(const ff of res.values()){
            //    console.log(ff.name , ff.)

        //    }
      }
    }
  }

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    fileName: string
  ) => {
    e.preventDefault();
    if (currentDirHandle) {
      //    for await (const entry of currentDirHandle.)
      const fileHandle = await currentDirHandle.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      const stlUrl = URL.createObjectURL(file);
      console.log(stlUrl);
      setFileUrl(stlUrl);
    }
  };

  return (
    <div>
      <button onClick={getDirectoryFiles}>Folder</button>
      <p>{fileList.length}</p>
      <Box fileUrl={fileUrl} />
      <ul>
        {fileList.map((item) => (
          <li key={item.filename}>
            <a href="/" onClick={(e) => handleClick(e, item.filename)}>
              {item.filename}{" "}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Folder;
