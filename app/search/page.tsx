"use server";

import fetchDB from "../api/fetch";
import SearchPage from "../components/SequencePage";

export default async function Search() {
  const sequenceArray = [];
  const data = await fetchDB("/api/sequences", "GET", "N/A");
  const sequences = data.sequences;
  for (let dataIndex = 0; dataIndex < sequences.length; dataIndex++) {
    sequenceArray[dataIndex] = sequences[dataIndex];
  }
  return <SearchPage sequenceArray={sequenceArray} />;
}
