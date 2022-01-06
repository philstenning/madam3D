import React, { useState } from "react";
import { db, IFolder, IFolderCreate } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";

// import {loadEnv} from 'vite'
/*
https://web.dev/file-system-access/
https://web.dev/browser-fs-access/
*/

const Home = () => {
  const removeFolder = async () => {
    //TODO remove selected folder from db.
  };
  const removeAllFolders = async () => {
    //TODO remove All folder from db.
  };

  return (
    <div>
      
      <p>
        {import.meta.env.VITE_APP_NAME} is an app for managing you 3D model
        files, under the hood it uses the native file system access api, that as
        of December 2021 is available in{" "}
        <a href="https://caniuse.com/?search=file%20system%20access">Chrome
        and Edge &#62; 86 and the technical preview in Safari.</a> 
      </p>
    </div>
  );
};

export default Home;
