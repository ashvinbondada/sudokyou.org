'use client'

import { useEffect, useState } from "react";
import { GameStatus, BoardContext, GameContext } from "../../../lib/context";
import { useKeyboardClick, useShiftClick } from "@/lib/useKeyboard";
import Board from "./board";
import { debounce } from "lodash";
import useKeyboardShortcut from "use-keyboard-shortcut";

export default function Game() {
  const isShiftDown = useShiftClick();
  const keyDown = useKeyboardClick();
  const [inputSource, setInputSource] = useState<"keyboard" | "mouse">("keyboard")


  const [boardData, setBoardData] = useState<SudokuInterface>({
    boardValues: Array(81).fill({
      isEditable: true, 
      squareValue: 0,
      squareNotes: Array(9).fill(0)
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
    inputValue: 0,
    selectedCell: 40,
    highlightedCells: [30, 31, 32, 
                       39, 40, 41, 
                       48, 49, 50],
    gameStatus: GameStatus.WOMB, 
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

  // Define your movement handlers using the custom hook
  useKeyboardShortcut(["ArrowUp"], () => {
    if (gameData.selectedCell >= 9) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell - 9,
      }));
    }
    setInputSource("keyboard")
  });

  useKeyboardShortcut(["k"], () => {
    if (gameData.selectedCell >= 9) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell - 9,
      }));
    }
    setInputSource("keyboard")
  });

  useKeyboardShortcut(["ArrowDown"], () => {
    if (gameData.selectedCell <= 71) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell + 9,
      }));
    }
    setInputSource("keyboard")
  });

  useKeyboardShortcut(["j"], () => {
    if (gameData.selectedCell <= 71) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell + 9,
      }));
    }
    setInputSource("keyboard")
  });

  useKeyboardShortcut(["ArrowLeft"], () => {
    if (gameData.selectedCell % 9 !== 0) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell - 1,
      }));
    }
    setInputSource("keyboard")
  });

  useKeyboardShortcut(["h"], () => {
    if (gameData.selectedCell % 9 !== 0) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell - 1,
      }));
    }
    setInputSource("keyboard")
  });

  useKeyboardShortcut(["ArrowRight"], () => {
    if ((gameData.selectedCell + 1) % 9 !== 0) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell + 1,
      }));
    }
    setInputSource("keyboard")
  });

  useKeyboardShortcut(["l"], () => {
    if ((gameData.selectedCell + 1) % 9 !== 0) {
      setGameData((prevState) => ({
        ...prevState,
        selectedCell: prevState.selectedCell + 1,
      }));
    }
    setInputSource("keyboard")
  });

  const calculateBlockCells = (selectedCell: number, gridSize = 9): number[] => {
    const selectedRow = Math.floor(selectedCell / gridSize);
    const selectedCol = selectedCell % gridSize;
  
    // Calculate the start of the 3x3 block for rows and columns
    const blockRowStart = Math.floor(selectedRow / 3) * 3;
    const blockColStart = Math.floor(selectedCol / 3) * 3;
  
    const blockCells: number[] = [];
    const rowCells: number[] = [];
    const colCells: number[] = [];
  
    // Get all the cells in the current 3x3 block
    for (let row = blockRowStart; row < blockRowStart + 3; row++) {
      for (let col = blockColStart; col < blockColStart + 3; col++) {
        blockCells.push(row * gridSize + col); // Convert row and column back to cell index
      }
    }
  
    // Get all the cells in the current row
    for (let col = 0; col < gridSize; col++) {
      rowCells.push(selectedRow * gridSize + col);
    }
  
    // Get all the cells in the current column
    for (let row = 0; row < gridSize; row++) {
      colCells.push(row * gridSize + selectedCol);
    }
  
    // Combine all cells into a single array and ensure uniqueness using a Set
    const combinedCells = Array.from(new Set([...blockCells, ...rowCells, ...colCells]));
  
    return combinedCells;
  };
  

  useEffect(() => {
      const newHightlightedCells = calculateBlockCells(gameData.selectedCell)
      setGameData((prevState) => ({
        ...prevState,
        highlightedCells: newHightlightedCells
      }))

  }, [gameData.selectedCell])





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

    console.log("cleaned")
  },50) 

  const [shadow, setShadow] = useState("0px 0px 15px rgba(0, 0, 0, 0.5)");
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget;
    
    // Mouse position relative to the center of the component
    const x = e.clientX - offsetLeft - offsetWidth / 2;
    const y = e.clientY - offsetTop - offsetHeight / 2;

    // Invert the shadow to be on the opposite side of the mouse position
    const shadowX = -(x / offsetWidth) * 15; // Negative sign to invert
    const shadowY = -(y / offsetHeight) * 15;

    // Set the new shadow
    setShadow(`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.5)`);
    setInputSource("mouse");
  };

  useEffect(() => {
    if (inputSource === "keyboard") {
      const centerCell = Math.floor(81 / 2); // Center of the grid (cell 40)
      const selectedRow = Math.floor(gameData.selectedCell / 9);
      const selectedCol = gameData.selectedCell % 9;
      const centerRow = Math.floor(centerCell / 9);
      const centerCol = centerCell % 9;

      // Calculate the distance from the center and adjust shadow
      const shadowX = -(selectedCol - centerCol) * 2;
      const shadowY = -(selectedRow - centerRow) * 2;

      setShadow(`${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.5)`);
    }
  }, [gameData.selectedCell, inputSource]);



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
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{ boxShadow: shadow }}
          >
            <Board />
          </div>
        </BoardContext.Provider>
      </GameContext.Provider>
  );
}
