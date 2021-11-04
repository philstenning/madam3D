import React, { useState } from "react";
import { directoryOpen, FileWithDirectoryHandle } from "browser-fs-access";
// import { showDirectoryPicker } from "native-file-system-adapter";

const AddFolder = () => {
  const [currentDirHandle, setCurrentDirHandle] = useState<
    FileWithDirectoryHandle[]
  >([]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const filehandle = await directoryOpen();
    if (!filehandle) {return}

    console.log(filehandle[0].directoryHandle);
    const dirHandle = filehandle[0].directoryHandle;
    // const info = await currentDirHandle.;
    console.log(dirHandle);
  };

  return (
    <div>
      {currentDirHandle[0] && (
        //  currentDirHandle[0].webkitRelativePath.toString()
        <pre>{JSON.stringify(currentDirHandle[0], null, 4)}</pre>
      )}
      <button onClick={(e) => handleClick(e)}>Add Folder</button>
    </div>
  );
};

export default AddFolder;

// const options = {
//   // Set to `true` to recursively open files in all subdirectories,
//   // defaults to `false`.
//   recursive: true,
//   // Suggested directory in which the file picker opens. A well-known directory or a file handle.
// //   startIn: "documents",
//   // By specifying an ID, the user agent can remember different directories for different IDs.
//   id: "projects",
// };
// const dirHandle = await directoryOpen(options);
// if(!dirHandle) {return}
// const filtered = dirHandle.filter((i) => i.name.includes(".stl"));
// setCurrentDirHandle(filtered);
