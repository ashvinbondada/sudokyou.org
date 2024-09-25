
export const calculateHighlightCells = (
  selectedCell: number,
  boardData: SudokuInterface,
  gridSize = 9
) => {
  const selectedRow = Math.floor(selectedCell / gridSize);
  const selectedCol = selectedCell % gridSize;
  
  const blockRowStart = Math.floor(selectedRow / 3) * 3;
  const blockColStart = Math.floor(selectedCol / 3) * 3;

  const blockCells: number[] = [];
  const rowCells: number[] = [];
  const colCells: number[] = [];

  for (let row = blockRowStart; row < blockRowStart + 3; row++) {
    for (let col = blockColStart; col < blockColStart + 3; col++) {
      blockCells.push(row * gridSize + col);
    }
  }

  for (let col = 0; col < gridSize; col++) {
    rowCells.push(selectedRow * gridSize + col);
  }

  for (let row = 0; row < gridSize; row++) {
    colCells.push(row * gridSize + selectedCol);
  }

  const sameNumCells = boardData.boardValues
    .map((tile: Tile, index) => [tile.squareValue, index])
    .filter(([value]) => value > 0 && value === boardData.boardValues[selectedCell].squareValue)
    .map(([, index]) => index);

  const combinedCells = Array.from(new Set([...blockCells, ...rowCells, ...colCells]));
  const highlightedCells: HighlightedCells = {
    neighborhood: combinedCells,
    sameNumbers: sameNumCells,
  }
//   const shadowBlock = [
//     { direction: "top-left", index: selectedCell - 10 },
//     { direction: "top", index: selectedCell - 9 },
//     { direction: "top-right", index: selectedCell - 8 },
//     { direction: "left", index: selectedCell - 1 },
//     { direction: "right", index: selectedCell + 1 },
//     { direction: "bottom-left", index: selectedCell + 8 },
//     { direction: "bottom", index: selectedCell + 9 },
//     { direction: "bottom-right", index: selectedCell + 10 }
//   ].filter((dirIdx) => dirIdx.index > -1 && dirIdx.index < 81);

//   return [combinedCells, sameNumCells];
    return highlightedCells
};

// export function removeNotes (
//     inputValue: number, 
//     selectedCell: number,
//     boardValues: Tile[], 
//     highlightedCells: HighlightedCells
//   ): Tile[] {
//     const { neighborhood } = highlightedCells;
//     console.log("passed in", inputValue)
//     // Create a new array of updated boardValues to avoid mutating the original
//     const updatedBoardValues = boardValues.map((tile, index) => {
//       if (index != selectedCell && neighborhood.includes(index)) {
//         const updatedNotes = tile.squareNotes.map(note => note === inputValue ? 0 : note);
//         return {
//           ...tile,
//           squareNotes: updatedNotes
//         };
//       }
//       return tile; // Return unchanged tile if it's not in the neighborhood
//     });
//     console.log(boardValues[selectedCell])
//     return updatedBoardValues;
// };