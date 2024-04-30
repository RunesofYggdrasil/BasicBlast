// Source: https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm
let ComparisonMatrix = function (
  querySequence: string,
  subjectSequence: string
) {
  const compMatrix: number[][] = [];
  compMatrix.length = 0;
  const rowCount = subjectSequence.length + 1;
  const colCount = querySequence.length + 1;
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
      if (querySequence[jIndex - 1] == subjectSequence[iIndex - 1]) {
        return 1;
      } else {
        return -1;
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
    const scoreBonus = 3;
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
    const diagonalValue = getMatrixAtIndex(iIndex - 1, jIndex - 1);
    const aboveValue = getMatrixAtIndex(iIndex - 1, jIndex);
    if (diagonalValue == 0 || aboveValue == 0) {
      tracebackArray[0] += subjectSequence[iIndex - 1];
      tracebackArray[1] += querySequence[jIndex - 1];
    } else {
      if (diagonalValue >= aboveValue) {
        tracebackArray[0] +=
          getTraceback(iIndex - 1, jIndex - 1)[0] + subjectSequence[iIndex - 1];
        tracebackArray[1] +=
          getTraceback(iIndex - 1, jIndex - 1)[1] + querySequence[jIndex - 1];
      } else {
        tracebackArray[0] +=
          getTraceback(iIndex - 1, jIndex)[0] + subjectSequence[iIndex - 1];
        tracebackArray[1] += getTraceback(iIndex - 1, jIndex)[1] + "-";
      }
    }
    return tracebackArray;
  };

  return {
    getMatrix,
    getMatrixString,
    getLargestIndex,
    getEntireScore,
    getTraceback,
  };
};

export default ComparisonMatrix;
