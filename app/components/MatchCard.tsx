"use client";

import React, { useState } from "react";
import styles from "./MatchCard.module.css";
import SequenceCard from "./SequenceCard";
import DisplaySelect from "./DisplaySelect";

interface MatchProps {
  titleSpecies: string;
  titleFunction: string;
  titleBrief: string;
  bodyDescription: string;
  bodySequence: string;
  bodyLength: number;
  footUser: string;
  footDate: string;
}

const MatchCard = ({
  titleSpecies,
  titleFunction,
  titleBrief,
  bodyDescription,
  bodySequence,
  bodyLength,
  footUser,
  footDate,
}: MatchProps) => {
  let [currentDisplay, setCurrentDisplay] = useState("Full");
  return (
    <div className={styles.matchCard}>
      <div className={styles.innerCard}>
        <div className={styles.cardTitle}>
          <h1>{titleSpecies}</h1>
          <h2>
            {titleFunction}: {titleBrief}
          </h2>
          <div className={styles.displaySelect}>
            <DisplaySelect
              currentDisplay={currentDisplay}
              setDisplay={setCurrentDisplay}
            />
          </div>
        </div>
        <hr />
        <div className={styles.cardBody}>
          <div>
            <p>{bodyDescription}</p>
          </div>
          <hr />
          <div>
            <SequenceCard sequence={bodySequence} length={bodyLength} />
          </div>
        </div>
        <hr />
        <div className={styles.cardFoot}>
          <p className={styles.username}>Submitted by {footUser}</p>
          <p className={styles.userdate}>Submitted on {footDate}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
