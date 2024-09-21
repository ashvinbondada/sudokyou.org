interface Tile {
    isEditable  : boolean;
    squareValue : number;
    squareNotes : number[]; // 9 note boxes
}

interface SudokuInterface {
    boardValues             : Tile[];
    updateSudokuInterface   : (newState: Partial<SudokuInterface>) => void
}

type directionIndex = {
    direction: string,
    index: number
}
type HighlightedCells = {
    shadowBlock     : directionIndex[] 
    neighborhood    : number[] 
    sameNumbers     : number[];
}

interface GameInterface {
    isShiftDown         : boolean;
    inputValue          : number;
    selectedCell        : number;  //  probably an index in the boardValues Array
    highlightedCells    : HighlightedCells;
    gameStatus          : GameStatus;
    timer              ?: number; // idk about this one
    mistakesCount       : number; // max 3
    updateGameInterface : (newState: Partial<GameInterface>) => void
}


