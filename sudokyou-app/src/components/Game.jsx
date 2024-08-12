import { useEffect, useState } from "react";
import { BoardContext } from "../utils/contexts/BoardContext";
import { useKeyboardClick } from "../utils/hooks/useKeyboardClick";
import { useShiftClick } from "../utils/hooks/useKeyboardClick";
import Board from "./Board";

export default function Game() {
  const isShiftDown = useShiftClick();
  const keyDown = useKeyboardClick();

  const [boardData, setBoardData] = useState({
    isShiftDown: false,
    inputValue: undefined,
    boardValues: Array(81).fill({
      isEditable: true, 
      squareValue: '',
      squareNotes: Array(9).fill(undefined)
    }), 
  });

  useEffect(() => {
    setBoardData((currentBoardData) => ({
      ...currentBoardData,
      isShiftDown: isShiftDown,
      inputValue: keyDown,
    }));
  }, [isShiftDown, keyDown]);

  return (
    <BoardContext.Provider value={{ ...boardData, setBoardContext: setBoardData }}>
      <Board />
    </BoardContext.Provider>
  );
}
