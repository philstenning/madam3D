import { useState, useRef } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState("x");
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
    const file = await fileHandle.getFile();
    // const dat = await file.text()
    // const fileContent =  file.size;
    // setData(dat.toString());

    // console.log(dat)

    // const fileData = await fileHandle.getFile();
  }

  return (
    <div className="App">
      {/* <button onClick={getTheFile}>open</button> */}
      <p>{data}</p>
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
