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
import { tileType } from "@/lib/common";
import { notFound } from "next/navigation";

export default function ControlNav() {
    const [isSettingsClicked, setIsSettingsClicked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const {initial, solution, getHoveringCell, boardValues, selectedCells, updateSudokuInterface, highlightedCells} = useContext(BoardContext)
    const {moveCount, backspaceMode, notesMode, undoMode, gameHistory, updateGameInterface, numToQuantity } = useContext(GameContext)
    if (getHoveringCell === undefined
        || updateSudokuInterface === undefined
        || updateGameInterface === undefined
    )
        notFound()

    const handleAutoNotes = () => {
        let hasEmptyNoteSquare = false
        let nextBoardValues = boardValues.slice()
        for (const tile of nextBoardValues) {
            if (tile.squareValue == 0 && tile.squareNotes.filter(note => note !== 0).length === 0) {
                hasEmptyNoteSquare = true
                break;
            }
        }

        if (hasEmptyNoteSquare) 
            nextBoardValues = calculateAutoCandidates(nextBoardValues)
        else 
            nextBoardValues = clearAutoCandidates(nextBoardValues)

        updateSudokuInterface({boardValues: nextBoardValues})
        const nextGameHistory = [...gameHistory.slice(0, moveCount + 1), {
            selectedCells,
            boardValues: nextBoardValues,
            numToQuantity
        }]
        updateGameInterface({
            moveCount: nextGameHistory.length-1, 
            gameHistory: nextGameHistory,
        })
    }

    const handleDelete = () => {
        const nextBoardValues = boardValues.slice();
        const nextNumToQuantity = new Map(numToQuantity);
        const newAnchorNums = new Map(highlightedCells.anchorNums);
    
        const processAnchor = (anchor: number) => {
            const newClearTile = clearTile(nextBoardValues[anchor]);
            const { squareValue, isEditable } = nextBoardValues[anchor];
            if (isEditable === tileType.RIGHT) {
                const currentValue = newAnchorNums.get(squareValue) || 0;
                newAnchorNums.set(nextBoardValues[anchor].squareValue, currentValue > 0 ? currentValue - 1 : 0);

                const currentQuantity = nextNumToQuantity.get(squareValue) || 0;
                nextNumToQuantity.set(squareValue, currentQuantity - 1);
            }
            nextBoardValues[anchor] = newClearTile;
        };
    
        if (selectedCells.length > 1) 
            selectedCells.slice(1).forEach(anchor => processAnchor(anchor));
        else
            processAnchor(getHoveringCell());
    
        updateSudokuInterface({ boardValues: nextBoardValues, highlightedCells: {
            ...highlightedCells,
            anchorNums: newAnchorNums
        } });
    
        const nextGameHistory = [
            ...gameHistory.slice(0, moveCount + 1),
            {
                selectedCells,
                boardValues: nextBoardValues,
                numToQuantity: nextNumToQuantity
            }
        ];
    
        updateGameInterface({
            moveCount: nextGameHistory.length - 1,
            gameHistory: nextGameHistory,
        });
    };
    
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
        const { 
            selectedCells: nextSelectedCells, 
        } = gameHistory[gameHistory.length - 1]

        const newAnchorNums = new Map<number, number>(
            Array.from({ length: 9 }, (_, i) => [i + 1, 0])
        );
        if (gameHistory.length > 1) {
            const {boardValues: nextBoardValues} = gameHistory[gameHistory.length - 2]

            const anchors = nextSelectedCells.slice(1)
            for (const anchor in anchors) {
                const squareValue = nextBoardValues[anchor].squareValue
                if (squareValue > 0)
                    newAnchorNums.set(squareValue, (newAnchorNums.get(squareValue) || 0) + 1);
            }
            updateSudokuInterface({
                boardValues: nextBoardValues,
                selectedCells: nextSelectedCells,
                highlightedCells: {
                    ...highlightedCells,
                    anchorNums: newAnchorNums
                }
            })

            const nextGameHistory = [...gameHistory.slice(0, moveCount)]

            const nextNumToQuantity = new Map<number, number>();
            nextBoardValues.forEach((tile) => {
                if (tile.squareValue > 0) {
                    const currentQuantity = nextNumToQuantity.get(tile.squareValue) || 0;
                    nextNumToQuantity.set(tile.squareValue, currentQuantity + 1);
                }
            });
            updateGameInterface({
                moveCount: nextGameHistory.length-1, 
                gameHistory: nextGameHistory,
                numToQuantity: nextNumToQuantity,
            })
        } else {
            updateSudokuInterface({
                selectedCells: nextSelectedCells, 
                highlightedCells: {...highlightedCells, anchorNums: newAnchorNums}
            })
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
                            handleMe={handleNotes} isToggle={true} keyBoardClick={notesMode || selectedCells.length > 2}/>
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
  
