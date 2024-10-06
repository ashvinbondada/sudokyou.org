import { tileType } from "@/lib/common";

type Props = {
  squareValue: number;
  isEditable: tileType;
  handleClick: () => void
};

export default function RegularSquare({ squareValue, isEditable, handleClick}: Props) {
  return (
    <button onClick={handleClick}
      className={`h-full w-full flex place-content-center items-center text-4xl ${
        isEditable === tileType.GIVEN
          ? 'text-black' // Not editable, always black
          : (isEditable === tileType.RIGHT)
          ? 'text-theme-1-cerulean' // Editable and correct, show blue
          : 'text-red-600' // Editable but incorrect, show red
      } select-none`}
      tabIndex={-1}
    >
      {squareValue > 0 ? squareValue : ''}
    </button>
  );
}