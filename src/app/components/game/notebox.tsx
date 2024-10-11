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
      className={`aspect-square 
              h-full w-full select-none 
              flex items-center justify-center 
              text-light-right
              dark:text-dark-mode-2-dull-grey-blue 
              rounded-sm xl:rounded-lg
              ${(notesMode && noteValue > 0) 
                ? ' hover:text-lg hover:font-semibold hover:bg-light-notebox-hover'
                : (notesMode)
                    ? 'hover:text-md hover:text-opacity-70'
                    : ''
              }
              ${(noteValue > 0 && (noteValue === boardValues[selectedCell].squareValue || (highlightedCells.anchorNums.get(noteValue) || 0) > 0)) 
                ? 'font-bold sm:text-lg lg:text-md xl:text-xl bg-light-same-num-notebox' 
                : ''
              }`}
      onMouseEnter={() => setIsHovered(true)}  // Set hover state to true on hover
      onMouseLeave={() => setIsHovered(false)}  // Set hover state to false when hover ends
      onClick={onNoteBoxClick}
      tabIndex={-1}
    >
      {(notesMode && isHovered) ? heldValue : (noteValue > 0) ? noteValue : ''}
    </button>
  )
}
