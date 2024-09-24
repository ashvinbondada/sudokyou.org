// 'use client'
import { notFound } from "next/navigation";
import Game from "./components/game/game";
import { newGameInterface, PuzzleStringToSudokuInterface } from "@/lib/initializeSudoku";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puzzle/easy`);

  // Handle if the puzzle is not found
  if (!response.ok) {
    notFound();
    return null; // Stop rendering if the page is not found
  }

  // Fetch the puzzle data and transform it
  const newPuzzle: PuzzleString = await response.json();
  const newSudoku = PuzzleStringToSudokuInterface(newPuzzle);
  const newGame = newGameInterface(newPuzzle)
  
  return (
      // <div className="w-full h-full flex flex-col items-center">
        <div className=" w-full h-full flex flex-col items-center justify-start sm:justify-center">
          
          <Game newSudoku={newSudoku} newGame={newGame}/>
        </div>
      // </div>
  );
}
