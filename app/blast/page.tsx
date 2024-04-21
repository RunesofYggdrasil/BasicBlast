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
        footUser="User 2"
        footDate="Date 2"
      />
    </>
  );
};

export default BlastPage;
