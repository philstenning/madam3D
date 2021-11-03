// import "./styles.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useProgress,
  Html,
  Center,
  useAspect,
  useHelper,
  Torus,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense, useRef } from "react";

import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BoxHelper, Box3Helper, MeshStandardMaterial } from "three";

// THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const SceneD = () => {
  //   const materials = useLoader(MTLLoader, "Poimandres.mtl");
  const obj = useLoader(
    OBJLoader,
    "http://localhost:3000/src/images/servo_motor.obj",
    (loader) => {
      // materials.preload();
      // loader.setMaterials(materials);
    }
  );

  console.log(obj);
  return <primitive object={obj} scale={0.4} />;
};

interface Props {
  fileUrl: string;
}

const STLViewer = ({ fileUrl }: Props) => {
  const stl = useLoader(STLLoader, fileUrl);

  const mesh = useRef();
  useHelper(mesh, BoxHelper, "cyan");
  return (
    <Center alignTop>
      <mesh geometry={stl} ref={mesh}>
        <meshNormalMaterial flatShading />
      </mesh>
    </Center>
  );
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Scene({
  fileUrl = "http://localhost:3000/src/images/arm_joiner_double.stl",
}: Props) {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
        <pointLight position={[100, 100, 100]} />
        <pointLight position={[-100, -100, -100]} />
        <gridHelper args={[100, 10, `white`, `gray`]} />

        <Suspense fallback={<Loader />}>
          {/* <SceneD /> */}
          <STLViewer fileUrl={fileUrl} />
          {/* <Torus position={[1,2,3]} scale={20} args={[1,0.2,20,200]}>
              <meshPhongMaterial color='hotpink' ></meshPhongMaterial>
          </Torus> */}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
