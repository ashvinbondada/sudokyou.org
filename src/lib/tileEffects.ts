import { tileType } from "./common";

export const calculateHighlightCells = (
  selectedCell: number,
  // boardData: SudokuInterface,
  // gridSize = 9
) => {
  const gridSize = 9;

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

  // const sameNumCells = boardData.boardValues
  //   .map((tile: Tile, index) => [tile.squareValue, index])
  //   .filter(([value]) => value > 0 && value === boardData.boardValues[selectedCell].squareValue)
  //   .map(([, index]) => index);

  const combinedCells = Array.from(new Set([...blockCells, ...rowCells, ...colCells]));
  const highlightedCells: HighlightedCells = {
    neighborhood: combinedCells,
  }
    return highlightedCells
};

export function calculateAutoCandidates(boardValues: Tile[]): Tile[] {
  // start with an array of 81 Tile[] with all notes filled in
  const completeNotes: Tile[] = Array.from({ length: 81 }, () => ({
    isEditable: tileType.WRONG,
    squareValue: 0,
    squareNotes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  }));

  boardValues.forEach((inputTile, inputIndex: number) => {
    // only inputting valid numbers
    if (inputTile.squareValue > 0) {
      const { neighborhood } = calculateHighlightCells(inputIndex);
      console.log(neighborhood.length) 
      // Directly update the properties of the current tile in completeNotes
      completeNotes[inputIndex] = {
        ...completeNotes[inputIndex],
        isEditable: inputTile.isEditable,
        squareValue: inputTile.squareValue,
        squareNotes: [0,0,0,0,0,0,0,0,0],  // Clear notes for filled squares
      };

      // Iterate over the neighborhood to update the notes
      neighborhood.forEach((cellIndex) => {
        if (cellIndex !== inputIndex) {
          completeNotes[cellIndex] = {
            ...completeNotes[cellIndex],
            squareNotes: completeNotes[cellIndex].squareNotes.map(note => (note === inputTile.squareValue ? 0 : note)),
          };
        }
      });
    }
  });

  return completeNotes;
}

export function clearTile(selectedTile: Tile): Tile {
  if (selectedTile.isEditable !== tileType.GIVEN) { 
    return {
      isEditable: tileType.WRONG,
      squareValue: 0,
      squareNotes: [0,0,0,0,0,0,0,0,0]
    }    
  } 
  return selectedTile
}

export function clearAutoCandidates(boardValues: Tile[]): Tile[] {
  const newBoardValues = boardValues.map((inputTile) => ({
    ...inputTile,
    squareNotes: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Clear notes for filled squares
  }));

  return newBoardValues;
}