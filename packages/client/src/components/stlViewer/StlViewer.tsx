import React, { useRef, Suspense, useState } from "react";
import { Vector3 } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import useMeasure from 'react-use-measure'
import {
  useProgress,
  Html,
  Center,
  useHelper,
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
  return (
    <Canvas style={{}}  camera={{ position: [1, 70, 100], fov: 50, near: 10, far: 200 }}>
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[80, 12, "magenta", "cyan"]} />
      <Suspense fallback={<Loader />}>
        <STLViewer fileUrl={fileUrl} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Basic;
