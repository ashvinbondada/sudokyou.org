import { createContext} from "react";

// Define the initial default state for the Sudoku board
const defaultBoardState = {
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
    isShiftDown: false,
    inputValue: 0,
    selectedCell: 40,
    highlightedCells: { 
        shadowBlock : [
            ["top-left", 30],
            ["top", 31],
            ["top-right", 32],
            ["left", 39],
            ["right", 41],
            ["bottom-left", 48],
            ["bottom", 49],
            ["bottom-right", 50]
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