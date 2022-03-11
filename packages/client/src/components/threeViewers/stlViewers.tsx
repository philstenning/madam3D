import  { useRef, Suspense, useState, useEffect} from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Canvas, useLoader } from "@react-three/fiber";
import {useDarkModeGridColors} from '../../hooks/darkMode'
import {
  useProgress,
  Html,
  Center,
  OrbitControls,
} from "@react-three/drei";

interface Props {
  fileUrl?: string;
}

const STLViewer = ({
  fileUrl = "http://localhost:3000/src/images/arm_joiner_double.stl",
}: Props) => {
  //TODO still need to make sure the model is not bigger than the viewport

  const stl = useLoader(STLLoader, fileUrl);
//   const { viewport } = useThree();
  const ref = useRef(null);
//   const  [ref, bounds] = useMeasure()
//   console.log(viewport.width);
// window.onresize
//   console.log(JSON.stringify(bounds))
  
  // stl.computeBoundingBox();

  // console.log(
  //   `object size before centering.

  //   \tx:${stl.boundingBox?.max.x}
  //   \ty:${stl.boundingBox?.max.y}
  //   \tz:${stl.boundingBox?.max.z}`
  // );

  // console.log(` size: ${size.height}`);

  // fit the model inside the canvas object
  // by calculating a scale factor.
  stl.computeBoundingSphere();
  const bSpear = stl.boundingSphere ? stl.boundingSphere.radius : 0;
  const scaleFactor = 40 / bSpear;
  // console.log(`bSpear ${bSpear} factor: ${scaleFactor}`);

  // show the bounding box for dev.
  // useHelper(mesh, BoxHelper, "cyan");

  return (
    <Center alignTop>
      <mesh geometry={stl} ref={ref} scale={scaleFactor}>
        <meshNormalMaterial flatShading />
      </mesh>
    </Center>
  );
};

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}






const Basic = ({
  fileUrl = "http://localhost:3000/src/images/arm_joiner_double.stl",
}: Props) => {
     const {darkMode} = useDarkModeGridColors();
  return (
    <Canvas
      style={{}}
      camera={{ position: [1, 70, 100], fov: 50, near: 10, far: 400 }}
    >
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[80, 12, darkMode[0], darkMode[1]]} />
      <Suspense fallback={<Loader />}>
        <STLViewer fileUrl={fileUrl} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Basic;
