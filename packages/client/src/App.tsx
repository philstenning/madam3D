// import { useState} from "react";
import "./styles/App.css";
import FolderExplorer from './components/FolderExplorer'

function App() {
  // use a default file so we can see that it is working.
  // const [fileUrl, setFileUrl] = useState(
  //   "http://localhost:3000/src/images/mm.stl"
  // );

  // for more options see link
  //  https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker
  // const pickerOpts: OpenFilePickerOptions = {
  //   types: [
  //     {
  //       description: "3D image file",
  //       accept: {
  //         "other/*": [".stl"],
  //       },
  //     },
  //   ],
  //   excludeAcceptAllOption: true,
  //   multiple: false,
  // };

  // async function getTheFile() {
  //   // open the picker. This file handle will be needed for any interaction with the file.
  //   const [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  //   if (fileHandle.kind === "file") {
  //     console.log("you got a file");
  //   }
  //   const result = await fileHandle.getFile();
  //   const stlUrl = URL.createObjectURL(result);
  //   console.log(stlUrl);
  //   setFileUrl(stlUrl);
  // }

  return (
    <div className="App">
      {/* <button onClick={getTheFile}>get File</button> */}
      <FolderExplorer/>
    </div>
  );
}

export default App;