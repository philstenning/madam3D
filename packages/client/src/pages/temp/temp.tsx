import React, {useState} from "react";
import {
  AnimationProps,
  motion,
  Variants,
  useMotionValue,
} from "framer-motion";
import "./temp.css";

import  StlViewer from '../../components/stlViewer/StlViewer'
import  ThreeMFViewer from '../../components/threeMFViewer/ThreeMFViewer'
import  GcodeViewer from '../../components/threeMFViewer/gcodeViewer'


const Temp = () => {
    const x = useMotionValue(0)
    const [items,setItems] = useState<number[]>([])
    
  return (
    <div>
       {/* <img src={model} alt="" /> */}
       <StlViewer  />
       <ThreeMFViewer/>
       <GcodeViewer/>
    </div>
  );
};

export default Temp;




// const container = {
//   hidden: { opacity: 1, scale: 0 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       delayChildren: .3,
//       staggerChildren: .3,
//     },
//   },
// };

// const item = {
//   hidden: { y: 20,x:300, opacity: 0 },
//   visible: {
//     y: 0,x:0,
//     opacity: 1,
//   },
// };

{/* <div>
  <motion.ul
    className="tmp_container"
    variants={container}
    initial="hidden"
    animate="visible"
  >
    {items.map((index) => (
      <motion.li
        className="tmp_item"
        key={index}
        variants={item}
        // initial='hidden'
        // animate='visible'
        drag="x"
        dragConstraints={{
          top: 50,
          left: 50,
          right: 50,
          bottom: 50,
        }}
      ></motion.li>
    ))}
  </motion.ul>
  <button onClick={() => setItems((existing) => [...existing, 4])}>
    addItem
  </button>
</div>; */}