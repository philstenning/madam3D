import React from "react";
import { useParams } from "react-router-dom";

// type Params = {
//     string:{
//        projectId: string | undefined; 
//     }
  
// };

const Project = () => {
  let params = useParams();
  return (
    <div>
      <h2>Project number:{params.projectId}</h2>
    </div>
  );
};

export default Project;
