import React from 'react';
import Square from './Square'; // Assuming you have a Square component
import './Board.css'; // Assuming you have some styles for the board

export default function Board() {
  // Generate an array of 81 Square components
  // const squares = Array.from({ length: 81 }, (_, index) => (
  //   <Square 
  //     key={index} 
  //   />
  // ));

  return (
    <div className="board-square">
      {/* {squares} */}
      <Square uid={0}/>
    </div>
  );
}