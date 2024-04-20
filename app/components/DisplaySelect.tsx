"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./DisplaySelect.module.css";

interface DisplayProps {
  currentDisplay: string;
  setDisplay: Dispatch<SetStateAction<string>>;
}

const handleChange = (
  value: string,
  setAction: Dispatch<SetStateAction<string>>
) => {
  setAction(value);
};

const DisplaySelect = ({ currentDisplay, setDisplay }: DisplayProps) => {
  return (
    <div className={styles.selectMenu}>
      <select
        title="Display"
        value={currentDisplay}
        onChange={(event) => {
          handleChange(event.target.value, setDisplay);
        }}
      >
        <option value="Full">Full</option>
        <option value="Half">Half</option>
        <option value="Short">Short</option>
        <option value="Hide">Hide</option>
      </select>
    </div>
  );
};

export default DisplaySelect;
