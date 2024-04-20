import React from "react";
import styles from "./SequenceCard.module.css";

interface SequenceProps {
  sequence: string;
  length: number;
}

const SequenceCard = ({ sequence, length }: SequenceProps) => {
  return (
    <div>
      {sequence} + {length}
    </div>
  );
};

export default SequenceCard;
