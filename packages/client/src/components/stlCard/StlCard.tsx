import { useState, useEffect } from "react";
import StlViewer from "../stlViewer/StlViewer";
import "./stlCard.css";
interface Props {
  fileUrl?: string;
  // file: FileSystemHandle;
}

const StlCard = ({ fileUrl }: Props) => {
  // const [fileUrl ,setFileUrl] = useState()
  // const ref = useRef(null);
  //   const [ref, bounds] = useMeasure();
  
  // useEffect(()=>{
    // const f =  file.getFile(file.name).then(ff =>ff.)
  // },[file])

  return (
    <div className="stl-card">
      <StlViewer fileUrl={fileUrl} />
    </div>
  );
};

export default StlCard;
