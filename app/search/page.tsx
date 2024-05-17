"use server";

import { Match, Sequence } from "@prisma/client";
import fetchDB from "../api/fetch";
import ResultsPage from "../components/ResultsPage";
import SearchBar from "../components/SearchBar";
import ComparisonMatrix from "../components/ComparisonMatrix";

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

  const matchesArray = [];
  const getSubjectRequest = await fetchDB(
    "/api/posted-sequences",
    "GET",
    "N/A"
  );
  const getSubjectResponse = getSubjectRequest.sequences;
  for (let dataIndex = 0; dataIndex < getSubjectResponse.length; dataIndex++) {
    let getUserRequest = await fetchDB(
      "/api/users/" + getSubjectResponse[dataIndex].posterID,
      "GET",
      "N/A"
    );

    const comparisonMatrix = ComparisonMatrix(
      postQueryResponse.sequence,
      getSubjectResponse[dataIndex]
    );
    const createSubjectMatch: Match = await comparisonMatrix.createMatch();

    let subjectID = getSubjectResponse[dataIndex].id;
    let subjectName = getSubjectResponse[dataIndex].name;
    let subjectSpeciesBrief = getSubjectResponse[dataIndex].brief
      ? getSubjectResponse[dataIndex].species +
        ": " +
        getSubjectResponse[dataIndex].brief
      : getSubjectResponse[dataIndex].species;
    let subjectDescription = getSubjectResponse[dataIndex].description;
    let comparisonLength = createSubjectMatch.length;
    let queryIdentities = createSubjectMatch.identities;
    let queryComparison = createSubjectMatch.queryComparison;
    let subjectComparison = createSubjectMatch.subjectComparison;
    let subjectPoster = getUserRequest.user.username;
    let subjectDate = getSubjectResponse[dataIndex].date.toString();
    let match = {
      subjectID,
      subjectName,
      subjectSpeciesBrief,
      subjectDescription,
      comparisonLength,
      queryIdentities,
      queryComparison,
      subjectComparison,
      subjectPoster,
      subjectDate,
    };
    matchesArray[dataIndex] = match;
  }
  return <ResultsPage matches={matchesArray} />;
}

// export default async function Search() {
//   return (
//     <>
//       <SearchBar />
//     </>
//   );
// }
