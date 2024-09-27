// Interface responsible for a tile
// containing relevant value, notes, 
// and meta data regarding its state.

// enum tileType {
//     GIVEN, // black
//     WRONG, // red
//     RIGHT // blue
// }

interface Tile {
    // given or user entered status 
    isEditable  : any; // tileType in lib/common.ts
    // current value of square ranging from -1 (backspace), 0 (default) and 1-9 numbers
    squareValue : number;
    // current notes applied on square
    squareNotes : number[]; // 9 note boxes
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
    // helper function to update Sudoku data
    updateSudokuInterface   ?: (newState: Partial<SudokuInterface>) => void;
}


// Meta data responsible for contain information
// about all tiles to shadow, highlight and apply
// special affect to
type HighlightedCells = {
    // rows, columns, and grid colored with respect to selectedCell
    neighborhood    : number[] 
    // tiles which have the same number as selectedCell
    sameNumbers     : number[];
}


// Interface responsible for definin
interface GameInterface {
    // notes mode toggle
    notesMode           : boolean;
    // input value entered in selected tile
    inputValue          : number;
    // tile that user is choosing to edit
    selectedCell        : number;  
    // tiles higlighted for user, unable to edit atm
    highlightedCells    : HighlightedCells;
    // status of the game 
    gameStatus          : GameStatus;
    // time user takes to complete puzzle
    timer              ?: number; 
    // mistakes before game is terminated
    mistakesCount       : number; // max 3
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