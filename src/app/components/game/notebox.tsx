'use client'
import { BoardContext, GameContext } from "@/lib/context"
import { useContext } from "react"

type Props = {
    noteValue: number,
    onNoteBoxClick: () => void
}

export default function NoteBox({noteValue, onNoteBoxClick}: Props) 
{
  const {selectedCell, notesMode, highlightedCells} = useContext(GameContext)
  const {boardValues} = useContext(BoardContext)
  return (
    <div className={`h-full w-full text-sm md:text-md flex items-center justify-center text-editable-num dark:text-dark-mode-2-dull-grey-blue ${notesMode ? 'hover:bg-theme-1-jonquil/70 dark:hover:bg-slate-600 hover:text-lg hover:font-semibold' : ''} transition-all duration-200 ease-in-out
      ${(noteValue > 0 && (noteValue === boardValues[selectedCell].squareValue) || (highlightedCells.anchorNums.get(noteValue) || 0) > 0) ? 'font-bold sm:text-lg md:text-xl lg:text-xl bg-theme-1-jonquil/50 dark:bg-slate-600 rounded-[2px]' : 'font-normal'}
    `}>
      <button 
        className="select-none"
        onClick={onNoteBoxClick}
        tabIndex={-1}
      >
      {(noteValue > 0) ? noteValue : ''}
      </button>
    </div>
  )
}

