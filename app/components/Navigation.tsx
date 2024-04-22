import React from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  // Replace Logo Image
  //   Could make a pun about how ROSEARCH could be Ro Search or Rose Arch
  return (
    <nav className={styles.navigationBar}>
      <div className={styles.navigationLeft}>
        <p>ROSEARCH</p>
      </div>
      <div className={styles.navigationRight}>
        <ul>
          <li>
            <Link href="">Link One</Link>
          </li>
          <li>
            <Link href="">Link Two</Link>
          </li>
          <li>
            <Link href="">Link Three</Link>
          </li>
          <li>
            <Link href="">Link Four</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
