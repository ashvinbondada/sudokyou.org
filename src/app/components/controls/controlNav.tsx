'use client'
// import { BsEraser, BsEraserFill } from "react-icons/bs";
import { IoBackspaceOutline, IoBackspace, IoSettingsOutline, IoSettings } from "react-icons/io5";

// PiRepeatDuotone - could use this for stalling while it runs
import {PiLightbulb, PiLightbulbFill, 
        PiPencilSimple, PiPencilSimpleFill, PiNotePencil,
        PiRepeat, 
        PiArrowBendDownLeft, PiQuestion, 
        PiQuestionFill} from "react-icons/pi";

import IconSquare from "./iconSquare";
import StatBox from "./statBox";
import NumPadSquare from "./numberTile";
import ShareSquare from "./shareSquare";
import { useContext, useState } from "react";
import { BoardContext, GameContext } from "@/lib/context";
import { calculateAutoCandidates, clearTile } from "@/lib/tileEffects";
import { newGameInterface, PuzzleStringToSudokuInterface } from "@/lib/initializeSudoku";

export default function ControlNav() {
    const [isSettingsClicked, setIsSettingsClicked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const {initial, solution, boardValues, updateSudokuInterface} = useContext(BoardContext)
    const {selectedCell, moveCount, notesMode, history, updateGameInterface} = useContext(GameContext)

    const handleAutoNotes = () => {
        // console.log("before: ", boardValues)
        const boardWithNotesFilled = calculateAutoCandidates(boardValues)
        // console.log("in control", boardWithNotesFilled)
        if (updateSudokuInterface) {
            updateSudokuInterface({boardValues: boardWithNotesFilled})
        }
        if (updateGameInterface) {
            const nextHistory = [...history.slice(0, moveCount+1), boardWithNotesFilled]

            updateGameInterface({
                moveCount: nextHistory.length-1, 
                history: nextHistory
            })
        }
    }

    const handleDelete = () => {
        const newClearTile = clearTile(boardValues[selectedCell])
        const nextBoardValues = boardValues.slice()
        nextBoardValues[selectedCell] = newClearTile
        if (updateSudokuInterface) {
            updateSudokuInterface({boardValues: nextBoardValues})
        }
    }

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
        if (history.length === 1) {
            alert("reached beginning of game")
        } else {
            const prevMove = history[history.length - 2]
            if (updateSudokuInterface)
                updateSudokuInterface({boardValues: prevMove})
            if (updateGameInterface) {
                const nextHistory = [...history.slice(0, moveCount)]
                console.log("undo: ", nextHistory)
                console.log(moveCount)
                updateGameInterface({
                    moveCount: nextHistory.length-1, 
                    history: nextHistory
                })}
            }
    }


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
                            handleMe={handleNotes} isToggle={true} keyBoardClick={notesMode}/>
                            <IconSquare icon={PiNotePencil} 
                            pressedIcon={PiNotePencil} label="auto" 
                            handleMe={handleAutoNotes}/>
                            <IconSquare icon={PiLightbulb} 
                            pressedIcon={PiLightbulbFill} label="hints" 
                            handleMe={() => console.log("pressed hints")}
                            isToggle={true}/>
                            <IconSquare icon={IoBackspaceOutline} 
                            pressedIcon={IoBackspace} label="delete" 
                            handleMe={handleDelete}/>
                            <IconSquare icon={PiArrowBendDownLeft} 
                            pressedIcon={PiArrowBendDownLeft} label="undo" 
                            handleMe={handleUndo}/>
                            <IconSquare icon={PiRepeat} 
                            pressedIcon={PiRepeat} label="restart" 
                            handleMe={handleRestart}/>
                        </div>
                    </div>
                </div>
                <div className="p-2 grid grid-cols-3 h-1/3 gap-2">
                    <NumPadSquare squareValue={1} quantity={0} />
                    <NumPadSquare squareValue={2} quantity={0} />
                    <NumPadSquare squareValue={3} quantity={0} />
                    <NumPadSquare squareValue={4} quantity={0} />
                    <NumPadSquare squareValue={5} quantity={0} />
                    <NumPadSquare squareValue={6} quantity={0} />
                    <NumPadSquare squareValue={7} quantity={0} />
                    <NumPadSquare squareValue={8} quantity={0} />
                    <NumPadSquare squareValue={9} quantity={0} />
                </div>


                <div className="w-full h-1/3 flex-none">
                    <StatBox />
                </div>
            </div>
        </div>
    );
  }
  