import fs from 'fs';
import path from 'path';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../../app/firebase'; // Import Firestore instance
import { NextResponse } from 'next/server';

async function createPuzzlesArray() {
      const puzzlesPath = path.join(process.cwd(), './src/public/easyUnsolved.txt');
      const solutionsPath = path.join(process.cwd(), './src/public/easySolved.txt');

      const puzzlesFile = fs.readFileSync(puzzlesPath, 'utf-8');
      const solutionsFile = fs.readFileSync(solutionsPath, 'utf-8');

      const puzzlesLines = puzzlesFile.split('\n').filter(Boolean); // Filter out empty lines
      const solutionsLines = solutionsFile.split('\n').filter(Boolean);

      const puzzlesArray: PuzzleString[] = [];
      puzzlesLines.forEach((puzzleLine, index) => {
        const puzzle: PuzzleString = {
          id: `easy-${index + 1}`, 
          level: 'easy',
          initial: puzzleLine.trim(),
          solution: solutionsLines[index]?.trim() || '', 
        };
        puzzlesArray.push(puzzle);
      });

      return puzzlesArray
}


export async function POST() {
    const puzzlesArray = await createPuzzlesArray();
    const puzzlesCollection = collection(db, 'easy'); 
  
    // Check if there are puzzles to upload
    if (puzzlesArray.length > 0) {
      const batchSize = 500;          // Firestore's maximum writes per batch
      let batch = writeBatch(db);     // Create a new batch
      let batchCounter = 0;
      const promises = [];
  
      // Process the puzzles in batches
      for (let i = 0; i < puzzlesArray.length; i++) {
        const puzzle = puzzlesArray[i];
        const docRef = doc(puzzlesCollection, puzzle.id); // Use puzzle.id as the document ID
        batch.set(docRef, puzzle);                        // Add the puzzle to the batch
        batchCounter++;
  
        // If we reach the batch limit, commit the batch and start a new one
        if (batchCounter === batchSize) {
          promises.push(batch.commit());  
          batch = writeBatch(db);        
          batchCounter = 0;             
        }
      }
  
      // Commit the remaining documents in the final batch
      if (batchCounter > 0) {
        promises.push(batch.commit());
      }
  
      // Wait for all batches to be committed
      await Promise.all(promises);
  
      // Return a success message and include the first puzzle's data as an example response
      return NextResponse.json({
        message: 'All puzzles uploaded successfully using batch writes',
        firstUploaded: {
          genid: puzzlesArray[0].id, // The custom document ID from the first puzzle
          ...puzzlesArray[0], // The first puzzle data
        }
      });
    } else {
      // Return an error if no puzzles found
      return NextResponse.json({ message: 'No puzzles found' }, { status: 404 });
    }
  }
  
  
  
  
  
  