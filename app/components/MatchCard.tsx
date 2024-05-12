"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MatchCard.module.css";
import DisplaySelect from "./DisplaySelect";
import { Sequence } from "@prisma/client";

interface MatchProps {
  displaySetting: string;
  querySequence: Sequence;
  subjectSequence: Sequence;
  children: React.ReactNode;
}

const MatchCard = ({
  displaySetting,
  querySequence,
  subjectSequence,
  children,
}: MatchProps) => {
  let [currentDisplay, setCurrentDisplay] = useState(displaySetting);
  return (
    <div className={styles.matchCard}>
      <div className={styles.innerCard}>
        <div className={styles.cardTitle}>
          <h1>{subjectSequence.name}</h1>
          <h2>
            {subjectSequence.species}: {subjectSequence.brief}
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
            <p>{subjectSequence.description}</p>
            <hr />
          </div>
          <div>{children}</div>
        </div>
        <div
          className={currentDisplay == "Full" ? "Display" : styles.displayNone}
        >
          <hr />
          <div className={styles.cardFoot}>
            <p className={styles.username}>
              Submitted by {subjectSequence.posterID}
            </p>
            <p className={styles.userdate}>
              Submitted on {subjectSequence.date.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
