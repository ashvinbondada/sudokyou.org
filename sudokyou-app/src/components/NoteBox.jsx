// import React from 'react'
// import { useState } from "react"
import PropTypes from 'prop-types'

export default function NoteBox({value, onNoteBoxClick}) 
{
  return (
    <button 
      className="note-box" 
      onClick={onNoteBoxClick} 
    >{value}</button>
  )
}

NoteBox.propTypes = {
  value: PropTypes.number,
  onNoteBoxClick: PropTypes.func.isRequired,
}