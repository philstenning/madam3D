import React from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  let params = useParams();
  return (
    <div>
      <h2>Project number:{params.projectId}</h2>
    </div>
  );
};

export default Project;
