'use client'

import {useContext, useState } from "react"
import RegularSquare from "./regularSquare";
import NotesSquare from "./notesSquare";
import { BoardContext, GameContext } from "../../../lib/context";
import { tileType } from "@/lib/common";

type Props = {
    uid: number,
}

export default function Square({uid}: Props) {
    const [shadow, setShadow] = useState("none");

    const {notesMode, selectedCell, highlightedCells, gameHistory, moveCount, updateGameInterface, autoNotesMode, anchorMode} = useContext(GameContext)
    const {boardValues, updateSudokuInterface} = useContext(BoardContext);
    const {isEditable, squareValue, squareNotes} = boardValues[uid]

    // need this function because it
    // has encoded the uid of the square component
    // of whos squareNotes we are editing
    const handleSquareNotesInput = (index: number) => {
        if (notesMode) {
            const nextSquareNotes = squareNotes.slice();
            nextSquareNotes[index] = (nextSquareNotes[index] === index+1) ? 0 : index + 1;
            const nextBoardValues = boardValues.slice();
            nextBoardValues[uid] = {
                ...boardValues[uid],
                squareValue: 0,
                squareNotes: nextSquareNotes
            }
            if (updateSudokuInterface) {
                updateSudokuInterface({ boardValues: nextBoardValues });
            }
            if (updateGameInterface){
                const nextGameHistory = [...gameHistory.slice(0, moveCount + 1), {
                    selectedCell: selectedCell,
                    boardValues: nextBoardValues,
                    autoNotesMode: autoNotesMode
                }]
                updateGameInterface({
                    gameHistory: nextGameHistory,
                    moveCount: nextGameHistory.length - 1
                })
            }
        } else {
            handleRegularSquareClick()
        }
    };

    const handleRegularSquareClick = () => {
        const newAnchors = new Set(highlightedCells.anchors); 
        if (anchorMode && !newAnchors.has(uid)) {
                newAnchors.add(uid);
        } 
        else if (newAnchors.has(uid)) {
            newAnchors.delete(uid)
        }
        else {
            newAnchors.clear()
            newAnchors.add(uid);
        }
        if (updateGameInterface) {
            updateGameInterface({
                highlightedCells: {
                    ...highlightedCells,
                    anchors: newAnchors
                }
            });
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (selectedCell === uid) { // Only apply the effect to the selectedCell
            const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget;
            
            // Mouse position relative to the square's top-left corner
            const x = e.clientX - offsetLeft;
            const y = e.clientY - offsetTop;
    
            // Calculate the shadow based on mouse position relative to the center of the square
            const centerX = offsetWidth / 2;
            const centerY = offsetHeight / 2;
    
            // Compute the shadow values based on the distance from the center of the square
            const shadowX = -((x - centerX) / offsetWidth) * 8; // Control the strength of the shadow here
            const shadowY = -((y - centerY) / offsetHeight) * 8;
    
            // Set the new shadow
            setShadow(`${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.5)`);
        }
    };

    const getBackgroundClasses = (index: number) => {
        let backGroundClassRes = ''
        const selectedCellBG = 'bg-theme-1-pacific-cyan/65 shadow-custom-inner';
        // same numbered cells highlight
        if (squareValue > 0 && squareValue === boardValues[selectedCell].squareValue) {
        backGroundClassRes += (index !== selectedCell) 
            ? 'bg-theme-1-jonquil/50 shadow-custom-inner'
            : selectedCellBG;
        } 
        else if (highlightedCells.anchors.has(uid)) {
            backGroundClassRes = backGroundClassRes.split(' ').slice(1).join(' ') + ' bg-theme-2-non-photo-blue/80 shadow-custom-inner'
        }
        else if (highlightedCells.neighborhood.includes(index)) {
        backGroundClassRes += index === selectedCell
            ? selectedCellBG
            : 'bg-theme-1-pacific-cyan/30';
        } else {
            backGroundClassRes += 'bg-gray-100'
        }

        return backGroundClassRes
    };

    return (    
        <div className="w-full h-full bg-white" 
            onMouseMove={handleMouseMove}
            style={{
                boxShadow: selectedCell === uid ? shadow : 'none',
                zIndex: selectedCell === uid ? 10 : 1,
              }} 
              onPointerEnter={() => {
                if (updateGameInterface) {
                  updateGameInterface({ selectedCell: uid });
                }
              }}
              tabIndex={-1}
        >
            <div 
                className={`w-full h-full transition-all ${getBackgroundClasses(uid)} duration-150 ease-in-out`}
                tabIndex={-1}
                >
                {
                    (
                        // show notes only on playable and to be solved squares
                        (isEditable === tileType.WRONG)
                        && (
                            // on the current tile & engaged notes mode
                            // or already has notes
                            ((selectedCell == uid) && notesMode) 
                            || squareNotes.some((note: number) => note !== 0)
                            )
                    ) ? (
                        // passing in handleSquareNotesInput function because 
                        // we should be able to click on the boxes,
                        // and not just rely on hover input
                        <NotesSquare squareNotes={squareNotes} handleSquareNotesInput={handleSquareNotesInput} />
                    ) : (
                        <RegularSquare squareValue={squareValue} isEditable={isEditable} handleClick={handleRegularSquareClick}/>
                    )
                }
            </div>
        </div>
    )
}