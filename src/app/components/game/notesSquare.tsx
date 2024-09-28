import NoteBox from "./notebox";

type Props = {
  squareNotes: number[];
  handleSquareNotesInput: (index: number) => void;
};

export default function NotesSquare({ squareNotes, handleSquareNotesInput }: Props) {
  return (
    <div className="h-full w-full grid grid-cols-3 gap-[1px]">
      {squareNotes.map((value, index) => (
        <div
          key={index}
          className="hover:bg-theme-1-jonquil/70 hover:text-lg hover:font-semibold transition-all duration-200 ease-in-out rounded-[2px] aspect-square flex items-center justify-center"
          onClick={() => handleSquareNotesInput(index)}
        >
          <NoteBox
              noteValue={value}
              onNoteBoxClick={() => handleSquareNotesInput(index)} 
            />
        </div>
      ))}
    </div>
  );
}
