import React from "react";
import MatchCard from "../components/MatchCard";

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

const BlastPage = () => {
  const defaultDisplay: string = "Half";

  // Test Setup
  const sequenceArray: string[] = [];
  for (let sequenceIndex = 0; sequenceIndex < 10; sequenceIndex++) {
    let randomLength: number = Math.floor(Math.random() * 500);
    sequenceArray[sequenceIndex] = generateNucleotideSequence(randomLength);
  }

  // Note: Use Sequence ID as Key
  return (
    <>
      {sequenceArray.map((sequence, index) => {
        return (
          <MatchCard
            key={index}
            displaySetting={defaultDisplay}
            titleName="Test Name"
            titleSpecies="Test Species"
            titleBrief="Test Brief"
            bodyDescription="Test Description"
            bodySequence={sequence}
            bodySequenceID="Test ID"
            footUser="Test User"
            footDate="Test Date"
          />
        );
      })}
    </>
  );
};

export default BlastPage;
