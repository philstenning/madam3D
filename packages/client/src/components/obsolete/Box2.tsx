import { Canvas } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { BufferGeometry, Matrix4, BoxHelper, Box3 } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Center, OrbitControls } from "@react-three/drei";
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
    <Canvas
      camera={{ position: [105, 555, 100], fov: 555, near: 51, far: 2000 }}
    >
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[100, 10, `white`, `red`]} position={[20, 2, 3]} />
      <mesh scale={0.51} position={[0, 30, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};

export default Model;
