"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import MatchCard from "../components/MatchCard";
import DisplaySelect from "../components/DisplaySelect";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

const getSupabaseData = () => {
  return new Promise(async (resolve) => {
    const { data: seq, error } = await supabase
      .from("seq")
      .select("*")
      .gt("id", 0);
    if (error) {
      console.log(error);
      resolve(null);
    } else {
      resolve(seq);
    }
  });
};
const addSupabaseData = async (index: number, sequence: string) => {
  return new Promise(async (resolve) => {
    const { data: seq, error } = await supabase
      .from("seq")
      .insert({ id: index, seq: sequence });
    if (error) {
      console.log(error);
      resolve(null);
    } else {
      resolve(seq);
    }
  });
};

const test = async () => {
  const data1 = await getSupabaseData();
  // const data2 = await addSupabaseData();
  const data3 = await getSupabaseData();
  console.log(data1);
  // console.log(data2);
  console.log(data3);
};

const SearchPage = () => {
  test();

  const displaySetters: Dispatch<SetStateAction<string>>[] = [];
  let [defaultDisplay, setDefaultDisplay] = useState("Half");
  displaySetters[0] = setDefaultDisplay;

  // Test Setup
  const sequenceArray: string[] = [];
  for (let sequenceIndex = 0; sequenceIndex < 3; sequenceIndex++) {
    let randomLength: number = Math.floor(Math.random() * 20);
    sequenceArray[sequenceIndex] = generateNucleotideSequence(randomLength);
  }
  const query: string = generateNucleotideSequence(10);

  // Note: Use Sequence ID as Key
  return (
    <>
      <DisplaySelect
        currentDisplay={defaultDisplay}
        setDisplay={displaySetters}
      />
      {sequenceArray.map((sequence, index) => {
        let [currentDisplay, setDisplay] = useState(defaultDisplay);
        displaySetters[index + 1] = setDisplay;
        return (
          <MatchCard
            key={index}
            displaySetting={currentDisplay}
            displaySetter={setDisplay}
            titleName="Test Name"
            titleSpecies="Test Species"
            titleBrief="Test Brief"
            bodyDescription="Test Description"
            bodyQuery={query}
            bodySubject={sequence}
            bodySequenceID="Test ID"
            footUser="Test User"
            footDate="Test Date"
          />
        );
      })}
    </>
  );
};

export default SearchPage;
