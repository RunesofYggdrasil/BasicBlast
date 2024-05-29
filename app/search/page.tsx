"use server";

import { Match, Sequence } from "@prisma/client";
import fetchDB from "../api/fetch";
import ResultsPage from "../components/ResultsPage";
import SearchBar from "../components/SearchBar";
import SmithWaterman from "@/lib/smithwaterman";

interface SearchProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Search({ searchParams }: SearchProps) {
  let getSequencesRequest = await fetchDB("/api/sequences/", "GET", "N/A");
  let getSequencesResponse = getSequencesRequest.sequences[0].id;
  let searchId = getSequencesResponse;
  if (searchParams.id) {
    searchId = searchParams.id;
  }
  const getQueryRequest = await fetchDB(
    "/api/sequences/" + searchId,
    "GET",
    "N/A"
  );
  const getQueryResponse = getQueryRequest.sequence;

  const matchesArray = [];
  const getSubjectRequest = await fetchDB(
    "/api/posted-sequences",
    "GET",
    "N/A"
  );
  const getSubjectResponse = getSubjectRequest.sequences;
  for (let dataIndex = 0; dataIndex < getSubjectResponse.length; dataIndex++) {
    const comparisonMatrix = SmithWaterman(
      getQueryResponse,
      getSubjectResponse[dataIndex]
    );
    const createSubjectMatch: Match = await comparisonMatrix.createMatch();

    let subjectID = getSubjectResponse[dataIndex].id;
    let subjectName = getSubjectResponse[dataIndex].name;
    let subjectSpeciesBrief = getSubjectResponse[dataIndex].brief
      ? getSubjectResponse[dataIndex].species +
        " - " +
        getSubjectResponse[dataIndex].brief
      : getSubjectResponse[dataIndex].species;
    let subjectDescription = getSubjectResponse[dataIndex].description;
    let comparisonLength = createSubjectMatch.length;
    let queryIdentities = createSubjectMatch.identities;
    let queryComparison = createSubjectMatch.queryComparison;
    let subjectComparison = createSubjectMatch.subjectComparison;
    let subjectPoster = "Anonymous";
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
    if (match.queryIdentities / match.comparisonLength > 0.3) {
      matchesArray[dataIndex] = match;
    }
  }
  matchesArray.sort((a, b) => {
    const valueOne = a.queryIdentities;
    const valueTwo = b.queryIdentities;
    return valueTwo - valueOne;
  });
  return (
    <>
      <SearchBar /> <ResultsPage matches={matchesArray} />
    </>
  );
}

// export default async function Search() {
//   return (
//     <>
//       <SearchBar />
//     </>
//   );
// }
