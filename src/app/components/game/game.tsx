'use client'

import { useCallback, useEffect, useState } from "react";
import { BoardContext, GameContext } from "../../../lib/context";
// import { useShiftClick } from "@/lib/useKeyboard";
import Board from "./board";
import { debounce, } from "lodash";
import useKeyboardShortcut from "use-keyboard-shortcut";
import DifficultySelector from "../difficultyTimer";
import { calculateHighlightCells, clearTile } from "@/lib/tileEffects";
import { tileType } from "@/lib/common";
import ControlNav from "../controls/controlNav";

type Props = {
    newSudoku: SudokuInterface,
    newGame: GameInterface
}

export default function Game({newSudoku, newGame}: Props) {
  // const shiftPressIsShiftDown = useShiftClick();
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
    setGameData((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === "u") {
        setGameData((prevState) => ({
          ...prevState,
          undoMode: false,
        }))
      }
      if (event.key === "Backspace") {
        setGameData((prevState) => ({
          ...prevState,
          backspaceMode: false,
        }))
      }
      if (event.key === "Shift") {
        setGameData((prevState) => ({
          ...prevState,
          notesMode: false
        }))
      }
      if (event.key === "Meta") {
        setGameData((prevState) => ({
          ...prevState,
          anchorMode: false
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
 
  useKeyboardShortcut(["Shift"], () => {
    setGameData((prevState) => ({
      ...prevState,
      notesMode: true
    }));
  }, {repeatOnHold: true, overrideSystem: true})

  useKeyboardShortcut(["Meta"], () => {
    setGameData((prevState) => ({
      ...prevState,
      anchorMode: true
    }))
  })

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


  // Backspace DELETE TOGGLE
  useKeyboardShortcut(["Backspace"], () => {
    const newClearTile = clearTile(boardData.boardValues[gameData.selectedCell])
    const nextBoardValues = boardData.boardValues.slice();
    nextBoardValues[gameData.selectedCell] = newClearTile
    setBoardData((prevState) => ({
      ...prevState,
      boardValues: nextBoardValues
    }))
    setGameData((prevState) => ({
      ...prevState,
      backspaceMode: true
    }));
    const nextGameHistory = [...gameData.gameHistory.slice(0, gameData.moveCount + 1), {
      selectedCell: gameData.selectedCell,
      boardValues: nextBoardValues,
      autoNotesMode: gameData.autoNotesMode
    }]
    setGameData((prevstate) => ({
      ...prevstate,
      gameHistory: nextGameHistory,
      moveCount: nextGameHistory.length - 1,
    }))

  })

  // n PRESS NOTES PERM TOGGLE
  useKeyboardShortcut(["n"], () => {
      setGameData((prevState) => ({
        ...prevState,
        notesMode: !prevState.notesMode
      }));
  })

  // u PRESS UNDO MOVE
  useKeyboardShortcut(["u"], () => {
      const { selectedCell: prevSelectedTile } = gameData.gameHistory[gameData.gameHistory.length - 1]
      setGameData((prevState) => ({
        ...prevState,
        undoMode: true
      }))
    if (gameData.gameHistory.length == 1) {
        setGameData((prevState) => ({
          ...prevState,
          selectedCell: prevSelectedTile,
        }))
    } else {
        const { boardValues: prevBoardValues,
                autoNotesMode: prevAutoNotesMode
        } = gameData.gameHistory[gameData.gameHistory.length - 2]
        setBoardData((prevState) => ({
          ...prevState,
          boardValues: prevBoardValues
        }))
        const nextGameHistory = [...gameData.gameHistory.slice(0, gameData.moveCount)]
        console.log("button: ", nextGameHistory)  
        setGameData((prevState) => ({
          ...prevState,
          gameHistory: nextGameHistory,
          autoNotesMode: prevAutoNotesMode,
          moveCount: nextGameHistory.length-1, 
          selectedCell: prevSelectedTile,
        }))
      }
  },{repeatOnHold: true, })

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
    const {neighborhood} = calculateHighlightCells(gameData.selectedCell)
    setGameData((prevState) => ({
      ...prevState,
      highlightedCells: {...prevState.highlightedCells, neighborhood}
    }))

  }, [gameData.selectedCell])

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

  // NOTES SQUARE HANDLING
  // const handleSquareNotesInput = useCallback((input: number, index: number = gameData.selectedCell) => {
  //     const {boardValues } = boardData
  //     const {squareNotes} = boardValues[index]
  //     const nextSquareNotes = squareNotes.slice();
  //     console.log("before: ", boardValues[index])
  //     console.log("before boardValues: ", boardValues)
  //     nextSquareNotes[input] = (nextSquareNotes[input] === input+1) ? 0 : input + 1;
  //     const nextBoardValues = boardValues.slice();
  //     nextBoardValues[index] = {
  //         ...boardValues[index],
  //         squareValue: 0,
  //         squareNotes: nextSquareNotes
  //     }
  //     setBoardData((prevState) => ({
  //         ...prevState,
  //         boardValues: nextBoardValues
  //     }))
  //     console.log("after : ", nextBoardValues[index])
  //     const nextGameHistory = [...gameData.gameHistory.slice(0, gameData.moveCount + 1), {
  //     selectedCell: index,
  //     boardValues: nextBoardValues,
  //     autoNotesMode: gameData.autoNotesMode
  //   }]
  //     setGameData((prevstate) => ({
  //       ...prevstate,
  //       gameHistory: nextGameHistory,
  //       moveCount: nextGameHistory.length - 1,
  //     }))
  // }, [gameData.selectedCell, boardData, gameData.gameHistory, gameData.autoNotesMode, gameData.moveCount]);
  const handleSquareNotesInput = useCallback((input: number, index: number = gameData.selectedCell) => {
    setBoardData((prevBoardData) => {
        const { boardValues } = prevBoardData;
        const { squareNotes } = boardValues[index];
        const nextSquareNotes = squareNotes.slice();
        console.log("before: ", boardValues[index]);
        console.log("before boardValues: ", boardValues);
        
        nextSquareNotes[input] = (nextSquareNotes[input] === input + 1) ? 0 : input + 1;
        
        const nextBoardValues = boardValues.slice();
        nextBoardValues[index] = {
            ...boardValues[index],
            squareValue: 0,
            squareNotes: nextSquareNotes,
        };

        return {
            ...prevBoardData,
            boardValues: nextBoardValues,
        };
    });

    setGameData((prevGameData) => {
      const nextGameHistory = [
          ...prevGameData.gameHistory.slice(0, prevGameData.moveCount + 1),
          {
              selectedCell: index,
              boardValues: boardData.boardValues, // Use the latest boardValues here if needed
              autoNotesMode: prevGameData.autoNotesMode,
          },
      ];

      return {
          ...prevGameData,
          gameHistory: nextGameHistory,
          moveCount: nextGameHistory.length - 1,
      };
    });
}, [gameData.selectedCell]);

  // REGULAR SQUARE HANDLING
  const handleRegularSquareInput = useCallback((input: number, index: number = gameData.selectedCell) => {
    const {solution, boardValues} = boardData
    const {selectedCell, gameHistory, autoNotesMode, moveCount } = gameData
    const {squareValue} = boardValues[index]

    const nextValue = (squareValue === input) ? 0 : input;
    const nextBoardValues = boardValues.slice(); // Clone the board values to avoid mutation
    nextBoardValues[index] = {
    ...boardValues[index],
    isEditable: nextValue === Number(solution[index]) ? tileType.RIGHT : tileType.WRONG,
    squareValue: nextValue,
    // dont reset notes since we cant edit the square once right value is entered anyway - shilpa
    // squareNotes: Array(9).fill(0), 
    };

    const nextGameHistory = [...gameHistory.slice(0, moveCount + 1), {
      selectedCell: selectedCell,
      boardValues: nextBoardValues,
      autoNotesMode: autoNotesMode
    }]
    setGameData((prevstate) => ({
      ...prevstate,
      gameHistory: nextGameHistory,
      moveCount: nextGameHistory.length - 1
    }))

    setBoardData((prevState) => ({
        ...prevState,
        boardValues: nextBoardValues
      }))
    }, [gameData.selectedCell,gameData.gameHistory, gameData, boardData]);

    // SQUARE INPUT HANDLING
    useEffect(() => {
      const {inputValue, selectedCell, highlightedCells, notesMode} = gameData
      console.log(gameData)
      if (inputValue > 0) {
        if (highlightedCells.anchors.size == 1) {
        console.log("solo input anchor: ", highlightedCells.anchors)
        const index = highlightedCells.anchors.keys().toArray()[0]
        const {isEditable} = boardData.boardValues[index]
        if (isEditable === tileType.WRONG) {
            if (notesMode) {
                const input = inputValue - 1;
                handleSquareNotesInput(input, index);
            } else {
                handleRegularSquareInput(inputValue, index);
            }
        }
      }
      else if (gameData.highlightedCells.anchors.size > 1) {
        console.log("multi input anchors: ", highlightedCells.anchors)
        const anchorsArray = Array.from(gameData.highlightedCells.anchors);
        if (highlightedCells.anchors.size > 0) {
          for (const anchor of anchorsArray) {
            const {isEditable} = boardData.boardValues[anchor]
            if (isEditable === tileType.WRONG) {
              console.log('anchor to edit: ', anchor, "input: ", inputValue-1)
              const input = inputValue - 1;
              handleSquareNotesInput(input, anchor);
            }
          }
        }
      } else  {
          const {isEditable} = boardData.boardValues[selectedCell]
          if (isEditable === tileType.WRONG) {
            if (notesMode) {
              const input = inputValue - 1;
              handleSquareNotesInput(input);
          } else {
              handleRegularSquareInput(inputValue, );
          }
          }
        }
      }
    }, [gameData.inputValue]);
    // IMPORTANT - INCLUDING SELECTED CELL MAKES THIS STICKY 
  
    useEffect(() => {
      console.log("gameHistory: ", gameData.gameHistory)
    },  [gameData.gameHistory])

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

  // useEffect(() => {
  //   console.log("anchors: ",gameData.highlightedCells.anchors)
  // }, [gameData.highlightedCells.anchors])

  return (
      <GameContext.Provider value={{...gameData, updateGameInterface: updateGameInterface}}>
        <BoardContext.Provider value={{ ...boardData, updateSudokuInterface: updateSudokuInterface }}>
          <div className="w-full h-max">
            <div className="w-full flex md:flex-row sm:justify-start justify-center gap-1">
              <div className="w-full sm:w-2/3 flex flex-col">
                <DifficultySelector />
                <div
                className="h-max aspect-square"
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
