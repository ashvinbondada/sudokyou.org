import Game from "../components/game/game";
type Props = {
    params: {
        difficulty: string
    }
}

export default function Difficultypage({params: {difficulty}}: Props) {

  return (
    // <div className="w-full h-full flex flex-col items-center">
      <div className=" w-full h-full flex flex-col items-center justify-start sm:justify-center">
        <Game />
      </div>
    // </div>
);
}
