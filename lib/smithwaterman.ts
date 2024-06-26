import fetchDB from "@/app/api/fetch";
import { Sequence } from "@prisma/client";

// Source: https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm
let SmithWaterman = function (
  querySequence: Sequence,
  subjectSequence: Sequence
) {
  const compMatrix: number[][] = [];
  compMatrix.length = 0;
  const rowCount = subjectSequence.sequence.length + 1;
  const colCount = querySequence.sequence.length + 1;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    let currentRow: number[] = [];
    currentRow.length = 0;
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      if (rowIndex == 0 || colIndex == 0) {
        currentRow[colIndex] = 0;
      } else {
        currentRow[colIndex] = -1;
      }
    }
    compMatrix[rowIndex] = currentRow;
  }

  const getMatrix = function () {
    return compMatrix;
  };
  const getMatrixString = function () {
    let matrixString = "[";
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        if (colIndex < colCount - 1) {
          matrixString += compMatrix[rowIndex][colIndex] + ", ";
        } else {
          if (rowIndex < rowCount - 1) {
            matrixString += compMatrix[rowIndex][colIndex] + "\n";
          } else {
            matrixString += compMatrix[rowIndex][colIndex];
          }
        }
      }
    }
    matrixString += "]";
    return matrixString;
  };
  const getMatrixAtIndex = function (iIndex: number, jIndex: number): number {
    return compMatrix[iIndex][jIndex];
  };
  const getLargestIndex = function (): number[] {
    const largestIndex = [0, 0];
    let largestValue = 0;
    for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
      for (let colIndex = 1; colIndex < colCount; colIndex++) {
        if (getMatrixAtIndex(rowIndex, colIndex) >= largestValue) {
          largestValue = getMatrixAtIndex(rowIndex, colIndex);
          largestIndex[0] = rowIndex;
          largestIndex[1] = colIndex;
        }
      }
    }
    return largestIndex;
  };

  const getSimilarityScore = function (
    comparisonType: string,
    iIndex: number,
    jIndex: number
  ): number {
    if (comparisonType == "DNA") {
      if (
        querySequence.sequence[jIndex - 1] ==
        subjectSequence.sequence[iIndex - 1]
      ) {
        return 1;
      } else {
        return -2;
      }
    } else {
      return 0;
    }
    // use PAM for amino acid comparison score matrix
  };

  // Linear Gap Penalty
  const getGapLength = function (
    direction: boolean,
    iIndex: number,
    jIndex: number
  ): number {
    // True = Vertical, False = Horizontal
    if (
      getSimilarityScore("DNA", iIndex, jIndex) == 1 ||
      iIndex == 0 ||
      jIndex == 0
    ) {
      return 0;
    } else {
      if (direction) {
        return getGapLength(direction, iIndex - 1, jIndex) + 1;
      } else {
        return getGapLength(direction, iIndex, jIndex - 1) + 1;
      }
    }
  };

  const getScore = function (iIndex: number, jIndex: number) {
    const scoreBonus = 2;
    const gapPenaltyOpen = 2;
    const gapPenaltyExtend = 1;
    let firstEquation =
      getMatrixAtIndex(iIndex - 1, jIndex - 1) +
      getSimilarityScore("DNA", iIndex, jIndex) * scoreBonus;
    let kGap = getGapLength(true, iIndex, jIndex);
    let secondEquation = 0;
    let thirdEquation = 0;
    if (kGap > 0) {
      secondEquation =
        getMatrixAtIndex(iIndex - kGap, jIndex) -
        (gapPenaltyOpen + (kGap - 1) * gapPenaltyExtend);
    }
    let lGap = getGapLength(false, iIndex, jIndex);
    if (lGap > 0) {
      thirdEquation =
        getMatrixAtIndex(iIndex, jIndex - lGap) -
        (gapPenaltyOpen + (lGap - 1) * gapPenaltyExtend);
    }
    let maxValue = Math.max(firstEquation, secondEquation, thirdEquation, 0);
    return maxValue;
  };

  const getEntireScore = function () {
    for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
      for (let colIndex = 1; colIndex < colCount; colIndex++) {
        compMatrix[rowIndex][colIndex] = getScore(rowIndex, colIndex);
      }
    }
    return compMatrix;
  };

  const getTraceback = function (iIndex: number, jIndex: number): string[] {
    const tracebackArray = ["", ""];
    let diagonalValue = 0;
    let aboveValue = 0;
    if (iIndex > 0 && jIndex > 0) {
      diagonalValue = getMatrixAtIndex(iIndex - 1, jIndex - 1);
      aboveValue = getMatrixAtIndex(iIndex - 1, jIndex);
    } else if (iIndex > 0) {
      aboveValue = getMatrixAtIndex(iIndex - 1, jIndex);
    }
    if (diagonalValue == 0 || aboveValue == 0) {
      tracebackArray[0] += subjectSequence.sequence[iIndex - 1];
      tracebackArray[1] += querySequence.sequence[jIndex - 1];
    } else {
      if (diagonalValue >= aboveValue) {
        const diagonalTraceback = getTraceback(iIndex - 1, jIndex - 1);
        tracebackArray[0] +=
          diagonalTraceback[0] + subjectSequence.sequence[iIndex - 1];
        tracebackArray[1] +=
          diagonalTraceback[1] + querySequence.sequence[jIndex - 1];
      } else {
        const verticalTraceback = getTraceback(iIndex - 1, jIndex);
        tracebackArray[0] +=
          verticalTraceback[0] + subjectSequence.sequence[iIndex - 1];
        tracebackArray[1] += verticalTraceback[1] + "-";
      }
    }
    return tracebackArray;
  };

  const getDoubleTraceback = function (
    iIndex: number,
    jIndex: number
  ): string[] {
    const tracebackArray = ["", ""];
    let diagonalValue = 0;
    let aboveValue = 0;
    let besideValue = 0;
    if (iIndex > 0 && jIndex > 0) {
      diagonalValue = getMatrixAtIndex(iIndex - 1, jIndex - 1);
      aboveValue = getMatrixAtIndex(iIndex - 1, jIndex);
      besideValue = getMatrixAtIndex(iIndex, jIndex - 1);
    } else if (iIndex > 0) {
      aboveValue = getMatrixAtIndex(iIndex - 1, jIndex);
    } else if (jIndex > 0) {
      besideValue = getMatrixAtIndex(iIndex, jIndex - 1);
    }
    if (diagonalValue == 0 || aboveValue == 0 || besideValue == 0) {
      tracebackArray[0] += subjectSequence.sequence[iIndex - 1];
      tracebackArray[1] += querySequence.sequence[jIndex - 1];
    } else {
      if (diagonalValue >= aboveValue && diagonalValue >= besideValue) {
        const diagonalTraceback = getDoubleTraceback(iIndex - 1, jIndex - 1);
        tracebackArray[0] +=
          diagonalTraceback[0] + subjectSequence.sequence[iIndex - 1];
        tracebackArray[1] +=
          diagonalTraceback[1] + querySequence.sequence[jIndex - 1];
      } else if (aboveValue >= diagonalValue && aboveValue >= besideValue) {
        const verticalTraceback = getDoubleTraceback(iIndex - 1, jIndex);
        tracebackArray[0] +=
          verticalTraceback[0] + subjectSequence.sequence[iIndex - 1];
        tracebackArray[1] += verticalTraceback[1] + "-";
      } else if (besideValue >= diagonalValue && besideValue >= aboveValue) {
        const horizontalTraceback = getDoubleTraceback(iIndex, jIndex - 1);
        tracebackArray[0] += horizontalTraceback[0] + "-";
        tracebackArray[1] +=
          horizontalTraceback[1] + querySequence.sequence[jIndex - 1];
      }
    }
    return tracebackArray;
  };

  const createMatch = async function () {
    const postMatchBody = JSON.stringify({
      queryComparison: "",
      subjectComparison: "",
      length: 0,
      identities: 0,
      queryID: querySequence.id,
      subjectID: subjectSequence.id,
    });
    const postMatchRequest = await fetchDB(
      "/api/matches",
      "POST",
      postMatchBody
    );
    let postMatchResponse;
    if (postMatchRequest.duplicate) {
      postMatchResponse = await fetchDB(
        "/api/matches/" + postMatchRequest.duplicate.id,
        "GET",
        "N/A"
      );
      return postMatchResponse.match;
    } else {
      postMatchResponse = await fetchDB(
        "/api/matches/" + postMatchRequest.match.id,
        "GET",
        "N/A"
      );
      getEntireScore();
      const largestIndex = getLargestIndex();
      const sequenceComparison = getDoubleTraceback(
        largestIndex[0],
        largestIndex[1]
      );
      const sequenceLength = sequenceComparison[0].length;
      let sequenceIdentities = 0;
      for (
        let sequenceIndex = 0;
        sequenceIndex < sequenceComparison[1].length;
        sequenceIndex++
      ) {
        if (
          sequenceComparison[1][sequenceIndex] ==
          sequenceComparison[0][sequenceIndex]
        ) {
          sequenceIdentities++;
        }
      }
      const putMatchBody = JSON.stringify({
        comparisonType: "SMITHWATERMAN",
        queryComparison: sequenceComparison[1],
        subjectComparison: sequenceComparison[0],
        length: sequenceLength,
        identities: sequenceIdentities,
        queryID: querySequence.id,
        subjectID: subjectSequence.id,
      });
      const putMatchRequest = await fetchDB(
        "/api/matches/" + postMatchResponse.match.id,
        "PUT",
        putMatchBody
      );
      return putMatchRequest.match;
    }
  };

  return {
    getMatrix,
    getMatrixString,
    getLargestIndex,
    getEntireScore,
    getTraceback,
    createMatch,
  };
};

export default SmithWaterman;
