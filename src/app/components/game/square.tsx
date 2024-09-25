'use client'

import {useContext, useEffect, useState } from "react"
import RegularSquare from "./regularSquare";
import NotesSquare from "./notesSquare";
import { BoardContext, GameContext } from "../../../lib/context";

type Props = {
    uid: number,
}

export default function Square({uid}: Props) {
    const [hasNotes, setHasNotes] = useState(false);
    
    const {notesMode, selectedCell, highlightedCells, updateGameInterface} = useContext(GameContext)
    const {boardValues, updateSudokuInterface} = useContext(BoardContext);
    const {isEditable, squareValue, squareNotes} = boardValues[uid]
    const [shadow, setShadow] = useState("none");
    const [right, setRight] = useState(true)

    // need this function because this function
    // has encoded the uid of the square component
    // of whos squareNotes we are editing
    const handleSquareNotesInput = (index: number) => {
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
        setRight(true)
    };

    // handling hasNotes variable
    useEffect(() => {
        setHasNotes(squareNotes.some((note: number) => note !== 0));
    }, [squareNotes]);

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
        const selectedCellBG = 'bg-theme-1-pacific-cyan/65 shadow-custom-inner';

        if (highlightedCells.sameNumbers.includes(index)) {
        return index !== selectedCell 
            ? 'bg-theme-1-jonquil/50 shadow-custom-inner'
            : selectedCellBG;
        } else if (highlightedCells.neighborhood.includes(index)) {
        return index === selectedCell
            ? selectedCellBG
            : 'bg-theme-1-pacific-cyan/30';
        }

        return 'bg-gray-100'; // Default square background
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
        >
            <div
                className={`w-full h-full transition-all ${getBackgroundClasses(uid)} duration-400 ease-in-out`}
                >
                {
                    (
                        (isEditable) // notes irrelevant on givens
                        && (
                            // on the current tile & engaged notes mode
                            // or already has notes
                            ((selectedCell == uid) && notesMode) 
                            || hasNotes
                            )
                    ) ? (
                        // passing in handleSquareNotesInput function because 
                        // we should be able to click on the boxes,
                        // and not just rely on hover input
                        <NotesSquare squareNotes={squareNotes} handleSquareNotesInput={handleSquareNotesInput} />
                    ) : (
                        <RegularSquare squareValue={squareValue} isEditable={isEditable} isRight={right} />
                    )
                }
            </div>
        </div>
    )
}