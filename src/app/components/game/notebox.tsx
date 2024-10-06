'use client'
import { BoardContext, GameContext } from "@/lib/context"
import { useContext } from "react"

type Props = {
    noteValue: number,
    onNoteBoxClick: () => void
}

export default function NoteBox({noteValue, onNoteBoxClick}: Props) 
{
  const {selectedCell, notesMode} = useContext(GameContext)
  const {boardValues} = useContext(BoardContext)
  return (
    <div className={`h-full w-full text-sm md:text-md flex items-center justify-center text-editable-num ${notesMode ? 'hover:bg-theme-1-jonquil/70 hover:text-lg hover:font-semibold' : ''} transition-all duration-200 ease-in-out
      ${(noteValue > 0 && noteValue === boardValues[selectedCell].squareValue) ? 'font-bold sm:text-lg md:text-xl lg:text-xl bg-theme-1-jonquil/50 rounded-[2px]' : 'font-normal'}
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

