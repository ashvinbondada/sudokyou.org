'use client'
import { BoardContext, GameContext } from "@/lib/context";
import { useContext, useState } from "react";

type Props = {
    squareValue: number;
    quantity?: number; // New quantity prop
    // handleMe: () => void;
    keyboardClick?: boolean;
    // isDone: boolean;
  };
  
  export default function NumPadSquare({ squareValue, quantity}: Props) {
    const [clicked, setClicked] = useState(false)
    const {boardValues, updateSudokuInterface} = useContext(BoardContext)
    const {moveCount, history, updateGameInterface} = useContext(GameContext)
    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 200); // Momentary effect when isToggle is false
        
    };

    return (
      // <div className="h-full w-full">
        <button className="bg-gray-100 h-full w-full flex flex-col items-center justify-center sm:text-3xl md:text-4xl select-none transition-all duration-300 hover:bg-theme-1-pacific-cyan relative group hover:shadow-custom-inner rounded-md text-theme-1-pacific-cyan hover:text-white"
        onClick={handleClick} 
        >
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
        </button>
      // </div>
    );
  }
  