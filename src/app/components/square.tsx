// import React from 'react'
'use client'

import {useContext, useEffect, useState } from "react"
import { debounce } from 'lodash';
import RegularSquare from "./regularSquare";
import NotesSquare from "./notesSquare";
import { BoardContext, GameContext } from "../../lib/context";

type Props = {
    uid: number,
}

export default function Square({uid}: Props) {
    const [hasNotes, setHasNotes] = useState(false);
    const [isODivHovered, setIsODivHovered] = useState(false);



    const {isShiftDown, inputValue, updateGameInterface} = useContext(GameContext)
    const {boardValues, updateSudokuInterface} = useContext(BoardContext);

    const {isEditable, squareValue, isDivHovered, squareNotes} = boardValues[uid]

    const handleMouseEnter = debounce(() => {
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            isDivHovered: true
        }

        updateGameInterface({selectedCell: uid}) 
        updateSudokuInterface({boardValues: nextBoardValues})
    }, 0);
    
    const handleMouseLeave = debounce(() => {
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            isDivHovered: false
        }
        updateGameInterface({selectedCell: undefined}) 
        updateSudokuInterface({boardValues: nextBoardValues})
    }, 0);

    function handleSquareNotesInput(index: number) {
        const nextSquareNotes = squareNotes.slice();
        nextSquareNotes[index] = (nextSquareNotes[index] === index+1) ? undefined : index + 1;
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            squareValue: 0,
            squareNotes: nextSquareNotes
        }
        updateSudokuInterface({boardValues: nextBoardValues})
        // OLD UPDATED FUNCTION
        // setBoardContext((currentBoardContext: Tile[]) => ({
        //     ...currentBoardContext,
        //     boardValues: nextBoardValues 
        // }));


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
            if (isDivHovered && isShiftDown && inputValue && inputValue > 0) {
                const index = inputValue - 1;
                handleSquareNotesInput(index);
            }
            else if (isDivHovered && !isShiftDown && inputValue && inputValue > 0) {
                handleRegularSquareInput(inputValue);
            }
    }, [isShiftDown, isDivHovered, inputValue]);

    // useEffect(() => {
    //     if (!hasNotes && !isShiftDown && isDivHovered && inputValue &&inputValue > 0) {
    //         console.log("regular square input useEffect")
    //         handleRegularSquareInput(inputValue);
    //     }
    // },[isShiftDown, isDivHovered, inputValue])


    // handling hasNotes variable
    useEffect(() => {
        setHasNotes(squareNotes.some((note: number | undefined) => note !== undefined));
        // TODO: make the Regular Square value '' if it hasNotes
    }, [squareNotes]);


    // useEffect(() => {
    //     console.log("hasNotes: ",hasNotes)
    // }, [hasNotes])
    

    return (
        <div
            className="w-full h-full"
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
        >
            {
                ((isEditable) && ((isDivHovered && isShiftDown) || hasNotes)) ? (
                    // passing in handleSquareNotesInput function because 
                    // we should be able to click on the boxes,
                    // and not just rely on hover input
                    <NotesSquare squareNotes={squareNotes} handleSquareNotesInput={handleSquareNotesInput} />
                ) : (
                    <RegularSquare isEditable={isEditable} squareValue={squareValue} />
                )
            }
        </div>
        // </div>
    )
}