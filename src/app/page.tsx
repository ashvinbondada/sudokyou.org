import Game from "./components/game";

export default function Home() {
  return (
      <div className="w-[80%] max-w-[700px] min-w-[400px] lg:place-self-center sm:place-self-start"
      >
        <Game />
      </div>
  );
}
