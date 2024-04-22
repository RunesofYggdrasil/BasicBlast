"use client";

import React from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  // Replace Logo Image
  // Could make a pun about how ROSEARCH could be Ro Search or Rose Arch
  return (
    <nav className={styles.navigationBar}>
      <div className={styles.navigationDiv}>
        <div className={styles.navigationLeft}>
          <p>ROSEARCH</p>
        </div>
        <div className={styles.navigationRight}>
          <ul>
            <li>
              <Link href="./">HOME</Link>
            </li>
            <li>
              <Link href="./search/">SEARCH</Link>
            </li>
            <li>
              <Link href="">UPLOAD</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
