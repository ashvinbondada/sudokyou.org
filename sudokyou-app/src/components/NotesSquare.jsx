// import React from 'react'
import { useState } from "react";
import NoteBox from "./NoteBox";
import PropTypes from 'prop-types'
// import { BoardContext } from "../utils/contexts/BoardContext";

export default function NotesSquare() {
    const [noteBoxes, setNoteBoxes] = useState(Array(10).fill())

    function handleNoteBoxClick(index) {
        const nextNoteSquares = noteBoxes.slice();
        if (nextNoteSquares[index] === index) {
            nextNoteSquares[index] = undefined;
        } else {
            nextNoteSquares[index] = index;
        }
        setNoteBoxes(nextNoteSquares);
    }
    return (
      <div className="notes-square">
        {noteBoxes.slice(1).map((value, index) => (
          <NoteBox
            key={index + 1} // Adjust the key to match the original index in the array
            value={value}
            onNoteBoxClick={() => handleNoteBoxClick(index + 1)} // Adjust the callback to match the original index
            className="note-box"
          />
        ))}
      </div>
    );
  }

NotesSquare.propTypes = {
    noteBoxes:              PropTypes.array.isRequired,
    handleNoteBoxClick:     PropTypes.func.isRequired
}