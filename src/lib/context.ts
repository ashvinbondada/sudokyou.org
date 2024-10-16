import { createContext} from "react";
import { tileType, GameStatus} from "./common";
// Define the initial default state for the Sudoku board
const defaultBoardState = {
    initial: "",
    solution: "",
    selectedCells: [40],
    highlightedCells: { 
        neighborhood: [4, 13, 22, 36, 37, 38, 58, 67, 76, 42, 43, 44],
        anchors: new Set<number>(),
        anchorNums: new Map<number, number>()
    },
    boardValues: Array(81).fill({
        isEditable: tileType.GIVEN,
        squareValue: 0,
        squareNotes: Array(9).fill(0),
    }),
};


// Define the initial default state for the game
const defaultGameState = {
    notesMode: false,
    undoMode: false,
    anchorMode: false,
    backspaceMode: false,
    inputValue: 0,
    selectedCelll: [40],
    numToQuantity: new Map<number, number>(),
    gameStatus: GameStatus.WOMB, // Assuming GameStatus is an enum
    timer: undefined,
    mistakesCount: 0,
    moveCount: 0,
    gameHistory: [{
        selectedCells: [40],
        boardValues: Array(81).fill({
            isEditable: tileType.GIVEN,
            squareValue: 0,
            squareNotes: Array(9).fill(0), 
        }),
        // numToQuantity: new Map<number, number>(),
    }],
    // updateGameInterface: () => {}

};

// Create contexts
export const BoardContext = createContext<SudokuInterface>(defaultBoardState);
export const GameContext = createContext<GameInterface>(defaultGameState);