'use client'

import { useEffect, useState } from "react";
import { BoardContext, GameContext } from "../../../lib/context";
import { useKeyboardClick, useShiftClick } from "@/lib/useKeyboard";
import Board from "./board";
import { debounce } from "lodash";
import useKeyboardShortcut from "use-keyboard-shortcut";
import DifficultySelector from "../difficultyTimer";


type Props = {
    newSudoku: SudokuInterface,
    newGame: GameInterface
}

export default function Game({newSudoku, newGame}: Props) {
  const isShiftDown = useShiftClick();
  const keyDown = useKeyboardClick();
  const [inputSource, setInputSource] = useState<"keyboard" | "mouse">("keyboard")


  const [boardData, setBoardData] = useState<SudokuInterface>({
    ...newSudoku,
    updateSudokuInterface: () => {}
  });

  const updateSudokuInterface = (newState: Partial<SudokuInterface>) => {
    setBoardData((prevState) => ({
      ...prevState,
      ...newState
    }))
  }

  const [gameData, setGameData] = useState<GameInterface>({
    ...newGame,
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

  useEffect(() => {
    const calculateHighlightCells = (selectedCell: number, gridSize = 9): [directionIndex[], number[], number[]] => {
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

      // get all the cells that match the number
      const sameNumCells = boardData.boardValues
      .map((tile: Tile, index) => [tile.squareValue, index]) // Pair squareValue with index
      .filter(([value]) => value > 0 && value === boardData.boardValues[selectedCell].squareValue) // Filter based on squareValue
      .map(([, index]) => index); // Extract just the index
    
      // Combine all cells into a single array and ensure uniqueness using a Set
      const combinedCells = Array.from(new Set([...blockCells, ...rowCells, ...colCells]));

      const shadowBlock: directionIndex[] = [
        { direction: "top-left",      index: selectedCell - 10 },
        { direction: "top",           index: selectedCell - 9 },
        { direction: "top-right",     index: selectedCell - 8 },
        { direction: "left",          index: selectedCell - 1 },
        { direction: "right",         index: selectedCell + 1 },
        { direction: "bottom-left",   index: selectedCell + 8 },
        { direction: "bottom",        index: selectedCell + 9 },
        { direction: "bottom-right",  index: selectedCell + 10 }
      ];
      const validShadowBlock = shadowBlock.filter((dirIdx: directionIndex) => {
        return dirIdx.index > -1 && dirIdx.index < 81
      });

      return [validShadowBlock, combinedCells, sameNumCells]
    };
  

    const [shadowBlock, neighborhood, sameNumbers] = calculateHighlightCells(gameData.selectedCell)
    setGameData((prevState) => ({
      ...prevState,
      highlightedCells: { shadowBlock, neighborhood, sameNumbers}
    }))

  }, [gameData.selectedCell, boardData])


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
      isShiftDown: false
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
    console.log("hello")
    setGameData((currentGameData) => ({
      ...currentGameData,
      isShiftDown: isShiftDown,
      inputValue: keyDown
    }))
  }, [isShiftDown, keyDown]);

  return (
    <GameContext.Provider value={{...gameData, updateGameInterface: updateGameInterface}}>
      <BoardContext.Provider value={{ ...boardData, updateSudokuInterface: updateSudokuInterface }}>
        {/* Outer wrapper for both DifficultySelector and Board */}
        <div className=" w-[60%] max-w-[700px] min-w-[400px] flex flex-col items-center justify-center">
          {/* Timer and difficulty selector with full width */}
          <div className="w-full mb-4">
            <DifficultySelector />
          </div>
          {/* Sudoku board with full width */}
          <div
            className="w-full aspect-square rounded-md"
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{ boxShadow: shadow }}
          >
            <Board />
          </div>
        </div>
      </BoardContext.Provider>
    </GameContext.Provider>
);
}
