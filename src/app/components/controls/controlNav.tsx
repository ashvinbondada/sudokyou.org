'use client'
// import { BsEraser, BsEraserFill } from "react-icons/bs";
import { IoBackspaceOutline, IoBackspace, IoSettingsOutline, IoSettings } from "react-icons/io5";

// PiRepeatDuotone - could use this for stalling while it runs
import {PiLightbulb, PiLightbulbFill, 
        PiPencilSimple, PiNotePencil,
        PiRepeat, PiRepeatDuotone,
        PiArrowBendUpLeftFill, PiArrowBendDoubleUpLeftFill,
        PiQuestion, 
        PiQuestionFill,
        PiPencilSimpleFill} from "react-icons/pi";

import IconSquare from "./iconSquare";
import StatBox from "./statBox";
import NumberTile from "./numberTile";
import ShareSquare from "./shareSquare";
import { useContext, useEffect, useState } from "react";
import { BoardContext, GameContext } from "@/lib/context";
import { calculateAutoCandidates, clearAutoCandidates, clearTile } from "@/lib/tileEffects";
import { newGameInterface, PuzzleStringToSudokuInterface } from "@/lib/initializeSudoku";
import { anchorType, tileType } from "@/lib/common";

export default function ControlNav() {
    const [isSettingsClicked, setIsSettingsClicked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const {initial, solution, boardValues, updateSudokuInterface} = useContext(BoardContext)
    const {selectedCell, moveCount, backspaceMode, notesMode, undoMode, gameHistory, updateGameInterface, autoNotesMode, anchorMode, highlightedCells, numToQuantity } = useContext(GameContext)

    const handleAutoNotes = () => {
        let nextBoardValues: Tile[] = []
        if (!autoNotesMode) {
            nextBoardValues = calculateAutoCandidates(boardValues)
        } else {
            nextBoardValues = clearAutoCandidates(boardValues)
        }

        if (updateSudokuInterface) {
            updateSudokuInterface({boardValues: nextBoardValues})
        }
        if (updateGameInterface) {
            const nextGameHistory = [...gameHistory.slice(0, moveCount + 1), {
                selectedCell,
                boardValues: nextBoardValues,
                autoNotesMode,
                highlightedCellsSnap: highlightedCells,
                numToQuantity
            }]
            updateGameInterface({
                moveCount: nextGameHistory.length-1, 
                gameHistory: nextGameHistory,
                autoNotesMode: !autoNotesMode
            })
        }
    }

    const handleDelete = () => {
        const nextBoardValues = boardValues.slice()
        const nextNumToQuantity = new Map(numToQuantity);
        if (anchorMode === anchorType.MULTI || anchorMode === anchorType.SINGLE) {
            const anchorsArray = Array.from(highlightedCells.anchors);
            // const newAnchorNums = new Map(highlightedCells.anchorNums)
            for (const anchor of anchorsArray) {
                const newClearTile = clearTile(nextBoardValues[anchor]) 
                const {squareValue, isEditable} = nextBoardValues[anchor]
                if (squareValue > 0 && isEditable === tileType.RIGHT ) {
                    // const currentValue = newAnchorNums.get(squareValue) || 0;
                    // newAnchorNums.set(nextBoardValues[anchor].squareValue, currentValue > 0 ? currentValue - 1 : 0);

                    // should never default to 0 since we're deleting a value that was already solved
                    // hence currentQuantity is atleast 1 at this point
                    const currentQuantity = nextNumToQuantity.get(squareValue) || 0;
                    nextNumToQuantity.set(squareValue, currentQuantity-1) 
                }
                nextBoardValues[anchor] = newClearTile
            }
        }
        else if (boardValues[selectedCell].squareValue > 0 || boardValues[selectedCell].squareNotes.some((note) => {return note > 0})) {
            const newClearTile = clearTile(boardValues[selectedCell])
            const {squareValue, isEditable} = nextBoardValues[selectedCell]
            if (squareValue > 0 && isEditable === tileType.RIGHT ) {
                const currentQuantity = nextNumToQuantity.get(squareValue) || 0;
                nextNumToQuantity.set(squareValue, currentQuantity-1) 
            }
            nextBoardValues[selectedCell] = newClearTile
        }

        if (updateSudokuInterface) {
            updateSudokuInterface({boardValues: nextBoardValues})
        }
        if (updateGameInterface) {
            const nextGameHistory = [...gameHistory.slice(0, moveCount + 1), {
                selectedCell,
                boardValues: nextBoardValues,
                autoNotesMode,
                highlightedCellsSnap: highlightedCells,
                numToQuantity: nextNumToQuantity
            }]
            const anchorsArray = Array.from(highlightedCells.anchors);
            const filteredAnchors = anchorsArray.filter(anchor => {
                const { isEditable } = boardValues[anchor];
                return isEditable === tileType.WRONG;
            });
            updateGameInterface({
                moveCount: nextGameHistory.length-1, 
                gameHistory: nextGameHistory,
                autoNotesMode: !autoNotesMode,
                numToQuantity: nextNumToQuantity,
                anchorMode: 
                filteredAnchors.length == 0 
                    ? anchorType.NONE 
                    : (filteredAnchors.length == 1)
                        ? anchorType.SINGLE
                        : anchorType.MULTI
            })
        }
    }

    useEffect(() => {
        if (backspaceMode)
            handleDelete()
    }, [backspaceMode])

    const handleNotes = () => {
        if (updateGameInterface) 
            updateGameInterface({notesMode: !notesMode })
    }

    const handleRestart = () => {
        const newSudoku = PuzzleStringToSudokuInterface(initial, solution)
        const newGame = newGameInterface(newSudoku.boardValues)
        if (updateGameInterface)
            updateGameInterface(newGame)
        if (updateSudokuInterface)
            updateSudokuInterface(newSudoku)
    }

    const handleUndo = () => {
        // place people at the 
        const { 
            selectedCell: prevSelectedTile, 
            highlightedCellsSnap: prevHighlightedCells 
        } = gameHistory[gameHistory.length - 1]

        if (gameHistory.length == 1) {
            if (updateGameInterface) {
                updateGameInterface({
                    selectedCell: prevSelectedTile, 
                    highlightedCells: prevHighlightedCells
            })}

        } else {

            const { 
                    boardValues: prevBoardValues,
                    autoNotesMode: prevAutoNotesMode,
                    numToQuantity: prevNumToQuantity,
            } = gameHistory[gameHistory.length - 2]

            if (updateSudokuInterface) {
                updateSudokuInterface({boardValues: prevBoardValues})
            }

            if (updateGameInterface) {
                const nextGameHistory = [...gameHistory.slice(0, moveCount)]

                const anchorsArray = Array.from(highlightedCells.anchors);
                const filteredAnchors = anchorsArray.filter(anchor => {
                    const { isEditable } = prevBoardValues[anchor];
                    return isEditable === tileType.WRONG;
                });

                console.log(prevHighlightedCells)
                console.log(prevSelectedTile)
                console.log()

                updateGameInterface({
                    moveCount: nextGameHistory.length-1, 
                    gameHistory: nextGameHistory,
                    selectedCell: prevSelectedTile,
                    autoNotesMode: prevAutoNotesMode,
                    numToQuantity: prevNumToQuantity,
                    highlightedCells: prevHighlightedCells,
                    anchorMode: 
                        filteredAnchors.length == 0 
                            ? anchorType.NONE 
                            : (filteredAnchors.length == 1)
                                ? anchorType.SINGLE
                                : anchorType.MULTI
            })}
        }
    }

    useEffect(() => {
        if (undoMode)
            handleUndo()
    }, [undoMode])


    return (
        <div className="h-full w-full flex flex-col">
            {/* border goes here */}
            <div className="p-2 w-full h-12 flex flex-row items-center justify-center">
                <div className="w-full h-12 aspect-square flex rounded-md overflow-hidden">
                {/* Share Button */}
                <button className="w-2/3 flex items-center justify-center text-white text-xl transition-all duration-300"
                onClick={() => setIsClicked(!isClicked)} 
                >
                {isClicked ? <ShareSquare icon={PiQuestionFill} label="help"/> : <ShareSquare icon={PiQuestion} label="help"/>}
                </button>

                {/* Grid Button */}
                <button
                    className="flex-1 flex items-center justify-center transition-all duration-300 border-l-2 border-theme-1-pacific-cyan"
                    onClick={() => setIsSettingsClicked(!isSettingsClicked)}
                >
                    {isSettingsClicked ? <ShareSquare icon={IoSettings} label="settings"/> : <ShareSquare icon={IoSettingsOutline} label="settings"/>}
                </button>
                </div>
            </div>
            
            {/* border goes here */}
            <div className="top-12 h-full flex flex-col">
                <div className="w-full h-1/3 flex flex-col flex-none gap-[2px]">
                    <div className="h-full bg-transparent">
                        <div className="grid grid-cols-3 flex-none gap-2 w-full h-full p-2">
                            <IconSquare icon={PiPencilSimple}
                            pressedIcon={PiPencilSimpleFill} label="notes" 
                            handleMe={handleNotes} isToggle={true} keyBoardClick={notesMode || highlightedCells.anchors.size > 1}/>
                            <IconSquare icon={PiNotePencil} 
                            pressedIcon={PiNotePencil} label="auto" 
                            handleMe={handleAutoNotes}/>
                            <IconSquare icon={PiLightbulb} 
                            pressedIcon={PiLightbulbFill} label="hints" 
                            handleMe={() => console.log("pressed hints")}
                            />
                            <IconSquare icon={IoBackspaceOutline} 
                            pressedIcon={IoBackspace} label="delete" 
                            handleMe={handleDelete} keyBoardClick={backspaceMode}/>
                            <IconSquare icon={PiArrowBendUpLeftFill} 
                            pressedIcon={PiArrowBendDoubleUpLeftFill} label="undo" 
                            handleMe={handleUndo} keyBoardClick={undoMode}/>
                            <IconSquare icon={PiRepeat} 
                            pressedIcon={PiRepeatDuotone} label="restart" 
                            handleMe={handleRestart}/>
                        </div>
                    </div>
                </div>
                <div className="p-2 grid grid-cols-3 h-1/3 gap-2">
                    <NumberTile squareValue={1} quantity={numToQuantity.get(1) ?? 0} />
                    <NumberTile squareValue={2} quantity={numToQuantity.get(2) ?? 0} />
                    <NumberTile squareValue={3} quantity={numToQuantity.get(3) ?? 0} />
                    <NumberTile squareValue={4} quantity={numToQuantity.get(4) ?? 0} />
                    <NumberTile squareValue={5} quantity={numToQuantity.get(5) ?? 0} />
                    <NumberTile squareValue={6} quantity={numToQuantity.get(6) ?? 0} />
                    <NumberTile squareValue={7} quantity={numToQuantity.get(7) ?? 0} />
                    <NumberTile squareValue={8} quantity={numToQuantity.get(8) ?? 0} />
                    <NumberTile squareValue={9} quantity={numToQuantity.get(9) ?? 0} />
                </div>

                <div className="w-full h-1/3 flex-none">
                    <StatBox />
                </div>
            </div>
        </div>
    );
  }
  
