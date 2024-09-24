// import { GameStatus } from "./context"

import { doc, DocumentData, getDoc } from "@firebase/firestore";
import { db } from '../app/firebase'; // Import Firestore instance

// function converts PuzzleString into a SudokuInterface
function PuzzleStringToSudokuInterface(puzzlestring: DocumentData) {
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
export function newGameInterface() {
    const newGame: GameInterface = {
        notesMode: false,
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

export async function getNewPuzzle(difficulty: string): Promise<SudokuInterface | undefined> {
    try {
        // Assuming you have generated the docId and know the collection (difficulty)
        const index = Math.floor(Math.random() * 500) + 1;
        const docId = `${difficulty}-${index}`; // Replace with your generated ID

        // Get the specific document from the collection
        const puzzleDocRef = doc(db, difficulty, docId); // Collection name is "difficulty", docId is the document ID
        const puzzleDoc = await getDoc(puzzleDocRef); // Fetch the document

        if (!puzzleDoc.exists()) {
            // return new Response("Puzzle not found", { status: 404 });
            return undefined
        }


    // Return the document data
        const puzzleData = puzzleDoc.data();
        const newPuzzle: SudokuInterface = PuzzleStringToSudokuInterface(puzzleData)
        // const puzzle: PuzzleString = {
        //     id: puzzleDoc.id, // Use the doc ID from Firestore
        //     level: puzzleData.level, // Ensure these fields exist in your Firestore document
        //     initial: puzzleData.initial,
        //     solution: puzzleData.solution,
        // };
        return newPuzzle
        // return new Response(JSON.stringify(puzzleData), { status: 200 });

    } catch (error) {
        // Handle errors
        console.error('Error fetching document:', error);
        // return new Response("Internal Server Error", { status: 500 });
        return undefined
    }
}