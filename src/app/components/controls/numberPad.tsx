import NumPadSquare from "./numberTile";

export default function NumberPad() {
  return (
    <div className='h-full bg-white aspect-square'>
    {/* // div responsible for the grid lines between squares */}
      <div className="grid h-full w-full grid-cols-3 gap-[1px] bg-theme-1-cerulean/50">
        <NumPadSquare squareValue={1} quantity={0} />
        <NumPadSquare squareValue={2} quantity={0} />
        <NumPadSquare squareValue={3} quantity={0} />
        <NumPadSquare squareValue={4} quantity={0} />
        <NumPadSquare squareValue={5} quantity={0} />
        <NumPadSquare squareValue={6} quantity={0} />
        <NumPadSquare squareValue={7} quantity={0} />
        <NumPadSquare squareValue={8} quantity={0} />
        <NumPadSquare squareValue={9} quantity={0} />
      </div>
    </div>
  )
}
