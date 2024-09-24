// import { GameStatus } from "./context"

// function converts PuzzleString into a SudokuInterface
export function PuzzleStringToSudokuInterface(puzzlestring: PuzzleString) {
    const sudoku: SudokuInterface = {
        initial: puzzlestring.initial,
        solution: puzzlestring.solution,
        boardValues: puzzlestring.initial.split('').map((char: string) => ({
            isEditable: char === '.' ? true : false, // Assuming these tiles are not editable
            squareValue: char === '.' ? 0 : Number(char), // Handle '-' for empty squares as 0, otherwise convert char to number
            squareNotes:  Array(9).fill(0) // Default notes as an empty array
        })),
        // updateSudokuInterface: () => {}
    }
    return sudoku
}

enum GameStatus {
    WOMB,
    BORN,
    ALIVE,
    COMA,
    DEAD,
}

// function generates a new game state GameInterface
export function newGameInterface(puzzlestring: PuzzleString) {
    const newGame: GameInterface = {
        id: puzzlestring.id,
        isShiftDown: false,
        inputValue: 0,
        selectedCell: 40,
        highlightedCells: { shadowBlock : [
                            { direction: "top-left",      index: 30 },
                            { direction: "top",           index: 31 },
                            { direction: "top-right",     index: 32 },
                            { direction: "left",          index: 39 },
                            { direction: "right",         index: 41 },
                            { direction: "bottom-left",   index: 48 },
                            { direction: "bottom",        index: 49 },
                            { direction: "bottom-right",  index: 50 }
                        ],
                            neighborhood: [30, 31, 32, 39, 40, 41, 48, 49, 50, 36, 37, 38, 42, 43, 44, 4, 13, 22, 58, 67, 76],
                            sameNumbers: [] 
                        },
        gameStatus: GameStatus.BORN, 
        timer: undefined,
        mistakesCount: 0,
        // updateGameInterface: () => {}
    }

    return newGame
}