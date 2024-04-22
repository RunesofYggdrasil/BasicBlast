import React from "react";
import styles from "./SequenceCard.module.css";

interface SequenceProps {
  sequence: string;
  sequenceID: string;
}

const SequenceCard = ({ sequence, sequenceID }: SequenceProps) => {
  return (
    <>
      <div className={styles.sequenceData}>
        <p>{sequence.length}</p>
      </div>
      <div className={styles.sequenceAlignment}>
        <div className={styles.rowAlignment}>
          <p>{sequence}</p>
        </div>
      </div>
    </>
  );
};

export default SequenceCard;
