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
            squareNotes: Array(9).fill(undefined)
        }
        updateSudokuInterface({boardValues: nextBoardValues})
    }

    // Hovering Over Note Box Use Effect
    useEffect(() => {
        if ((selectedCell === uid ) && inputValue > 0) {
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
        setHasNotes(squareNotes.some((note: number | undefined) => note !== undefined));
    }, [squareNotes]);

    return (
        <div
            className="w-full h-full"
            onPointerEnter={() => updateGameInterface({selectedCell: uid})}>
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