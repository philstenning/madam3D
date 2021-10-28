import React, { useState } from "react";
import {
  fileOpen,
  directoryOpen,
  supported,
  FileWithDirectoryHandle,
} from "browser-fs-access";
import Basic from './basic'

const Folder2 = () => {
  const [currentDirHandle, setCurrentDirHandle] = useState<
    FileWithDirectoryHandle[]
  >([]);
  const [fileUrl, setFileUrl] = useState(
    "http://localhost:3000/src/images/mm.stl"
  );

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const dirHandle = await directoryOpen({
      recursive: true,
    });
    // if user canceled or error  we have no dirHandle
    if (!dirHandle) {
      return;
    }
    const filtered = dirHandle.filter((i) => i.name.includes(".stl"));
    setCurrentDirHandle(filtered);
    
  };

  const selectFile = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    fileName: string
  ) => {
    e.preventDefault();
    const file = currentDirHandle.find(item=>item.name===fileName)
    if(file){
        const stlUrl = URL.createObjectURL(file);
        setFileUrl(stlUrl);
        
    }
  };
  return (
    <div>
      {supported && <div>using File System access API</div>}
      {!supported && <div>Using the Fallback File system Access Api</div>}

      <button onClick={(e) => handleClick(e)}>Open Directory</button>
      <h3>{currentDirHandle.length}</h3>
      {/* <Box fileUrl={fileUrl} /> */}
      <Basic fileUrl={fileUrl} />
      <ul>
        {currentDirHandle.map((file) => (
          <li key={file.name}>
            <a href="/" onClick={(e) => selectFile(e, file.name)}>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Folder2;
