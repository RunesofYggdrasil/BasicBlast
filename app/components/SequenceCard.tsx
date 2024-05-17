"use server";

import React from "react";
import styles from "./SequenceCard.module.css";

interface SequenceProps {
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
}

const SequenceCard = async ({ match }: SequenceProps) => {
  return (
    <>
      <div className={styles.sequenceData}>
        <p>{match.comparisonLength}</p>
      </div>
      <div className={styles.sequenceAlignment}>
        <div className={styles.rowAlignment}>
          <p>{match.queryComparison}</p>
          <p>{match.subjectComparison}</p>
        </div>
      </div>
    </>
  );
};

export default SequenceCard;
