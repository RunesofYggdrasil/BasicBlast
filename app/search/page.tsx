"use server";

import { Sequence } from "@prisma/client";
import fetchDB from "../api/fetch";
import ResultsPage from "../components/ResultsPage";
import SearchBar from "../components/SearchBar";

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

export default async function Search() {
  const subjectArray = [];
  const data = await fetchDB("/api/posted-sequences", "GET", "N/A");
  const sequences = data.sequences;
  for (let dataIndex = 0; dataIndex < sequences.length; dataIndex++) {
    subjectArray[dataIndex] = sequences[dataIndex];
  }

  const querySequence = generateNucleotideSequence(50);
  const postQueryBody = JSON.stringify({
    name: "Search",
    sequence: querySequence,
    posted: false,
  });
  const postQueryRequest = await fetchDB(
    "/api/sequences",
    "POST",
    postQueryBody
  );
  let postQueryResponse;
  if (postQueryRequest.duplicate) {
    postQueryResponse = await fetchDB(
      "/api/sequences/" + postQueryRequest.duplicate.id,
      "GET",
      "N/A"
    );
  } else {
    postQueryResponse = await fetchDB(
      "/api/sequences/" + postQueryRequest.sequence.id,
      "GET",
      "N/A"
    );
  }
  return (
    <ResultsPage
      query={postQueryResponse.sequence}
      subjectArray={subjectArray}
    />
  );
}

// export default async function Search() {
//   return (
//     <>
//       <SearchBar />
//     </>
//   );
// }
