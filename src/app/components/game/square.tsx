'use client'

import {useCallback, useContext, useState } from "react"
import RegularSquare from "./regularSquare";
import NotesSquare from "./notesSquare";
import { BoardContext, GameContext } from "../../../lib/context";
import { tileType } from "@/lib/common";
import { notFound } from "next/navigation";

type Props = {
    uid: number,
}

export default function Square({uid}: Props) {
    const [shadow, setShadow] = useState("none");
    const {notesMode, gameHistory, moveCount, updateGameInterface, anchorMode, numToQuantity} = useContext(GameContext)
    const {boardValues, selectedCells, highlightedCells, updateSudokuInterface, getHoveringCell, updateHoveringCell, addAnchor, deleteAnchor, clearAnchor} = useContext(BoardContext);
    const {isEditable, squareValue, squareNotes} = boardValues[uid]

    if (getHoveringCell === undefined 
        || updateHoveringCell === undefined
        || updateGameInterface === undefined
        || updateSudokuInterface === undefined
        || addAnchor === undefined
        || deleteAnchor === undefined
        || clearAnchor === undefined
    ) {
        notFound()
    }

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
            updateSudokuInterface({ boardValues: nextBoardValues });
            const nextGameHistory = [...gameHistory.slice(0, moveCount + 1), {
                selectedCells,
                boardValues: nextBoardValues,
                numToQuantity 
            }]
            updateGameInterface({
                gameHistory: nextGameHistory,
                moveCount: nextGameHistory.length - 1
            })
        } else {
            handleRegularSquareClick()
        }
    };

    const handleRegularSquareClick = () => {
        const anchors = new Set(selectedCells.slice(1))
        if ((anchorMode && !anchors.has(uid)) 
            || selectedCells.length == 1) {
            addAnchor(uid)
        }
        else if (anchorMode && anchors.has(uid))
            deleteAnchor(uid)
        else
            clearAnchor()
    } 

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (getHoveringCell() === uid) { // Only apply the effect to the selectedCell
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
        const anchors = new Set(selectedCells.slice(1))
        const filteredAnchors = selectedCells.slice(1).filter(
            (cell) => {return boardValues[cell].isEditable === tileType.WRONG}
        )
        const selectedCellBG = (filteredAnchors.length === 0 && isEditable === tileType.WRONG) 
            ? 'bg-light-selected-cell dark:bg-dark-selected-cell animate-pulse-shadow' + ' '
            : 'bg-light-selected-cell dark:bg-dark-selected-cell shadow-custom-inner' + ' '

        // PRIORITY: anchors > hovered cell > same numbered > neighborhood
        // anchors
        let backGroundClassRes = ''
        if (anchors.has(uid)) {
            backGroundClassRes ='bg-light-anchor dark:bg-dark-anchor'
            backGroundClassRes += " " + ((isEditable === tileType.WRONG) ? 'animate-pulse-shadow' : 'shadow-custom-inner')
            console.log(backGroundClassRes)
        } 
        // hovered Cell Priority 
        else if (uid === getHoveringCell() && filteredAnchors.length === 0) {
            backGroundClassRes = selectedCellBG
        }
        // same numbered cells
        else if (squareValue > 0 
            && (squareValue === boardValues[getHoveringCell()].squareValue 
            || (highlightedCells.anchorNums.get(squareValue) || 0) > 0)
        ) {
        backGroundClassRes = (uid !== getHoveringCell()) 
            ? 'bg-light-same-num-highlight shadow-custom-inner dark:bg-dark-same-num-highlight'
            : selectedCellBG;
        } 
        // neighborhood
        else if (highlightedCells.neighborhood.includes(uid)) {
        backGroundClassRes = (filteredAnchors.length === 0 && uid === getHoveringCell())
                ? selectedCellBG
                : 'bg-light-nbhd-highlight dark:bg-dark-nbhd-highlight'
            
        } else {
            backGroundClassRes = 'bg-light-square dark:bg-dark-square'
        }

        return backGroundClassRes 
    }, [selectedCells, isEditable, uid, squareValue, boardValues, getHoveringCell, highlightedCells.anchorNums, highlightedCells.neighborhood]);

    return (    
        <div 
            className={`select-none w-full h-full rounded-sm ${getBackgroundClasses()} ${!(anchorMode)? 'transition-colors duration-200 ease-out' : 'transition-none'}`}
            onMouseMove={handleMouseMove}
            style={{
                boxShadow: (selectedCells.length === 1 && getHoveringCell() === uid) ? shadow : 'none',
                zIndex: getHoveringCell() === uid ? 10 : 1,
                }} 
                onPointerEnter={() => {updateHoveringCell(uid)}}
            tabIndex={-1}
            >
            {
                (
                    // show notes only on playable and to be solved squares
                    (isEditable === tileType.WRONG)
                    && (
                        // on the current tile & engaged notes mode
                        // or already has notes with no input value
                        ((getHoveringCell() === uid) && notesMode) 
                        || (squareValue === 0 && squareNotes.some((note: number) => note !== 0))
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
    )
}