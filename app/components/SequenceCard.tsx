import React from "react";
import styles from "./SequenceCard.module.css";

interface SequenceProps {
  sequence: string;
}

const SequenceCard = ({ sequence }: SequenceProps) => {
  return <div>{sequence}</div>;
};

export default SequenceCard;
