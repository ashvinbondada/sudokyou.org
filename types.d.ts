// Interface responsible for a tile
// containing relevant value, notes, 
// and meta data regarding its state.
interface Tile {
    // given or user entered status 
    isEditable  : any; // tileType in lib/common.ts
    // current value of square ranging from -1 (backspace), 0 (default) 
    //  and 1-9 numbers
    squareValue : number;
    // current notes applied on square
    squareNotes : number[]; // 9 note boxes
}

// Meta data responsible for contain information
//  about all tiles to shadow, highlight and apply
//  special affect to
type HighlightedCells = {
    // rows, columns, and grid colored with respect to selectedCell
    neighborhood    : number[] 
    // anchoredCells that have a positive squareValue that 
    //  will trigger highlighting of same numbered cells
    anchorNums          : Map<number, number>
}

// Interface responsible for informing and 
// tracking current state of sudoku puzzle
interface SudokuInterface {
    // initial state of the board
    initial: string;
    // final state of the board
    solution                : string;
    // current board values
    boardValues             : Tile[];
    // current cells to edit
    selectedCells        : number[];  
    // highlighted Cells
    highlightedCells    : HighlightedCells;
    // helper function to update Sudoku data
    updateSudokuInterface   ?: (newState: Partial<SudokuInterface>) => void; 
    updateHoveringCell      ?: (selectedCell: number) => void;
    addAnchor               ?: (anchor: number) => void;
    deleteAnchor            ?: (anchor: number) => void;
    clearAnchor             ?: () => void;
    getHoveringCell         ?: () => number
}



type GameSnapShot = {
    // saves cell edited at the time
    selectedCells            : number[];
    // saved baord values at time
    boardValues             : Tile[];
}

// Interface responsible for definin
interface GameInterface {
    // notes mode toggle
    notesMode           : boolean;
    // undo mode toggle
    undoMode            : boolean;
    // toggle for anchor key type in common.ts
    anchorMode         : boolean;
    // backspace toggle 
    backspaceMode       : boolean;
    // input value entered in selected tile
    inputValue          : number;


    // quantity of each number shown in the number tiles
    numToQuantity       : Map<number, number>;
    // status of the game 
    gameStatus          : GameStatus;
    // mistakes before game is terminated
    mistakesCount       : number; // max 3


    // time user takes to complete puzzle
    timer              ?: number; 


    // current move count
    moveCount           : number; 
    // game history 
    gameHistory         : GameSnapShot[];


    // helper function to update Game data
    updateGameInterface ?: (newState: Partial<GameInterface>) => void;
}

// Representation of a Puzzle in Firebase
interface PuzzleString {
    // id retrieved from data base format 'level-number'
    id: string;
    // difficulty of the sudoku puzzle 
    level: string;
    // initial state of the board
    initial: string;
    // final state of the board
    solution: string;
}