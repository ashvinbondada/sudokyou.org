interface Tile {
    isEditable: boolean;
    squareValue: number;
    squareNotes: number[]; // 9 note boxes
}

interface SudokuInterface {
    boardValues: Tile[];
    updateSudokuInterface: (newState: Partial<SudokuInterface>) => void
}

interface GameInterface {
    isShiftDown: boolean;
    inputValue: number;
    selectedCell: number;  //  probably an index in the boardValues Array
    highlightedCells: number[];
    gameStatus: GameStatus;
    timer?: number; // idk about this one
    mistakesCount: number; // max 3
    updateGameInterface: (newState: Partial<GameInterface>) => void
}


