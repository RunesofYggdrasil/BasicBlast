import React from "react";
import styles from "./MatchCard.module.css";
import SequenceCard from "./SequenceCard";

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
  return (
    <div className={styles.matchCard}>
      <div className={styles.innerCard}>
        <div className={styles.cardTitle}>
          <h1>{titleSpecies}</h1>
          <h2>
            {titleFunction}: {titleBrief}
          </h2>
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
