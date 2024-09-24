// type Props = {
//   squareValue: number,
//   isEditable: boolean,
//   isRight: boolean
// }

// export default function RegularSquare({squareValue, isEditable, isRight}: Props) {

//   return (
//     <div className={`h-full w-full flex place-content-center items-center ${isEditable ? 'text-editable-num text-xl' : 'text-black text-xl'}`}>
//       {(squareValue > 0) ? squareValue : ''}
//     </div>
//   );
// }

type Props = {
  squareValue: number;
  isEditable: boolean;
  isRight: boolean;
};

export default function RegularSquare({ squareValue, isEditable, isRight }: Props) {
  return (
    <div
      className={`h-full w-full flex place-content-center items-center text-xl ${
        !isEditable
          ? 'text-black' // Not editable, always black
          : isRight
          ? 'text-blue-600' // Editable and correct, show blue
          : 'text-red-600' // Editable but incorrect, show red
      }`}
    >
      {squareValue > 0 ? squareValue : ''}
    </div>
  );
}