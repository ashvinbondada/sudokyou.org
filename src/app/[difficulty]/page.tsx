// import { notFound } from "next/navigation";
// import Game from "../components/game/game";
// import { newGameInterface, PuzzleStringToSudokuInterface } from "@/lib/initializeSudoku";
// type Props = {
//     params: {
//         difficulty: string
//     }
// }

// export default async function Difficultypage({params: {difficulty}}: Props) {
//   const response = await fetch(`/api/puzzle/${difficulty}`)
//   if (!response.ok)
//     notFound()
//   const newPuzzle: PuzzleString = await response.json()
//   const newSudoku = PuzzleStringToSudokuInterface(newPuzzle)
//   const newGame = newGameInterface(newPuzzle)
//   return (
//     // <div className="w-full h-full flex flex-col items-center">
//       <div className=" w-full h-full flex flex-col items-center justify-start sm:justify-center">
//         <Game newSudoku={newSudoku} newGame={newGame}/>
//       </div>
//     // </div>
//   );
// }

// import { notFound } from "next/navigation";
// import Game from "../components/game/game";
// import { newGameInterface, PuzzleStringToSudokuInterface } from "@/lib/initializeSudoku";
// import { GetServerSideProps } from 'next';
// // import { PuzzleString } from "@/types"; // Assuming this type is defined

// // type Props = {
// //     params: {
// //         difficulty: string;
// //     }
// // };

// export default function Difficultypage({ newSudoku, newGame }: { newSudoku: SudokuInterface, newGame: any }) {
//   return (
//     <div className="w-full h-full flex flex-col items-center justify-start sm:justify-center">
//       <Game newSudoku={newSudoku} newGame={newGame}/>
//     </div>
//   );
// }

// // Fetch the puzzle data server-side before rendering the page
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { difficulty } = context.params as { difficulty: string };

//   // Use full URL for the fetch when running on the server
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puzzle/${difficulty}`);

//   if (!response.ok) {
//     return {
//       notFound: true, // Trigger the 404 page if the puzzle is not found
//     };
//   }

//   const newPuzzle: PuzzleString = await response.json();
//   const newSudoku = PuzzleStringToSudokuInterface(newPuzzle);
//   const newGame = newGameInterface(newPuzzle);

//   return {
//     props: {
//       newSudoku,
//       newGame,
//     },
//   };
// };

import { notFound } from "next/navigation";
import Game from "../components/game/game";
import { newGameInterface, PuzzleStringToSudokuInterface } from "@/lib/initializeSudoku";
// import { PuzzleString } from "@/types"; // Assuming this type is defined

type Props = {
  params: {
    difficulty: string;
  };
};

// This is now a server component by default in Next.js 13's app/ directory
export default async function Difficultypage({ params: { difficulty } }: Props) {
  // Construct full URL for API call
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puzzle/${difficulty}`);

  // Handle if the puzzle is not found
  if (!response.ok) {
    notFound();
    return null; // Stop rendering if the page is not found
  }

  // Fetch the puzzle data and transform it
  const newPuzzle: PuzzleString = await response.json();
  const newSudoku = PuzzleStringToSudokuInterface(newPuzzle);
  const newGame = newGameInterface(newPuzzle);

  // Render the Game component with the puzzle data
  return (
    <div className="w-full h-full flex flex-col items-center justify-start sm:justify-center">
      <Game newSudoku={newSudoku} newGame={newGame} />
    </div>
  );
}
