"use client";

import React from "react";
import MatchCard from "../components/MatchCard";

const BlastPage = () => {
  const defaultDisplay = "Half";
  return (
    <>
      <MatchCard
        displaySetting={defaultDisplay}
        titleName="R"
        titleSpecies="M"
        titleBrief="B"
        bodyDescription="Blahhhh Blahhh"
        bodySequence="tgagtactgaccagaatgccgtttacctttaaactagattgctggacgcgactgatgaagctttggttctagctgcgctgtgtgtctgcatagacgatggagggagcccgctgtatggtatggacttccgagacatcaaggctagcagggactaagctgttccattggtgccggttactattccccaggcgcaacttggccagataggagaagatacgtcagtggtctggggagtcggactattgaaccgaccagcgttgtgagtccagtaaagtcaggcagtatccttaaacccggggggacgcacagacccgcgatctagtggtcgggccggcggattagggcagcccccgggggcacgttgaacctcattgtgtatactctgagcacctttgggtcatggcggtgacggccccctgtctccaaaggtcagagcgatttagcacacatatttaggaccaacccgtgatcgtgagtctgtcactcatgccatctgttgt"
        bodyLength={500}
        footUser="User"
        footDate="Date"
      />
      <MatchCard
        displaySetting={defaultDisplay}
        titleName="S"
        titleSpecies="T"
        titleBrief="U"
        bodyDescription="Blahhhh Blahhh"
        bodySequence="gaggagaagagtggaggagccggtctaccccctcccgttcccagtcttaattgatattaacactttctcaagctttaatggattgttaattgattcccggcaacggcatgtcgaaagttaatcagcgttctatgtgtttattgcggcagaaaaggtcaccgaagataattcgaaggtgagctcgagtctcgcgatcctggacgcactgagattatagtttttaagcaaacattaaggcagttcaaagtctccttgacagaaatccggcccctggacactctgtaccccctatttatgtgcctgaagctttcttcaatttggccaggtgctacacagaggcggcgggctgttgatattaacacggacgcgagagtgcattaactccacatttactttatgtcttagaggccagtaacagcgttagctgtccaccaggctaatcttgtctacttgctaaatatgccgcacttcatttgttacattattgtcggtttgcgcgg"
        bodyLength={500}
        footUser="User 2"
        footDate="Date 2"
      />
    </>
  );
};

export default BlastPage;
