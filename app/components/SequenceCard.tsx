"use server";

import React from "react";
import styles from "./SequenceCard.module.css";
import ComparisonMatrix from "./ComparisonMatrix";
import { Sequence } from "@prisma/client";

interface SequenceProps {
  querySequence: Sequence;
  subjectSequence: Sequence;
}

const SequenceCard = async ({
  querySequence,
  subjectSequence,
}: SequenceProps) => {
  const compMatrix = ComparisonMatrix(querySequence, subjectSequence);
  console.log(compMatrix.createMatch());
  return (
    <>
      <div className={styles.sequenceData}>
        <p>{subjectSequence.sequence.length}</p>
      </div>
      <div className={styles.sequenceAlignment}>
        <div className={styles.rowAlignment}>
          <p>{querySequence.sequence}</p>
          <p>{subjectSequence.sequence}</p>
        </div>
      </div>
    </>
  );
};

export default SequenceCard;
