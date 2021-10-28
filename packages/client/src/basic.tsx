import React, { useRef, Suspense, useState } from "react";
import { BoxHelper, Vector3 } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import {
  useProgress,
  Html,
  Center,
  useHelper,
  OrbitControls,
} from "@react-three/drei";

interface Props {
  fileUrl: string;
}

// This is the working out code I will need to revisit it to
// make sure the object is within the canvas object.
const STLViewer2 = ({
  fileUrl = "http://localhost:3000/src/images/mm.stl",
}: Props) => {
  //   const { viewport, size } = useThree();
  const stl = useLoader(STLLoader, fileUrl);

  //   console.log(viewport.height, viewport.width, "size:", size.height);
  const center = new Vector3();
  stl.computeBoundingBox();
  const boundingBox = stl.boundingBox;
  stl.computeBoundingSphere();

  const bSpear = stl.boundingSphere ? stl.boundingSphere.radius : 0;
  console.log(`bSpear ${bSpear * 2.3} ${bSpear * 0.75}`);
  console.log("center", boundingBox?.getCenter(center));

  //   const modelHeight = f?.max.y | 0;
  console.log(`boundingBox ${boundingBox?.max.y}`);
  const mesh = useRef();
  useHelper(mesh, BoxHelper, "cyan");
  return (
    // <Center alignTop>
    <mesh
      geometry={stl}
      ref={mesh}
      position={[-center.x, boundingBox ? -boundingBox.min.y : 0, -center.z]}
    >
      <meshNormalMaterial flatShading />
    </mesh>
    // </Center>
  );
};

const STLViewer = ({
  fileUrl = "http://localhost:3000/src/images/arm_joiner_double.stl",
}: Props) => {
  //TODO still need to make sure the model is not bigger than the viewport

  const stl = useLoader(STLLoader, fileUrl);
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
  const mesh = useRef();
  useHelper(mesh, BoxHelper, "cyan");
  return (
    <Center alignTop>
      <mesh geometry={stl} ref={mesh} scale={scaleFactor}>
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
    <Canvas camera={{ position: [1, 70, 100], fov: 50, near: 10, far: 200 }}>
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[100, 100 / 10, "magenta", "cyan"]} />
      <Suspense fallback={<Loader />}>
        <STLViewer fileUrl={fileUrl} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Basic;
