import { tileType } from "@/lib/common";

type Props = {
  squareValue: number;
  isEditable: tileType;
  // isRight: string;
};

export default function RegularSquare({ squareValue, isEditable}: Props) {
  return (
    <div
      className={`h-full w-full flex place-content-center items-center text-4xl ${
        isEditable === tileType.GIVEN
          ? 'text-black' // Not editable, always black
          : (isEditable === tileType.RIGHT)
          ? 'text-blue-600' // Editable and correct, show blue
          : 'text-red-600' // Editable but incorrect, show red
      } select-none`}
    >
      {squareValue > 0 ? squareValue : ''}
    </div>
  );
}