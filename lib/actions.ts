"use server";

import fetchDB from "@/app/api/fetch";
import { redirect } from "next/navigation";

export async function handleSearchSequence(formData: FormData) {
  const rawFormData = {
    search: formData.get("search"),
  };
  if (rawFormData.search) {
    const querySequence = rawFormData.search;
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
    redirect("?id=" + postQueryResponse.sequence.id);
  }
}
