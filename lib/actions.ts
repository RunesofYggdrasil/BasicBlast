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

export async function handleUploadSequence(formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
    species: formData.get("species"),
    brief: formData.get("brief"),
    description: formData.get("description"),
    sequence: formData.get("sequence"),
  };
  if (
    rawFormData.name &&
    rawFormData.species &&
    rawFormData.description &&
    rawFormData.sequence
  ) {
    if (rawFormData.brief) {
      const postSequenceBody = JSON.stringify({
        name: rawFormData.name,
        species: rawFormData.species,
        brief: rawFormData.brief,
        description: rawFormData.description,
        sequence: rawFormData.sequence,
        posted: true,
      });
      const postSequenceRequest = await fetchDB(
        "/api/sequences",
        "POST",
        postSequenceBody
      );
    } else {
      const postSequenceBody = JSON.stringify({
        name: rawFormData.name,
        species: rawFormData.species,
        description: rawFormData.description,
        sequence: rawFormData.sequence,
        posted: true,
      });
      const postSequenceRequest = await fetchDB(
        "/api/sequences",
        "POST",
        postSequenceBody
      );
    }
  }
}
