import { createContext} from "react";
import { tileType, GameStatus } from "./common";
// Define the initial default state for the Sudoku board
const defaultBoardState = {
    initial: "",
    solution: "",
    boardValues: Array(81).fill({
        isEditable: tileType.GIVEN,
        squareValue: 0,
        squareNotes: Array(9).fill(0),
    }),
    updateSudokuInterface: () => {}
};


// Define the initial default state for the game
const defaultGameState = {
    notesMode: false,
    undoMode: false,
    anchorMode: false,
    autoNotesMode: false,
    backspaceMode: false,
    inputValue: 0,
    selectedCell: 40,
    numToQuantity: new Map<number, number>(),
    highlightedCells: { 
        neighborhood: [4, 13, 22, 36, 37, 38, 58, 67, 76, 42, 43, 44],
        anchors: new Set<number>()
    },
    gameStatus: GameStatus.WOMB, // Assuming GameStatus is an enum
    timer: undefined,
    mistakesCount: 0,
    moveCount: 0,
    gameHistory: [{
        selectedCell: 40,
        boardValues: Array(81).fill({
            isEditable: tileType.GIVEN,
            squareValue: 0,
            squareNotes: Array(9).fill(0), 
        }),
        autoNotesMode: false,
        anchors: []
    }],
    updateGameInterface: () => {}
};

// Create contexts
export const BoardContext = createContext<SudokuInterface>(defaultBoardState);
export const GameContext = createContext<GameInterface>(defaultGameState);