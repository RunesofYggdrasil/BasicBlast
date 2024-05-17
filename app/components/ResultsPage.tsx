"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import MatchCard from "./MatchCard";
import DisplaySelect from "./DisplaySelect";
import SequenceCard from "./SequenceCard";

interface SequenceProps {
  matches: {
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
  }[];
}

const ResultsPage = ({ matches }: SequenceProps) => {
  const displaySelectSetters: Dispatch<SetStateAction<string>>[] = [];
  let [mainDisplay, setMainDisplay] = useState("Half");
  displaySelectSetters[0] = setMainDisplay;
  return (
    <>
      <DisplaySelect
        currentDisplay={mainDisplay}
        setDisplay={displaySelectSetters}
      />
      {matches.map((match, index) => {
        let [displaySetting, displaySetter] = useState(mainDisplay);
        displaySelectSetters[index + 1] = displaySetter;
        return (
          <MatchCard
            key={match.subjectID}
            displaySetting={displaySetting}
            displaySetter={displaySetter}
            match={match}
          >
            <SequenceCard match={match} />
          </MatchCard>
        );
      })}
    </>
  );
};

export default ResultsPage;
