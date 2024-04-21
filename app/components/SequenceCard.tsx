import React from "react";
import styles from "./SequenceCard.module.css";

interface SequenceProps {
  sequence: string;
  length: number;
}

const SequenceCard = ({ sequence, length }: SequenceProps) => {
  const sequenceArray: string[] = [];
  sequenceArray.length = 0;
  let arrayIndex = 0;
  for (
    let sequenceIndex = 0;
    sequenceIndex < sequence.length;
    sequenceIndex += 100
  ) {
    let sequenceSubset = sequence.substring(sequenceIndex, sequenceIndex + 100);
    sequenceArray[arrayIndex] = sequenceSubset;
    arrayIndex++;
  }

  return (
    <>
      <div>
        <p>{sequence.length}</p>
      </div>
      <div className={styles.sequenceAlignment}>
        {sequenceArray.map((subset) => {
          return (
            <div className={styles.rowAlignment}>
              <p>{subset}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SequenceCard;
