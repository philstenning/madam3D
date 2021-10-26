import { Canvas } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { BufferGeometry, Matrix4 } from "three";
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
      const coordSystemTransform = new Matrix4();
      coordSystemTransform.set(
        1,
        0,
        0,
        0, // x -> x
        0,
        0,
        1,
        0, // z -> y
        0,
        -1,
        0,
        0, // y -> -z
        0,
        0,
        0,
        1
      );
      coordSystemTransform.setPosition(0, 0, 0);
      // setGeometry(geo.applyMatrix4(coordSystemTransform));
      setGeometry(geo);
    });
  }, [fileUrl]);

  return (
    <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[100, 10, `white`, `gray`]} />
      {/* <planeGeometry args={}/> */}
      <mesh geometry={geometry?.center().translate(0, 20, 1)}>
        {/* <matrix4  scale={10}/> */}
        {/* <meshStandardMaterial color="green" /> */}
        <meshNormalMaterial flatShading={true} />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default Model;
