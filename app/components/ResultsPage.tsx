"use server";

import React, { Dispatch, SetStateAction, useState } from "react";
import MatchCard from "./MatchCard";
import DisplaySelect from "./DisplaySelect";
import { Sequence } from "@prisma/client";
import SequenceCard from "./SequenceCard";

interface SequenceProps {
  query: Sequence;
  subjectArray: Sequence[];
}

const ResultsPage = ({ query, subjectArray }: SequenceProps) => {
  return (
    <>
      {subjectArray.map((subject, index) => {
        return (
          <MatchCard
            key={subject.id}
            displaySetting="Half"
            querySequence={query}
            subjectSequence={subject}
          >
            <SequenceCard querySequence={query} subjectSequence={subject} />
          </MatchCard>
        );
      })}
    </>
  );
};

export default ResultsPage;
