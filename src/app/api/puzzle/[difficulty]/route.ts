import { doc, getDoc } from "@firebase/firestore";
import { NextResponse } from "next/server";
import { db } from '../../../../app/firebase'; // Import Firestore instance

type Props = {
    params: {
        difficulty: string
    }
}

/*
Responsible for retreiving a *random* [difficulty] puzzle
*/
export async function GET(request: Request, {params: {difficulty}}: Props) {
    try {
        // Assuming you have generated the docId and know the collection (difficulty)
        const index = Math.floor(Math.random() * 500) + 1;
        const docId = `${difficulty}-${index}`; // Replace with your generated ID

        // Get the specific document from the collection
        const puzzleDocRef = doc(db, difficulty, docId); // Collection name is "difficulty", docId is the document ID
        const puzzleDoc = await getDoc(puzzleDocRef); // Fetch the document

        if (!puzzleDoc.exists()) {
            return new Response("Puzzle not found", { status: 404 });
        }


    // Return the document data
        const puzzleData = puzzleDoc.data();
        // const puzzle: PuzzleString = {
        //     id: puzzleDoc.id, // Use the doc ID from Firestore
        //     level: puzzleData.level, // Ensure these fields exist in your Firestore document
        //     initial: puzzleData.initial,
        //     solution: puzzleData.solution,
        // };
        return new Response(JSON.stringify(puzzleData), { status: 200 });

    } catch (error) {
        // Handle errors
        console.error('Error fetching document:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(request: Request, {params: {difficulty}}: Props) {
    return NextResponse.json({
        message: `Hello posted ${difficulty}`
    });
}

// type PuzzleObjProps = {
//     puzzle: PuzzleString
// }

// async function createPuzzleObj({puzzle}: PuzzleObjProps) {


// }