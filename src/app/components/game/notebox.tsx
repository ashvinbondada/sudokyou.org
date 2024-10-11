'use client'
import { BoardContext, GameContext } from "@/lib/context"
import { useContext, useState } from "react"

type Props = {
    noteValue: number,
    heldValue: number,
    onNoteBoxClick: () => void
}

export default function NoteBox({noteValue, onNoteBoxClick, heldValue}: Props) 
{
  const {selectedCell, notesMode, highlightedCells} = useContext(GameContext)
  const {boardValues} = useContext(BoardContext)
  const [isHovered, setIsHovered] = useState(false)  // Track hover state

  return (
    <button 
      className={`aspect-square h-full w-full select-none text-sm md:text-md flex items-center justify-center dark:text-dark-mode-2-dull-grey-blue transition-all duration-50 ease-in-out rounded-sm xl:rounded-lg
        ${notesMode ? 'hover:border-2 hover:border-light-notebox-hover hover:text-lg hover:font-semibold' : ''} 
       
        ${(noteValue > 0 && (noteValue === boardValues[selectedCell].squareValue || (highlightedCells.anchorNums.get(noteValue) || 0) > 0)) ? 'font-bold sm:text-lg md:text-md lg:text-md xl:text-xl text-editable-num' : 'text-editable-num font-normal'}`}
      style={{
        backgroundColor: (noteValue > 0 && (noteValue === boardValues[selectedCell].squareValue || (highlightedCells.anchorNums.get(noteValue) || 0) > 0)) ? '#ffde64' : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}  // Set hover state to true on hover
      onMouseLeave={() => setIsHovered(false)}  // Set hover state to false when hover ends
      onClick={onNoteBoxClick}
      tabIndex={-1}
    >
      {(notesMode && isHovered) ? heldValue : (noteValue > 0) ? noteValue : ''}
    </button>
  )
}
