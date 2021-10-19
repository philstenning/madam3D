import React, { Suspense, useState } from "react";
import { OrbitControls, Sky } from "@react-three/drei";
import { useLoader, Canvas } from "@react-three/fiber";
import { Stl } from "./stl";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
const pickerOpts: OpenFilePickerOptions = {
  types: [
    {
      description: "3D image file",
      accept: {
        "other/*": [".stl", ".jpg"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

// function Box() {
function Box(props: JSX.IntrinsicElements["mesh"]) {
  const [file, setFile] = useState<THREE.BufferGeometry | null>(null);
  const [file1, setFile1] = useState<File | null>(null);

  const [name, setName] = useState("");

  async function getTheFile() {
    // open the picker
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    if (fileHandle.kind === "file") {
      console.log("you got a file");
    }
    const result = await fileHandle.getFile();
    const url = URL.createObjectURL(result);
    // console.log("size:", result.size);
    console.log(`"${url}"`);
    // console.log(JSON.stringify(result.name));

    // const objUrl = URL.createObjectURL(result);
    const geom =   useLoader(STLLoader, url)
    // const geom = useLoader(STLLoader, "./src/images/mm.stl");
    //  console.log(geom)
    // setFile(() => geom);
  }
  const getImage = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    if (fileHandle.kind === "file") {
      console.log("you got a file");
    }
    const result = await fileHandle.getFile();
    setName(result.name);
    setFile1(result);
  };

  return (
    <div>
      <h1>app</h1>
      <button onClick={getImage}>open fgf</button>
      <button onClick={getTheFile}>get stl</button>

      <p>this is not working is it now and fit</p>
      <h1>app</h1>
      <img
        src="./src/images/pic.jpg"
        alt="./src/images/pic.jpg"
        height="100px"
      />

      <h3>{name}</h3>

      {file1 && (
        <img
          src={URL.createObjectURL(file1)}
          alt="./src/images/pic.jpg"
          height="100px"
        />
      )}
      {file && (
        <img src="./src/images/mm.stl" alt="fasdfsdf" />
        // <Canvas
        //   camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}
        // >
        //   <pointLight position={[100, 100, 100]} />
        //   <pointLight position={[-100, -100, -100]} />

        //   <Suspense fallback={null}>
        //     <Stl file={file} />
        //   </Suspense>
        //   <OrbitControls
        //     enablePan={true}
        //     enableZoom={true}
        //     enableRotate={true}
        //   />
        //   <Sky />
        // </Canvas>
      )}

      {!file && <h1>no content</h1>}
    </div>
  );
}

export default Box;

//   <Suspense fallback={null}>

/* <Ocean /> */

/* <Stl file="src/images/mm.stl" /> */
