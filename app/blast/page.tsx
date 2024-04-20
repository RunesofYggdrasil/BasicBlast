"use client";

import React, { useState } from "react";
import MatchCard from "../components/MatchCard";

const BlastPage = () => {
  return (
    <>
      <MatchCard
        displaySetting="Full"
        titleSpecies="R"
        titleFunction="M"
        titleBrief="B"
        bodyDescription="Blahhhh Blahhh"
        bodySequence="blahhhhhhh"
        bodyLength={56}
        footUser="User"
        footDate="Date"
      />
      <MatchCard
        displaySetting="Full"
        titleSpecies="S"
        titleFunction="T"
        titleBrief="U"
        bodyDescription="Blahhhh Blahhh"
        bodySequence="blahhhhhhh"
        bodyLength={56}
        footUser="User 2"
        footDate="Date 2"
      />
    </>
  );
};

export default BlastPage;
