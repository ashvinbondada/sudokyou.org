import { createContext} from "react";

// Define the initial default state for the Sudoku board
const defaultBoardState = {
    initial: "",
    solution: "",
    boardValues: Array(81).fill({
        isEditable: false,
        squareValue: 0,
        squareNotes: Array(9).fill(0),
    }),
    updateSudokuInterface: () => {}
};


export enum GameStatus {
    WOMB,
    BORN,
    ALIVE,
    COMA,
    DEAD,
}

// Define the initial default state for the game
const defaultGameState = {
    notesMode: false,
    inputValue: 0,
    selectedCell: 40,
    highlightedCells: { 
        shadowBlock : [
            { direction: "top-left", index: 30 },
            { direction: "top", index: 31 },
            { direction: "top-right", index: 32 },
            { direction: "left", index: 39 },
            { direction: "right", index: 41 },
            { direction: "bottom-left", index: 48 },
            { direction: "bottom", index: 49 },
            { direction: "bottom-right", index: 50 }
        ],
        neighborhood: [4, 13, 22, 36, 37, 38, 58, 67, 76, 42, 43, 44],
        sameNumbers: []
    },
    gameStatus: GameStatus.WOMB, // Assuming GameStatus is an enum
    timer: undefined,
    mistakesCount: 0,
    updateGameInterface: () => {}
};

// Create contexts
export const BoardContext = createContext<SudokuInterface>(defaultBoardState);
export const GameContext = createContext<GameInterface>(defaultGameState);