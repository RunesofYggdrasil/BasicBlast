"use client";

import React, { useState } from "react";
import styles from "./MatchCard.module.css";
import SequenceCard from "./SequenceCard";
import DisplaySelect from "./DisplaySelect";

interface MatchProps {
  displaySetting: string;
  titleName: string;
  titleSpecies: string;
  titleBrief: string;
  bodyDescription: string;
  bodySequence: string;
  footUser: string;
  footDate: string;
}

const MatchCard = ({
  displaySetting,
  titleName,
  titleSpecies,
  titleBrief,
  bodyDescription,
  bodySequence,
  footUser,
  footDate,
}: MatchProps) => {
  let [currentDisplay, setCurrentDisplay] = useState(displaySetting);
  return (
    <div className={styles.matchCard}>
      <div className={styles.innerCard}>
        <div className={styles.cardTitle}>
          <h1>{titleName}</h1>
          <h2>
            {titleSpecies}: {titleBrief}
          </h2>
          <div className={styles.displaySelect}>
            <DisplaySelect
              currentDisplay={currentDisplay}
              setDisplay={setCurrentDisplay}
            />
          </div>
        </div>
        <div
          className={
            currentDisplay == "Full" || currentDisplay == "Half"
              ? styles.cardBody
              : styles.displayNone
          }
        >
          <hr />
          <div
            className={
              currentDisplay == "Full" ? "Display" : styles.displayNone
            }
          >
            <p>{bodyDescription}</p>
            <hr />
          </div>
          <div>
            <SequenceCard sequence={bodySequence} />
          </div>
        </div>
        <div
          className={currentDisplay == "Full" ? "Display" : styles.displayNone}
        >
          <hr />
          <div className={styles.cardFoot}>
            <p className={styles.username}>Submitted by {footUser}</p>
            <p className={styles.userdate}>Submitted on {footDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
