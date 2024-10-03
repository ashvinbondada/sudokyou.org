'use client'

import { useCallback, useEffect, useState } from "react";
import { BoardContext, GameContext } from "../../../lib/context";
import { useShiftClick } from "@/lib/useKeyboard";
import Board from "./board";
import { debounce, } from "lodash";
import useKeyboardShortcut from "use-keyboard-shortcut";
import DifficultySelector from "../difficultyTimer";
import { calculateHighlightCells } from "@/lib/tileEffects";
import { tileType } from "@/lib/common";
// import { useHotkeys } from 'react-hotkeys-hook';
import ControlNav from "../controls/controlNav";
// import next from "next";

type Props = {
    newSudoku: SudokuInterface,
    newGame: GameInterface
}

export default function Game({newSudoku, newGame}: Props) {
  const shiftPressIsShiftDown = useShiftClick();
  // const keyDown = useKeyboardClick();
  const [inputSource, setInputSource] = useState<"keyboard" | "mouse">("keyboard")
  const [shadow, setShadow] = useState("0px 0px 15px rgba(0, 0, 0, 0.5)");

  // CONTEXT SETUP
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
    // const nextHistory = [...gameData.history.slice(0, gameData.moveCount+1), boardData.boardValues]
    setGameData((prevState) => ({
      ...prevState,
      ...newState,
    }))
    // setGameData((prevState) => ({
    //   ...prevState,
    //   history: nextHistory,
    //   moveCount: nextHistory.length - 1
    // }))
  }

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === "u") {
        setGameData((prevState) => ({
          ...prevState,
          undoMode: false,
        }))
      }
      if (!["Shift", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(event.key)) {
        setGameData((prevState) => ({
          ...prevState,
          inputValue: 0,
        }))
      }
    } 
    

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // SHIFT PRESS NOTES SOFT TOGGLE UPDATE
  useEffect(() => {
    setGameData((prevGameData) => (
      {
        ...prevGameData,
        notesMode: shiftPressIsShiftDown
      }
    ))
  }, [shiftPressIsShiftDown])


  // NUMBER INPUT HANDLING
  useKeyboardShortcut(["1"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 1,
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["2"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 2
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["3"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 3
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["4"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 4
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["5"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 5
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["6"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 6
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["7"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 7
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["8"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 8
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["9"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 9
      }));
  }, {repeatOnHold: true})

  // LEFT GRID (INCLUDES CAPITAL VERSION Ex: q & Q)
  useKeyboardShortcut(["q"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 1
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["w"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 2
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["e"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 3
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["a"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 4
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["s"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 5
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["d"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 6
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["z"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 7
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["x"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 8
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["c"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 9
      }));
  }, {repeatOnHold: true})

  // NOTES CHARACTER INPUT
  useKeyboardShortcut(["!"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 1
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["@"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 2
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["#"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 3
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["$"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 4
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["%"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 5
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["^"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 6
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["&"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 7
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["*"], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 8
      }));
  }, {repeatOnHold: true})

  useKeyboardShortcut(["("], () => {
      setGameData((prevState) => ({
        ...prevState,
        inputValue: 9
      }));
  }, {repeatOnHold: true})

  // n PRESS NOTES PERM TOGGLE
  useKeyboardShortcut(["n"], () => {
      setGameData((prevState) => ({
        ...prevState,
        notesMode: !prevState.notesMode
      }));
  })

  // n PRESS NOTES PERM TOGGLE
  useKeyboardShortcut(["u"], () => {
    if (gameData.history.length === 1 || gameData.historySelectedCell.length === 1) {
        setGameData((prevState) => ({
          ...prevState,
          undoMode: false
        }))
        alert("reached beginning of game")
    } else {
        const prevMove = gameData.history[gameData.history.length - 2]
        const prevSelectedCell = gameData.historySelectedCell[gameData.historySelectedCell.length - 2]
        if (updateSudokuInterface)
            updateSudokuInterface({boardValues: prevMove})
        if (updateGameInterface) {
            const nextHistory = [...gameData.history.slice(0, gameData.moveCount)]
            const nextHistorySelectedCell = [...gameData.historySelectedCell.slice(0, gameData.moveCount), gameData.selectedCell]
            // console.log("undo: ", nextHistory)
            console.log(gameData.moveCount)
            updateGameInterface({
                moveCount: nextHistory.length-1, 
                historySelectedCell: nextHistorySelectedCell,
                history: nextHistory,
                selectedCell: prevSelectedCell
            })}
            setGameData((prevState) => ({
              ...prevState,
              undoMode: true
            }))
        }
  },{repeatOnHold: false, })

  useKeyboardShortcut(["Control", "z"], () => {
    console.log("CONTROL + Z pressed.")
  })

  // MOVEMENT INPUT HANDLING
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

  // BOARD SHADOW EFFECT
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
    const {neighborhood, sameNumbers} = calculateHighlightCells(gameData.selectedCell)
    setGameData((prevState) => ({
      ...prevState,
      highlightedCells: {neighborhood, sameNumbers}
    }))

  }, [gameData.selectedCell, boardData])

  useEffect(() => {
    const { inputValue, selectedCell, highlightedCells, notesMode } = gameData;
    const { boardValues } = boardData;
  
    // Check if the input is valid, notes mode is off, and neighborhood exists
    if (
      boardData.boardValues[gameData.selectedCell].isEditable !== tileType.GIVEN 
      && inputValue > 0 
      && inputValue === Number(boardData.solution[gameData.selectedCell])
      && !notesMode 
      && highlightedCells?.neighborhood) {
      const nextBoardValues = boardValues.slice(); // Create a copy of boardValues

      // Iterate over the neighborhood and remove inputValue from their notes
      highlightedCells.neighborhood.forEach((cellIndex) => {
        // Skip the currently selected cell
        if (cellIndex !== selectedCell) {
          const cell = nextBoardValues[cellIndex];
          const nextSquareNotes = cell.squareNotes.map(note => (note === inputValue ? 0 : note)); // Remove the input from the notes
          nextBoardValues[cellIndex] = {
            ...cell,
            squareNotes: nextSquareNotes,
          };
        }
      });

      // Update the board values without affecting the selected cell
      setBoardData((prevState) => ({
        ...prevState,
        boardValues: nextBoardValues,
      }));
    }
  }, [gameData, boardData]);
  
  // function appendHistory(nextBoardValues: Tile[]) {
  //   // console.log(gameData.moveCount+2)
  //   const nextHistory = [...gameData.history.slice(0, gameData.moveCount+1), nextBoardValues ]
  //   setGameData((prevstate) => ({
  //     ...prevstate,
  //     history: nextHistory,
  //     moveCount: nextHistory.length - 1
  //   }))
  //   console.log(nextHistory)
  // }

  // NOTES SQUARE HANDLING
  const handleSquareNotesInput = useCallback((index: number) => {
      const {boardValues } = boardData
      const {squareNotes} = boardValues[gameData.selectedCell]
      const nextSquareNotes = squareNotes.slice();
      nextSquareNotes[index] = (nextSquareNotes[index] === index+1) ? 0 : index + 1;
      const nextBoardValues = boardValues.slice();
      nextBoardValues[gameData.selectedCell] = {
          ...boardValues[gameData.selectedCell],
          squareValue: 0,
          squareNotes: nextSquareNotes
      }
      setBoardData((prevState) => ({
          ...prevState,
          boardValues: nextBoardValues
        }))

      console.log("adding a move")
      // appendHistory(nextBoardValues)
      const nextHistory = [...gameData.history.slice(0, gameData.moveCount+1), nextBoardValues ]
      const nextHistorySelectedCell = [...gameData.historySelectedCell.slice(0, gameData.moveCount + 1), gameData.selectedCell]
      setGameData((prevstate) => ({
        ...prevstate,
        history: nextHistory,
        historySelectedCell: nextHistorySelectedCell,
        moveCount: nextHistory.length - 1
      }))
      // setRight(true)
  }, [gameData.selectedCell, boardData]);

  // REGULAR SQUARE HANDLING
  const handleRegularSquareInput = useCallback((input: number) => {
    const {solution, boardValues} = boardData
    const {squareValue} = boardValues[gameData.selectedCell]
    // if (input > 0 && input !== Number(solution.charAt(gameData.selectedCell))) {
    //   // setRight(false);
    // } else {
    //   // setRight(true);
    // }

    const nextValue = (squareValue === input) ? 0 : input;
    const nextBoardValues = boardValues.slice(); // Clone the board values to avoid mutation
    nextBoardValues[gameData.selectedCell] = {
    ...boardValues[gameData.selectedCell],
    isEditable: nextValue === Number(solution[gameData.selectedCell]) ? tileType.RIGHT : tileType.WRONG,
    squareValue: nextValue,
    // dont reset notes since we cant edit the square once right value is entered anyway - shilpa
    // squareNotes: Array(9).fill(0), 
    };

    console.log("adding a move")
    // appendHistory(nextBoardValues)
    const nextHistory = [...gameData.history.slice(0, gameData.moveCount+1), nextBoardValues ]
    const nextHistorySelectedCell = [...gameData.historySelectedCell.slice(0, gameData.moveCount + 1), gameData.selectedCell]
    setGameData((prevstate) => ({
      ...prevstate,
      history: nextHistory,
      historySelectedCell: nextHistorySelectedCell,
      moveCount: nextHistory.length - 1
    }))

    setBoardData((prevState) => ({
        ...prevState,
        boardValues: nextBoardValues
      }))
    }, [gameData.selectedCell, boardData]);

    // const nexthistory = [...gameData.history.slice(0, gameData.moveCount+1), boardData.boardValues]
    // setGameData((prevstate) => ({
    //   ...prevstate,
    //   history: nexthistory,
    //   movecount: nexthistory.length - 1
    // }))


    // SQUARE INPUT HANDLING
    useEffect(() => {
        const {inputValue, selectedCell, notesMode} = gameData
        const {isEditable} = boardData.boardValues[selectedCell]
        if (isEditable === tileType.WRONG && inputValue > 0) {
            if (notesMode) {
                const index = inputValue - 1;
                handleSquareNotesInput(index);
            } else {
                handleRegularSquareInput(inputValue);
            }
        }
    }, [gameData.selectedCell, gameData.inputValue]);
    // IMPORTANT - INCLUDING SELECTED CELL MAKES THIS STICKY 

  // RESET GAME STATE
  const handleMouseLeave = debounce(() => {
    const updatedBoardValues = boardData.boardValues.map(square => ({
      ...square,
      isDivHovered: false
    }))

    setBoardData(prevBoardData => ({
      ...prevBoardData,
      boardValues: updatedBoardValues
    }))

    // introduces a recursion bug
    // setGameData(prevGameData => ({
    //   ...prevGameData,
    //   inputValue: 0
    // }))

    console.log("cleaned")
  },50) 

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget;
    
    // Mouse position relative to the center of the component
    const x = e.clientX - offsetLeft - offsetWidth / 2;
    const y = e.clientY - offsetTop - offsetHeight / 2;

    // Invert the shadow to be on the opposite side of the mouse position
    const shadowX = -(x / offsetWidth) * 15; // Negative sign to invert
    const shadowY = -(y / offsetHeight) * 15;

    // Set the new shadow
    setShadow(`${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 0.5)`);
    setInputSource("mouse");
  };


  return (
      <GameContext.Provider value={{...gameData, updateGameInterface: updateGameInterface}}>
        <BoardContext.Provider value={{ ...boardData, updateSudokuInterface: updateSudokuInterface }}>
          <div className="w-full h-full">
            <div className="w-full flex md:flex-row sm:justify-start justify-center gap-1">
              <div className="w-full sm:w-2/3 flex flex-col">
                <DifficultySelector />
                <div
                className="w-full h-max aspect-square"
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{ boxShadow: shadow }}
                >
                  <Board />
                </div>
              </div>
              <div className="sm:block md:block hidden flex-auto">
                <ControlNav />
              </div>
            </div>
          </div>
        </BoardContext.Provider>
      </GameContext.Provider>
);
}
