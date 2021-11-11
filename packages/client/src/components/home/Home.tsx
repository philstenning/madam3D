import React, { useState } from "react";
/*
https://web.dev/file-system-access/
https://web.dev/browser-fs-access/
*/
const Home = () => {
  const [string, setString] = useState("");
  const [dirHandles, setDirHandles] = useState<FileSystemDirectoryHandle[]>([]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const dirHandle = await window.showDirectoryPicker();
    console.log(dirHandle);
    if (dirHandle.kind === "directory") {
      setString(dirHandle.name);

      setDirHandles((currentHandles) => [...currentHandles, dirHandle]);
      getEntries(dirHandle);
    }
  };

  const getEntries = async (dirHandle: FileSystemDirectoryHandle) => {
    for await (const entry of dirHandle.entries()) {
      //  console.log(entry[0])
      const fileHandle = await dirHandle.getFileHandle(entry[0]);
      const file = await fileHandle.getFile();
      const f = file.webkitRelativePath;
      console.log(file.name, file.size, file.webkitRelativePath);
      // names=[...names,f]
    }
    //  console.log(JSON.stringify(names));
    return;
  };

  return (
    <div>
      <h1>home</h1>
      <button onClick={(e) => handleClick(e)}>Add Folder</button>

      {string && <h2>you opened: {string}</h2>}
      <ul>
        {dirHandles.map((handle) => (
          <li key={handle.name}>
            {handle.name} {}
            <ul>
              {/* { getEntries(handle).then( result=><p>{JSON.stringify(result)}</p>) } */}
              {/* {getEntries(handle)} */}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
