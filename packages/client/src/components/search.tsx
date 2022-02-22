import React, {useState} from "react";
import "./search.css";
import IconSearch from "~icons/fluent/search-28-filled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {clearSearchText,setSearchText} from '../features/searchSlice'

const Search = () => {

  const searchText = useAppSelector(state=>state.searchReducer.searchText)
  const dispatch = useAppDispatch()

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
      dispatch(clearSearchText())
  }

  return (
    <form className="search">
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          name="search"
          id="search"
          placeholder="Filter Models"
          autoComplete="true"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <button onClick={(e) => handleClick(e)} className="search__button">
          {searchText.length ? "X" : <IconSearch style={{}} />}
        </button>
      </div>
    </form>
  );
};

export default Search;
