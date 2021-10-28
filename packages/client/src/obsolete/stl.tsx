import * as THREE from "three";
import { useLoader, extend, useThree, useFrame } from "@react-three/fiber";
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
// import { BufferGeometry } from "three";
import { Water } from "three-stdlib";
// import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
const i = "src/images/mm.stl";

extend({ Water });

// function Ocean() {
//   const ref = useRef();
//   const gl = useThree((state) => state.gl);
//   const waterNormals = useLoader(THREE.TextureLoader, "src/images/water.jpg");
//   waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
//   const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
//   const config = useMemo(
//     () => ({
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xffffff,
//       waterColor: 0x001e0f,
//       distortionScale: 3.7,
//       fog: true,
//       // @ts-ignore: Unreachable code error
//       format: gl.encoding,
//     }),
//     [waterNormals]
//   );
//   useFrame(
//     // @ts-ignore: Unreachable code error
//     (state, delta) => (ref.current.material.uniforms.time.value += delta)
//   );
//   // @ts-ignore: Unreachable code error
//   return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
// }

type Props = {
  file: THREE.BufferGeometry | null;
};

const Stl = ({ file }: Props) => {
  // const geom = useLoader(STLLoader, objUrl);
  // const objUrl = URL.createObjectURL(file);
  // const geom = useLoader(STLLoader, objUrl);
  const ref = useRef();

  useFrame(() => {
    // @ts-ignore: Unreachable code error
    ref.current.rotation.x = ref.current.rotation.y += 0.001;
  });
  return (
    <mesh ref={ref}>
      <primitive object={file} attach="geometry" />
      <meshStandardMaterial color={"#70db19"} />
    </mesh>
  );
};

export { Stl };
