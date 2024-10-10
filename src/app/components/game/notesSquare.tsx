import NoteBox from "./notebox";

type Props = {
  squareNotes: number[];
  handleSquareNotesInput: (index: number) => void;
};

export default function NotesSquare({ squareNotes, handleSquareNotesInput }: Props) {
  return (
    <div className=" select-none h-full w-full grid grid-cols-3 gap-[1px]">
      {squareNotes.map((value, index) => (
        <div
          key={index}
          className=" rounded-[2px] aspect-square"
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
