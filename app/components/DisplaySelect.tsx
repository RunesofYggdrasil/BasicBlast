"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./DisplaySelect.module.css";

interface DisplayProps {
  currentDisplay: string;
  setDisplay:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<string>>[];
}

const handleChange = (
  value: string,
  setAction:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<string>>[]
) => {
  if (Array.isArray(setAction)) {
    for (let setIndex = 0; setIndex < setAction.length; setIndex++) {
      setAction[setIndex](value);
    }
  } else {
    setAction(value);
  }
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
      </select>
    </div>
  );
};

export default DisplaySelect;
