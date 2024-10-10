import { tileType } from "@/lib/common";

type Props = {
  squareValue: number;
  isEditable: tileType;
  handleClick: () => void
};

export default function RegularSquare({ squareValue, isEditable, handleClick}: Props) {
  return (
    <button onClick={handleClick}
      className={`select-none h-full w-full flex place-content-center items-center text-4xl ${
        isEditable === tileType.GIVEN
          ? 'text-black dark:text-dark-mode-2-dull-grey-blue' // Not editable, always black
          : (isEditable === tileType.RIGHT || squareValue == 0)
          ? 'text-editable-num'  // Editable and correct, show blue
          : 'text-red-600' // Editable but incorrect, show red
      }`}
      tabIndex={-1}
    >
      {squareValue > 0 ? squareValue : ''}
    </button>
  );
}