import { useState, useRef } from "react";

import "./App.css";
import Box from './Box2'

function App() {
  const [fileUrl, setFileUrl] = useState("http://localhost:3002/src/images/mm.stl");
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
    // open the picker
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    if (fileHandle.kind === "file") {
      console.log("you got a file");
    }
    const result = await fileHandle.getFile();
    const stlUrl = URL.createObjectURL(result);
    console.log(stlUrl)
    setFileUrl(stlUrl)
    // const fileContent =  file.size;
    // setData(dat.toString());

    // console.log(dat)

    // const fileData = await fileHandle.getFile();
  }

  return (
    <div className="App">
      <button onClick={getTheFile}>get File</button>
      <Box fileUrl={fileUrl} />
    </div>
  );
}

export default App;

// function App() {
//   const [fileName, setFileName] = useState<string>("");
//   const inputFile = useRef<HTMLInputElement | null>(null);
//   const handleClick = (e) => {
//     if (inputFile.current?.files?.length) {
//       const file = inputFile.current?.files[0];
//       console.log(file.name);
//       setFileName(file.name);
//     }
//   };
//   return (
//     <div className="App">
//       <input
//         type="file"
//         ref={inputFile}
//         onChange={(e) => handleClick(e)}
//       ></input>
//       {fileName && <h3>{fileName}</h3>}
//     </div>
//   );
// }

// export default App;
