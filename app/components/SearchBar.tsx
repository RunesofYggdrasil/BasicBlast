"use client";

import React from "react";
import styles from "./SearchBar.module.css";
import { handleSearchSequence } from "@/lib/actions";

const SearchBar = () => {
  return (
    <div className={styles.searchDiv}>
      <form className={styles.searchForm} action={handleSearchSequence}>
        <label htmlFor="search" className={styles.searchLabel}>
          Input Sequence:
        </label>
        <input
          type="text"
          id="search"
          className={styles.searchInput}
          name="search"
          placeholder="Input Sequence Here"
        />
        <input type="submit" className={styles.searchSubmit} value="SEARCH" />
      </form>
    </div>
  );
};

export default SearchBar;
