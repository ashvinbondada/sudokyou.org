import NoteBox from "./notebox";

type Props = {
  squareNotes: number[];
  handleSquareNotesInput: (index: number) => void;
};

export default function NotesSquare({ squareNotes, handleSquareNotesInput }: Props) {
  return (
    <div className="p-[1px] select-none h-full w-full grid grid-cols-3 gap-[2px]">
      {squareNotes.map((value, index) => (
        <div
          key={index}
          onClick={() => handleSquareNotesInput(index)}
        >
          <NoteBox
              noteValue={value}
              heldValue={index+1}
              onNoteBoxClick={() => handleSquareNotesInput(index)} 
            />
        </div>
      ))}
    </div>
  );
}
