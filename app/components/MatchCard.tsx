"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MatchCard.module.css";
import DisplaySelect from "./DisplaySelect";
import { Sequence } from "@prisma/client";

interface MatchProps {
  displaySetting: string;
  displaySetter: Dispatch<SetStateAction<string>>;
  match: {
    subjectID: number;
    subjectName: string;
    subjectSpeciesBrief: string;
    subjectDescription: string;
    comparisonLength: number;
    queryIdentities: number;
    queryComparison: string;
    subjectComparison: string;
    subjectPoster: string;
    subjectDate: string;
  };
  children: React.ReactNode;
}

const MatchCard = ({
  displaySetting,
  displaySetter,
  match,
  children,
}: MatchProps) => {
  return (
    <div className={styles.matchCard}>
      <div className={styles.innerCard}>
        <div className={styles.cardTitle}>
          <h1>{match.subjectName}</h1>
          <h2>{match.subjectSpeciesBrief}</h2>
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
            <p>{match.subjectDescription}</p>
            <hr />
          </div>
          <div>{children}</div>
        </div>
        <div
          className={displaySetting == "Full" ? "Display" : styles.displayNone}
        >
          <hr />
          <div className={styles.cardFoot}>
            <p className={styles.username}>
              Submitted by {match.subjectPoster}
            </p>
            <p className={styles.userdate}>Submitted on {match.subjectDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
