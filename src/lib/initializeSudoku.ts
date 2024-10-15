// import { GameStatus } from "./context"

import { doc, DocumentData, getDoc } from "@firebase/firestore";
import { db } from '../app/firebase'; // Import Firestore instance
import { tileType, GameStatus, anchorType, key } from "./common";

export function PuzzleStringToSudokuInterface(initial: string, solution: string) {
    const sudoku: SudokuInterface = {
        initial: initial,
        solution: solution,
        boardValues: initial.split('').map((char: string) => ({
            isEditable: char === '.' ? tileType.WRONG : tileType.GIVEN, // Assuming these tiles are not editable
            squareValue: char === '.' ? 0 : Number(char), // Handle '-' for empty squares as 0, otherwise convert char to number
            squareNotes:  Array(9).fill(0) // Default notes as an empty array
        }))
    }
    return sudoku
}

// function converts PuzzleData into a SudokuInterface
function PuzzleResponseToSudokuInterface(puzzleData: DocumentData) {
    const initialParsed = JSON.stringify(puzzleData["initial"])
    const initial: string = initialParsed.substring(1, initialParsed.length-1)

    const solutionParsed = JSON.stringify(puzzleData["solution"])
    const solution: string = solutionParsed.substring(1, initialParsed.length-1)

    return PuzzleStringToSudokuInterface(initial, solution)
}

// function generates a new game state GameInterface
export function newGameInterface(initialBoardValues: Tile[]) {
    const numToQuantity = new Map<number, number>();
    initialBoardValues.forEach((tile) => {
        if (tile.squareValue > 0) { // Only count positive values
            const currentQuantity = numToQuantity.get(tile.squareValue) || 0;
            numToQuantity.set(tile.squareValue, currentQuantity + 1);
        }
    });
    const anchorNums = new Map<number, number>(
        Array.from({ length: 9 }, (_, i) => [i + 1, 0])
      );

    const newGame: GameInterface = {
        notesMode: false,
        undoMode: false,
        autoNotesMode: false,
        backspaceMode: false,
        inputValue: 0,
        selectedCell: 40,
        numToQuantity: numToQuantity,
        anchorPress: key.OFF,
        anchorMode: anchorType.NONE,
        highlightedCells: { 
            neighborhood: [30, 31, 32, 39, 40, 41, 48, 49, 50, 36, 37, 38, 42, 43, 44, 4, 13, 22, 58, 67, 76],
            anchors: new Set<number>(),
            anchorNums: anchorNums
        },
        gameStatus: GameStatus.BORN, 
        timer: undefined,
        mistakesCount: 0,
        moveCount: 0,
        gameHistory: [{
            selectedCell: 40,            
            boardValues: initialBoardValues,
            autoNotesMode: false,
            highlightedCellsSnap: { 
                neighborhood: [30, 31, 32, 39, 40, 41, 48, 49, 50, 36, 37, 38, 42, 43, 44, 4, 13, 22, 58, 67, 76],
                anchors: new Set<number>(),
                anchorNums: anchorNums
            },
            numToQuantity: numToQuantity
        }],
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


        const puzzleData = puzzleDoc.data();
        const newPuzzle: SudokuInterface = PuzzleResponseToSudokuInterface(puzzleData)
        return newPuzzle

    } catch (error) {
        // Handle errors
        console.error('Error fetching document:', error);
        // return new Response("Internal Server Error", { status: 500 });
        return undefined
    }
}

export function getNewPuzzleOffline(difficulty: string): SudokuInterface {
    switch (difficulty) {
        case 'easy':
            return PuzzleStringToSudokuInterface(
                "57.....8...9....266...275.........7.....984..293.......185.96.....8.1......4..3..",
                "572946183439185726681327594845613279167298435293754861718539642324861957956472318"
            )
        case 'medium':
            return PuzzleStringToSudokuInterface(
                "...........9.2.48.8...546..........2..25.813.....7356.498.....6....47.597........",
                "564839217139726485827154693385461972672598134941273568498315726213647859756982341"
            )
        case 'hard':
            return PuzzleStringToSudokuInterface(
                ".5.9........7.3862....2..753.8......76.5...9...1....364..1.9................726..",
                "257986413914753862836421975398617254762534198541298736423169587679845321185372649"
            )
        case 'unfair':
            return PuzzleStringToSudokuInterface(
                "..82....13...4..8.7...86.4..5........6.93..12...1.73..........72...6......9...8..",
                "648295731325741689791386245153624978467938512982157364836512497274869153519473826"
            )
        case 'extreme':
            return PuzzleStringToSudokuInterface(
                "..82....13...4..8.7...86.4..5........6.93..12...1.73..........72...6......9...8..",
                "648295731325741689791386245153624978467938512982157364836512497274869153519473826"
            )
        default:
            return PuzzleStringToSudokuInterface(
                "57.....8...9....266...275.........7.....984..293.......185.96.....8.1......4..3..",
                "572946183439185726681327594845613279167298435293754861718539642324861957956472318"
            )
    }
}

export async function getNewPuzzleById(difficulty: string): Promise<SudokuInterface | undefined> {
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
        // console.log(puzzleDataString)
        const newPuzzle: SudokuInterface = PuzzleResponseToSudokuInterface(puzzleData)
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