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
          ? 'text-light-given dark:text-dark-given' // Not editable, always black
          : (isEditable === tileType.RIGHT || squareValue == 0)
          ? 'text-light-right dark:text-dark-right'  // Editable and correct, show blue
          : 'text-light-wrong' // Editable but incorrect, show red
      }`}
      tabIndex={-1}
    >
      {squareValue > 0 ? squareValue : ''}
    </button>
  );
}