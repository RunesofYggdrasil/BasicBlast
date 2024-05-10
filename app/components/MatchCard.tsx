"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MatchCard.module.css";
import SequenceCard from "./SequenceCard";
import DisplaySelect from "./DisplaySelect";

interface MatchProps {
  displaySetting: string;
  displaySetter: Dispatch<SetStateAction<string>>;
  titleName: string;
  titleSpecies: string;
  titleBrief: string | null;
  bodyDescription: string | null;
  bodyQuery: string;
  bodySubject: string;
  bodySequenceID: string;
  footUser: string;
  footDate: string;
}

const MatchCard = ({
  displaySetting,
  displaySetter,
  titleName,
  titleSpecies,
  titleBrief,
  bodyDescription,
  bodyQuery,
  bodySubject,
  bodySequenceID,
  footUser,
  footDate,
}: MatchProps) => {
  // let [currentDisplay, setCurrentDisplay] = useState(displaySetting);
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
              currentDisplay={displaySetting}
              setDisplay={displaySetter}
            />
          </div>
        </div>
        <div
          className={
            displaySetting == "Full" || displaySetting == "Half"
              ? styles.cardBody
              : styles.displayNone
          }
        >
          <hr />
          <div
            className={
              displaySetting == "Full" ? "Display" : styles.displayNone
            }
          >
            <p>{bodyDescription}</p>
            <hr />
          </div>
          <div>
            <SequenceCard
              querySequence={bodyQuery}
              subjectSequence={bodySubject}
              sequenceID={bodySequenceID}
            />
          </div>
        </div>
        <div
          className={displaySetting == "Full" ? "Display" : styles.displayNone}
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
