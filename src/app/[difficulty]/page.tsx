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
  const newGame = newGameInterface()

  // Render the Game component with the puzzle data
  return (
    <div className="w-full h-full flex flex-col items-center justify-start sm:justify-center">
      <Game newSudoku={newSudoku} newGame={newGame} />
    </div>
  );
}
