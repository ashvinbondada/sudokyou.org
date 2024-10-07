import { notFound } from "next/navigation";
import Game from "../components/game/game";
import { getNewPuzzle, newGameInterface } from "@/lib/initializeSudoku";

type Props = {
  params: {
    difficulty: string;
  };
};

// This is now a server component by default in Next.js 13's app/ directory
export default async function Difficultypage({ params: { difficulty } }: Props) {
  const newSudoku = await getNewPuzzle(difficulty)
  if (!newSudoku) {
    notFound()
  }
  const newGame = newGameInterface(newSudoku.boardValues)
  
  return (
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