import React, { useState } from "react";
import logo from "/cube-purple.svg";
import "./home.css";

const Home = () => {
  const removeFolder = async () => {
    //TODO remove selected folder from db.
  };
  const removeAllFolders = async () => {
    //TODO remove All folder from db.
  };

  return (
    <div className="home">
      <div className="hero">
        <h1  className="hero__text">MaDam3D</h1>
        <img className="hero__logo" src={logo} alt="" />
      </div>
      <div  className="home__card">
       <p>
         
         {import.meta.env.VITE_APP_NAME} is an app for managing you 3D model
        files, under the hood it uses the native file system access api, that as
        of December 2021 is available in{" "}
        <a href="https://caniuse.com/?search=file%20system%20access">
          Chrome and Edge &#62; 86 and the technical preview in Safari.
        </a>
         </p>  
      </div>
      <div className="home__card"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatum dignissimos optio quos molestias velit facilis aperiam, natus fugiat eligendi placeat accusantium. Optio, hic consectetur! Dolore velit nulla temporibus ab.</div>
      <div className="home__card"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatum dignissimos optio quos molestias velit facilis aperiam, natus fugiat eligendi placeat accusantium. Optio, hic consectetur! Dolore velit nulla temporibus ab.</div>
      {/* <div className="home__card"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatum dignissimos optio quos molestias velit facilis aperiam, natus fugiat eligendi placeat accusantium. Optio, hic consectetur! Dolore velit nulla temporibus ab.</div>
      <div className="home__card"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatum dignissimos optio quos molestias velit facilis aperiam, natus fugiat eligendi placeat accusantium. Optio, hic consectetur! Dolore velit nulla temporibus ab.</div> */}
      
      
    </div>
  );
};

export default Home;
