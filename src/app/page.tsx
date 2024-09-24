import { notFound } from "next/navigation";
import Game from "./components/game/game";
import { newGameInterface, getNewPuzzle } from "@/lib/initializeSudoku";

export default async function Home() {
  const newSudoku = await getNewPuzzle("easy")
  if (!newSudoku) {
    notFound()
  }
  const newGame = newGameInterface()
  
  return (
    <div className=" w-full h-full flex flex-col items-center justify-start sm:justify-center">
      
      <Game newSudoku={newSudoku} newGame={newGame}/>
    </div>
  );
}
