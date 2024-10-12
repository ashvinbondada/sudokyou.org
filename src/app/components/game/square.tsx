'use client'

import {useCallback, useContext, useState } from "react"
import RegularSquare from "./regularSquare";
import NotesSquare from "./notesSquare";
import { BoardContext, GameContext } from "../../../lib/context";
import { tileType } from "@/lib/common";

type Props = {
    uid: number,
}

export default function Square({uid}: Props) {
    const [shadow, setShadow] = useState("none");

    const {notesMode, selectedCell, highlightedCells, gameHistory, moveCount, updateGameInterface, autoNotesMode, anchorMode, numToQuantity} = useContext(GameContext)
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
                    selectedCell,
                    boardValues: nextBoardValues,
                    autoNotesMode,
                    numToQuantity 
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
        const newAnchorNums = new Map(highlightedCells.anchorNums)
        if (anchorMode && !newAnchors.has(uid) || newAnchors.size == 0) {
            newAnchors.add(uid);
            if (squareValue > 0)
                newAnchorNums.set(squareValue, (newAnchorNums.get(squareValue) || 0) + 1);
        } 
        else if (anchorMode && newAnchors.has(uid)) {
            newAnchors.delete(uid)
            if (squareValue > 0) {
                const currentValue = newAnchorNums.get(squareValue) || 0;
                newAnchorNums.set(squareValue, currentValue > 0 ? currentValue - 1 : 0);
            }
        }
        else {
            newAnchors.clear()
            newAnchorNums.forEach((_, key) => newAnchorNums.set(key, 0));
        }
        if (updateGameInterface) {
            updateGameInterface({
                highlightedCells: {
                    ...highlightedCells,
                    anchors: newAnchors,
                    anchorNums: newAnchorNums
                },
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

    const getBackgroundClasses = useCallback((index: number) => {
        let backGroundClassRes = ''
        const lenAnchors = highlightedCells.anchors.size
        const anchorsArray = Array.from(highlightedCells.anchors);
        const filteredAnchors = anchorsArray.filter(anchor => {
          const { isEditable } = boardValues[anchor];
          return isEditable === tileType.WRONG;
        });
        const selectedCellBG = (filteredAnchors.length == 0 
                                && (isEditable === tileType.WRONG) 
                                ) 
                                ? 'bg-light-selected-cell dark:bg-dark-selected-cell animate-pulse-shadow' 
                                : 'bg-light-selected-cell dark:bg-dark-selected-cell shadow-custom-inner';
        // anchors
        if (highlightedCells.anchors.has(uid)) {
            backGroundClassRes ='bg-light-anchor dark:bg-dark-anchor'
            backGroundClassRes += (isEditable === tileType.WRONG) ? ' animate-pulse-shadow' : ' shadow-custom-inner' }
        // same number cells highlight
        else if (squareValue > 0 
            && (squareValue === boardValues[selectedCell].squareValue 
            || (highlightedCells.anchorNums.get(squareValue) || 0) > 0)
        ) {
        backGroundClassRes += (index !== selectedCell) 
            ? 'bg-light-same-num-highlight shadow-custom-inner dark:bg-dark-same-num-highlight'
            : selectedCellBG;
        } 
        else if (filteredAnchors.length == 0 && highlightedCells.neighborhood.includes(index)) {
        backGroundClassRes += index === selectedCell
            ? selectedCellBG
            : (lenAnchors == 0) 
                ? 'bg-light-nbhd-highlight dark:bg-dark-nbhd-highlight'
                : 'bg-light-square dark:bg-dark-square';
        } else {
            backGroundClassRes += 'bg-light-square dark:bg-dark-square'
        }

        return backGroundClassRes 
    }, [boardValues, highlightedCells, isEditable, selectedCell, squareValue, uid]);

    return (    
        <div className="w-full h-full select-none rounded-sm" 
            onMouseMove={handleMouseMove}
            style={{
                boxShadow: (highlightedCells.anchors.size == 0 && selectedCell === uid) ? shadow : 'none',
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
                className={`select-none w-full h-full rounded-sm ${getBackgroundClasses(uid)} ${!anchorMode ? 'transition-colors duration-200 ease-out' : 'transition-none'}`}
                tabIndex={-1}
                >
                {
                    (
                        // show notes only on playable and to be solved squares
                        (isEditable === tileType.WRONG)
                        && (
                            // on the current tile & engaged notes mode
                            // or already has notes with no input value
                            ((selectedCell == uid) && notesMode) 
                            || (squareValue == 0 && squareNotes.some((note: number) => note !== 0))
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