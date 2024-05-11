import React from "react";
import styles from "./SequenceCard.module.css";
import ComparisonMatrix from "./ComparisonMatrix";

interface SequenceProps {
  querySequence: string;
  subjectSequence: string;
  sequenceID: string;
}

const SequenceCard = ({
  querySequence,
  subjectSequence,
  sequenceID,
}: SequenceProps) => {
  const compMatrix = ComparisonMatrix(querySequence, subjectSequence);
  compMatrix.getEntireScore();
  console.log(compMatrix.createMatch());
  return (
    <>
      <div className={styles.sequenceData}>
        <p>{subjectSequence.length}</p>
      </div>
      <div className={styles.sequenceAlignment}>
        <div className={styles.rowAlignment}>
          <p>{querySequence}</p>
          <p>{subjectSequence}</p>
        </div>
      </div>
    </>
  );
};

export default SequenceCard;
