import React, { useRef, Suspense, useState } from "react";
import { Vector3, LoadingManager, Euler } from "three";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useDarkModeGridColors } from "../../hooks/darkMode";
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
  fileUrl = "http://localhost:3000/src/images/servo_motor.3mf",
}: Props) => {
 


  const manager = new LoadingManager()
 const loader = new ThreeMFLoader(manager)

const ThreeMF= useLoader(ThreeMFLoader,fileUrl)

// ThreeMF.q

 
// loader.load( fileUrl,  ( object )=> {

// 					object.quaternion.setFromEuler( new Euler( - Math.PI / 2, 0, 0 ) ); 	// z-up conversion

// 					object.traverse( function ( child ) {

// 						child.castShadow = true;

// 					} );

// 					// scene.add( object );

// 				} );


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
  fileUrl = "http://localhost:3000/src/images/servo_motor.3mf",
}: Props) => {
   const { darkMode } = useDarkModeGridColors();
  return (
    <Canvas
      style={{}}
      camera={{ position: [1, 70, 100], fov: 50, near: 10, far: 200 }}
    >
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[80, 12, darkMode[0], darkMode[1]]} />
      <Suspense fallback={<Loader />}>
        <ThreeMFViewer fileUrl={fileUrl} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Basic;
