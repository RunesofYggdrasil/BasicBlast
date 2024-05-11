"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import MatchCard from "./MatchCard";
import DisplaySelect from "./DisplaySelect";
import { Sequence } from "@prisma/client";

interface SequenceProps {
  sequenceArray: Sequence[];
}

// Test Setup
const generateNucleotideSequence = (sequenceLength: number) => {
  const nucleotides: string[] = ["G", "C", "A", "T"];
  let nucleotideString: string = "";
  for (let index = 0; index < sequenceLength; index++) {
    let randomIndex: number = Math.floor(Math.random() * nucleotides.length);
    nucleotideString += nucleotides[randomIndex];
  }
  return nucleotideString;
};

const ResultsPage = ({ sequenceArray }: SequenceProps) => {
  const displaySetters: Dispatch<SetStateAction<string>>[] = [];
  let [defaultDisplay, setDefaultDisplay] = useState("Half");
  displaySetters[0] = setDefaultDisplay;

  const query: string = generateNucleotideSequence(30);
  return (
    <>
      <DisplaySelect
        currentDisplay={defaultDisplay}
        setDisplay={displaySetters}
      />
      {sequenceArray.map((sequence, index) => {
        let [currentDisplay, setDisplay] = useState(defaultDisplay);
        displaySetters[index + 1] = setDisplay;
        return (
          <MatchCard
            key={sequence.id}
            displaySetting={currentDisplay}
            displaySetter={setDisplay}
            titleName={sequence.name}
            titleSpecies={sequence.species}
            titleBrief={sequence.brief}
            bodyDescription={sequence.description}
            bodyQuery={query}
            bodySubject={sequence.sequence}
            bodySequenceID={sequence.id.toString()}
            footUser="Test User"
            footDate="Test Date"
          />
        );
      })}
    </>
  );
};

export default ResultsPage;
