import { Canvas } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { BufferGeometry } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "@react-three/drei";
interface Props {
  fileUrl: string;
}

const Model: FC<Props> = ({ fileUrl }) => {
  const [geometry, setGeometry] = useState<BufferGeometry>();

  useEffect(() => {
    const stlLoader = new STLLoader();
    stlLoader.load(fileUrl, (geo) => {
      setGeometry(geo);
    });
  }, [fileUrl]);

  return (
    <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <mesh geometry={geometry}>
        <meshStandardMaterial color="green" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default Model;
