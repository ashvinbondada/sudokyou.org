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
    // <div className="flex flex-col items-center">
      <div className="w-full">
        <div className="w-full flex md:flex-row sm:justify-center ">
          <div className="md:w-full sm:w-[90%] border-4 border-emerald-600">
            <Game newSudoku={newSudoku} newGame={newGame}/>
          </div>
          <div className="sm:hidden md:block hidden md:w-[40%] border-4 border-purple-400">
            CONTROLS
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center">
          <div className="w-[90%] h-full sm:block md:hidden block text-black border-4 border-purple-400">
            controls, instructions
          </div>
          <div className="w-full h-max flex flex-row">
            <div className="w-full h-full lg:block xl:hidden text-black border-4 border-blue-400">
              instructions, rules
            </div>
            <div className="md:block lg:hidden w-full h-full text-black border-4 border-red-400">
                HELLO
            </div>
          </div>
          <div className="w-full h-full border-4 border-slate-950 block">
            ABOUT SUDOKYOU
          </div>
        </div>



      </div>
  );
}
