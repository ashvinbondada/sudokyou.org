// type Props = {
//   squareValue: number;
//   isDone: boolean;
// };

// export default function NumPadSquare({ squareValue, isDone}: Props) {
//   return (
//     <div className="bg-white">
//     <div
//       className={`bg-gray-100 hover:shadow-custom-inner hover:bg-theme-1-pacific-cyan/30 transition-all duration-300 h-full flex place-content-center items-center text-4xl aspect-square ${
//         isDone === true
//           ? 'text-blue-600' // Editable and correct, show blue
//           : 'text-gray-600' // Editable but incorrect, show red
//       } select-none`}
//     >
//       {squareValue > 0 ? squareValue : ''}
//     </div>
//     </div>
//   );
// }
type Props = {
    squareValue: number;
    quantity?: number; // New quantity prop
    // isDone: boolean;
  };
  
  export default function NumPadSquare({ squareValue, quantity}: Props) {
    return (
      // <div className="h-full w-full">
        <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center sm:text-3xl md:text-4xl select-none transition-all duration-300 hover:bg-theme-1-pacific-cyan relative group hover:shadow-custom-inner rounded-md text-theme-1-pacific-cyan hover:text-white">
          {/* Display the squareValue with hover effect */}
          <span className={`transition-transform duration-300 ${squareValue > 0 ? 'md:group-hover:text-3xl sm:group-hover:text-2xl sm:group-hover:translate-y-[-7px] md:group-hover:translate-y-[-7px]' : ''}`}>
            {squareValue > 0 ? squareValue : ''}
          </span>
          
          {/* Display the quantity/9 on hover */}
          {squareValue > 0 && (
            <span className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:mt-2 sm:text-xs md:text-sm lg:text-base bottom-0">
              {`${quantity}/9`}
            </span>
          )}
        </div>
      // </div>
    );
  }
  