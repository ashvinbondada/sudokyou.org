'use client'
import { tileType } from "@/lib/common";
import { BoardContext, GameContext } from "@/lib/context";
import { notFound } from "next/navigation";
import { useCallback, useContext, useState } from "react";

type Props = {
    squareValue: number;
    quantity: number; // New quantity prop
  };
  
  export default function NumberTile({ squareValue, quantity}: Props) {
    const [clicked, setClicked] = useState(false)
    const {boardValues, solution, getHoveringCell, selectedCells} = useContext(BoardContext)
    const {inputValue, notesMode, updateGameInterface} = useContext(GameContext)

    if (getHoveringCell === undefined
      || updateGameInterface === undefined
    ) {
      notFound()
    }

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

    const getBackgroundClasses = useCallback(() => {
      let backGroundClassRes = ''
      // grey out the tile if its finished
      if (quantity === 9) {
        backGroundClassRes += 'text-gray-400 bg-gray-200 dark:bg-slate-800 shadow-custom-inner pointer-events-none'
      } 
      // when using the current tile number, evaluate
      // whether it is the correct number or wrong
      else if (clicked || squareValue === inputValue) {
        // if we 1) selected right number, 2) in notes mode
        // 3) entering on a solved/given square 4) in anchor mode
        const anchors = selectedCells.slice(1)
        const filteredAnchors = anchors.slice(1).filter(
            (cell) => {return boardValues[cell].isEditable === tileType.WRONG}
        )
        if ( notesMode
              || (filteredAnchors.length === 0 && boardValues[getHoveringCell()].isEditable !== tileType.WRONG)
              || (filteredAnchors.length === 0 && squareValue === Number(solution[getHoveringCell()]))
              || (filteredAnchors.length === 1 && squareValue === Number(solution[filteredAnchors[0]]))
              || (anchors.length > 0)
        ) {
          backGroundClassRes += 'text-white bg-light-right dark:bg-dark-right'
        } else {
          backGroundClassRes += 'text-white bg-light-wrong dark:bg-dark-wrong'
        }
      } else {
        backGroundClassRes += 'text-theme-1-pacific-cyan bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:dark:bg-slate-800'
      }

      return backGroundClassRes
    }, [quantity, clicked, squareValue, inputValue, selectedCells, notesMode, boardValues, getHoveringCell, solution])

    return (
      <button
          className={`h-full w-full flex flex-col items-center justify-center sm:text-3xl md:text-4xl select-none relative group hover:shadow-custom-inner rounded-md
            ${getBackgroundClasses()}`}
          onClick={quantity < 9 ? handleClick : () => {}}
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
  