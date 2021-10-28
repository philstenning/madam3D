import React, { useContext } from "react";

import FolderExplorer from "./FolderExplorer";
import { MainContext } from "./state/mainContext";
const Header = () => {
  const { state, dispatch } = useContext(MainContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    console.log('set rating to 5')
    dispatch({ type: "SET_RATING", payload: 5 });
    // dispatch({ type: "SET_PRICE", payload: 5 });
  };
  return (
    <header>
      <nav>
        <h1>Madam3D {state.rating}</h1>

        <ul>
          <li>
            <a onClick={(e) => handleClick(e)} href="#main">
              {" "}
              open folder
            </a>
          </li>
          <li>
            <a href="#settings"> settings </a>{" "}
          </li>
          <li>
            <a href="#help"> help </a>{" "}
          </li>
          <li>
            <a href="#login"> login </a>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
