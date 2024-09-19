import NoteBox from "./notebox";

type Props = {
  squareNotes: (number | undefined)[];
  handleSquareNotesInput: (index: number) => void;
};

export default function NotesSquare({ squareNotes, handleSquareNotesInput }: Props) {
  return (
    <div className="h-full w-full grid grid-cols-3 gap-[1px]">
      {squareNotes.map((value, index) => (
        <div
          key={index}
          className="hover:bg-theme-1-jonquil rounded-[1px] aspect-square flex items-center justify-center"
          onClick={() => handleSquareNotesInput(index)}
        >
          <NoteBox
              value={value}
              onNoteBoxClick={() => handleSquareNotesInput(index)} 
            />
        </div>
      ))}
    </div>
  );
}
