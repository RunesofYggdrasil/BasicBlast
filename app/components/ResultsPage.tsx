"use server";

import React, { Dispatch, SetStateAction, useState } from "react";
import MatchCard from "./MatchCard";
import DisplaySelect from "./DisplaySelect";
import { Sequence } from "@prisma/client";
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
  return (
    <>
      {matches.map((match, index) => {
        return (
          <MatchCard key={match.subjectID} displaySetting="Half" match={match}>
            <SequenceCard match={match} />
          </MatchCard>
        );
      })}
    </>
  );
};

export default ResultsPage;
