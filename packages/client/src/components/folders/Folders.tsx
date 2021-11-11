import React, { useState, useRef } from "react";
import "./folders.css";
import StlViewer from "../stlViewer/StlViewer";
import useMeasure from "react-use-measure";
const Folders = () => {


   
  return (
    <>
      {/* <h2>folders</h2> */}
      <div className="stl-container">
        <StlCard />
        <StlCard fileUrl="http://localhost:3000/src/images/mm.stl" />
        <StlCard />
        <StlCard />
        <StlCard />
        <StlCard />
        <StlCard />
        <StlCard />
      </div>
    </>
  );
};

interface Props {
  fileUrl?: string;
}

const StlCard = ({ fileUrl }: Props) => {
// const ref = useRef(null);
//   const [ref, bounds] = useMeasure();
  return (
    <div className="stl-card">
      <StlViewer  fileUrl={fileUrl} />
    </div>
  );
};

export default Folders;
