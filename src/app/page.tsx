import { notFound } from "next/navigation";
import Game from "./components/game/game";
import { newGameInterface, getNewPuzzle, } from "@/lib/initializeSudoku";

export default async function Home() {
  const newSudoku = await getNewPuzzle("easy")
  if (!newSudoku) {
    notFound()
  }
  const newGame = newGameInterface(newSudoku.boardValues)
  
  return (
    // <div className="flex flex-col items-center">
      <div className="w-full h-full">
        <Game newSudoku={newSudoku} newGame={newGame}/>
        <div className="mt-1 w-full h-full flex flex-col items-center">
          <div className="w-full h-full sm:block md:hidden block text-black border-4 border-purple-400">
            controls, instructions
          </div>
          <div className="w-full h-max flex flex-row">
            <div className="w-full h-full lg:block xl:hidden text-black border-4 border-blue-400">
              instructions, rules
            </div>
            <div className="xl:hidden block w-full h-full text-black border-4 border-red-400">
                HELLO
            </div>
          </div>
          <div className="w-full h-max block">
            {/* ABOUT SUDOKYOU */}
          </div>
        </div>
      </div>
  );
}
