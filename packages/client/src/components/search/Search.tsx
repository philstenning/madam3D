import React from "react";
import "./search.css";
import IconSearch from "~icons/fluent/search-28-filled";

const Search = () => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }
  return (
    <form className="search">
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          autoComplete="false"
        />
        <button onClick={(e) => handleClick(e)} className="search__button">
          <IconSearch style={{}} />
        </button>
      </div>
    </form>
  );
};

export default Search;
