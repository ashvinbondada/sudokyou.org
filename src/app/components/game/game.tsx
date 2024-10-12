'use client'

import { useCallback, useEffect, useState } from "react";
import { BoardContext, GameContext } from "../../../lib/context";
// import { useShiftClick } from "@/lib/useKeyboard";
import Board from "./board";
import useKeyboardShortcut from "use-keyboard-shortcut";
import DifficultySelector from "../difficultyTimer";
import { calculateHighlightCells,} from "@/lib/tileEffects";
import { tileType } from "@/lib/common";
import ControlNav from "../controls/controlNav";

type Props = {
    newSudoku: SudokuInterface,
    newGame: GameInterface
}

export default function Game({newSudoku, newGame}: Props) {
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
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur(); // Removes focus from the currently active element
      }
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
        }));
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
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur(); // Removes focus from the currently active element
    }
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
    setGameData((prevState) => ({
      ...prevState,
      backspaceMode: true
    }));
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
      setGameData((prevState) => ({
        ...prevState,
        undoMode: true
      }))
      setTimeout(() => {
        setGameData((prevState) => ({
          ...prevState,
          undoMode: false
        })) 
      },1)
  },{repeatOnHold: true, })


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

  // NOTES SQUARE HANDLING
  const handleSquareNotesInput = useCallback((input: number, inputList: number[]) => {
    const nextBoardValues = boardData.boardValues.slice();
    for (const idx of inputList) {
      const { squareNotes } = boardData.boardValues[idx];
      const nextSquareNotes = squareNotes.slice();
      
      nextSquareNotes[input] = (nextSquareNotes[input] === input + 1) ? 0 : input + 1;
      
      nextBoardValues[idx] = {
          ...boardData.boardValues[idx],
          squareValue: 0,
          squareNotes: nextSquareNotes,
      };
    }
    return nextBoardValues

}, [boardData.boardValues]);

  // REGULAR SQUARE HANDLING
  const handleRegularSquareInput = useCallback((input: number, index: number): {nextNumToQuantity: Map<number, number>, nextBoardValues: Tile[] } => {
    const nextBoardValues = boardData.boardValues.slice(); // Clone the board values to avoid mutation
    const {squareValue} = nextBoardValues[index]

    const nextValue = (squareValue === input) ? 0 : input;
    const nextIsEditable = nextValue === Number(boardData.solution[index]) ? tileType.RIGHT : tileType.WRONG
    nextBoardValues[index] = {
    ...boardData.boardValues[index],
    isEditable: nextIsEditable,
    squareValue: nextValue,
    };

    if (nextIsEditable === tileType.RIGHT) {
      // Iterate over the neighborhood and remove inputValue from their notes
      gameData.highlightedCells.neighborhood.forEach((cellIndex) => { //       // Skip the currently selected cell //       if (cellIndex !== selectedCell) {
        const cell = nextBoardValues[cellIndex];
        const nextSquareNotes = cell.squareNotes.map(note => (note === input ? 0 : note)); // Remove the input from the notes
        nextBoardValues[cellIndex] = {
          ...cell,
          squareNotes: nextSquareNotes,
        };
      })

      const nextNumToQuantity = new Map(gameData.numToQuantity);
      const currentQuantity = nextNumToQuantity.get(input) || 0;
      nextNumToQuantity.set(input, currentQuantity + 1);
      return {
        nextNumToQuantity: nextNumToQuantity, nextBoardValues: nextBoardValues
      }
    }
    
    return {nextNumToQuantity: gameData.numToQuantity , nextBoardValues: nextBoardValues}

  }, [boardData, gameData.highlightedCells, gameData.numToQuantity]);

   
    useEffect(() => {
      const { inputValue, selectedCell, highlightedCells, notesMode } = gameData;
      let finalBoardValues: Tile[] = boardData.boardValues.slice();
      let finalNumToQuantity: Map<number, number> = new Map(gameData.numToQuantity)
      if (inputValue > 0) {
        const anchorsArray = Array.from(highlightedCells.anchors);
        // Filter anchors where isEditable is tileType.WRONG
        const filteredAnchors = anchorsArray.filter(anchor => {
          const { isEditable } = boardData.boardValues[anchor];
          return isEditable === tileType.WRONG;
        });
        if (filteredAnchors.length > 1) {
          const input = inputValue - 1;
          finalBoardValues = handleSquareNotesInput(input, filteredAnchors);
        } 
        else if (filteredAnchors.length === 1) {
            const index = filteredAnchors[0];
            const { isEditable } = boardData.boardValues[index];
            
            if (isEditable === tileType.WRONG) {
              if (notesMode) {
                const input = inputValue - 1;
                finalBoardValues = handleSquareNotesInput(input, [index]);
              } else {
                const {nextNumToQuantity, nextBoardValues} = handleRegularSquareInput(inputValue, index);
                finalBoardValues = nextBoardValues
                finalNumToQuantity = nextNumToQuantity
              }
            }
          } 
          else {
            const { isEditable } = boardData.boardValues[selectedCell];
            if (isEditable === tileType.WRONG) {
              if (notesMode) {
                const input = inputValue - 1;
                finalBoardValues = handleSquareNotesInput(input, [selectedCell]);
              } else {
                const {nextNumToQuantity, nextBoardValues} = handleRegularSquareInput(inputValue, selectedCell);
                finalBoardValues = nextBoardValues
                finalNumToQuantity = nextNumToQuantity
              }
            }
          }
        
        setBoardData((prevBoardData) => ({
          ...prevBoardData,
          boardValues: finalBoardValues
        }));
        setGameData((prevGameData) => {
          const nextGameHistory = [
            ...prevGameData.gameHistory.slice(0, prevGameData.moveCount + 1),
            {
              selectedCell: prevGameData.selectedCell,
              boardValues: finalBoardValues, // Use the updated boardValues
              autoNotesMode: prevGameData.autoNotesMode,
              numToQuantity: finalNumToQuantity
            },
          ];
    
          return {
            ...prevGameData,
            gameHistory: nextGameHistory,
            moveCount: nextGameHistory.length - 1,
            numToQuantity: finalNumToQuantity
          };
        });
        }
      }, [gameData.inputValue, gameData.selectedCell]);    
  

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget;
    
    // Mouse position relative to the center of the component
    const x = e.clientX - offsetLeft - offsetWidth / 2;
    const y = e.clientY - offsetTop - offsetHeight / 2;

    // Invert the shadow to be on the opposite side of the mouse position
    const shadowX = -(x / offsetWidth) * 30; // Negative sign to invert
    const shadowY = -(y / offsetHeight) * 30;

    // Set the new shadow
    setShadow(`${shadowX}px ${shadowY}px 15px rgba(8, 103, 136, 0.5)`); // Opacity changed to 0.3
    setInputSource("mouse");
  };

  return (
      <GameContext.Provider value={{...gameData, updateGameInterface: updateGameInterface}}>
        <BoardContext.Provider value={{ ...boardData, updateSudokuInterface: updateSudokuInterface }}>
          <div className="w-full h-max" tabIndex={-1}>
            <div className="w-full flex md:flex-row sm:justify-start justify-center gap-1">
              <div className="w-full sm:w-2/3 flex flex-col p-2">
                <DifficultySelector />
                <div
                className="h-max aspect-square"
                onMouseMove={handleMouseMove}
                style={{ boxShadow: shadow, zIndex: 10 }}
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
