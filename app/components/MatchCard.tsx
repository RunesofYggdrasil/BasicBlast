import React from "react";
import styles from "./MatchCard.module.css";
import SequenceCard from "./SequenceCard";

interface MatchProps {
  titleSpecies: string;
  titleFunction: string;
  titleBrief: string;
  bodyDescription: string;
  bodySequence: string;
}

const MatchCard = ({
  titleSpecies,
  titleFunction,
  titleBrief,
  bodyDescription,
  bodySequence,
}: MatchProps) => {
  return (
    <div className={styles.matchCard}>
      <h1>{titleSpecies}</h1>
      <h2>
        {titleFunction}: {titleBrief}
      </h2>
      <div>{bodyDescription}</div>
      <div>
        <SequenceCard sequence={bodySequence} />
      </div>
    </div>
  );
};

export default MatchCard;
