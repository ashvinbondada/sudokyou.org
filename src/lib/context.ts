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
    gameStatus: GameStatus.WOMB, // Assuming GameStatus is an enum
    timer: undefined,
    mistakesCount: 0,
    updateGameInterface: () => {}
};

// Create contexts
export const BoardContext = createContext<SudokuInterface>(defaultBoardState);
export const GameContext = createContext<GameInterface>(defaultGameState);