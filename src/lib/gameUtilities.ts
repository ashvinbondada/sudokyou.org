export const libUpdateHoveringCell = (prevState: SudokuInterface, hoveringCell: number) => {
    const newSelectedCells = prevState.selectedCells.slice();
    newSelectedCells[0] = hoveringCell;

    return {
      ...prevState,
      selectedCells: newSelectedCells
    };
  };

export const libAddAnchors = (prevState: SudokuInterface, anchor: number) => {
  const newSelectedCells = prevState.selectedCells.slice()
  newSelectedCells.push(anchor)

  const newAnchorNums = new Map(prevState.highlightedCells.anchorNums)
  const squareValue = prevState.boardValues[anchor].squareValue
  if (squareValue > 0)
      newAnchorNums.set(squareValue, (newAnchorNums.get(squareValue) || 0) + 1);
  return {
    ...prevState,
    selectedCells: newSelectedCells,
    highlightedCells: {
      ...prevState.highlightedCells,
      anchorNums: newAnchorNums
    }
  }
}

export const libDeleteAnchor = (prevState: SudokuInterface, anchor: number) => {
  const newSelectedCells = prevState.selectedCells
  .slice()
  .filter((cell, index) => index === 0 || cell !== anchor); 

  const newAnchorNums = new Map(prevState.highlightedCells.anchorNums)
  const squareValue = prevState.boardValues[anchor].squareValue
  if (squareValue > 0)
      newAnchorNums.set(squareValue, (newAnchorNums.get(squareValue) || 0) - 1);

  return {
    ...prevState,
    selectedCells: newSelectedCells,
    highlightedCells: {
      ...prevState.highlightedCells,
      anchorNums: newAnchorNums
    }
  }
}

export const libClearAnchor = (prevState: SudokuInterface) => {
  const newSelectedCells = prevState.selectedCells.slice()
  const anchorNums = new Map<number, number>(
    Array.from({ length: 9 }, (_, i) => [i + 1, 0])
  );

  return {
      ...prevState,
      selectedCells: newSelectedCells.slice(0,1),
      highlightedCells: {
        ...prevState.highlightedCells,
        anchorNums
      }
  }
}
