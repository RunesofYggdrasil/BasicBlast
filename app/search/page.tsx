"use server";

import { Match, Sequence } from "@prisma/client";
import fetchDB from "../api/fetch";
import ResultsPage from "../components/ResultsPage";
import SearchBar from "../components/SearchBar";
import ComparisonMatrix from "../components/ComparisonMatrix";

interface SearchProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Search({ searchParams }: SearchProps) {
  const getQueryRequest = await fetchDB(
    "/api/sequences/" + searchParams.id,
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
    let getUserRequest = await fetchDB(
      "/api/users/" + getSubjectResponse[dataIndex].posterID,
      "GET",
      "N/A"
    );

    const comparisonMatrix = ComparisonMatrix(
      getQueryResponse,
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
