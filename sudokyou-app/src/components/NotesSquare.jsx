// import React from 'react'
import { useState } from "react";
import NoteBox from "./NoteBox";
import PropTypes from 'prop-types'
// import { BoardContext } from "../utils/contexts/BoardContext";

export default function NotesSquare({squareNotes, handleSquareNotesInput}) {

    return (
      <div className="notes-square">
        {squareNotes.map((value, index) => (
          <NoteBox
            className="note-box"
            key={index}
            value={value}
            onNoteBoxClick={() => handleSquareNotesInput(index)} 
          />
        ))}
      </div>
    );
  }

NotesSquare.propTypes = {
    squareNotes:              PropTypes.array.isRequired,
    handleSquareNotesInput:     PropTypes.func.isRequired
}