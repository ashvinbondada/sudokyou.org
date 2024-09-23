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
    
    const {isShiftDown, inputValue, selectedCell, updateGameInterface} = useContext(GameContext)
    const {boardValues, updateSudokuInterface} = useContext(BoardContext);
    const {isEditable, squareValue, squareNotes} = boardValues[uid]
    const [shadow, setShadow] = useState("none");

    function handleSquareNotesInput(index: number) {
        const nextSquareNotes = squareNotes.slice();
        nextSquareNotes[index] = (nextSquareNotes[index] === index+1) ? 0 : index + 1;
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            squareValue: 0,
            squareNotes: nextSquareNotes
        }
        updateSudokuInterface({boardValues: nextBoardValues})
        console.log("selectedCell", selectedCell)
        console.log("uid", uid)
        console.log("input", index+1)
        console.log("isShiftDown", isShiftDown)

    };


    // function handle RegularSquareClickInput
    function handleRegularSquareInput(input: number) {
        const nextValue = (squareValue === input) ? 0 : input;
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            squareValue: nextValue,
            squareNotes: Array(9).fill(0)
        }
        updateSudokuInterface({boardValues: nextBoardValues})
    }

    // Hovering Over Note Box Use Effect
    useEffect(() => {
        if ((selectedCell === uid ) && inputValue > -1) {
            if (isShiftDown) {
                const index = inputValue - 1;
                handleSquareNotesInput(index);
            } else {
                handleRegularSquareInput(inputValue);
            }
        }
    }, [uid, isShiftDown, inputValue]);


    // handling hasNotes variable
    useEffect(() => {
        setHasNotes(squareNotes.some((note: number) => note !== 0));
    }, [squareNotes]);

    // SHADOW IN SQUARE
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (selectedCell === uid) { // Only apply the effect to the selectedCell
          const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget;
    
          // Mouse position relative to the center of the component
          const x = e.clientX - offsetLeft - offsetWidth / 2;
          const y = e.clientY - offsetTop - offsetHeight / 2;
    
          // Invert the shadow to be on the opposite side of the mouse position
          const shadowX = -(x / offsetWidth) * 8; // Negative sign to invert
          const shadowY = -(y / offsetHeight) * 8;
    
          // Set the new shadow
          setShadow(`${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.5)`);
        }
      };
    
    return (
        <div
            className={`w-full h-full`}
            onMouseMove={handleMouseMove}
            onPointerEnter={() => updateGameInterface({ selectedCell: uid })}
            style={{ boxShadow: selectedCell === uid ? shadow : "none" }} // Apply shadow only for selected cell

            >
            {
                ((isEditable) && (((selectedCell == uid) && isShiftDown) || hasNotes)) ? (
                    // passing in handleSquareNotesInput function because 
                    // we should be able to click on the boxes,
                    // and not just rely on hover input
                    <NotesSquare squareNotes={squareNotes} handleSquareNotesInput={handleSquareNotesInput} />
                ) : (
                    <RegularSquare squareValue={squareValue} />
                )
            }
        </div>
    )
}