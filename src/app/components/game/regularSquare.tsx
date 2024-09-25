type Props = {
  squareValue: number;
  isEditable: boolean;
  isRight: string;
};

export default function RegularSquare({ squareValue, isEditable, isRight }: Props) {
  return (
    <div
      className={`h-full w-full flex place-content-center items-center text-4xl ${
        !isEditable
          ? 'text-black' // Not editable, always black
          : (squareValue === Number(isRight))
          ? 'text-blue-600' // Editable and correct, show blue
          : 'text-red-600' // Editable but incorrect, show red
      }`}
    >
      {squareValue > 0 ? squareValue : ''}
    </div>
  );
}