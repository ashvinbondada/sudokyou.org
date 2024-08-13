// import React from 'react'
import {useContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
// import {useDivHovered} from "../utils/hooks/useIsHovered";
import { debounce } from 'lodash';
import RegularSquare from "./RegularSquare";
import NotesSquare from "./NotesSquare";
import { BoardContext } from "../utils/contexts/BoardContext";

export default function Square({uid}) {
    const [hasNotes, setHasNotes] = useState(false);
    // const {divRef, isDivHovered} = useDivHovered();
    const [isDivHovered, setIsDivHovered] = useState(false);
    const handleMouseEnter = debounce(() => {
        setIsDivHovered(true);
    }, 100);
    
    const handleMouseLeave = debounce(() => {
        setIsDivHovered(false);
    }, 100);

    const {isShiftDown, inputValue, boardValues, setBoardContext} = useContext(BoardContext);
    const {isEditable, squareValue, squareNotes} = boardValues[uid]


    function handleSquareNotesInput(index) {
        const nextSquareNotes = squareNotes.slice();
        nextSquareNotes[index] = (nextSquareNotes[index] === index+1) ? undefined : index + 1;
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            squareValue: '',
            squareNotes: nextSquareNotes
        }
        setBoardContext(currentBoardContext => ({
            ...currentBoardContext,
            boardValues: nextBoardValues 
        }));


    };


    // function handle RegularSquareClickInput
    function handleRegularSquareInput(input) {
        const nextValue = (squareValue === input) ? '' : input;
        const nextBoardValues = boardValues.slice();
        nextBoardValues[uid] = {
            ...boardValues[uid],
            squareValue: nextValue,
            squareNotes: Array(9).fill(undefined)
        }
        setBoardContext(currentBoardContext => ({
            ...currentBoardContext,
            boardValues: nextBoardValues
        }));
    }

    // Hovering Over Note Box Use Effect
    useEffect(() => {
        const handleHoveringSquareNotes = () => {
            if (isDivHovered && isShiftDown && inputValue > 0) {
                const index = inputValue - 1;
                handleSquareNotesInput(index);
            }
            else if (isDivHovered && !isShiftDown && inputValue > 0) {
                handleRegularSquareInput(inputValue);
            }
        };
    
        handleHoveringSquareNotes();
    }, [isShiftDown, isDivHovered, inputValue]);

    // function handle RegularSquareHoverInput
    useEffect(() => {
        const handleHoveringOverRegularSquare = () => {
            if (!hasNotes && !isShiftDown && isDivHovered && inputValue > 0) {
                console.log("regular square input useEffect")
                handleRegularSquareInput(inputValue);
            }
        };

        handleHoveringOverRegularSquare();
    },[isShiftDown, isDivHovered, inputValue])


    // handling hasNotes variable
    useEffect(() => {
        console.log("new squares: ", squareNotes)
        setHasNotes(squareNotes.some(note => note !== undefined));
        // TODO: make the Regular Square value '' if it hasNotes
    }, [squareNotes]);


    // useEffect(() => {
    //     console.log("hasNotes: ",hasNotes)
    // }, [hasNotes])
    

    return (
        <div  /* ref={divRef} */
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
        >
            {
                ((isDivHovered && isShiftDown) || hasNotes) ? (
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


Square.propTypes = {
    uid: PropTypes.number.isRequired,
}