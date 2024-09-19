// import React from 'react'
// import { useState } from "react"
import PropTypes from 'prop-types'

type Props = {
    value: number | undefined,
    onNoteBoxClick: () => void
}
export default function NoteBox({value, onNoteBoxClick}: Props) 
{
  return (
    <div className='h-full w-full text-xs flex items-center justify-center text-black'>
      <button 
          onClick={onNoteBoxClick} 
      >{value}</button>
    </div>
  )
}

NoteBox.propTypes = {
  value: PropTypes.number,
  onNoteBoxClick: PropTypes.func.isRequired,
}