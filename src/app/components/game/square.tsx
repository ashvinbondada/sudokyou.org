'use client'

import {useCallback, useContext, useState } from "react"
import RegularSquare from "./regularSquare";
import NotesSquare from "./notesSquare";
import { BoardContext, GameContext } from "../../../lib/context";
import { anchorType, key, tileType } from "@/lib/common";

type Props = {
    uid: number,
}

export default function Square({uid}: Props) {
    const [shadow, setShadow] = useState("none");

    const {notesMode, selectedCell, highlightedCells, gameHistory, moveCount, updateGameInterface, autoNotesMode, anchorMode,anchorPress, numToQuantity} = useContext(GameContext)
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
                    highlightedCellsSnap: highlightedCells,
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
        // let newSelectedCell = selectedCell
        // META key pressed (anchorMode) and active list present or empty list
        // implies we're trying to increase our selection
        if (anchorPress === key.ON && !newAnchors.has(uid) || newAnchors.size == 0) {
            newAnchors.add(uid);
            if (squareValue > 0)
                newAnchorNums.set(squareValue, (newAnchorNums.get(squareValue) || 0) + 1);

            // else
            //     // subtle but set selected cell to the last cell which is empty
            //     newSelectedCell = uid 
        } 
        // META key pressed yet we click on the same square implies
        // a decrement of the square pressed
        else if (anchorPress === key.ON && newAnchors.has(uid)) {
            newAnchors.delete(uid)
            if (squareValue > 0) {
                const currentValue = newAnchorNums.get(squareValue) || 0;
                newAnchorNums.set(squareValue, currentValue > 0 ? currentValue - 1 : 0);
            }
            // we keep the selected cell always to the last element
            // else if (newAnchors.size > 0) {
            //     newSelectedCell  = Array.from(newAnchors).pop();
            // }
        }
        // in all other cases just clear the list
        else {
            newAnchors.clear()
            newAnchorNums.forEach((_, key) => newAnchorNums.set(key, 0));
        }
        if (updateGameInterface) {
            const anchorsArray = Array.from(newAnchors);
            const filteredAnchors = anchorsArray.filter(anchor => {
                const { isEditable } = boardValues[anchor];
                return isEditable === tileType.WRONG;
            });
            updateGameInterface({
                highlightedCells: {
                    ...highlightedCells,
                    anchors: newAnchors,
                    anchorNums: newAnchorNums
                },
                anchorMode: 
                    filteredAnchors.length == 0 
                        ? anchorType.NONE 
                        : (filteredAnchors.length == 1)
                            ? anchorType.SINGLE
                            : anchorType.MULTI
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
            const shadowX = -((x - centerX) / offsetWidth) * 30; // Control the strength of the shadow here
            const shadowY = -((y - centerY) / offsetHeight) * 30;
    
            // Set the new shadow
            setShadow(`${shadowX}px ${shadowY}px 50px rgba(8, 103, 136, 0.5)`); // Opacity changed to 0.3
        }
    };

    const getBackgroundClasses = useCallback(() => {
        let backGroundClassRes = ''
        const lenAnchors = highlightedCells.anchors.size
        const selectedCellBG = (anchorMode === anchorType.NONE 
                                && (isEditable === tileType.WRONG) 
                                ) 
                                ? 'bg-light-selected-cell dark:bg-dark-selected-cell animate-pulse-shadow ' 
                                : 'bg-light-selected-cell dark:bg-dark-selected-cell shadow-custom-inner ';
        // anchors
        if (highlightedCells.anchors.has(uid)) {
            backGroundClassRes ='bg-light-anchor dark:bg-dark-anchor'
            backGroundClassRes += (isEditable === tileType.WRONG) ? ' animate-pulse-shadow' : ' shadow-custom-inner' }
        // same number cells highlight
        else if (squareValue > 0 
            && (squareValue === boardValues[selectedCell].squareValue 
            || (highlightedCells.anchorNums.get(squareValue) || 0) > 0)
        ) {
        backGroundClassRes += (uid !== selectedCell) 
            ? 'bg-light-same-num-highlight shadow-custom-inner dark:bg-dark-same-num-highlight'
            : selectedCellBG;
        } 
        else if (anchorMode === anchorType.NONE && highlightedCells.neighborhood.includes(uid)) {
        backGroundClassRes += uid === selectedCell
            ? selectedCellBG
            : (lenAnchors == 0) 
                ? 'bg-light-nbhd-highlight dark:bg-dark-nbhd-highlight'
                : 'bg-light-square dark:bg-dark-square';
        } else {
            backGroundClassRes += 'bg-light-square dark:bg-dark-square'
        }

        return backGroundClassRes 
    }, [boardValues, highlightedCells, isEditable, selectedCell, squareValue, uid, anchorMode]);

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
                className={`select-none w-full h-full rounded-sm ${getBackgroundClasses()} ${!(anchorPress === key.ON) ? 'transition-colors duration-200 ease-out' : 'transition-none'}`}
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