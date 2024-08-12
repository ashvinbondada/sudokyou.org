// import React from 'react'
import {useContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import {useDivHovered} from "../utils/hooks/useIsHovered";
import RegularSquare from "./RegularSquare";
import NotesSquare from "./NotesSquare";
import { BoardContext } from "../utils/contexts/BoardContext";

export default function Square({uid}) {
    // const [noteBoxes, setNoteBoxes] = useState(Array(10).fill());
    const [hasNotes, setHasNotes] = useState(false);

    const {divRef, isDivHovered} = useDivHovered();

    const {isShiftDown, inputValue, boardValues, setBoardContext} = useContext(BoardContext);
    const {isEditable, squareValue, squareNotes} = boardValues[uid]

    // console.log("inputValue: ", inputValue);
    // console.log("isEditable", isEditable);
    // console.log("squareNotes: ", squareNotes)

    function handleSquareNotesInput(index) {
        const nextSquareNotes = squareNotes.slice();
        // setHasNotes(nextSquareNotes.some(note => note !== undefined));
        nextSquareNotes[index] = (nextSquareNotes[index] === index+1) ? undefined : index + 1;
        
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            squareNotes: nextSquareNotes
        }

        setBoardContext(currentBoardContext => ({
            ...currentBoardContext,
            boardValues: nextBoardValues
        }));

    };

    // Hovering Over Note Box Use Effect
    useEffect(() => {
        const handleHoveringOverNoteBox = () => {
            if (isDivHovered && isShiftDown && inputValue > 0) {
                const index = inputValue - 1;
                handleSquareNotesInput(index);
            }
        };
    
        handleHoveringOverNoteBox();
    }, [isShiftDown, isDivHovered, inputValue]);

    useEffect(() => {
        console.log("updated notes")
        setHasNotes(squareNotes.some((note) => note !== undefined));
      }, [squareNotes]);
    
    // function handle RegularSquareClickInput
    function handleRegularSquareInput(input) {
        const nextValue = (squareValue === input) ? '' : input;
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            squareValue: nextValue
        }
        setBoardContext(currentBoardContext => ({
            ...currentBoardContext,
            boardValues: nextBoardValues
        }))
    }

    // function handle RegularSquareHoverInput
    useEffect(() => {
        const handleHoveringOverRegularSquare = () => {
            if (isDivHovered && inputValue > 0) {
                handleRegularSquareInput(inputValue);
            }
        };

        handleHoveringOverRegularSquare();
    },[isDivHovered, inputValue])

    useEffect(() => {
        const currentNoteSquares = squareNotes.slice();
        setHasNotes(currentNoteSquares.some(note => note !== undefined));
    },[squareNotes])

    console.log("hasNotes: ", hasNotes)
    return (
        <div  ref={divRef}  >
            {
                ((isDivHovered && isShiftDown) || hasNotes) ? (
                    <NotesSquare squareNotes={squareNotes} handleSquareNotesInput={handleSquareNotesInput} />
                ) : (
                    <RegularSquare isEditable={isEditable} squareValue={squareValue} />
                )
            }
        </div>
        // </div>
    )
}


Square.propTypes = {
    uid: PropTypes.number.isRequired,
}