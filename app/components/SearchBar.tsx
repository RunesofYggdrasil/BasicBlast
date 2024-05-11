"use client";

import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchDiv}>
      <form className={styles.searchForm}>
        <label htmlFor="search" className={styles.searchLabel}>
          Input Sequence
        </label>
        <input
          type="search"
          id="search"
          className={styles.searchInput}
          name="search"
          placeholder="Input Sequence"
        />
        <input type="submit" className={styles.searchSubmit} value="SEARCH" />
      </form>
    </div>
  );
};

export default SearchBar;
