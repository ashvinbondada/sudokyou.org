
type Props = {
    noteValue: number,
    onNoteBoxClick: () => void
}

export default function NoteBox({noteValue, onNoteBoxClick}: Props) 
{
  return (
    <div className='h-full w-full text-xs flex items-center justify-center text-black'>
      <button 
        className="select-none"
        onClick={onNoteBoxClick}
      >
      {(noteValue > 0) ? noteValue : ''}
      </button>
    </div>
  )
}

