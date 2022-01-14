import React, { useRef, Suspense, useState } from "react";
import { Vector3, LoadingManager, Euler } from "three";
import { GCodeLoader } from "three/examples/jsm/loaders/GCodeLoader.js";
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

const ThreeMFViewer = ({
  fileUrl = "http://localhost:3000/src/images/demo.gcode",
}: Props) => {
  //   const manager = new LoadingManager()
  //  const loader = new ThreeMFLoader(manager)

  const ThreeMF = useLoader(GCodeLoader, fileUrl);
  return (
    <Center alignTop>
      <primitive object={ThreeMF}></primitive>
    </Center>
  );
};

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Basic = ({
  fileUrl = "http://localhost:3000/src/images/demo.gcode",
}: Props) => {
  return (
    <Canvas
      style={{}}
      camera={{ position: [1, 70, 100], fov: 110, near: 10, far: 400 }}
    >
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[200, 12, "magenta", "cyan"]} />
      <Suspense fallback={<Loader />}>
        <ThreeMFViewer fileUrl={fileUrl} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Basic;
