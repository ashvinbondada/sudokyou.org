
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
    return highlightedCells
};
