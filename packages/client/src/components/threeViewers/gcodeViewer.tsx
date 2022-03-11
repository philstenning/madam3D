import { Suspense } from "react";
import { GCodeLoader } from "three/examples/jsm/loaders/GCodeLoader.js";
import { Canvas, useLoader } from "@react-three/fiber";
import { useDarkModeGridColors } from "../../hooks/darkMode";
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
   const { darkMode } = useDarkModeGridColors();
  return (
    <Canvas
      style={{}}
      camera={{ position: [1, 70, 100], fov: 100, near: 10, far: 900 }}
    >
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <gridHelper args={[220, 12, darkMode[0], darkMode[1]]} />
      <Suspense fallback={<Loader />}>
        <ThreeMFViewer fileUrl={fileUrl} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Basic;
