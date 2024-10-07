'use client'
import { tileType } from "@/lib/common";
import { BoardContext, GameContext } from "@/lib/context";
import { useContext, useState } from "react";

type Props = {
    squareValue: number;
    quantity: number; // New quantity prop
  };
  
  export default function NumberTile({ squareValue, quantity}: Props) {
    const [clicked, setClicked] = useState(false)
    const {boardValues, solution} = useContext(BoardContext)
    const {inputValue, notesMode, selectedCell, updateGameInterface} = useContext(GameContext)
    const handleClick = () => {
      setClicked(true);
      if (updateGameInterface) {
        updateGameInterface({inputValue: squareValue})
      }
      setTimeout(() => {
        if (updateGameInterface)
          updateGameInterface({inputValue: 0 })
      }, 1)
      setTimeout(() => {
        setClicked(false)
      }, 150); // Momentary effect when isToggle is false
  };

    return (
        <button className={`h-full w-full flex flex-col items-center justify-center sm:text-3xl md:text-4xl select-none transition-all duration-300  relative group hover:shadow-custom-inner rounded-md 
          ${
          (quantity == 9)
          ? 'text-gray-400 bg-gray-100' 
          : (clicked || (squareValue === inputValue)) 
            ? (squareValue === Number(solution[selectedCell]) 
              || notesMode
              || (boardValues[selectedCell].isEditable !== tileType.WRONG)
            ) 
              ? 'text-white bg-theme-1-pacific-cyan' 
              : 'text-white bg-theme-2-pantone' 
            : 'text-theme-1-pacific-cyan bg-gray-100 hover:bg-gray-200'} `}
        onClick={(quantity < 9) ? handleClick : () => {}} 
        tabIndex={-1}
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
    );
  }
  