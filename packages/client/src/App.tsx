import { useState, useRef } from "react";

import "./App.css";
import Box from "./obsolete/Box2";
import Folder from './obsolete/Folder'
import Folder2 from './Folder2'
import Scene from "./Obj";
import Basic from './basic'
function App() {
  // use a default file so we can see that it is working.
  const [fileUrl, setFileUrl] = useState(
    "http://localhost:3000/src/images/mm.stl"
  );

  // for more options see link
  //  https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker
  const pickerOpts: OpenFilePickerOptions = {
    types: [
      {
        description: "3D image file",
        accept: {
          "other/*": [".stl"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  async function getTheFile() {
    // open the picker. This file handle will be needed for any interaction with the file.
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    if (fileHandle.kind === "file") {
      console.log("you got a file");
    }
    const result = await fileHandle.getFile();
    const stlUrl = URL.createObjectURL(result);
    console.log(stlUrl);
    setFileUrl(stlUrl);
    // const fileContent =  file.size;
  }

  return (
    <div className="App">
      <button onClick={getTheFile}>get File</button>
      {/* <Box fileUrl={fileUrl} /> */}
      {/* <Folder/> */}
      <Folder2/>
      {/* <Basic/> */}
      {/* <Scene fileUrl={fileUrl}/> */}
    </div>
  );
}

export default App;