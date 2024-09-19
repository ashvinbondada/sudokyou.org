type Props = {
  squareValue: number
}

export default function RegularSquare({squareValue}: Props) {

  return (
    <div className="h-full w-full flex place-content-center items-center text-black text-xl">
      {(squareValue > 0) ? squareValue : ''}
    </div>
  );
}
