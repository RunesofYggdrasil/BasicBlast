"use server";

import fetchDB from "../api/fetch";
import ResultsPage from "../components/ResultsPage";
import SearchBar from "../components/SearchBar";

export default async function Search() {
  const sequenceArray = [];
  const data = await fetchDB("/api/sequences", "GET", "N/A");
  const sequences = data.sequences;
  for (let dataIndex = 0; dataIndex < sequences.length; dataIndex++) {
    sequenceArray[dataIndex] = sequences[dataIndex];
  }
  return <ResultsPage sequenceArray={sequenceArray} />;
}

// export default async function Search() {
//   return (
//     <>
//       <SearchBar />
//     </>
//   );
// }
