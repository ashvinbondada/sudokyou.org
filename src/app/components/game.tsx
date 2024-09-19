'use client'

import { useEffect, useState } from "react";
import { GameStatus, BoardContext, GameContext } from "../../lib/context";
import { useKeyboardClick, useShiftClick } from "@/lib/useKeyboard";
import Board from "./board";
import { debounce } from "lodash";

export default function Game() {
  const isShiftDown = useShiftClick();
  const keyDown = useKeyboardClick();

  const [boardData, setBoardData] = useState<SudokuInterface>({
    boardValues: Array(81).fill({
      isEditable: true, 
      squareValue: 0,
      squareNotes: Array(9).fill(undefined)
    }), 
    updateSudokuInterface: () => {}
  });

  const updateSudokuInterface = (newState: Partial<SudokuInterface>) => {
    setBoardData((prevState) => ({
      ...prevState,
      ...newState
    }))
  }

  const [gameData, setGameData] = useState<GameInterface>({
    isShiftDown: false,
    inputValue: undefined,
    selectedCell: undefined,
    gameStatus: GameStatus.WOMB, // Assuming GameStatus is an enum
    timer: undefined,
    mistakesCount: 0,
    updateGameInterface: () => {}
  })

  const updateGameInterface = (newState: Partial<GameInterface>) => {
    setGameData((prevState) => ({
      ...prevState,
      ...newState
    }))
  }

  // cleanes state and prevents any further action for small time
  const handleMouseLeave = debounce(() => {
    const updatedBoardValues = boardData.boardValues.map(square => ({
      ...square,
      isDivHovered: false
    }))

    setBoardData(prevBoardData => ({
      ...prevBoardData,
      boardValues: updatedBoardValues
    }))

    setGameData(prevGameData => ({
      ...prevGameData,
      selectedCell: undefined
    }))
    console.log("cleaned")
  },50) 


  useEffect(() => {
    setGameData((currentGameData) => ({
      ...currentGameData,
      isShiftDown: isShiftDown,
      inputValue: keyDown
    }))
  }, [isShiftDown, keyDown]);

  return (
    <GameContext.Provider value={{...gameData, updateGameInterface: updateGameInterface}}>
      <BoardContext.Provider value={{ ...boardData, updateSudokuInterface: updateSudokuInterface }}>
        <div className="h-full w-full"
        onMouseLeave={handleMouseLeave}>
          <Board />
        </div>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
}
