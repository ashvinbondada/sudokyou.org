// import React from 'react'
import {useContext, useEffect, useState } from "react"
import {useDivHovered} from "../utils/hooks/useIsHovered";
import RegularSquare from "./RegularSquare";
import NotesSquare from "./NotesSquare";
import { BoardContext } from "../utils/contexts/BoardContext";

export default function Square({uid}) {
    // const [noteBoxes, setNoteBoxes] = useState(Array(10).fill());
    const [hasNotes, setHasNotes] = useState(false);

    const {divRef, isDivHovered} = useDivHovered();

    const {isShiftDown, inputValue, boardValues} = useContext(BoardContext);
    const {isEditable, squareValue, squareNotes} = boardValues[uid]

    function handleNoteSquareInput(index) {
        const nextSquareNotes = squareNotes.slice();
        if (nextSquareNotes[index] === index) {
            nextSquareNotes[index] = undefined;
        } else {
            nextSquareNotes[index] = index;
        }
        // setNoteBoxes(nextSquareNotes);
        // TODO: use the context function to update the square notes
    };

    // function handle RegularSquareClickInput
    // function handle RegularSquareHoverInput

    useEffect(() => {
        const currentNoteSquares = noteBoxes.slice();
        setHasNotes(currentNoteSquares.some(note => note !== undefined));
    },[])

    return (
        <div ref={divRef} >
            {
                ((isDivHovered && isShiftDown) || hasNotes) ? (
                    <NotesSquare noteBoxes={squareNotes} handleNoteBoxClick={handleNoteBoxClick} />
                ) : (
                    <RegularSquare value={inputValue} isEditable={isEditable} />
                )
            }
        </div>
        // </div>
    )
}


Square.propTypes = {
    uid: PropTypes.number.isRequired,
}