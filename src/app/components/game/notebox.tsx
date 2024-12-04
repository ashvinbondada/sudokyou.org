'use client'
import { BoardContext, GameContext } from "@/lib/context"
import { notFound } from "next/navigation"
import { useContext, useState } from "react"

type Props = {
    noteValue: number,
    heldValue: number,
    onNoteBoxClick: () => void
}

export default function NoteBox({noteValue, onNoteBoxClick, heldValue}: Props) 
{
  const {notesMode } = useContext(GameContext)
  const {boardValues, highlightedCells, getHoveringCell} = useContext(BoardContext)
  const [isHovered, setIsHovered] = useState(false)  // Track hover state
  if (getHoveringCell === undefined)
    notFound()

  return (
    <button 
      className={`aspect-square 
              h-full w-full select-none 
              flex items-center justify-center 
              rounded-sm xl:rounded-lg
              text-sm sm:text-md lg:text-sm xl:text-lg
              ${(notesMode && noteValue > 0) 
                ? ' hover:text-lg hover:font-semibold hover:bg-light-notebox-hover dark:hover:bg-dark-notebox-hover'
                : (notesMode)
                    ? 'sm:hover:text-md hover:text-opacity-70'
                    : ''
              }
              ${(noteValue > 0 && (noteValue === boardValues[getHoveringCell()].squareValue || (highlightedCells.anchorNums.get(noteValue) || 0) > 0)) 
                ? 'font-bold text-md sm:text-lg lg:text-md xl:text-xl bg-light-same-num-notebox dark:bg-light-same-num-notebox/70 animate-pulse-shadow-note text-light-right dark:text-light-right' 
                : 'dark:text-dark-notebox text-light-right'
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
